package com.trainshier.entity;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "simulation_sessions")
@Data
public class SimulationSession {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String accessCode;

    private Boolean active;

    private LocalDateTime createdAt;

    private LocalDateTime expiresAt;

    @ManyToOne
    private User instructor;

    @ManyToOne
    private Practice practice;
}