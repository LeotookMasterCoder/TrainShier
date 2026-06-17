package com.trainshier.entity;

import jakarta.persistence.*;
import lombok.Data;

/**
 * @param id configuration identifier
 * @param session associated session
 * @param parameter configuration parameter
 * @param value parameter value
 */
@Entity
@Table(
        name = "simulation_configuration",
        uniqueConstraints = {
                @UniqueConstraint(
                        columnNames = {
                                "session_id",
                                "parameter"
                        }
                )
        }
)
@Data
public class SimulationConfiguration {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String parameter;

    private String value;

    @ManyToOne
    @JoinColumn(name = "session_id")
    private SimulationSession session;
}