package com.piggy.backend.dto;

import com.piggy.backend.entity.Pattern;
import com.piggy.backend.entity.PatternStatus;

public class PatternDTO {
    private Long id;
    private BankAddressDTO bankAddress;
    private String regexPattern;
    private String message;
    private PatternStatus status;

    public PatternDTO() {}

    public PatternDTO(Pattern pattern) {
        this.id = pattern.getId();
        this.bankAddress = new BankAddressDTO(pattern.getBankAddress());
        this.regexPattern = pattern.getRegexPattern();
        this.message = pattern.getMessage();
        this.status = pattern.getStatus();
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public BankAddressDTO getBankAddress() {
        return bankAddress;
    }

    public void setBankAddress(BankAddressDTO bankAddress) {
        this.bankAddress = bankAddress;
    }

    public String getRegexPattern() {
        return regexPattern;
    }

    public void setRegexPattern(String regexPattern) {
        this.regexPattern = regexPattern;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public PatternStatus getStatus() {
        return status;
    }

    public void setStatus(PatternStatus status) {
        this.status = status;
    }
}
