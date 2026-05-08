package com.trainshier.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.trainshier.dto.LoginRequestDTO;
import com.trainshier.dto.LoginResponseDTO;
import com.trainshier.dto.MessageResponseDTO;
import com.trainshier.dto.RefreshTokenResponseDTO;
import com.trainshier.dto.UsuarioRequestDTO;
import com.trainshier.enums.RolEnum;
import com.trainshier.security.RequiresRol;
import com.trainshier.service.AuthService;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;
    //endpoint registro
    @PostMapping("/register")
    public ResponseEntity<MessageResponseDTO> register(@RequestBody UsuarioRequestDTO request) {
        try {
            MessageResponseDTO response = authService.register(request);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }
    // endpoint de logeo
    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody LoginRequestDTO request) {
        try {
            LoginResponseDTO response = authService.login(request);
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(response);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }
    // endpoint de renovacion de token
    @GetMapping("/refreshToken")
    public ResponseEntity<RefreshTokenResponseDTO> refreshToken(HttpServletRequest request) {
        String autheader = request.getHeader("Authorization");
        if (autheader == null || !autheader.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }

        String token = autheader.substring(7);

        RefreshTokenResponseDTO response = new RefreshTokenResponseDTO();

        try {
            response = authService.refreshToken(token);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (RuntimeException e) {
            response.setMensaje("Token expired");
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }
}
