package com.piggy.backend.service;

import com.piggy.backend.dto.TransactionDTO;
import com.piggy.backend.entity.*;
import com.piggy.backend.exception.BadRequestException;
import com.piggy.backend.exception.ResourceNotFoundException;
import com.piggy.backend.repository.TransactionRepository;
import com.piggy.backend.repository.UserRepository;
import com.piggy.backend.util.SmsRegexParser;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class TransactionServiceTest {

    @Mock
    private TransactionRepository transactionRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private SmsRegexParser smsRegexParser;

    @Mock
    private UnparsedMessageService unparsedMessageService;

    @InjectMocks
    private TransactionService transactionService;

    private User testUser;
    private Transaction testTransaction;

    @BeforeEach
    void setUp() {
        testUser = new User();
        testUser.setId(1L);
        testUser.setUsername("testuser");
        testUser.setPassword("password");
        testUser.setRole(Role.USER);

        testTransaction = new Transaction();
        testTransaction.setId(1L);
        testTransaction.setBankAddress("HDFCBK");
        testTransaction.setBankName("HDFC Bank");
        testTransaction.setCategory(Category.SHOPPING);
        testTransaction.setAccountNumber("XXXX1234");
        testTransaction.setMerchant("Amazon");
        testTransaction.setType(TransactionType.DEBITED);
        testTransaction.setDate(LocalDateTime.now());
        testTransaction.setAmount(new BigDecimal("1500.00"));
        testTransaction.setBalance(new BigDecimal("50000.00"));
        testTransaction.setUser(testUser);
    }

    @Test
    void testParseAndSaveSuccess() {
        String sms = "Rs.1500 debited from A/c XX1234 on 15-Jan-24";
        String bankAddress = "HDFCBK";

        when(userRepository.findByUsername("testuser")).thenReturn(Optional.of(testUser));
        when(smsRegexParser.parse(sms, bankAddress)).thenReturn(testTransaction);
        when(transactionRepository.save(any(Transaction.class))).thenReturn(testTransaction);

        TransactionDTO result = transactionService.parseAndSave(sms, bankAddress, "testuser");

        assertNotNull(result);
        assertEquals("HDFC Bank", result.getBankName());
        assertEquals(TransactionType.DEBITED, result.getType());
        verify(transactionRepository).save(any(Transaction.class));
    }

    @Test
    void testParseAndSaveNullSms() {
        assertThrows(BadRequestException.class, () -> 
            transactionService.parseAndSave(null, "HDFCBK", "testuser"));
    }

    @Test
    void testParseAndSaveEmptySms() {
        assertThrows(BadRequestException.class, () -> 
            transactionService.parseAndSave("   ", "HDFCBK", "testuser"));
    }

    @Test
    void testParseAndSaveNullBankAddress() {
        assertThrows(BadRequestException.class, () -> 
            transactionService.parseAndSave("Rs.1500 debited", null, "testuser"));
    }

    @Test
    void testParseAndSaveEmptyBankAddress() {
        assertThrows(BadRequestException.class, () -> 
            transactionService.parseAndSave("Rs.1500 debited", "   ", "testuser"));
    }

    @Test
    void testParseAndSaveUserNotFound() {
        when(userRepository.findByUsername("nonexistent")).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> 
            transactionService.parseAndSave("Rs.1500 debited", "HDFCBK", "nonexistent"));
    }

    @Test
    void testParseAndSaveParsingFailed() {
        String sms = "Invalid SMS message";
        String bankAddress = "HDFCBK";

        when(userRepository.findByUsername("testuser")).thenReturn(Optional.of(testUser));
        when(smsRegexParser.parse(sms, bankAddress)).thenReturn(null);

        assertThrows(BadRequestException.class, () -> 
            transactionService.parseAndSave(sms, bankAddress, "testuser"));
    }

    @Test
    void testGetUserTransactionsSuccess() {
        Transaction transaction2 = new Transaction();
        transaction2.setId(2L);
        transaction2.setBankName("ICICI Bank");
        transaction2.setType(TransactionType.CREDITED);
        transaction2.setAmount(new BigDecimal("5000.00"));
        transaction2.setUser(testUser);

        List<Transaction> transactions = Arrays.asList(testTransaction, transaction2);

        when(userRepository.findByUsername("testuser")).thenReturn(Optional.of(testUser));
        when(transactionRepository.findByUser(testUser)).thenReturn(transactions);

        List<TransactionDTO> result = transactionService.getUserTransactions("testuser");

        assertNotNull(result);
        assertEquals(2, result.size());
    }

    @Test
    void testGetUserTransactionsEmpty() {
        when(userRepository.findByUsername("testuser")).thenReturn(Optional.of(testUser));
        when(transactionRepository.findByUser(testUser)).thenReturn(Collections.emptyList());

        List<TransactionDTO> result = transactionService.getUserTransactions("testuser");

        assertNotNull(result);
        assertTrue(result.isEmpty());
    }

    @Test
    void testGetUserTransactionsUserNotFound() {
        when(userRepository.findByUsername("nonexistent")).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> 
            transactionService.getUserTransactions("nonexistent"));
    }
}
