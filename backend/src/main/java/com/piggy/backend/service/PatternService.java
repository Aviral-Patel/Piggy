package com.piggy.backend.service;

import com.piggy.backend.dto.RegexMatchResponse;
import com.piggy.backend.entity.Pattern;
import com.piggy.backend.entity.PatternStatus;
import com.piggy.backend.exception.BadRequestException;
import com.piggy.backend.exception.ResourceNotFoundException;
import com.piggy.backend.repository.PatternRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.regex.Matcher;
import java.util.stream.Collectors;

@Service
public class PatternService {
    private final PatternRepository patternRepository;

    public PatternService(PatternRepository patternRepository) {
        this.patternRepository = patternRepository;
    }

    public List<Pattern> getApprovedPatterns() {
        return patternRepository.findByStatus(PatternStatus.APPROVED);
    }

    public List<Pattern> getApprovedPatternsByBankAddress(String bankAddress) {
        return patternRepository.findApprovedPatternsByBankAddress(bankAddress);
    }

    public List<Pattern> getPendingPatterns() {
        return patternRepository.findByStatus(PatternStatus.PENDING);
    }

    public Pattern savePattern(Pattern pattern) {
        return patternRepository.save(pattern);
    }

    public Pattern updatePatternStatus(Long id, PatternStatus status) {
        Pattern pattern = patternRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Pattern not found with ID: " + id));
        
        if (status == null) {
            throw new BadRequestException("Status is required");
        }
        
        pattern.setStatus(status);
        return patternRepository.save(pattern);
    }

    public List<String> getDistinctBankAddresses() {
        return patternRepository.findDistinctBankAddresses();
    }

    public List<BankAddressInfo> getBankAddressesWithInfo() {
        List<String> addresses = patternRepository.findDistinctBankAddresses();
        return addresses.stream()
                .map(address -> {
                    List<Pattern> patterns = patternRepository.findApprovedPatternsByBankAddress(address);
                    if (!patterns.isEmpty()) {
                        Pattern firstPattern = patterns.get(0);
                        return new BankAddressInfo(address, firstPattern.getBankName());
                    }
                    return new BankAddressInfo(address, "Unknown");
                })
                .collect(Collectors.toList());
    }

    public RegexMatchResponse testRegexMatch(String regexPattern, String sampleMessage) {
        // Validate inputs
        if (regexPattern == null || regexPattern.trim().isEmpty()) {
            return new RegexMatchResponse(false, "Please enter a regex pattern", null);
        }

        if (sampleMessage == null || sampleMessage.trim().isEmpty()) {
            return new RegexMatchResponse(false, "Please enter a sample message", null);
        }

        try {
            // Compile regex pattern with case-insensitive flag
            java.util.regex.Pattern regexPatternObj = java.util.regex.Pattern.compile(
                regexPattern, 
                java.util.regex.Pattern.CASE_INSENSITIVE
            );
            Matcher matcher = regexPatternObj.matcher(sampleMessage);

            // Use Matcher.find() to check if pattern matches
            if (matcher.find()) {
                // Get the matched text
                String matchedText = matcher.group(0);
                return new RegexMatchResponse(
                    true,
                    "✓ Pattern matches! Regex successfully matched the sample message.",
                    matchedText
                );
            } else {
                return new RegexMatchResponse(
                    false,
                    "✗ Pattern does not match. The regex pattern did not match the sample message.",
                    null
                );
            }
        } catch (Exception e) {
            return new RegexMatchResponse(
                false,
                "✗ Invalid regex pattern: " + e.getMessage(),
                null
            );
        }
    }

    public static class BankAddressInfo {
        private String address;
        private String bankName;

        public BankAddressInfo(String address, String bankName) {
            this.address = address;
            this.bankName = bankName;
        }

        public String getAddress() { return address; }
        public void setAddress(String address) { this.address = address; }
        public String getBankName() { return bankName; }
        public void setBankName(String bankName) { this.bankName = bankName; }
    }
}