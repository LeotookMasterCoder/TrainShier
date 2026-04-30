package com.trainshier.entity;

import jakarta.persistence.*;
import lombok.Data;

/**
 * @param user entity
 */
@Entity
@Data
public class User {

    /**
     * @param id identifier
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * @param name user name
     */
    private String name;

    /**
     * @param email user email
     */
    @Column(unique = true)
    private String email;

    /**
     * @param password encrypted password
     */
    private String password;

    /**
     * @param role user role
     */
    @Enumerated(EnumType.STRING)
    private Role role;
}