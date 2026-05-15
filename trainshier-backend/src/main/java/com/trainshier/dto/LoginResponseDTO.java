package com.trainshier.dto;

import lombok.Data;

@Data
public class LoginResponseDTO extends MessageResponseDTO{
    /**
     * @param jwt devuelve el token
     */
    private String jwt;

}
