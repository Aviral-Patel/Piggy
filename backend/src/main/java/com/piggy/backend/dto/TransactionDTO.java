package com.piggy.backend.dto;

import com.piggy.backend.entity.Transaction;
import java.math.BigDecimal;
import java.time.LocalDateTime;

public class TransactionDTO {
    private Long id;
    private String accountNumber;
    private String bankName;
    private String merchant;
    private String type;
    private LocalDateTime date;
    private BigDecimal amount;

    // Default constructor
    public TransactionDTO() {}

    // Constructor for new transactions (from parsing)
    public TransactionDTO(String type, BigDecimal amount, String merchant) {
        this.type = type;
        this.amount = amount;
        this.merchant = merchant;
    }

    // Constructor from existing transaction entity
    public TransactionDTO(Transaction transaction) {
        this.id = transaction.getId();
        this.accountNumber = transaction.getAccountNumber();
        this.bankName = transaction.getBankName();
        this.merchant = transaction.getMerchant();
        this.type = transaction.getType();
        this.date = transaction.getDate();
        this.amount = transaction.getAmount();
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getAccountNumber() { return accountNumber; }
    public void setAccountNumber(String accountNumber) { this.accountNumber = accountNumber; }

    public String getBankName() { return bankName; }
    public void setBankName(String bankName) { this.bankName = bankName; }

    public String getMerchant() { return merchant; }
    public void setMerchant(String merchant) { this.merchant = merchant; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public LocalDateTime getDate() { return date; }
    public void setDate(LocalDateTime date) { this.date = date; }

    public BigDecimal getAmount() { return amount; }
    public void setAmount(BigDecimal amount) { this.amount = amount; }
}