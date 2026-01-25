package com.piggy.backend.util;

import com.piggy.backend.entity.Transaction;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class SmsRegexParser {

    private static final Pattern PATTERN =
            Pattern.compile(
                    "(credited|debited).*?Rs\\.?\\s?(\\d+).*?at\\s(\\w+)",
                    Pattern.CASE_INSENSITIVE
            );

    public static Transaction parse(String sms) {
        Matcher matcher = PATTERN.matcher(sms);

        if (!matcher.find()) {
            throw new RuntimeException("Invalid SMS format");
        }

        Transaction transaction = new Transaction();
        transaction.setType(matcher.group(1));
        transaction.setAmount(
                Double.parseDouble(matcher.group(2)));
        transaction.setMerchant(matcher.group(3));

        return transaction;
    }
}
