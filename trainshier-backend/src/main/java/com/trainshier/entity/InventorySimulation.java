package com.trainshier.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "inventory_simulation")
@Data
public class InventorySimulation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer initialStock;

    private Integer currentStock;

    @ManyToOne
    private SessionAccess access;

    @ManyToOne
    private Product product;
}