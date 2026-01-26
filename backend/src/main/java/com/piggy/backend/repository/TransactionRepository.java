package com.piggy.backend.repository;

import com.piggy.backend.entity.Transaction;
import com.piggy.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TransactionRepository
        extends JpaRepository<Transaction, Long> {
    List<Transaction> findByUser(User user);
}
