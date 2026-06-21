package com.trainshier.entity;

import jakarta.persistence.*;
import lombok.Data;
import com.trainshier.enums.PaymentType;

@Entity
@Table(name = "transaction_payments")
@Data
public class TransactionPayment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private PaymentType paymentType;

    private Double amount;

    private Double deliveredChange;

    @ManyToOne
    private Transaction transaction;
}