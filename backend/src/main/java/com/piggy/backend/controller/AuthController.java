package com.piggy.backend.controller;

import com.piggy.backend.dto.AuthRequest;
import com.piggy.backend.dto.AuthResponse;
import com.piggy.backend.dto.RegisterRequest;
import com.piggy.backend.service.AuthService;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public AuthResponse register(
            @RequestBody RegisterRequest request) {
        return authService.register(request);
    }

    @PostMapping("/login")
    public AuthResponse login(
            @RequestBody AuthRequest request) {
        return authService.login(request);
    }
    @Value("${jwt.secret:}")
    private String jwtSecret;


    @GetMapping("/envcheck")
    public String check() {
        return "scdsc"+jwtSecret.length();
    }
}
