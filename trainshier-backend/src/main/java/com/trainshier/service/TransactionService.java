package com.trainshier.service;

import com.trainshier.dto.TransactionRequest;
import com.trainshier.entity.Transaction;
import com.trainshier.entity.Usuario;
import com.trainshier.repository.TransactionRepository;
import com.trainshier.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

/**
 * @param transaction logic
 */
@Service
@RequiredArgsConstructor
public class TransactionService {

    private final TransactionRepository transactionRepository;
    private final UsuarioRepository userRepository;

    /**
     * @param request transaction data
     * @return transaction
     */
    public Transaction save(TransactionRequest request){

        Usuario user = userRepository.findById(request.getUserId())
                .orElseThrow();

        Transaction t = new Transaction();
        t.setUser(user);
        t.setTotal(request.getTotal());
        t.setStatus(request.getStatus());
        t.setPaymentMethod(request.getPaymentMethod());
        t.setDuration(request.getDuration());
        t.setDate(LocalDateTime.now());

        return transactionRepository.save(t);
    }

    /**
     * @return transactions
     */
    public List<Transaction> findAll(){
        return transactionRepository.findAll();
    }

    /**
     * @param userId user id
     * @return transactions
     */
    public List<Transaction> findByUser(Long userId){
        return transactionRepository.findByUserId(userId);
    }
}
