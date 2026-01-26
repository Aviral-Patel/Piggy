package com.piggy.backend.dto;

import com.piggy.backend.entity.Transaction;

public class TransactionDTO {
    private Long id;
    private String type;
    private double amount;
    private String merchant;
    private String category;  // ADD THIS
    private String date;      // ADD THIS
    private String bank;      // ADD THIS

    // Constructor for new transactions (from parsing)
    public TransactionDTO(String type, double amount, String merchant) {
        this.type = type;
        this.amount = amount;
        this.merchant = merchant;
    }

    // ADD THIS: Constructor from existing transaction entity
    public TransactionDTO(Transaction transaction) {
        this.id = transaction.getId();
        this.type = transaction.getType();
        this.amount = transaction.getAmount();
        this.merchant = transaction.getMerchant();
        // Add these once you add category/date/bank fields to Transaction entity
        // this.category = transaction.getCategory();
        // this.date = transaction.getDate();
        // this.bank = transaction.getBank();
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public double getAmount() { return amount; }
    public void setAmount(double amount) { this.amount = amount; }

    public String getMerchant() { return merchant; }
    public void setMerchant(String merchant) { this.merchant = merchant; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getDate() { return date; }
    public void setDate(String date) { this.date = date; }

    public String getBank() { return bank; }
    public void setBank(String bank) { this.bank = bank; }
}