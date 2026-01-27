package com.piggy.backend.controller;

import com.piggy.backend.dto.TransactionDTO;
import com.piggy.backend.service.TransactionService;

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

    // MODIFY THIS: Parse SMS and save transaction
    @PostMapping("/parse")
    public TransactionDTO parseSms(
            @RequestBody Map<String, String> request,
            Authentication authentication) {
        String sms = request.get("sms");
        String username = authentication.getName(); // Extract username from JWT
        return service.parseAndSave(sms, username);
    }

    // ADD THIS: Get all transactions for logged-in user
    @GetMapping
    public List<TransactionDTO> getUserTransactions(Authentication authentication) {
        String username = authentication.getName(); // Extract username from JWT
        return service.getUserTransactions(username);
    }
}