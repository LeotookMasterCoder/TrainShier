package com.trainshier.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "error_catalog")
@Data
public class ErrorCatalog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String code;

    private String description;

    private String suggestedSolution;

    private String category;
}