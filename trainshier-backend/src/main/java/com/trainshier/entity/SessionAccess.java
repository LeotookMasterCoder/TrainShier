package com.trainshier.entity;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "session_access")
@Data
public class SessionAccess {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime loginAt;

    private LocalDateTime logoutAt;

    @ManyToOne
    private SimulationSession session;

    @ManyToOne
    private User apprentice;
}