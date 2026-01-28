package com.piggy.backend.controller;

import com.piggy.backend.dto.PatternDTO;
import com.piggy.backend.dto.RegexMatchRequest;
import com.piggy.backend.dto.RegexMatchResponse;
import com.piggy.backend.entity.Pattern;
import com.piggy.backend.entity.PatternStatus;
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

    public PatternController(PatternService patternService) {
        this.patternService = patternService;
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

    @GetMapping("/bank-addresses")
    public ResponseEntity<List<PatternService.BankAddressInfo>> getBankAddresses() {
        List<PatternService.BankAddressInfo> bankAddresses = patternService.getBankAddressesWithInfo();
        return ResponseEntity.ok(bankAddresses);
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
        pattern.setBankAddress(dto.getBankAddress());
        pattern.setBankName(dto.getBankName());
        pattern.setRegexPattern(dto.getRegexPattern());
        pattern.setMessage(dto.getMessage());
        pattern.setMerchantType(dto.getMerchantType());
        pattern.setCategory(dto.getCategory());
        pattern.setStatus(dto.getStatus() != null ? dto.getStatus() : PatternStatus.PENDING);
        
        Pattern saved = patternService.savePattern(pattern);
        return ResponseEntity.ok(new PatternDTO(saved));
    }

    @PostMapping("/test-match")
    public ResponseEntity<RegexMatchResponse> testRegexMatch(@RequestBody RegexMatchRequest request) {
        RegexMatchResponse response = patternService.testRegexMatch(
            request.getRegexPattern(),
            request.getSampleMessage()
        );
        return ResponseEntity.ok(response);
    }
}