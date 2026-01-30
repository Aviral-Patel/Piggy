package com.piggy.backend.entity;

import org.junit.jupiter.api.Test;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import static org.junit.jupiter.api.Assertions.*;

class TransactionTest {

    @Test
    void testTransactionCreation() {
        Transaction transaction = new Transaction();
        assertNotNull(transaction);
    }

    @Test
    void testSetAndGetId() {
        Transaction transaction = new Transaction();
        transaction.setId(1L);
        assertEquals(1L, transaction.getId());
    }

    @Test
    void testSetAndGetBankName() {
        Transaction transaction = new Transaction();
        transaction.setBankName("HDFC Bank");
        assertEquals("HDFC Bank", transaction.getBankName());
    }

    @Test
    void testSetAndGetBankAddress() {
        Transaction transaction = new Transaction();
        transaction.setBankAddress("HDFCBK");
        assertEquals("HDFCBK", transaction.getBankAddress());
    }

    @Test
    void testSetAndGetCategory() {
        Transaction transaction = new Transaction();
        transaction.setCategory(Category.FOOD);
        assertEquals(Category.FOOD, transaction.getCategory());
    }

    @Test
    void testSetAndGetAccountNumber() {
        Transaction transaction = new Transaction();
        transaction.setAccountNumber("XXXX1234");
        assertEquals("XXXX1234", transaction.getAccountNumber());
    }

    @Test
    void testSetAndGetMerchant() {
        Transaction transaction = new Transaction();
        transaction.setMerchant("Amazon");
        assertEquals("Amazon", transaction.getMerchant());
    }

    @Test
    void testSetAndGetType() {
        Transaction transaction = new Transaction();
        transaction.setType(TransactionType.DEBITED);
        assertEquals(TransactionType.DEBITED, transaction.getType());
    }

    @Test
    void testSetAndGetTypeCredited() {
        Transaction transaction = new Transaction();
        transaction.setType(TransactionType.CREDITED);
        assertEquals(TransactionType.CREDITED, transaction.getType());
    }

    @Test
    void testSetAndGetDate() {
        Transaction transaction = new Transaction();
        LocalDateTime now = LocalDateTime.now();
        transaction.setDate(now);
        assertEquals(now, transaction.getDate());
    }

    @Test
    void testSetAndGetAmount() {
        Transaction transaction = new Transaction();
        BigDecimal amount = new BigDecimal("1500.50");
        transaction.setAmount(amount);
        assertEquals(amount, transaction.getAmount());
    }

    @Test
    void testSetAndGetBalance() {
        Transaction transaction = new Transaction();
        BigDecimal balance = new BigDecimal("50000.00");
        transaction.setBalance(balance);
        assertEquals(balance, transaction.getBalance());
    }

    @Test
    void testSetAndGetRefNumber() {
        Transaction transaction = new Transaction();
        transaction.setRefNumber("REF123456");
        assertEquals("REF123456", transaction.getRefNumber());
    }

    @Test
    void testSetAndGetSmsMessage() {
        Transaction transaction = new Transaction();
        String sms = "Rs.500 debited from A/c XX1234";
        transaction.setSmsMessage(sms);
        assertEquals(sms, transaction.getSmsMessage());
    }

    @Test
    void testSetAndGetUser() {
        Transaction transaction = new Transaction();
        User user = new User();
        user.setId(1L);
        user.setUsername("testuser");
        transaction.setUser(user);
        assertEquals(user, transaction.getUser());
        assertEquals("testuser", transaction.getUser().getUsername());
    }

    @Test
    void testAllCategories() {
        Transaction transaction = new Transaction();
        
        for (Category category : Category.values()) {
            transaction.setCategory(category);
            assertEquals(category, transaction.getCategory());
        }
    }

    @Test
    void testAllTransactionTypes() {
        Transaction transaction = new Transaction();
        
        for (TransactionType type : TransactionType.values()) {
            transaction.setType(type);
            assertEquals(type, transaction.getType());
        }
    }
}
