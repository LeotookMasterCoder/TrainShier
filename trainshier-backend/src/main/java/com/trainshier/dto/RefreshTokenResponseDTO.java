package com.trainshier.dto;

import lombok.Data;

@Data
public class RefreshTokenResponseDTO {
/**
     * 
     * @param mensaje es un mensaje generico
     * @param jwt devuelve el token jwt firmado
     */
    private String mensaje;

    private String jwt;
}
