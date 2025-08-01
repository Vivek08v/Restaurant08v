package com.vivek08v.server.utils;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest req, HttpServletResponse res, FilterChain chain)
            throws ServletException, IOException {
        System.out.println("---- JWT FILTER STARTED ----");
        System.out.println("Request URI: " + req.getRequestURI());
        System.out.println("Method: " + req.getMethod());
        String uri = req.getRequestURI();

        if ("OPTIONS".equalsIgnoreCase(req.getMethod()) || uri.startsWith("/api/v1/auth/")) {
            chain.doFilter(req, res);
            return;
        }

        String authHeader = req.getHeader("Authorization");
        System.out.println("Authorization Header: " + authHeader); // (POINT 2)
        
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);

            if (jwtUtil.validateToken(token)) {
                String email = jwtUtil.extractUsername(token);
                String role = jwtUtil.extractRole(token);

                var authorities = List.of(new SimpleGrantedAuthority("ROLE_" + role.toUpperCase()));
                var authToken = new UsernamePasswordAuthenticationToken(email, null, authorities);
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }

        chain.doFilter(req, res);
    }


}

