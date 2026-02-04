package com.piggy.backend.entity;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class PatternTest {

    @Test
    void testPatternCreation() {
        Pattern pattern = new Pattern();
        assertNotNull(pattern);
    }

    @Test
    void testSetAndGetId() {
        Pattern pattern = new Pattern();
        pattern.setId(1L);
        assertEquals(1L, pattern.getId());
    }

    @Test
    void testSetAndGetBankAddress() {
        Pattern pattern = new Pattern();
        pattern.setBankAddress("HDFCBK");
        assertEquals("HDFCBK", pattern.getBankAddress());
    }

    @Test
    void testSetAndGetBankName() {
        Pattern pattern = new Pattern();
        pattern.setBankName("HDFC Bank");
        assertEquals("HDFC Bank", pattern.getBankName());
    }

    @Test
    void testSetAndGetMerchantName() {
        Pattern pattern = new Pattern();
        pattern.setMerchantName("Amazon");
        assertEquals("Amazon", pattern.getMerchantName());
    }

    @Test
    void testSetAndGetType() {
        Pattern pattern = new Pattern();
        pattern.setType("DEBIT");
        assertEquals("DEBIT", pattern.getType());
    }

    @Test
    void testSetAndGetRegexPattern() {
        Pattern pattern = new Pattern();
        String regex = "Rs\\.(?<amount>[\\d,]+\\.?\\d*).*debited";
        pattern.setRegexPattern(regex);
        assertEquals(regex, pattern.getRegexPattern());
    }

    @Test
    void testSetAndGetMessage() {
        Pattern pattern = new Pattern();
        String message = "Rs.500 debited from A/c XX1234";
        pattern.setMessage(message);
        assertEquals(message, pattern.getMessage());
    }

    // Category removed from Pattern - now auto-detected via Gemini API

    @Test
    void testSetAndGetStatus() {
        Pattern pattern = new Pattern();
        pattern.setStatus(PatternStatus.APPROVED);
        assertEquals(PatternStatus.APPROVED, pattern.getStatus());
    }

    @Test
    void testAllPatternStatuses() {
        Pattern pattern = new Pattern();
        
        for (PatternStatus status : PatternStatus.values()) {
            pattern.setStatus(status);
            assertEquals(status, pattern.getStatus());
        }
    }

    // Category test removed - category is now auto-detected via Gemini API
}
