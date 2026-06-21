package com.trainshier.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "products")
@Data
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private Double price;

    private Integer stock;

    private String barcode;

    private Boolean active;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;
}