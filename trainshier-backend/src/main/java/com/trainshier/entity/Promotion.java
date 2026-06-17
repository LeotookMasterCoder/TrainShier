package com.trainshier.entity;

import jakarta.persistence.*;
import lombok.Data;
import com.trainshier.enums.PromotionType;

@Entity
@Table(name = "promotions")
@Data
public class Promotion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Enumerated(EnumType.STRING)
    private PromotionType type;

    private Double discount;

    private Double minimumAmount;

    private Boolean active;
}