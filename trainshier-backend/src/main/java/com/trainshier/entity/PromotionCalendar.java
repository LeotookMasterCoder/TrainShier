package com.trainshier.entity;

import java.time.LocalDate;

import jakarta.persistence.*;
import lombok.Data;

/**
 * @param id calendar identifier
 * @param promotion associated promotion
 * @param product associated product
 * @param startDate promotion start date
 * @param endDate promotion end date
 * @param weekDays active week days
 */
@Entity
@Table(name = "promotion_calendar")
@Data
public class PromotionCalendar {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate startDate;

    private LocalDate endDate;

    private String weekDays;

    @ManyToOne
    @JoinColumn(name = "promotion_id")
    private Promotion promotion;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;
}