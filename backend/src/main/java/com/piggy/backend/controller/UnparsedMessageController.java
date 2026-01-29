package com.piggy.backend.controller;

import com.piggy.backend.entity.UnparsedMessage;
import com.piggy.backend.entity.User;
import com.piggy.backend.repository.UserRepository;
import com.piggy.backend.service.UnparsedMessageService;
import com.piggy.backend.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/unparsed-messages")
@CrossOrigin(origins = "*")
public class UnparsedMessageController {

    @Autowired
    private UnparsedMessageService unparsedMessageService;
    
    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public ResponseEntity<List<UnparsedMessage>> getAllUnparsedMessages(Authentication authentication) {
        // All makers can see all unparsed messages (not user-specific)
        List<UnparsedMessage> messages = unparsedMessageService.getAllUnparsedMessages();
        return ResponseEntity.ok(messages);
    }

    @GetMapping("/pending")
    public ResponseEntity<List<UnparsedMessage>> getPendingMessages(Authentication authentication) {
        // All makers can see all pending messages (not user-specific)
        List<UnparsedMessage> messages = unparsedMessageService.getPendingMessages();
        return ResponseEntity.ok(messages);
    }

    @GetMapping("/pending/count")
    public ResponseEntity<Map<String, Long>> getPendingCount(Authentication authentication) {
        // Count all pending messages (not user-specific)
        long count = unparsedMessageService.getPendingCount();
        Map<String, Long> response = new HashMap<>();
        response.put("count", count);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}/mark-processed")
    public ResponseEntity<Map<String, String>> markAsProcessed(
            @PathVariable Long id,
            Authentication authentication) {
        // Any authenticated maker can mark any message as processed
        unparsedMessageService.markAsProcessed(id);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Message marked as processed");
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteUnparsedMessage(
            @PathVariable Long id,
            Authentication authentication) {
        // Any authenticated maker can delete any unparsed message
        unparsedMessageService.deleteUnparsedMessage(id);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Message deleted successfully");
        return ResponseEntity.ok(response);
    }
}
