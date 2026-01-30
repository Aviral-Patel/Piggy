package com.piggy.backend.controller;

import com.piggy.backend.dto.TransactionDTO;
import com.piggy.backend.service.TransactionService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    private final TransactionService service;

    public TransactionController(TransactionService service) {
        this.service = service;
    }

    // Parse SMS and save transaction with bank address
    @PostMapping("/parse")
    public ResponseEntity<TransactionDTO> parseSms(
            @RequestBody Map<String, String> request,
            Authentication authentication) {
        String sms = request.get("sms");
        String bankAddress = request.get("bankAddress");
        String username = authentication.getName(); // Extract username from JWT
        
        TransactionDTO transaction = service.parseAndSave(sms, bankAddress, username);
        return ResponseEntity.status(HttpStatus.CREATED).body(transaction);
    }

    // ADD THIS: Get all transactions for logged-in user
    @GetMapping
    public ResponseEntity<List<TransactionDTO>> getUserTransactions(Authentication authentication) {
        String username = authentication.getName(); // Extract username from JWT
        List<TransactionDTO> transactions = service.getUserTransactions(username);
        return ResponseEntity.ok(transactions);
    }
}