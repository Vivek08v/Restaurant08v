package com.vivek08v.server.utils;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
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

        // Skip JWT validation for OPTIONS requests, auth endpoints, and health endpoints
        if ("OPTIONS".equalsIgnoreCase(req.getMethod()) || 
            uri.startsWith("/api/v1/auth/") || 
            uri.equals("/health") || 
            uri.equals("/")) {
            System.out.println("Skipping JWT validation for: " + uri);
            chain.doFilter(req, res);
            return;
        }

        String authHeader = req.getHeader("Authorization");
        System.out.println("Authorization Header: " + authHeader);
        
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            System.out.println("Extracted token: " + token.substring(0, Math.min(20, token.length())) + "...");

            try {
                if (jwtUtil.validateToken(token)) {
                    Integer userId = jwtUtil.extractUserId(token);
                    String email = jwtUtil.extractUsername(token);
                    String role = jwtUtil.extractRole(token);

                    System.out.println("Token validated successfully for user: " + email + " with role: " + role);

                    CustomUserDetails userDetails = new CustomUserDetails(userId, email, role);
                    UsernamePasswordAuthenticationToken authToken =
                        new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                    
                    System.out.println("Authentication set in SecurityContext");
                } else {
                    System.out.println("Invalid JWT token");
                    res.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                    res.getWriter().write("Invalid token");
                    return;
                }
            } catch (Exception e) {
                System.out.println("JWT processing error: " + e.getMessage());
                res.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                res.getWriter().write("Token processing error");
                return;
            }
        } else {
            System.out.println("No valid Authorization header found");
            res.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            res.getWriter().write("Authorization header required");
            return;
        }

        chain.doFilter(req, res);
    }

}
