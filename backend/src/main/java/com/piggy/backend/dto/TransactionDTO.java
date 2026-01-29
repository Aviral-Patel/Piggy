package com.piggy.backend.dto;

import com.piggy.backend.entity.Transaction;
import com.piggy.backend.entity.TransactionType;
import com.piggy.backend.entity.Category;
import java.math.BigDecimal;
import java.time.LocalDateTime;

public class TransactionDTO {
    private Long id;
    private String bankAddress;
    private String bankName;
    private Category category;
    private String accountNumber;
    private String merchant;
    private TransactionType type;
    private LocalDateTime date;
    private BigDecimal amount;
    private BigDecimal balance;
    private String refNumber;

    public TransactionDTO() {}

    public TransactionDTO(TransactionType type, BigDecimal amount, String merchant) {
        this.type = type;
        this.amount = amount;
        this.merchant = merchant;
    }

    public TransactionDTO(Transaction transaction) {
        this.id = transaction.getId();
        this.bankAddress = transaction.getBankAddress();
        this.bankName = transaction.getBankName();
        this.category = transaction.getCategory();
        this.accountNumber = transaction.getAccountNumber();
        this.merchant = transaction.getMerchant();
        this.type = transaction.getType();
        this.date = transaction.getDate();
        this.amount = transaction.getAmount();
        this.balance = transaction.getBalance();
        this.refNumber = transaction.getRefNumber();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getBankAddress() { return bankAddress; }
    public void setBankAddress(String bankAddress) { this.bankAddress = bankAddress; }

    public String getBankName() { return bankName; }
    public void setBankName(String bankName) { this.bankName = bankName; }

    public Category getCategory() { return category; }
    public void setCategory(Category category) { this.category = category; }

    public String getAccountNumber() { return accountNumber; }
    public void setAccountNumber(String accountNumber) { this.accountNumber = accountNumber; }

    public String getMerchant() { return merchant; }
    public void setMerchant(String merchant) { this.merchant = merchant; }

    public TransactionType getType() { return type; }
    public void setType(TransactionType type) { this.type = type; }

    public LocalDateTime getDate() { return date; }
    public void setDate(LocalDateTime date) { this.date = date; }

    public BigDecimal getAmount() { return amount; }
    public void setAmount(BigDecimal amount) { this.amount = amount; }

    public BigDecimal getBalance() { return balance; }
    public void setBalance(BigDecimal balance) { this.balance = balance; }

    public String getRefNumber() { return refNumber; }
    public void setRefNumber(String refNumber) { this.refNumber = refNumber; }
}