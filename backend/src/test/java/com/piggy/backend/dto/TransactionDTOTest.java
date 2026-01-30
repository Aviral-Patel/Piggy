package com.piggy.backend.dto;

import com.piggy.backend.entity.Category;
import com.piggy.backend.entity.Transaction;
import com.piggy.backend.entity.TransactionType;
import org.junit.jupiter.api.Test;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import static org.junit.jupiter.api.Assertions.*;

class TransactionDTOTest {

    @Test
    void testTransactionDTODefaultConstructor() {
        TransactionDTO dto = new TransactionDTO();
        assertNotNull(dto);
    }

    @Test
    void testTransactionDTOParameterizedConstructor() {
        TransactionDTO dto = new TransactionDTO(TransactionType.DEBITED, new BigDecimal("500.00"), "Amazon");
        assertEquals(TransactionType.DEBITED, dto.getType());
        assertEquals(new BigDecimal("500.00"), dto.getAmount());
        assertEquals("Amazon", dto.getMerchant());
    }

    @Test
    void testTransactionDTOFromEntity() {
        Transaction transaction = new Transaction();
        transaction.setId(1L);
        transaction.setBankAddress("HDFCBK");
        transaction.setBankName("HDFC Bank");
        transaction.setCategory(Category.SHOPPING);
        transaction.setAccountNumber("XXXX1234");
        transaction.setMerchant("Flipkart");
        transaction.setType(TransactionType.DEBITED);
        transaction.setDate(LocalDateTime.of(2024, 1, 15, 10, 30));
        transaction.setAmount(new BigDecimal("1500.00"));
        transaction.setBalance(new BigDecimal("50000.00"));
        transaction.setRefNumber("REF123");
        transaction.setSmsMessage("Rs.1500 debited");

        TransactionDTO dto = new TransactionDTO(transaction);

        assertEquals(1L, dto.getId());
        assertEquals("HDFCBK", dto.getBankAddress());
        assertEquals("HDFC Bank", dto.getBankName());
        assertEquals(Category.SHOPPING, dto.getCategory());
        assertEquals("XXXX1234", dto.getAccountNumber());
        assertEquals("Flipkart", dto.getMerchant());
        assertEquals(TransactionType.DEBITED, dto.getType());
        assertEquals(LocalDateTime.of(2024, 1, 15, 10, 30), dto.getDate());
        assertEquals(new BigDecimal("1500.00"), dto.getAmount());
        assertEquals(new BigDecimal("50000.00"), dto.getBalance());
        assertEquals("REF123", dto.getRefNumber());
        assertEquals("Rs.1500 debited", dto.getSmsMessage());
    }

    @Test
    void testSetAndGetId() {
        TransactionDTO dto = new TransactionDTO();
        dto.setId(100L);
        assertEquals(100L, dto.getId());
    }

    @Test
    void testSetAndGetBankAddress() {
        TransactionDTO dto = new TransactionDTO();
        dto.setBankAddress("ICICIBK");
        assertEquals("ICICIBK", dto.getBankAddress());
    }

    @Test
    void testSetAndGetBankName() {
        TransactionDTO dto = new TransactionDTO();
        dto.setBankName("ICICI Bank");
        assertEquals("ICICI Bank", dto.getBankName());
    }

    @Test
    void testSetAndGetCategory() {
        TransactionDTO dto = new TransactionDTO();
        dto.setCategory(Category.FOOD);
        assertEquals(Category.FOOD, dto.getCategory());
    }

    @Test
    void testSetAndGetAccountNumber() {
        TransactionDTO dto = new TransactionDTO();
        dto.setAccountNumber("XXXX5678");
        assertEquals("XXXX5678", dto.getAccountNumber());
    }

    @Test
    void testSetAndGetMerchant() {
        TransactionDTO dto = new TransactionDTO();
        dto.setMerchant("Swiggy");
        assertEquals("Swiggy", dto.getMerchant());
    }

    @Test
    void testSetAndGetType() {
        TransactionDTO dto = new TransactionDTO();
        dto.setType(TransactionType.CREDITED);
        assertEquals(TransactionType.CREDITED, dto.getType());
    }

    @Test
    void testSetAndGetDate() {
        TransactionDTO dto = new TransactionDTO();
        LocalDateTime now = LocalDateTime.now();
        dto.setDate(now);
        assertEquals(now, dto.getDate());
    }

    @Test
    void testSetAndGetAmount() {
        TransactionDTO dto = new TransactionDTO();
        dto.setAmount(new BigDecimal("2500.50"));
        assertEquals(new BigDecimal("2500.50"), dto.getAmount());
    }

    @Test
    void testSetAndGetBalance() {
        TransactionDTO dto = new TransactionDTO();
        dto.setBalance(new BigDecimal("100000.00"));
        assertEquals(new BigDecimal("100000.00"), dto.getBalance());
    }

    @Test
    void testSetAndGetRefNumber() {
        TransactionDTO dto = new TransactionDTO();
        dto.setRefNumber("UPI123456789");
        assertEquals("UPI123456789", dto.getRefNumber());
    }

    @Test
    void testSetAndGetSmsMessage() {
        TransactionDTO dto = new TransactionDTO();
        dto.setSmsMessage("Your account has been credited with Rs.5000");
        assertEquals("Your account has been credited with Rs.5000", dto.getSmsMessage());
    }

    @Test
    void testTransactionDTOWithNullValues() {
        Transaction transaction = new Transaction();
        TransactionDTO dto = new TransactionDTO(transaction);
        
        assertNull(dto.getId());
        assertNull(dto.getBankAddress());
        assertNull(dto.getBankName());
        assertNull(dto.getCategory());
        assertNull(dto.getAccountNumber());
        assertNull(dto.getMerchant());
        assertNull(dto.getType());
        assertNull(dto.getDate());
        assertNull(dto.getAmount());
        assertNull(dto.getBalance());
        assertNull(dto.getRefNumber());
        assertNull(dto.getSmsMessage());
    }
}
