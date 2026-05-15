package com.trainshier.service;

import java.util.Optional;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.trainshier.dto.LoginRequestDTO;
import com.trainshier.dto.LoginResponseDTO;
import com.trainshier.dto.MessageResponseDTO;
import com.trainshier.dto.RefreshTokenResponseDTO;
import com.trainshier.dto.UsuarioRequestDTO;
import com.trainshier.entity.Usuario;
import com.trainshier.repository.UsuarioRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final PasswordEncoder passwordEncoder;

    private final UsuarioRepository usuarioRepository;

    private final JwtService jwtService;
    //esta es la funcion de registrar
    public MessageResponseDTO register(UsuarioRequestDTO request) {
        MessageResponseDTO response = new MessageResponseDTO();
        response.setMensaje("Registro exitoso");

        if (usuarioRepository.findByEmail(request.getCorreo()).isPresent()) {
            throw new RuntimeException("Este correo ya esta en uso");
        }

        Usuario usuario = new Usuario();
        usuario.setNombre(request.getNombre());
        usuario.setContraseña(passwordEncoder.encode(request.getContraseña()));
        usuario.setRolId(request.getRolid());

        usuarioRepository.save(usuario);

        return response;
    }
    //esta es la funcion de logearse
    public LoginResponseDTO login(LoginRequestDTO request) {
        LoginResponseDTO response = new LoginResponseDTO();
        Optional<Usuario> usuario = usuarioRepository.findByEmail(request.getCorreo());

        if (usuario.isEmpty() && request.getCorreo() != null) {
            response.setMensaje("Este usuario no se ha registrado aun");
            return response;
        }

        Usuario userFound = usuario.get();

        if (!passwordEncoder.matches(request.getContraseña(), userFound.getContraseña())) {
            throw new RuntimeException("Contraseña incorrecta");
        }
        
        String jwt = jwtService.generateToken(userFound.getId_usuario(), userFound.getNombre(), userFound.getRolId());

        response.setMensaje("Inicio de sesión exitoso");
        response.setJwt(jwt);
        return response;
    }

    /**
     * Esto es el refresco de el token
     * @param token jwt viejo
     * @return nuevo token
     */
    public RefreshTokenResponseDTO refreshToken(String token) {
        String jwt = jwtService.refreshToken(token);
        RefreshTokenResponseDTO response = new RefreshTokenResponseDTO();
        response.setMensaje("ok");
        response.setJwt(jwt);
        return response;
    }
}