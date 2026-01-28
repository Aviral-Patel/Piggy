package com.piggy.backend.dto;

import com.piggy.backend.entity.BankAddress;

public class BankAddressDTO {
    private Long id;
    private String address;
    private String bankName;

    public BankAddressDTO() {}

    public BankAddressDTO(BankAddress bankAddress) {
        this.id = bankAddress.getId();
        this.address = bankAddress.getAddress();
        this.bankName = bankAddress.getBankName();
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getBankName() {
        return bankName;
    }

    public void setBankName(String bankName) {
        this.bankName = bankName;
    }
}
