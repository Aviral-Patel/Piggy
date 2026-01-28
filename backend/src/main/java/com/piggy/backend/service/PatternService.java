package com.piggy.backend.service;

import com.piggy.backend.entity.Pattern;
import com.piggy.backend.entity.PatternStatus;
import com.piggy.backend.repository.PatternRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class PatternService {
    private final PatternRepository patternRepository;

    public PatternService(PatternRepository patternRepository) {
        this.patternRepository = patternRepository;
    }

    public List<Pattern> getApprovedPatterns() {
        return patternRepository.findByStatus(PatternStatus.APPROVED);
    }

    public Pattern savePattern(Pattern pattern) {
        return patternRepository.save(pattern);
    }

    // Add more methods as needed
}