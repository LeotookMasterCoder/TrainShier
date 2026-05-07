package com.trainshier.filter;

import java.io.IOException;

import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.trainshier.service.JwtService;

import jakarta.servlet.FilterChain;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Component
public class JwtValidationFilter extends OncePerRequestFilter {
    private final JwtService jwtService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterchain)
            throws IOException {
        // Se obtiene el encabezado y se busca el encabezado llamado Authorization
        String authHeader = request.getHeader("Authorization");

        // El token debe de existir y empezar con la palabra "Bearer "
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.setContentType("application/json");
            response.getWriter().write("{\"error\": \"Header Authorization is missing in the request\"}");
            return; // se corta el flujo pa que no llegue a el controller
        }

        // Limpieza del token, extraemos solo el string del JWT, saltandonos los
        // primeros 7 caracteres ("Bearer ")
        String token = authHeader.substring(7);

        try {
            // Usamos el servicio para ver si la firma es real y si no ha expirado
            if (jwtService.isTokenValid(token)) {
                String username = jwtService.extractNombreusu(token);
                Long userId = jwtService.extractUsuarioId(token);
                Long rolId = jwtService.extractRolId(token);

                request.setAttribute("username", username);
                request.setAttribute("userId", userId);
                request.setAttribute("rolId", rolId);


                filterchain.doFilter(request, response);
            } else {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.setContentType("application/json");
                response.getWriter().write("{\"error\": \"Token is invalid or expired\"}");
            }
        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.setContentType("application/json");
            response.getWriter().write("{\"error\": \"Validation failed\"}");
        }
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        String path = request.getRequestURI();

        // Son rutas publicas para que el usuario entre sin necesidad de tener un token
        return path.equals("/auth/login") ||
                path.equals("/auth/register") ||
                path.equals("/auth/refreshToken");
    }
}