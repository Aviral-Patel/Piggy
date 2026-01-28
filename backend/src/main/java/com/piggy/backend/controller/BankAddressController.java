package com.piggy.backend.controller;

import com.piggy.backend.dto.BankAddressDTO;
import com.piggy.backend.entity.BankAddress;
import com.piggy.backend.service.BankAddressService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/bank-addresses")
public class BankAddressController {
    private final BankAddressService bankAddressService;

    public BankAddressController(BankAddressService bankAddressService) {
        this.bankAddressService = bankAddressService;
    }

    @GetMapping
    public ResponseEntity<List<BankAddressDTO>> getAllBankAddresses() {
        List<BankAddressDTO> dtos = bankAddressService.getAllBankAddresses()
                .stream()
                .map(BankAddressDTO::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }

    @GetMapping("/{address}")
    public ResponseEntity<BankAddressDTO> getBankAddressByAddress(@PathVariable String address) {
        BankAddress bankAddress = bankAddressService.getBankAddressByAddress(address);
        return ResponseEntity.ok(new BankAddressDTO(bankAddress));
    }

    @PostMapping
    public ResponseEntity<BankAddressDTO> createBankAddress(@RequestBody BankAddressDTO dto) {
        BankAddress bankAddress = new BankAddress();
        bankAddress.setAddress(dto.getAddress());
        bankAddress.setBankName(dto.getBankName());
        BankAddress saved = bankAddressService.saveBankAddress(bankAddress);
        return ResponseEntity.ok(new BankAddressDTO(saved));
    }
}
