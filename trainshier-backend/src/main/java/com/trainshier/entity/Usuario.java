package com.trainshier.entity;
import java.time.LocalDate;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name= "usuario")
public class Usuario {


    /**
     * @param id_usuario es el id unico de el usuario
     * @param nombre es el nombre de el usuario
     * @param contraseña es la contraseña de el usuario
     * @param correo es el correo de el usuario
     * @param rolid es el id de el rol
     * @param fecha_registro es la fecha en la que se registro el usuario
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_usuario")
    private Long id_usuario;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "contraseña")
    private String contraseña;

    @Column(name = "correo")
    private String correo;

    @CreationTimestamp
    @Column(name= "fecha_registro")
    private LocalDate fecha_registro;

    @Column(name = "role_id")
    private Long rolId;
}

