package com.trainshier.repository;

import com.trainshier.entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * @param transaction repository
 */
public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    /**
     * @param userId user id
     * @return transactions
     */
    List<Transaction> findByUserId(Long userId);
}
