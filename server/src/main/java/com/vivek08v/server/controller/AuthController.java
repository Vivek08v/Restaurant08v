package com.vivek08v.server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vivek08v.server.model.User;
import com.vivek08v.server.repo.UserRepo;
import com.vivek08v.server.utils.JwtUtil;

@RestController
@RequestMapping("api/v1/auth")
public class AuthController {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserRepo userRepo;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        System.out.println("hi from server");
        // Here you would typically query user by email and verify password
        // if (request.getEmail().equals("admin") && request.getPassword().equals("password")) {
        //     String token = jwtUtil.generateToken(request.getEmail());
        //     return ResponseEntity.ok(new AuthResponse(token));
        // }
        // return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");

        try {
            // 1. Validate input
            if (request.getEmail() == null || request.getPassword() == null) {
                return ResponseEntity.badRequest().body("Email and password are required");
            }

            User user = userRepo.findByEmail(request.getEmail());
            if (user == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
            }

            // Example password check if you had password in DB
            // if (!request.getPassword().equals("password")) {
            //     return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
            // }

            // 2. Hardcoded check (temporary - replace with database check)

            System.out.println(user.getPassword() + request.getPassword());
            if (user.getEmail().equals(request.getEmail()) && user.getPassword().equals(request.getPassword())) {
                System.out.println("hii11");
                String token = jwtUtil.generateToken(request.getEmail());
                System.out.println("Login successful, token generated");
                return ResponseEntity.ok(new AuthResponse(token));
            }

            System.out.println("Invalid credentials");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");

        } catch (Exception e) {
            System.out.println("Login error: " + e.getMessage());
            return ResponseEntity.internalServerError().body("Login failed");
        }
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody SignupRequest request) {
        if (userRepo.existsByEmail(request.getEmail())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email already exists");
        }

        User newUser = new User();
        newUser.setName(request.getName());
        newUser.setEmail(request.getEmail());
        newUser.setAddress(request.getAddress());
        newUser.setPassword(request.getPassword());

        userRepo.save(newUser);

        String token = jwtUtil.generateToken(request.getEmail());
        return ResponseEntity.status(HttpStatus.CREATED).body(new AuthResponse(token));
    }
}

class LoginRequest {
    private String email;
    private String password;

    public void setEmail(String email){
        this.email = email;
    }
    public String getEmail(){
        return email;
    }

    public void setPassword(String password){
        this.password = password;
    }
    public String getPassword(){
        return password;
    }
}


class SignupRequest {
    private String name;
    private String email;
    private String password;
    private String address;

    public void setEmail(String email){
        this.email = email;
    }
    public String getEmail(){
        return email;
    }

    public void setName(String name){
        this.name = name;
    }
    public String getName(){
        return name;
    }

    public void setPassword(String password){
        this.password = password;
    }
    public String getPassword(){
        return password;
    }

    public void setAddress(String address){
        this.address = address;
    }
    public String getAddress(){
        return address;
    }
}

class AuthResponse {
    private String token;
    public AuthResponse(String token) {
        this.token = token;
    }
    public String getToken() {
        return token;
    }
}

