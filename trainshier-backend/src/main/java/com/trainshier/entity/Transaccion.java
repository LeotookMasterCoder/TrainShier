package com.trainshier.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Transaccion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String aprendiz;
    private Double total;
    private String estado; 
    private String metodoPago;

    private LocalDateTime fecha;

    private Double tiempo;
}