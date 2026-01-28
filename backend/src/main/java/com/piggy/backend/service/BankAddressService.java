package com.piggy.backend.service;

import com.piggy.backend.entity.BankAddress;
import com.piggy.backend.repository.BankAddressRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class BankAddressService {
    private final BankAddressRepository bankAddressRepository;

    public BankAddressService(BankAddressRepository bankAddressRepository) {
        this.bankAddressRepository = bankAddressRepository;
    }

    public List<BankAddress> getAllBankAddresses() {
        return bankAddressRepository.findAll();
    }

    public BankAddress getBankAddressByAddress(String address) {
        return bankAddressRepository.findByAddress(address)
                .orElseThrow(() -> new RuntimeException("Bank address not found: " + address));
    }

    public BankAddress saveBankAddress(BankAddress bankAddress) {
        return bankAddressRepository.save(bankAddress);
    }
}
