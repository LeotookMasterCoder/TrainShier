package com.trainshier.entity;

import com.trainshier.enums.UserRole;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * System user entity.
 */
@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {

    /**
     * User identifier.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * User full name.
     */
    private String name;

    /**
     * User email.
     */
    @Column(unique = true)
    private String email;

    /**
     * User password.
     */
    private String password;

    /**
     * User role.
     */
    @Enumerated(EnumType.STRING)
    private UserRole role;
}