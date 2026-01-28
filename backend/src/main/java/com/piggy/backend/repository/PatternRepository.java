package com.piggy.backend.repository;

import com.piggy.backend.entity.Pattern;
import com.piggy.backend.entity.PatternStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface PatternRepository extends JpaRepository<Pattern, Long> {
    List<Pattern> findByStatus(PatternStatus status);
    List<Pattern> findByBankAddressAndStatus(String bankAddress, PatternStatus status);
    
    @Query("SELECT DISTINCT p.bankAddress FROM Pattern p WHERE p.status = 'APPROVED'")
    List<String> findDistinctBankAddresses();
    
    @Query("SELECT DISTINCT p FROM Pattern p WHERE p.status = 'APPROVED' AND p.bankAddress = ?1")
    List<Pattern> findApprovedPatternsByBankAddress(String bankAddress);
}