package com.piggy.backend.dto;

import com.piggy.backend.entity.Pattern;
import com.piggy.backend.entity.PatternStatus;
import com.piggy.backend.entity.Category;

public class PatternDTO {
    private Long id;
    private String bankAddress;
    private String bankName;
    private String merchantName;
    private String type;
    private String regexPattern;
    private String message;
    private Category category;
    private PatternStatus status;

    public PatternDTO() {}

    public PatternDTO(Pattern pattern) {
        this.id = pattern.getId();
        this.bankAddress = pattern.getBankAddress();
        this.bankName = pattern.getBankName();
        this.merchantName = pattern.getMerchantName();
        this.type = pattern.getType();
        this.regexPattern = pattern.getRegexPattern();
        this.message = pattern.getMessage();
        this.category = pattern.getCategory();
        this.status = pattern.getStatus();
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getBankAddress() {
        return bankAddress;
    }

    public void setBankAddress(String bankAddress) {
        this.bankAddress = bankAddress;
    }

    public String getBankName() {
        return bankName;
    }

    public void setBankName(String bankName) {
        this.bankName = bankName;
    }

    public String getMerchantName() {
        return merchantName;
    }

    public void setMerchantName(String merchantName) {
        this.merchantName = merchantName;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
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

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public PatternStatus getStatus() {
        return status;
    }

    public void setStatus(PatternStatus status) {
        this.status = status;
    }
}
