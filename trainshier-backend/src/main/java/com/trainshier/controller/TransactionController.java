package com.trainshier.controller;

import com.trainshier.dto.TransactionRequest;
import com.trainshier.entity.Transaction;
import com.trainshier.service.TransactionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @param transaction endpoints
 */
@RestController
@RequestMapping("/api/transactions")
@RequiredArgsConstructor
public class TransactionController {

    private final TransactionService transactionService;

    /**
     * @param request transaction
     * @return transaction
     */
    @PostMapping
    public Transaction save(@Valid @RequestBody TransactionRequest request){
        return transactionService.save(request);
    }

    /**
     * @return list
     */
    @GetMapping
    public List<Transaction> findAll(){
        return transactionService.findAll();
    }

    /**
     * @param userId user id
     * @return list
     */
    @GetMapping("/user/{userId}")
    public List<Transaction> findByUser(@PathVariable Long userId){
        return transactionService.findByUser(userId);
    }
}