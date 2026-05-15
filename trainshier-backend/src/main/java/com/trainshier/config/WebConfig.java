package com.trainshier.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.trainshier.security.RolInterceptor;

import lombok.RequiredArgsConstructor;

// Configuracion adicional para registrar interceptores en spring
@RequiredArgsConstructor
@Configuration
public class WebConfig implements WebMvcConfigurer{
    private final RolInterceptor rolInterceptor;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {

        //Se registra el interceptor para que se ejecute en todas las rutas
        registry.addInterceptor(rolInterceptor);
    }
}