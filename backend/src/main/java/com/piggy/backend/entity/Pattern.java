package com.piggy.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "patterns")
public class Pattern {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "bank_address_id", nullable = false)
    private BankAddress bankAddress;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String regexPattern;

    @Column(nullable = false)
    private String message;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PatternStatus status;

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public BankAddress getBankAddress() { return bankAddress; }
    public void setBankAddress(BankAddress bankAddress) { this.bankAddress = bankAddress; }

    public String getRegexPattern() { return regexPattern; }
    public void setRegexPattern(String regexPattern) { this.regexPattern = regexPattern; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public PatternStatus getStatus() { return status; }
    public void setStatus(PatternStatus status) { this.status = status; }
}