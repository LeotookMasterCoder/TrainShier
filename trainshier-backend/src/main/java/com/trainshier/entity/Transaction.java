package com.trainshier.entity;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.Data;
import com.trainshier.enums.TransactionStatus;


@Entity
@Table(name = "transactions")
@Data
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @Enumerated(EnumType.STRING)
    private TransactionStatus status;

    private Double total;

    private Integer errors;

    private Double effectiveness;

    private LocalDateTime date;

    @ManyToOne
    private SessionAccess access;
}