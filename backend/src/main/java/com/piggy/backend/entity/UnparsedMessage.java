package com.piggy.backend.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "unparsed_messages")
public class UnparsedMessage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String bankAddress;
    
    @Column(length = 2000)
    private String smsMessage;
    
    @Column(length = 1000)
    private String errorMessage;  // Why it failed to parse
    
    private LocalDateTime createdAt;
    
    private boolean processed;  // Whether user has dealt with it

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = true)
    private User user;  // Optional: tracks who submitted it, but not required

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getBankAddress() { return bankAddress; }
    public void setBankAddress(String bankAddress) { this.bankAddress = bankAddress; }

    public String getSmsMessage() { return smsMessage; }
    public void setSmsMessage(String smsMessage) { this.smsMessage = smsMessage; }

    public String getErrorMessage() { return errorMessage; }
    public void setErrorMessage(String errorMessage) { this.errorMessage = errorMessage; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public boolean isProcessed() { return processed; }
    public void setProcessed(boolean processed) { this.processed = processed; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
}
