package com.trainshier.security;

import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import java.io.IOException;

public class JwtFilter implements Filter {

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        HttpServletRequest req = (HttpServletRequest) request;

        String auth = req.getHeader("Authorization");

        if(auth != null && auth.startsWith("Bearer ")){

            chain.doFilter(request, response);
        } else {
            chain.doFilter(request, response);
        }
    }
}