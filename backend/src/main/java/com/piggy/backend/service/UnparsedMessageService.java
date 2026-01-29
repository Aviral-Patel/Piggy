package com.piggy.backend.service;

import com.piggy.backend.entity.UnparsedMessage;
import com.piggy.backend.entity.User;
import com.piggy.backend.repository.UnparsedMessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class UnparsedMessageService {

    @Autowired
    private UnparsedMessageRepository unparsedMessageRepository;

    @Transactional
    public UnparsedMessage saveUnparsedMessage(String bankAddress, String smsMessage, String errorMessage, User user) {
        try {
            UnparsedMessage unparsedMessage = new UnparsedMessage();
            unparsedMessage.setBankAddress(bankAddress);
            unparsedMessage.setSmsMessage(smsMessage);
            unparsedMessage.setErrorMessage(errorMessage);
            unparsedMessage.setProcessed(false);
            unparsedMessage.setUser(user);
            
            System.out.println("Saving unparsed message for bank: " + bankAddress);
            UnparsedMessage saved = unparsedMessageRepository.save(unparsedMessage);
            System.out.println("✓ Unparsed message saved with ID: " + saved.getId());
            return saved;
        } catch (Exception e) {
            System.err.println("✗ Error saving unparsed message: " + e.getMessage());
            e.printStackTrace();
            throw e;
        }
    }

    public List<UnparsedMessage> getAllUnparsedMessages() {
        return unparsedMessageRepository.findAllByOrderByCreatedAtDesc();
    }

    public List<UnparsedMessage> getPendingMessages() {
        return unparsedMessageRepository.findByProcessedOrderByCreatedAtDesc(false);
    }

    public long getPendingCount() {
        return unparsedMessageRepository.countByProcessed(false);
    }

    @Transactional
    public void markAsProcessed(Long id) {
        Optional<UnparsedMessage> messageOpt = unparsedMessageRepository.findById(id);
        if (messageOpt.isPresent()) {
            UnparsedMessage message = messageOpt.get();
            // Any maker can mark any message as processed
            message.setProcessed(true);
            unparsedMessageRepository.save(message);
            System.out.println("✓ Message ID " + id + " marked as processed");
        }
    }

    @Transactional
    public void deleteUnparsedMessage(Long id) {
        Optional<UnparsedMessage> messageOpt = unparsedMessageRepository.findById(id);
        if (messageOpt.isPresent()) {
            // Any maker can delete any unparsed message
            unparsedMessageRepository.deleteById(id);
            System.out.println("✓ Message ID " + id + " deleted");
        }
    }
}
