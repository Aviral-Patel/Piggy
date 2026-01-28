package com.piggy.backend.util;

import com.piggy.backend.entity.Pattern;
import com.piggy.backend.entity.Transaction;
import com.piggy.backend.service.PatternService;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.regex.Matcher;

@Component
public class SmsRegexParser {

    private final PatternService patternService;

    public SmsRegexParser(PatternService patternService) {
        this.patternService = patternService;
    }

    public Transaction parse(String sms) {
        List<Pattern> approvedPatterns = patternService.getApprovedPatterns();
        for (Pattern pattern : approvedPatterns) {
            java.util.regex.Pattern regex = java.util.regex.Pattern.compile(
                    pattern.getRegexPattern(),
                    java.util.regex.Pattern.CASE_INSENSITIVE
            );
            Matcher matcher = regex.matcher(sms);

            if (matcher.find()) {

                return buildTransaction(matcher, pattern.getMessage());
            }
        }

        throw new RuntimeException("No matching pattern found for SMS");
    }

    private Transaction buildTransaction(Matcher matcher, String message) {
        Transaction transaction = new Transaction();
        
        // Try to get type, default to "DEBITED" if not found
        try {
            transaction.setType(matcher.group("type").toUpperCase());
        } catch (Exception e) {
            transaction.setType("DEBITED"); // Default type
        }

        String amountStr = matcher.group("amount").replace(",", "");
        transaction.setAmount(new BigDecimal(amountStr));

        try { transaction.setMerchant(matcher.group("merchant")); }
        catch (Exception e) { transaction.setMerchant("Unknown"); }

        try { transaction.setAccountNumber(matcher.group("accountNumber")); }
        catch (Exception e) { /* skip */ }

        try { transaction.setBankName(matcher.group("bankName")); }
        catch (Exception e) { transaction.setBankName(message); }

        transaction.setDate(LocalDateTime.now());

        return transaction;
    }
}