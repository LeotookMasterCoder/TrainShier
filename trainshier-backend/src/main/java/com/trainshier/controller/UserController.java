package com.trainshier.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.trainshier.dto.MessageResponseDTO;
import com.trainshier.dto.UsuarioRequestDTO;
import com.trainshier.dto.UsuarioResponseDTO;
import com.trainshier.enums.RolEnum;
import com.trainshier.security.RequiresRol;
import com.trainshier.service.UsuarioService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/usuario")
@RequiredArgsConstructor
public class UserController {

    private final UsuarioService usuarioService;

    /**
     * 
     * @param request
     * @return
     */
    @PostMapping
    @RequiresRol({ RolEnum.admin, RolEnum.instructor})
    public ResponseEntity<MessageResponseDTO> save(@RequestBody UsuarioRequestDTO request) {
        try {
            MessageResponseDTO response = usuarioService.save(request);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    /**
     * 
     * @return 
     */
    @GetMapping
    @RequiresRol({ RolEnum.aprendiz, RolEnum.admin, RolEnum.instructor })
    public ResponseEntity<List<UsuarioResponseDTO>> findAll() {
        try {
            List<UsuarioResponseDTO> response = usuarioService.findAll();
            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }
}
