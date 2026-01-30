package com.piggy.backend.util;

import com.piggy.backend.entity.*;
import com.piggy.backend.service.PatternService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class SmsRegexParserTest {

    @Mock
    private PatternService patternService;

    private SmsRegexParser smsRegexParser;

    @BeforeEach
    void setUp() {
        smsRegexParser = new SmsRegexParser(patternService);
    }

    @Test
    void testParseWithNoApprovedPatterns() {
        when(patternService.getApprovedPatternsByBankAddress("HDFCBK"))
            .thenReturn(Collections.emptyList());

        Transaction result = smsRegexParser.parse("Rs.500 debited", "HDFCBK");

        assertNull(result);
    }

    @Test
    void testParseWithMatchingPattern() {
        Pattern pattern = new Pattern();
        pattern.setId(1L);
        pattern.setBankAddress("HDFCBK");
        pattern.setBankName("HDFC Bank");
        pattern.setCategory(Category.SHOPPING);
        pattern.setRegexPattern("Rs\\.(?<amount>[\\d,]+\\.?\\d*).*debited.*A/c.*(?<accountNumber>XX\\d+)");
        pattern.setStatus(PatternStatus.APPROVED);

        when(patternService.getApprovedPatternsByBankAddress("HDFCBK"))
            .thenReturn(Arrays.asList(pattern));

        Transaction result = smsRegexParser.parse("Rs.500 debited from A/c XX1234", "HDFCBK");

        assertNotNull(result);
        assertEquals("HDFC Bank", result.getBankName());
        assertEquals("HDFCBK", result.getBankAddress());
        assertEquals(Category.SHOPPING, result.getCategory());
    }

    @Test
    void testParseWithNoMatchingPattern() {
        Pattern pattern = new Pattern();
        pattern.setId(1L);
        pattern.setBankAddress("HDFCBK");
        pattern.setBankName("HDFC Bank");
        pattern.setRegexPattern("completely different pattern that wont match");
        pattern.setStatus(PatternStatus.APPROVED);

        when(patternService.getApprovedPatternsByBankAddress("HDFCBK"))
            .thenReturn(Arrays.asList(pattern));

        Transaction result = smsRegexParser.parse("Rs.500 debited from A/c XX1234", "HDFCBK");

        assertNull(result);
    }

    @Test
    void testParseDebitedTransaction() {
        Pattern pattern = new Pattern();
        pattern.setBankAddress("HDFCBK");
        pattern.setBankName("HDFC Bank");
        pattern.setCategory(Category.SHOPPING);
        pattern.setRegexPattern("Rs\\.(?<amount>[\\d,]+\\.?\\d*).*(?<type>debited)");
        pattern.setStatus(PatternStatus.APPROVED);

        when(patternService.getApprovedPatternsByBankAddress("HDFCBK"))
            .thenReturn(Arrays.asList(pattern));

        Transaction result = smsRegexParser.parse("Rs.1500.50 debited from your account", "HDFCBK");

        assertNotNull(result);
        assertEquals(TransactionType.DEBITED, result.getType());
    }

    @Test
    void testParseCreditedTransaction() {
        Pattern pattern = new Pattern();
        pattern.setBankAddress("HDFCBK");
        pattern.setBankName("HDFC Bank");
        pattern.setCategory(Category.OTHERS);
        pattern.setRegexPattern("Rs\\.(?<amount>[\\d,]+\\.?\\d*).*(?<type>credited)");
        pattern.setStatus(PatternStatus.APPROVED);

        when(patternService.getApprovedPatternsByBankAddress("HDFCBK"))
            .thenReturn(Arrays.asList(pattern));

        Transaction result = smsRegexParser.parse("Rs.5000 credited to your account", "HDFCBK");

        assertNotNull(result);
        assertEquals(TransactionType.CREDITED, result.getType());
    }

    @Test
    void testParseWithAmountContainingCommas() {
        Pattern pattern = new Pattern();
        pattern.setBankAddress("HDFCBK");
        pattern.setBankName("HDFC Bank");
        pattern.setCategory(Category.SHOPPING);
        pattern.setRegexPattern("Rs\\.(?<amount>[\\d,]+\\.?\\d*).*debited");
        pattern.setStatus(PatternStatus.APPROVED);

        when(patternService.getApprovedPatternsByBankAddress("HDFCBK"))
            .thenReturn(Arrays.asList(pattern));

        Transaction result = smsRegexParser.parse("Rs.1,50,000.50 debited from your account", "HDFCBK");

        assertNotNull(result);
        assertNotNull(result.getAmount());
    }

    @Test
    void testParseAlertMessage() {
        Pattern pattern = new Pattern();
        pattern.setBankAddress("HDFCBK");
        pattern.setBankName("HDFC Bank");
        pattern.setCategory(Category.OTHERS);
        pattern.setRegexPattern("(?<type>Alert).*statement.*ready");
        pattern.setStatus(PatternStatus.APPROVED);

        when(patternService.getApprovedPatternsByBankAddress("HDFCBK"))
            .thenReturn(Arrays.asList(pattern));

        Transaction result = smsRegexParser.parse("Alert: Your statement is ready", "HDFCBK");

        assertNotNull(result);
        assertEquals(TransactionType.ALERT, result.getType());
    }

    @Test
    void testParseReminderMessage() {
        Pattern pattern = new Pattern();
        pattern.setBankAddress("HDFCBK");
        pattern.setBankName("HDFC Bank");
        pattern.setCategory(Category.OTHERS);
        pattern.setRegexPattern("(?<type>Reminder).*payment.*due");
        pattern.setStatus(PatternStatus.APPROVED);

        when(patternService.getApprovedPatternsByBankAddress("HDFCBK"))
            .thenReturn(Arrays.asList(pattern));

        Transaction result = smsRegexParser.parse("Reminder: Your payment is due tomorrow", "HDFCBK");

        assertNotNull(result);
        assertEquals(TransactionType.REMINDER, result.getType());
    }

    @Test
    void testParseWithMerchant() {
        Pattern pattern = new Pattern();
        pattern.setBankAddress("HDFCBK");
        pattern.setBankName("HDFC Bank");
        pattern.setCategory(Category.SHOPPING);
        pattern.setRegexPattern("Rs\\.(?<amount>[\\d,]+).*debited.*at\\s+(?<merchant>[\\w\\s]+)");
        pattern.setStatus(PatternStatus.APPROVED);

        when(patternService.getApprovedPatternsByBankAddress("HDFCBK"))
            .thenReturn(Arrays.asList(pattern));

        Transaction result = smsRegexParser.parse("Rs.500 debited at Amazon Store", "HDFCBK");

        assertNotNull(result);
        assertEquals("Amazon Store", result.getMerchant().trim());
    }

    @Test
    void testParseWithDate() {
        Pattern pattern = new Pattern();
        pattern.setBankAddress("HDFCBK");
        pattern.setBankName("HDFC Bank");
        pattern.setCategory(Category.SHOPPING);
        pattern.setRegexPattern("Rs\\.(?<amount>[\\d,]+).*debited.*on\\s+(?<date>\\d{2}-\\w{3}-\\d{2})");
        pattern.setStatus(PatternStatus.APPROVED);

        when(patternService.getApprovedPatternsByBankAddress("HDFCBK"))
            .thenReturn(Arrays.asList(pattern));

        Transaction result = smsRegexParser.parse("Rs.500 debited on 15-Jan-24", "HDFCBK");

        assertNotNull(result);
        assertNotNull(result.getDate());
    }

    @Test
    void testParseWithBalance() {
        Pattern pattern = new Pattern();
        pattern.setBankAddress("HDFCBK");
        pattern.setBankName("HDFC Bank");
        pattern.setCategory(Category.SHOPPING);
        pattern.setRegexPattern("Rs\\.(?<amount>[\\d,]+).*debited.*Avl Bal Rs\\.(?<balance>[\\d,]+)");
        pattern.setStatus(PatternStatus.APPROVED);

        when(patternService.getApprovedPatternsByBankAddress("HDFCBK"))
            .thenReturn(Arrays.asList(pattern));

        Transaction result = smsRegexParser.parse("Rs.500 debited. Avl Bal Rs.50000", "HDFCBK");

        assertNotNull(result);
        assertNotNull(result.getBalance());
    }

    @Test
    void testParseWithRefNumber() {
        Pattern pattern = new Pattern();
        pattern.setBankAddress("HDFCBK");
        pattern.setBankName("HDFC Bank");
        pattern.setCategory(Category.SHOPPING);
        pattern.setRegexPattern("Rs\\.(?<amount>[\\d,]+).*debited.*Ref No\\.\\s*(?<refNumber>\\w+)");
        pattern.setStatus(PatternStatus.APPROVED);

        when(patternService.getApprovedPatternsByBankAddress("HDFCBK"))
            .thenReturn(Arrays.asList(pattern));

        Transaction result = smsRegexParser.parse("Rs.500 debited. Ref No. ABC123456", "HDFCBK");

        assertNotNull(result);
        assertEquals("ABC123456", result.getRefNumber());
    }

    @Test
    void testParseCaseInsensitive() {
        Pattern pattern = new Pattern();
        pattern.setBankAddress("HDFCBK");
        pattern.setBankName("HDFC Bank");
        pattern.setCategory(Category.SHOPPING);
        pattern.setRegexPattern("Rs\\.(?<amount>[\\d,]+).*DEBITED");
        pattern.setStatus(PatternStatus.APPROVED);

        when(patternService.getApprovedPatternsByBankAddress("HDFCBK"))
            .thenReturn(Arrays.asList(pattern));

        // Test with lowercase "debited"
        Transaction result = smsRegexParser.parse("Rs.500 debited from account", "HDFCBK");

        assertNotNull(result);
    }

    @Test
    void testParseMultiplePatternsFirstMatch() {
        Pattern pattern1 = new Pattern();
        pattern1.setBankAddress("HDFCBK");
        pattern1.setBankName("HDFC Bank");
        pattern1.setCategory(Category.SHOPPING);
        pattern1.setRegexPattern("Rs\\.(?<amount>[\\d,]+).*debited");
        pattern1.setStatus(PatternStatus.APPROVED);

        Pattern pattern2 = new Pattern();
        pattern2.setBankAddress("HDFCBK");
        pattern2.setBankName("HDFC Bank");
        pattern2.setCategory(Category.FOOD);
        pattern2.setRegexPattern("INR\\s+(?<amount>[\\d,]+).*spent");
        pattern2.setStatus(PatternStatus.APPROVED);

        when(patternService.getApprovedPatternsByBankAddress("HDFCBK"))
            .thenReturn(Arrays.asList(pattern1, pattern2));

        Transaction result = smsRegexParser.parse("Rs.500 debited from account", "HDFCBK");

        assertNotNull(result);
        assertEquals(Category.SHOPPING, result.getCategory());
    }
}
