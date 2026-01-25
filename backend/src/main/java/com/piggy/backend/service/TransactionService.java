package com.piggy.backend.service;

import com.piggy.backend.dto.TransactionDTO;
import com.piggy.backend.entity.Transaction;
import com.piggy.backend.repository.TransactionRepository;
import com.piggy.backend.util.SmsRegexParser;

import org.springframework.stereotype.Service;

@Service
public class TransactionService {

    private final TransactionRepository repository;

    public TransactionService(
            TransactionRepository repository) {
        this.repository = repository;
    }

    public TransactionDTO parseAndSave(String sms) {
        Transaction transaction =
                SmsRegexParser.parse(sms);
        repository.save(transaction);

        return new TransactionDTO(
                transaction.getType(),
                transaction.getAmount(),
                transaction.getMerchant());
    }
}
