package com.trainshier.entity;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "simulation_errors")
@Data
public class SimulationError {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String description;

    private LocalDateTime occurredAt;

    @ManyToOne
    private Transaction transaction;

    @ManyToOne
    private ErrorCatalog errorCatalog;
}