package com.piggy.backend.dto;

public class TransactionDTO {
    private String type;
    private double amount;
    private String merchant;

    public TransactionDTO(String type, double amount, String merchant) {
        this.type = type;
        this.amount = amount;
        this.merchant = merchant;
    }

    public String getType() { return type; }
    public double getAmount() { return amount; }
    public String getMerchant() { return merchant; }
}
