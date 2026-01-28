package com.piggy.backend.repository;

import com.piggy.backend.entity.BankAddress;
import com.piggy.backend.entity.Pattern;
import com.piggy.backend.entity.PatternStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PatternRepository extends JpaRepository<Pattern, Long> {
    List<Pattern> findByStatus(PatternStatus status);
    List<Pattern> findByBankAddressAndStatus(BankAddress bankAddress, PatternStatus status);
}