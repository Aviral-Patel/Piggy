package com.piggy.backend.service;

import com.piggy.backend.config.JwtService;
import com.piggy.backend.dto.AuthRequest;
import com.piggy.backend.dto.AuthResponse;
import com.piggy.backend.dto.RegisterRequest;
import com.piggy.backend.entity.Role;
import com.piggy.backend.entity.User;
import com.piggy.backend.exception.BadRequestException;
import com.piggy.backend.exception.ForbiddenException;
import com.piggy.backend.exception.ResourceNotFoundException;
import com.piggy.backend.exception.UnauthorizedException;
import com.piggy.backend.repository.UserRepository;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService
    ) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public AuthResponse register(RegisterRequest request) {
        // Check if username already exists
        if (userRepository.findByUsername(request.getUsername()).isPresent()) {
            throw new BadRequestException("Username already exists");
        }

        // Validate input
        if (request.getUsername() == null || request.getUsername().trim().isEmpty()) {
            throw new BadRequestException("Username is required");
        }
        if (request.getPassword() == null || request.getPassword().trim().isEmpty()) {
            throw new BadRequestException("Password is required");
        }

        User user = new User();
        user.setUsername(request.getUsername());
        user.setPassword(
                passwordEncoder.encode(request.getPassword()));
        userRepository.save(user);

        return new AuthResponse(
                jwtService.generateToken(user.getUsername()),
                user.getRole());
    }

    public AuthResponse login(AuthRequest request) {
        User user = userRepository
                .findByUsername(request.getUsername())
                .orElseThrow(() -> new UnauthorizedException("Invalid username or password"));

        if (!passwordEncoder.matches(
                request.getPassword(),
                user.getPassword())) {
            throw new UnauthorizedException("Invalid username or password");
        }

        return new AuthResponse(
                jwtService.generateToken(user.getUsername()),
                user.getRole());
    }

    public AuthResponse adminLogin(AuthRequest request) {
        User user = userRepository
                .findByUsername(request.getUsername())
                .orElseThrow(() -> new UnauthorizedException("Invalid admin credentials"));

        // Verify password
        if (!passwordEncoder.matches(
                request.getPassword(),
                user.getPassword())) {
            throw new UnauthorizedException("Invalid admin credentials");
        }

        // Verify user has ADMIN role
        if (user.getRole() != Role.ADMIN) {
            throw new ForbiddenException("Access denied. Admin role required");
        }

        return new AuthResponse(
                jwtService.generateToken(user.getUsername()),
                user.getRole());
    }

    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }
}
