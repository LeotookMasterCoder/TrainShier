package com.trainshier.dto;
import lombok.Data;
@Data
public class UsuarioRequestDTO {
    /**
     * @param nombre es el nombre de el usuario
     * @param contraseña es la contraseña de el usuario
     * @param correo es el correo de el usuario
     * @param rolid es el id de el rol
     */

    private String nombre;

    private String contraseña;
    
    private String correo;
    
    private Long rolid;
}
