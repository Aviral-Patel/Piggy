package com.piggy.backend.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "transactions")
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // —— From Pattern entity (set from matched pattern) ——
    private String bankName;
    private String merchantType;
    private String category;
    private String bankAddress;

    // —— From regex extraction only (overwrite when group present) ——
    private String accountNumber;
    private String merchant;
    private String type;
    private LocalDateTime date;
    private BigDecimal amount;
    private BigDecimal balance;   // e.g. Avl Bal, Curr O/S
    private String refNumber;      // e.g. Ref No, UPI Ref

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

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

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
}
