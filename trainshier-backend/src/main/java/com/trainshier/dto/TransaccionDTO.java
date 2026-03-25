package com.trainshier.dto;

import lombok.Data;

@Data
public class TransaccionDTO {

    private String aprendiz;
    private Double total;
    private String estado;
    private String metodoPago;
    private Double tiempo;

}