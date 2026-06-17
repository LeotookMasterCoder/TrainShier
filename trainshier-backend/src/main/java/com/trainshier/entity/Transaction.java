package com.trainshier.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

/**
 * @param transaction entity
 */
@Entity
@Data
public class Transaction {

    /**
     * @param id identifier
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * @param user associated user
     */
    @ManyToOne
    private Usuario user;

    /**
     * @param total amount
     */
    private Double total;

    /**
     * @param status transaction status
     */
    private String status;

    /**
     * @param paymentMethod payment method
     */
    private String paymentMethod;

    /**
     * @param date transaction date
     */
    private LocalDateTime date;

    /**
     * @param duration execution time
     */
    private Double duration;
}
