package com.piggy.backend.dto;

import com.piggy.backend.entity.Pattern;
import com.piggy.backend.entity.PatternStatus;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class PatternDTOTest {

    @Test
    void testPatternDTODefaultConstructor() {
        PatternDTO dto = new PatternDTO();
        assertNotNull(dto);
    }

    @Test
    void testPatternDTOFromEntity() {
        Pattern pattern = new Pattern();
        pattern.setId(1L);
        pattern.setBankAddress("HDFCBK");
        pattern.setBankName("HDFC Bank");
        pattern.setMerchantName("Amazon");
        pattern.setType("DEBIT");
        pattern.setRegexPattern("Rs\\.(?<amount>[\\d,]+).*debited");
        pattern.setMessage("Rs.500 debited from A/c XX1234");
        // Category removed - now auto-detected via Gemini API
        pattern.setStatus(PatternStatus.APPROVED);

        PatternDTO dto = new PatternDTO(pattern);

        assertEquals(1L, dto.getId());
        assertEquals("HDFCBK", dto.getBankAddress());
        assertEquals("HDFC Bank", dto.getBankName());
        assertEquals("Amazon", dto.getMerchantName());
        assertEquals("DEBIT", dto.getType());
        assertEquals("Rs\\.(?<amount>[\\d,]+).*debited", dto.getRegexPattern());
        assertEquals("Rs.500 debited from A/c XX1234", dto.getMessage());
        assertEquals(PatternStatus.APPROVED, dto.getStatus());
    }

    @Test
    void testSetAndGetId() {
        PatternDTO dto = new PatternDTO();
        dto.setId(100L);
        assertEquals(100L, dto.getId());
    }

    @Test
    void testSetAndGetBankAddress() {
        PatternDTO dto = new PatternDTO();
        dto.setBankAddress("ICICIBK");
        assertEquals("ICICIBK", dto.getBankAddress());
    }

    @Test
    void testSetAndGetBankName() {
        PatternDTO dto = new PatternDTO();
        dto.setBankName("ICICI Bank");
        assertEquals("ICICI Bank", dto.getBankName());
    }

    @Test
    void testSetAndGetMerchantName() {
        PatternDTO dto = new PatternDTO();
        dto.setMerchantName("Flipkart");
        assertEquals("Flipkart", dto.getMerchantName());
    }

    @Test
    void testSetAndGetType() {
        PatternDTO dto = new PatternDTO();
        dto.setType("CREDIT");
        assertEquals("CREDIT", dto.getType());
    }

    @Test
    void testSetAndGetRegexPattern() {
        PatternDTO dto = new PatternDTO();
        String regex = "(?<amount>[\\d,]+\\.?\\d*).*credited";
        dto.setRegexPattern(regex);
        assertEquals(regex, dto.getRegexPattern());
    }

    @Test
    void testSetAndGetMessage() {
        PatternDTO dto = new PatternDTO();
        dto.setMessage("Rs.1000 credited to your account");
        assertEquals("Rs.1000 credited to your account", dto.getMessage());
    }

    // Category removed from PatternDTO - now auto-detected via Gemini API

    @Test
    void testSetAndGetStatus() {
        PatternDTO dto = new PatternDTO();
        dto.setStatus(PatternStatus.PENDING);
        assertEquals(PatternStatus.PENDING, dto.getStatus());
    }

    @Test
    void testPatternDTOWithNullValues() {
        Pattern pattern = new Pattern();
        PatternDTO dto = new PatternDTO(pattern);
        
        assertNull(dto.getId());
        assertNull(dto.getBankAddress());
        assertNull(dto.getBankName());
        assertNull(dto.getMerchantName());
        assertNull(dto.getType());
        assertNull(dto.getRegexPattern());
        assertNull(dto.getMessage());
        // Category removed - now auto-detected via Gemini API
        assertNull(dto.getStatus());
    }

    // Category tests removed - category is now auto-detected via Gemini API

    @Test
    void testAllStatuses() {
        PatternDTO dto = new PatternDTO();
        for (PatternStatus status : PatternStatus.values()) {
            dto.setStatus(status);
            assertEquals(status, dto.getStatus());
        }
    }
}
