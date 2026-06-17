package com.trainshier.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

/**
 * @param report entity
 */
@Entity
@Data
public class Report {

    /**
     * @param id identifier
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * @param user evaluated user
     */
    @ManyToOne
    private Usuario user;

    /**
     * @param score performance score
     */
    private Double score;

    /**
     * @param date generated date
     */
    private LocalDateTime date;
}
