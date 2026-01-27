package com.piggy.backend.controller;

import com.piggy.backend.entity.Pattern;
import com.piggy.backend.service.PatternService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/patterns")
public class PatternController {
    private final PatternService patternService;

    public PatternController(PatternService patternService) {
        this.patternService = patternService;
    }

    @GetMapping("/approved")
    public ResponseEntity<List<Pattern>> getApprovedPatterns() {
        return ResponseEntity.ok(patternService.getApprovedPatterns());
    }

    @PostMapping
    public ResponseEntity<Pattern> createPattern(@RequestBody Pattern pattern) {
        return ResponseEntity.ok(patternService.savePattern(pattern));
    }
}