package com.piggy.backend.controller;

import com.piggy.backend.dto.TransactionDTO;
import com.piggy.backend.service.TransactionService;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    private final TransactionService service;

    public TransactionController(TransactionService service) {
        this.service = service;
    }

    @PostMapping("/parse")
    public TransactionDTO parseSms(
            @RequestBody String sms) {
        return service.parseAndSave(sms);
    }
    @GetMapping("/parse")
    public String hello() {
        return "hello";
    }
}
