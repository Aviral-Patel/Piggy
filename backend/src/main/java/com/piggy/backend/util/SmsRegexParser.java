package com.piggy.backend.util;

import com.piggy.backend.entity.Pattern;
import com.piggy.backend.entity.Transaction;
import com.piggy.backend.service.PatternService;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeFormatterBuilder;
import java.util.List;
import java.util.regex.Matcher;

@Component
public class SmsRegexParser {

    private static final DateTimeFormatter[] DATE_FORMATTERS = {
        DateTimeFormatter.ofPattern("d-MMM-yy"),
        DateTimeFormatter.ofPattern("dd-MMM-yy"),
        DateTimeFormatter.ofPattern("dd/MM/yy"),
        DateTimeFormatter.ofPattern("yyyy-MM-dd"),
        DateTimeFormatter.ofPattern("d-MMM-yyyy"),
        DateTimeFormatter.ofPattern("dd-MMM-yyyy"),
        new DateTimeFormatterBuilder().parseCaseInsensitive().appendPattern("dMMMyy").toFormatter(),
        new DateTimeFormatterBuilder().parseCaseInsensitive().appendPattern("ddMMMyy").toFormatter()
    };

    private final PatternService patternService;

    public SmsRegexParser(PatternService patternService) {
        this.patternService = patternService;
    }

    public Transaction parse(String sms, String bankAddress) {
        List<Pattern> approvedPatterns = patternService.getApprovedPatternsByBankAddress(bankAddress);

        if (approvedPatterns.isEmpty()) {
            throw new RuntimeException("No approved patterns found for bank address: " + bankAddress);
        }

        for (Pattern pattern : approvedPatterns) {
            java.util.regex.Pattern regex = java.util.regex.Pattern.compile(
                    pattern.getRegexPattern(),
                    java.util.regex.Pattern.CASE_INSENSITIVE
            );
            Matcher matcher = regex.matcher(sms);

            if (matcher.find()) {
                return buildTransaction(matcher, pattern, bankAddress);
            }
        }

        throw new RuntimeException("No matching pattern found for SMS from bank address: " + bankAddress);
    }

    /**
     * Set pattern fields from Pattern entity only (never from regex).
     * Fill only extracted fields from matcher; do not override anything that comes from the pattern.
     */
    private Transaction buildTransaction(Matcher matcher, Pattern pattern, String bankAddress) {
        Transaction transaction = new Transaction();

        // —— From Pattern entity only (never overridden by regex) ——
        transaction.setBankAddress(pattern.getBankAddress());
        transaction.setBankName(pattern.getBankName());
        transaction.setMerchantType(pattern.getMerchantType());
        transaction.setCategory(pattern.getCategory());

        // —— From regex extraction only (fields not in pattern entity) ——
        try {
            transaction.setAccountNumber(matcher.group("accountNumber"));
        } catch (Exception e) { /* skip */ }

        try {
            String type = matcher.group("type");
            transaction.setType(normalizeType(type));
        } catch (Exception e) {
            transaction.setType("DEBITED");
        }

        try {
            String amountStr = matcher.group("amount");
            if (amountStr == null || amountStr.isBlank()) {
                throw new IllegalArgumentException("Amount group is empty");
            }
            amountStr = amountStr.replace(",", "").trim();
            transaction.setAmount(new BigDecimal(amountStr));
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Failed to extract amount from SMS: " + e.getMessage(), e);
        } catch (Exception e) {
            throw new RuntimeException("Amount group missing or invalid in pattern (expected named group 'amount')", e);
        }

        try {
            String merchant = matcher.group("merchant");
            transaction.setMerchant(merchant != null ? merchant.trim() : "Unknown");
        } catch (Exception e) {
            transaction.setMerchant("Unknown");
        }

        try {
            String dateStr = matcher.group("date");
            if (dateStr != null && !dateStr.isBlank()) {
                transaction.setDate(parseDate(dateStr.trim()).atStartOfDay());
            } else {
                transaction.setDate(LocalDateTime.now());
            }
        } catch (Exception e) {
            transaction.setDate(LocalDateTime.now());
        }

        try {
            String balanceStr = matcher.group("balance");
            if (balanceStr != null && !balanceStr.isBlank()) {
                balanceStr = balanceStr.replace(",", "").trim();
                transaction.setBalance(new BigDecimal(balanceStr));
            }
        } catch (Exception e) { /* skip */ }

        try {
            String refNumber = matcher.group("refNumber");
            if (refNumber != null && !refNumber.isBlank()) {
                transaction.setRefNumber(refNumber.trim());
            }
        } catch (Exception e) { /* skip */ }

        return transaction;
    }

    private static String normalizeType(String type) {
        if (type == null || type.isBlank()) return "DEBITED";
        String u = type.toUpperCase();
        if (u.contains("CREDIT") || "CREDITED".equals(u)) return "CREDITED";
        if (u.contains("SPENT") || u.contains("DEBIT") || "DEBITED".equals(u)) return "DEBITED";
        return u;
    }

    private static LocalDate parseDate(String dateStr) {
        for (DateTimeFormatter formatter : DATE_FORMATTERS) {
            try {
                return LocalDate.parse(dateStr, formatter);
            } catch (Exception ignored) {
            }
        }
        throw new IllegalArgumentException("Unsupported date format: " + dateStr);
    }
}
