package com.piggy.backend.repository;

import com.piggy.backend.entity.UnparsedMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UnparsedMessageRepository extends JpaRepository<UnparsedMessage, Long> {
    
    // Get all unparsed messages (not filtered by user)
    List<UnparsedMessage> findAllByOrderByCreatedAtDesc();
    
    // Get pending messages for all users
    List<UnparsedMessage> findByProcessedOrderByCreatedAtDesc(boolean processed);
    
    // Count pending messages for all users
    long countByProcessed(boolean processed);
}
