package com.trainshier.dto;

import java.time.LocalDate;

import lombok.Data;

@Data
public class UsuarioResponseDTO {

     /**
     * @param nombre es el nombre de el usuario
     * @param contraseña es la contraseña de el usuario
     * @param correo es el correo de el usuario
     * @param rolid es el id de el rol
     * @param fecha_registro es la fecha en la que se registro el usuario
     */


    private Long id_usuario;
    
    private String nombre;
    
    private String correo;
  
    private LocalDate fecha_registro;
   
    private Long rolId;

}
