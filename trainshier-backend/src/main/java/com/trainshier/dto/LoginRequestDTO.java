package com.trainshier.dto;

import lombok.Data;

@Data
public class LoginRequestDTO {

/**
 * @param nombre es el nombre de el usuario
 * @param contraseña es la contraseña de el usuario
 * @param correo es el correo de el usuario
 */
    private String nombre;

    private String correo;
    
    private String contraseña;
}
