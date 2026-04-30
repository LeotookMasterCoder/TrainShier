package com.trainshier.dto;

import com.trainshier.entity.Role;
import lombok.Data;

/**
 * @param register request
 */
@Data
public class RegisterRequest {

    private String name;
    private String email;
    private String password;
    private Role role;
}