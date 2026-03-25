package com.trainshier.controller;

import com.trainshier.dto.TransaccionDTO;
import com.trainshier.entity.Transaccion;
import com.trainshier.service.TransaccionService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transacciones")
@CrossOrigin("*")
public class TransaccionController {

    private final TransaccionService service;

    public TransaccionController(TransaccionService service){
        this.service = service;
    }

    @PostMapping
    public Transaccion guardar(@RequestBody TransaccionDTO dto){
        return service.guardar(dto);
    }

    @GetMapping
    public List<Transaccion> listar(){
        return service.listar();
    }

}