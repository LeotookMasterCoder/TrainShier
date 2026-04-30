package com.trainshier.dto;

import lombok.Data;

/**
 * @param login request
 */
@Data
public class LoginRequest {

    /**
     * @param email user email
     */
    private String email;

    /**
     * @param password user password
     */
    private String password;
}