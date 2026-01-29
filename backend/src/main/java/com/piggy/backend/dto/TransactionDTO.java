package com.piggy.backend.dto;

import com.piggy.backend.entity.Transaction;
import java.math.BigDecimal;
import java.time.LocalDateTime;

public class TransactionDTO {
    private Long id;
    private String bankAddress;
    private String bankName;
    private String merchantType;
    private String category;
    private String accountNumber;
    private String merchant;
    private String type;
    private LocalDateTime date;
    private BigDecimal amount;
    private BigDecimal balance;
    private String refNumber;

    public TransactionDTO() {}

    public TransactionDTO(String type, BigDecimal amount, String merchant) {
        this.type = type;
        this.amount = amount;
        this.merchant = merchant;
    }

    public TransactionDTO(Transaction transaction) {
        this.id = transaction.getId();
        this.bankAddress = transaction.getBankAddress();
        this.bankName = transaction.getBankName();
        this.merchantType = transaction.getMerchantType();
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

    public String getMerchantType() { return merchantType; }
    public void setMerchantType(String merchantType) { this.merchantType = merchantType; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getAccountNumber() { return accountNumber; }
    public void setAccountNumber(String accountNumber) { this.accountNumber = accountNumber; }

    public String getMerchant() { return merchant; }
    public void setMerchant(String merchant) { this.merchant = merchant; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public LocalDateTime getDate() { return date; }
    public void setDate(LocalDateTime date) { this.date = date; }

    public BigDecimal getAmount() { return amount; }
    public void setAmount(BigDecimal amount) { this.amount = amount; }

    public BigDecimal getBalance() { return balance; }
    public void setBalance(BigDecimal balance) { this.balance = balance; }

    public String getRefNumber() { return refNumber; }
    public void setRefNumber(String refNumber) { this.refNumber = refNumber; }
}