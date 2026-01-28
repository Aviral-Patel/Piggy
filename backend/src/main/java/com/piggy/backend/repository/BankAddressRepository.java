package com.piggy.backend.repository;

import com.piggy.backend.entity.BankAddress;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface BankAddressRepository extends JpaRepository<BankAddress, Long> {
    Optional<BankAddress> findByAddress(String address);
}
