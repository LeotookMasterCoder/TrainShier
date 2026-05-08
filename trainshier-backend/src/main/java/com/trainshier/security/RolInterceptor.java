package com.trainshier.security;

import java.util.Arrays;

import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
@Component
public class RolInterceptor implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, 
        //verifica que el handler es un metodo de el controller 
        Object handler) throws Exception{
            if (!(handler instanceof HandlerMethod method)) {
                return true;
            }
            //Se busca la anotacion @RequiresRol
            RequiresRol annotation= method.getMethodAnnotation(RequiresRol.class);
            if (annotation == null) {
                //si no esta en el metodo, la busca en el controller
                annotation = method.getBeanType().getAnnotation(RequiresRol.class);
            }
            if (annotation == null) {
                return true;
            }
            Object rol= request.getAttribute("rolId");
            if (!(rol instanceof Long rolId)) {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.setContentType("application/json");
                response.getWriter().write("{\"error\": \"Usuario no autenticado\"}");
                return false;
            }
            //valida que el rol de el usuario este dentro de los roles permitidos
            boolean hasrol= Arrays.stream(annotation.value()).anyMatch(role->role.getId()== rolId);
            //si no esta, le retorna el error 403
            if (!hasrol) {
             response.setStatus(HttpServletResponse.SC_FORBIDDEN);
            response.setContentType("application/json");
            response.getWriter().write("{\"error\": \"No estas autorizado para hacer esta accion\"}");
            return false;
            }
            //si todo bien, entonces tiene permiso para ir a el controller
            return true;
    }
}
