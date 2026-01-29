package com.piggy.backend.service;

import com.piggy.backend.dto.TransactionDTO;
import com.piggy.backend.entity.Transaction;
import com.piggy.backend.entity.User;
import com.piggy.backend.exception.BadRequestException;
import com.piggy.backend.exception.ResourceNotFoundException;
import com.piggy.backend.repository.TransactionRepository;
import com.piggy.backend.repository.UserRepository;
import com.piggy.backend.util.SmsRegexParser;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TransactionService {

    private final TransactionRepository repository;
    private final UserRepository userRepository;
    private final SmsRegexParser smsRegexParser;

    public TransactionService(
            TransactionRepository repository,
            UserRepository userRepository,
            SmsRegexParser smsRegexParser) {
        this.repository = repository;
        this.userRepository = userRepository;
        this.smsRegexParser = smsRegexParser;
    }

    // Parse SMS and save transaction for a specific user with bank address
    public TransactionDTO parseAndSave(String sms, String bankAddress, String username) {
        // Validate inputs
        if (sms == null || sms.trim().isEmpty()) {
            throw new BadRequestException("SMS message is required");
        }
        if (bankAddress == null || bankAddress.trim().isEmpty()) {
            throw new BadRequestException("Bank address is required");
        }

        // Find the user
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        // Parse the SMS with bank address
        Transaction transaction = smsRegexParser.parse(sms, bankAddress);
        if (transaction == null) {
            throw new BadRequestException("Unable to parse SMS message. Please check the format and bank address");
        }
        
        transaction.setSmsMessage(sms);

        // Associate with user
        transaction.setUser(user);

        // Save to database
        repository.save(transaction);

        return new TransactionDTO(transaction);
    }

    // ADD THIS: Get all transactions for a specific user
    public List<TransactionDTO> getUserTransactions(String username) {
        // Find the user
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        // Get all transactions for this user
        List<Transaction> transactions = repository.findByUser(user);
        
        // Convert to DTOs
        return transactions.stream()
                .map(TransactionDTO::new)
                .collect(Collectors.toList());
    }
}