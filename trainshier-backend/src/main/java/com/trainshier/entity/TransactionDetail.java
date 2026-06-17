package com.trainshier.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "transaction_details")
@Data
public class TransactionDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer quantity;

    private Double unitPrice;

    private Double discountApplied;

    @ManyToOne
    private Transaction transaction;

    @ManyToOne
    private Product product;

    @ManyToOne
    private Promotion promotion;
}