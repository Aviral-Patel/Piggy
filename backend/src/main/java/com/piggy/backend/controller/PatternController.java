package com.piggy.backend.controller;

import com.piggy.backend.dto.PatternDTO;
import com.piggy.backend.entity.BankAddress;
import com.piggy.backend.entity.Pattern;
import com.piggy.backend.entity.PatternStatus;
import com.piggy.backend.service.BankAddressService;
import com.piggy.backend.service.PatternService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/patterns")
public class PatternController {
    private final PatternService patternService;
    private final BankAddressService bankAddressService;

    public PatternController(PatternService patternService, BankAddressService bankAddressService) {
        this.patternService = patternService;
        this.bankAddressService = bankAddressService;
    }

    @GetMapping("/approved")
    public ResponseEntity<List<PatternDTO>> getApprovedPatterns() {
        List<PatternDTO> dtos = patternService.getApprovedPatterns()
                .stream()
                .map(PatternDTO::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }

    @GetMapping("/pending")
    public ResponseEntity<List<PatternDTO>> getPendingPatterns() {
        List<PatternDTO> dtos = patternService.getPendingPatterns()
                .stream()
                .map(PatternDTO::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<PatternDTO> updatePatternStatus(
            @PathVariable Long id,
            @RequestBody Map<String, String> request) {
        PatternStatus status = PatternStatus.valueOf(request.get("status").toUpperCase());
        Pattern updated = patternService.updatePatternStatus(id, status);
        return ResponseEntity.ok(new PatternDTO(updated));
    }

    @PostMapping
    public ResponseEntity<PatternDTO> createPattern(@RequestBody PatternDTO dto) {
        Pattern pattern = new Pattern();
        pattern.setRegexPattern(dto.getRegexPattern());
        pattern.setMessage(dto.getMessage());
        pattern.setStatus(dto.getStatus());
        
        // Get or create bank address
        BankAddress bankAddress = bankAddressService.getBankAddressByAddress(dto.getBankAddress().getAddress());
        pattern.setBankAddress(bankAddress);
        
        Pattern saved = patternService.savePattern(pattern);
        return ResponseEntity.ok(new PatternDTO(saved));
    }
}