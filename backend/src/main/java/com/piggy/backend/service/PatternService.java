package com.piggy.backend.service;

import com.piggy.backend.entity.BankAddress;
import com.piggy.backend.entity.Pattern;
import com.piggy.backend.entity.PatternStatus;
import com.piggy.backend.repository.PatternRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class PatternService {
    private final PatternRepository patternRepository;
    private final BankAddressService bankAddressService;

    public PatternService(PatternRepository patternRepository, BankAddressService bankAddressService) {
        this.patternRepository = patternRepository;
        this.bankAddressService = bankAddressService;
    }

    public List<Pattern> getApprovedPatterns() {
        return patternRepository.findByStatus(PatternStatus.APPROVED);
    }

    public List<Pattern> getApprovedPatternsByBankAddress(String addressString) {
        BankAddress bankAddress = bankAddressService.getBankAddressByAddress(addressString);
        return patternRepository.findByBankAddressAndStatus(bankAddress, PatternStatus.APPROVED);
    }

    public List<Pattern> getPendingPatterns() {
        return patternRepository.findByStatus(PatternStatus.PENDING);
    }

    public Pattern savePattern(Pattern pattern) {
        return patternRepository.save(pattern);
    }

    public Pattern updatePatternStatus(Long id, PatternStatus status) {
        Pattern pattern = patternRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pattern not found"));
        pattern.setStatus(status);
        return patternRepository.save(pattern);
    }
}