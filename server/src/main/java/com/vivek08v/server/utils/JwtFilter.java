package com.vivek08v.server.utils;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtFilter implements Filter {

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
                
        HttpServletRequest req = (HttpServletRequest) request;
        HttpServletResponse res = (HttpServletResponse) response;
        
        String uri = req.getRequestURI();
        System.out.println("Request URI: " + uri);

        // ✅ 1. Allow OPTIONS (CORS preflight)
        if ("OPTIONS".equalsIgnoreCase(req.getMethod())) {
            res.setStatus(HttpServletResponse.SC_OK);
            chain.doFilter(request, response);
            return;
        }

        // ✅ 2. Allow public endpoints (like login/signup)
        if (uri.startsWith("/api/v1/auth/")) {
            chain.doFilter(request, response);
            return;
        }

        // ✅ 3. Check Authorization header
        String authHeader = req.getHeader("Authorization");
        System.out.println("Auth header: "+authHeader);

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            if (!jwtUtil.validateToken(token)) {
                res.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid Token");
                return;
            }
        } else {
            res.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Missing Token");
            return;
        }

        // ✅ 4. Proceed to the next filter if valid
        chain.doFilter(request, response);
    }
}

