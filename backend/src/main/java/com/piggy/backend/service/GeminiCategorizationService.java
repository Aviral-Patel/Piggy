package com.piggy.backend.service;

import com.piggy.backend.entity.Category;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Service to categorize transactions using Google Gemini API.
 * Includes caching and fallback mappings for common merchants.
 */
@Service
public class GeminiCategorizationService {

    @Value("${gemini.api.key:}")
    private String apiKey;

    @Value("${gemini.api.url:https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent}")
    private String apiUrl;

    @Value("${gemini.enabled:false}")
    private boolean enabled;

    private final WebClient webClient;
    
    // Cache merchant -> category mappings to reduce API calls
    private final Map<String, Category> merchantCategoryCache = new ConcurrentHashMap<>();
    
    // Fallback mappings for common merchants (used when API fails or rate limited)
    private static final Map<String, Category> KNOWN_MERCHANTS = Map.ofEntries(
        // FOOD
        Map.entry("ZOMATO", Category.FOOD),
        Map.entry("SWIGGY", Category.FOOD),
        Map.entry("DOMINOS", Category.FOOD),
        Map.entry("PIZZA HUT", Category.FOOD),
        Map.entry("MCDONALDS", Category.FOOD),
        Map.entry("MCDONALD", Category.FOOD),
        Map.entry("KFC", Category.FOOD),
        Map.entry("BURGER KING", Category.FOOD),
        Map.entry("SUBWAY", Category.FOOD),
        Map.entry("STARBUCKS", Category.FOOD),
        Map.entry("DUNZO", Category.FOOD),
        Map.entry("BLINKIT", Category.FOOD),
        Map.entry("ZEPTO", Category.FOOD),
        Map.entry("INSTAMART", Category.FOOD),
        Map.entry("BIGBASKET", Category.FOOD),
        Map.entry("GROFERS", Category.FOOD),
        Map.entry("DMART", Category.FOOD),
        Map.entry("RELIANCE FRESH", Category.FOOD),
        
        // SHOPPING
        Map.entry("AMAZON", Category.SHOPPING),
        Map.entry("AMAZON PAY", Category.SHOPPING),
        Map.entry("AMAZON PAY INDIA", Category.SHOPPING),
        Map.entry("FLIPKART", Category.SHOPPING),
        Map.entry("MYNTRA", Category.SHOPPING),
        Map.entry("AJIO", Category.SHOPPING),
        Map.entry("NYKAA", Category.SHOPPING),
        Map.entry("MEESHO", Category.SHOPPING),
        Map.entry("SNAPDEAL", Category.SHOPPING),
        Map.entry("CROMA", Category.SHOPPING),
        Map.entry("RELIANCE DIGITAL", Category.SHOPPING),
        Map.entry("DECATHLON", Category.SHOPPING),
        
        // TRANSPORT
        Map.entry("UBER", Category.TRANSPORT),
        Map.entry("UBER INDIA", Category.TRANSPORT),
        Map.entry("OLA", Category.TRANSPORT),
        Map.entry("OLA CABS", Category.TRANSPORT),
        Map.entry("RAPIDO", Category.TRANSPORT),
        Map.entry("IRCTC", Category.TRANSPORT),
        Map.entry("MAKEMYTRIP", Category.TRANSPORT),
        Map.entry("GOIBIBO", Category.TRANSPORT),
        Map.entry("REDBUS", Category.TRANSPORT),
        Map.entry("YATRA", Category.TRANSPORT),
        Map.entry("CLEARTRIP", Category.TRANSPORT),
        Map.entry("INDIAN OIL", Category.TRANSPORT),
        Map.entry("HP PETROL", Category.TRANSPORT),
        Map.entry("BHARAT PETROLEUM", Category.TRANSPORT),
        Map.entry("FASTAG", Category.TRANSPORT),
        Map.entry("METRO", Category.TRANSPORT),
        Map.entry("DMRC", Category.TRANSPORT),
        
        // ENTERTAINMENT
        Map.entry("NETFLIX", Category.ENTERTAINMENT),
        Map.entry("HOTSTAR", Category.ENTERTAINMENT),
        Map.entry("DISNEY HOTSTAR", Category.ENTERTAINMENT),
        Map.entry("PRIME VIDEO", Category.ENTERTAINMENT),
        Map.entry("SPOTIFY", Category.ENTERTAINMENT),
        Map.entry("YOUTUBE", Category.ENTERTAINMENT),
        Map.entry("GAANA", Category.ENTERTAINMENT),
        Map.entry("JIOSAAVN", Category.ENTERTAINMENT),
        Map.entry("BOOKMYSHOW", Category.ENTERTAINMENT),
        Map.entry("PVR", Category.ENTERTAINMENT),
        Map.entry("INOX", Category.ENTERTAINMENT),
        Map.entry("SONY LIV", Category.ENTERTAINMENT),
        Map.entry("ZEE5", Category.ENTERTAINMENT),
        
        // UTILITIES
        Map.entry("AIRTEL", Category.UTILITIES),
        Map.entry("JIO", Category.UTILITIES),
        Map.entry("VODAFONE", Category.UTILITIES),
        Map.entry("VI", Category.UTILITIES),
        Map.entry("BSNL", Category.UTILITIES),
        Map.entry("TATA POWER", Category.UTILITIES),
        Map.entry("ADANI GAS", Category.UTILITIES),
        Map.entry("MAHANAGAR GAS", Category.UTILITIES),
        Map.entry("BESCOM", Category.UTILITIES),
        Map.entry("MSEDCL", Category.UTILITIES),
        Map.entry("ACT FIBERNET", Category.UTILITIES),
        Map.entry("HATHWAY", Category.UTILITIES),
        Map.entry("LIC", Category.UTILITIES),
        Map.entry("HDFC LIFE", Category.UTILITIES),
        Map.entry("ICICI PRUDENTIAL", Category.UTILITIES)
    );

