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
    
    @Enumerated(EnumType.STRING)
    private Category category;
    
    private String bankAddress;

    // —— From regex extraction only (overwrite when group present) ——
    private String accountNumber;
    private String merchant;
    
    @Enumerated(EnumType.STRING)
    private TransactionType type;
    
    private LocalDateTime date;
    private BigDecimal amount;
    private BigDecimal balance;   // e.g. Avl Bal, Curr O/S
    private String refNumber;      // e.g. Ref No, UPI Ref
    @Column(length = 2000)
    private String smsMessage;    // Original SMS text used to parse this transaction

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

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

    public String getSmsMessage() { return smsMessage; }
    public void setSmsMessage(String smsMessage) { this.smsMessage = smsMessage; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
}
