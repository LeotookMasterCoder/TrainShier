package com.trainshier.controller;

import com.trainshier.dto.LoginRequest;
import com.trainshier.dto.RegisterRequest;
import com.trainshier.entity.User;
import com.trainshier.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

/**
 * @param auth endpoints
 */
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    /**
     * @param request register
     * @return user
     */
    @PostMapping("/register")
    public User register(@RequestBody RegisterRequest request){
        return authService.register(request);
    }

    /**
     * @param request login
     * @return token
     */
    @PostMapping("/login")
    public String login(@RequestBody LoginRequest request){
        return authService.login(request);
    }
}