    public GeminiCategorizationService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.build();
    }

    /**
     * Categorize a transaction based on merchant name and SMS content.
     * Priority: 1) Cache, 2) Known merchants map, 3) Gemini API, 4) Fallback to OTHERS
     *
     * @param merchantName The merchant name extracted from SMS
     * @param smsMessage   The full SMS message for context
     * @return Category enum value
     */
    public Category categorize(String merchantName, String smsMessage) {
        // Normalize merchant name for lookups
        String normalizedMerchant = normalizeMerchantName(merchantName);
        
        // 1. Check cache first
        if (merchantCategoryCache.containsKey(normalizedMerchant)) {
            Category cached = merchantCategoryCache.get(normalizedMerchant);
            System.out.println("✓ Category from cache: " + normalizedMerchant + " -> " + cached);
            return cached;
        }
        
        // 2. Check known merchants fallback map (works even without API)
        Category knownCategory = lookupKnownMerchant(normalizedMerchant);
        if (knownCategory != null) {
            merchantCategoryCache.put(normalizedMerchant, knownCategory);
            System.out.println("✓ Category from known merchants: " + normalizedMerchant + " -> " + knownCategory);
            return knownCategory;
        }

        // 3. If Gemini is not enabled or no API key, return OTHERS
        if (!enabled || apiKey == null || apiKey.isBlank()) {
            System.out.println("⚠ Gemini API not configured - returning OTHERS category");
            return Category.OTHERS;
        }

        // 4. Call Gemini API
        try {
            Category category = callGeminiApi(merchantName, smsMessage);
            
            // Cache the result
            merchantCategoryCache.put(normalizedMerchant, category);
            System.out.println("✓ Category from Gemini: " + merchantName + " -> " + category);
            
            return category;
        } catch (Exception e) {
            System.err.println("✗ Gemini API error: " + e.getMessage());
            return Category.OTHERS;
        }
    }
    
    /**
     * Look up merchant in known merchants map.
     * Checks for exact match and partial/contains match.
     */
    private Category lookupKnownMerchant(String normalizedMerchant) {
        // Exact match
        if (KNOWN_MERCHANTS.containsKey(normalizedMerchant)) {
            return KNOWN_MERCHANTS.get(normalizedMerchant);
        }
        
        // Partial match - check if merchant contains any known merchant name
        for (Map.Entry<String, Category> entry : KNOWN_MERCHANTS.entrySet()) {
            if (normalizedMerchant.contains(entry.getKey()) || entry.getKey().contains(normalizedMerchant)) {
                return entry.getValue();
            }
        }
        
        return null;
    }

    /**
     * Call Gemini API to categorize the transaction.
     */
    private Category callGeminiApi(String merchantName, String smsMessage) {
        String prompt = buildPrompt(merchantName, smsMessage);

        // Build request body
        Map<String, Object> requestBody = Map.of(
            "contents", List.of(
                Map.of("parts", List.of(
                    Map.of("text", prompt)
                ))
            ),
            "generationConfig", Map.of(
                "temperature", 0.1,  // Low temperature for consistent results
                "maxOutputTokens", 20
            )
        );

        // Make API call
        Map<?, ?> response = webClient.post()
            .uri(apiUrl + "?key=" + apiKey)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(requestBody)
            .retrieve()
            .bodyToMono(Map.class)
            .block();

        // Parse response
        return parseGeminiResponse(response);
    }

    /**
     * Build the prompt for Gemini API.
     */
    private String buildPrompt(String merchantName, String smsMessage) {
        return String.format("""
            You are a transaction categorizer. Categorize this transaction into exactly ONE of these categories:
            - FOOD (restaurants, food delivery, groceries, cafes, bakeries)
            - SHOPPING (retail stores, online shopping, e-commerce)
            - ENTERTAINMENT (movies, streaming, gaming, events, subscriptions)
            - TRANSPORT (cab, metro, bus, fuel, parking, flights, trains)
            - UTILITIES (electricity, water, gas, internet, phone bills, insurance)
            - OTHERS (anything that doesn't fit above)
            
            Merchant: %s
            SMS Context: %s
            
            Reply with ONLY the category name in uppercase. Nothing else.
            """, 
            merchantName != null ? merchantName : "Unknown",
            smsMessage != null ? smsMessage.substring(0, Math.min(200, smsMessage.length())) : ""
        );
    }

    /**
     * Parse the Gemini API response and extract category.
     */
    private Category parseGeminiResponse(Map<?, ?> response) {
        try {
            List<?> candidates = (List<?>) response.get("candidates");
            if (candidates == null || candidates.isEmpty()) {
                return Category.OTHERS;
            }
            
            Map<?, ?> candidate = (Map<?, ?>) candidates.get(0);
            Map<?, ?> content = (Map<?, ?>) candidate.get("content");
            List<?> parts = (List<?>) content.get("parts");
            Map<?, ?> part = (Map<?, ?>) parts.get(0);
            String text = ((String) part.get("text")).trim().toUpperCase();
            
            // Clean up the response (remove any extra text/punctuation)
            text = text.replaceAll("[^A-Z]", "");
            
            // Try to match to Category enum
            return switch (text) {
                case "FOOD" -> Category.FOOD;
                case "SHOPPING" -> Category.SHOPPING;
                case "ENTERTAINMENT" -> Category.ENTERTAINMENT;
                case "TRANSPORT", "TRANSPORTATION" -> Category.TRANSPORT;
                case "UTILITIES", "UTILITY" -> Category.UTILITIES;
                default -> Category.OTHERS;
            };
        } catch (Exception e) {
            System.err.println("✗ Error parsing Gemini response: " + e.getMessage());
            return Category.OTHERS;
        }
    }

    /**
     * Normalize merchant name for consistent cache lookups.
     * Removes UPI-/BBPS- prefixes and converts to uppercase.
     */
    private String normalizeMerchantName(String merchantName) {
        if (merchantName == null) return "UNKNOWN";
        
        String normalized = merchantName.toUpperCase().trim();
        
        // Remove common prefixes
        if (normalized.startsWith("UPI-")) {
            normalized = normalized.substring(4);
        } else if (normalized.startsWith("BBPS-")) {
            normalized = normalized.substring(5);
        }
        
        // Remove extra spaces
        normalized = normalized.replaceAll("\\s+", " ");
        
        return normalized;
    }

    /**
     * Check if Gemini service is enabled and configured.
     */
    public boolean isEnabled() {
        return enabled && apiKey != null && !apiKey.isBlank();
    }

    /**
     * Clear the category cache (useful for testing or refresh).
     */
    public void clearCache() {
        merchantCategoryCache.clear();
    }

    /**
     * Get cache size (useful for monitoring).
     */
    public int getCacheSize() {
        return merchantCategoryCache.size();
    }
}
