package com.trainshier.service;

import com.trainshier.dto.TransaccionDTO;
import com.trainshier.entity.Transaccion;
import com.trainshier.repository.TransaccionRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TransaccionService {

    private final TransaccionRepository repo;

    public TransaccionService(TransaccionRepository repo){
        this.repo = repo;
    }

    public Transaccion guardar(TransaccionDTO dto){

        Transaccion t = new Transaccion();

        t.setAprendiz(dto.getAprendiz());
        t.setTotal(dto.getTotal());
        t.setEstado(dto.getEstado());
        t.setMetodoPago(dto.getMetodoPago());
        t.setTiempo(dto.getTiempo());
        t.setFecha(LocalDateTime.now());

        return repo.save(t);
    }

    public List<Transaccion> listar(){
        return repo.findAll();
    }

}