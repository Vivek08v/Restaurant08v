package com.vivek08v.server.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vivek08v.server.utils.CustomUserDetails;

@RestController
@RequestMapping("/api/v1/test")
public class TestController {

    @GetMapping("/auth")
    public ResponseEntity<?> testAuth() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        
        if (auth != null && auth.getPrincipal() instanceof CustomUserDetails) {
            CustomUserDetails userDetails = (CustomUserDetails) auth.getPrincipal();
            return ResponseEntity.ok(Map.of(
                "message", "Authentication successful",
                "userId", userDetails.getId(),
                "email", userDetails.getUsername(),
                "role", userDetails.getRole()
            ));
        }
        
        return ResponseEntity.ok(Map.of("message", "No authentication found"));
    }

    @GetMapping("/admin")
    public ResponseEntity<?> adminOnly() {
        return ResponseEntity.ok(Map.of("message", "Admin access granted"));
    }

    @GetMapping("/customer")
    public ResponseEntity<?> customerOnly() {
        return ResponseEntity.ok(Map.of("message", "Customer access granted"));
    }
} 