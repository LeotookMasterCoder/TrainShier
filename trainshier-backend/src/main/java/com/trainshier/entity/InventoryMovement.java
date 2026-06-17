package com.trainshier.entity;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.Data;
import com.trainshier.enums.InventoryMovementType;

/**
 * @param id movement identifier
 * @param product affected product
 * @param movementType movement type
 * @param quantity movement quantity
 * @param date movement date
 * @param reason movement reason
 */
@Entity
@Table(name = "inventory_movements")
@Data
public class InventoryMovement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private InventoryMovementType movementType;

    private Integer quantity;

    private LocalDateTime date;

    private String reason;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;
}