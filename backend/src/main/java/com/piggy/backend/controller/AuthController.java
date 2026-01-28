package com.piggy.backend.controller;

import com.piggy.backend.dto.AuthRequest;
import com.piggy.backend.dto.AuthResponse;
import com.piggy.backend.dto.RegisterRequest;
import com.piggy.backend.dto.UserDTO;
import com.piggy.backend.entity.User;
import com.piggy.backend.service.AuthService;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
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

    @PostMapping("/admin/login")
    public AuthResponse adminLogin(
            @RequestBody AuthRequest request) {
        return authService.adminLogin(request);
    }

    @GetMapping("/me")
    public UserDTO getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        
        User user = authService.getUserByUsername(username);
        return new UserDTO(user.getId(), user.getUsername(), user.getRole());
    }
    
}
