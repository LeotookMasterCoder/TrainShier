package com.trainshier.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "practices")
@Data
public class Practice {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String description;

    private Integer estimatedDuration;
}