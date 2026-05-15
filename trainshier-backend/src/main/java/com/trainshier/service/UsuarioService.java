package com.trainshier.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.trainshier.dto.MessageResponseDTO;
import com.trainshier.dto.UsuarioRequestDTO;
import com.trainshier.dto.UsuarioResponseDTO;
import com.trainshier.entity.Usuario;
import com.trainshier.repository.UsuarioRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    //valida que el correo no este vinculado a otro usuario
    public MessageResponseDTO save(UsuarioRequestDTO request) {

        if (usuarioRepository.findByEmail(request.getCorreo()).isPresent()) {
            throw new RuntimeException("Ese correo ya esta en uso");
        }
        //crea el usuario
        Usuario usuario = new Usuario();
        usuario.setNombre(request.getNombre());
        usuario.setContraseña(passwordEncoder.encode(request.getContraseña()));
        usuario.setRolId(request.getRolid());
        //guarda el usuario
        usuarioRepository.save(usuario);

        //envia un mensaje informando que se creo el usuario
        MessageResponseDTO response = new MessageResponseDTO();
        response.setMensaje("Usuario creado correctamente");

        return response;
    }
    //funcionalidad listar usuarios
    public List<UsuarioResponseDTO> findAll() {

        List<Usuario> usuarios = usuarioRepository.findAll();
        List<UsuarioResponseDTO> response = new ArrayList<>();  

        for (Usuario usuario : usuarios) {
            UsuarioResponseDTO dto = new UsuarioResponseDTO();
            dto.setId_usuario(usuario.getId_usuario());
            dto.setNombre(usuario.getNombre());
            dto.setRolId(usuario.getRolId());
            dto.setCorreo(usuario.getCorreo());
            dto.setFecha_registro(usuario.getFecha_registro());
            response.add(dto);
        }

        return response;
    }
}
