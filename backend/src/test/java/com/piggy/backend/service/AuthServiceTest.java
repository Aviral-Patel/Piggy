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
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JwtService jwtService;

    @InjectMocks
    private AuthService authService;

    private User testUser;
    private RegisterRequest registerRequest;
    private AuthRequest authRequest;

    @BeforeEach
    void setUp() {
        testUser = new User();
        testUser.setId(1L);
        testUser.setUsername("testuser");
        testUser.setPassword("encodedPassword");
        testUser.setRole(Role.USER);

        registerRequest = new RegisterRequest();
        registerRequest.setUsername("newuser");
        registerRequest.setPassword("password123");

        authRequest = new AuthRequest();
        authRequest.setUsername("testuser");
        authRequest.setPassword("password123");
    }

    @Test
    void testRegisterSuccess() {
        when(userRepository.findByUsername("newuser")).thenReturn(Optional.empty());
        when(passwordEncoder.encode("password123")).thenReturn("encodedPassword");
        when(userRepository.save(any(User.class))).thenReturn(testUser);
        when(jwtService.generateToken("newuser")).thenReturn("jwt-token");

        AuthResponse response = authService.register(registerRequest);

        assertNotNull(response);
        assertEquals("jwt-token", response.getToken());
        verify(userRepository).save(any(User.class));
    }

    @Test
    void testRegisterUsernameAlreadyExists() {
        when(userRepository.findByUsername("newuser")).thenReturn(Optional.of(testUser));

        assertThrows(BadRequestException.class, () -> authService.register(registerRequest));
    }

    @Test
    void testRegisterNullUsername() {
        registerRequest.setUsername(null);

        when(userRepository.findByUsername(null)).thenReturn(Optional.empty());

        assertThrows(BadRequestException.class, () -> authService.register(registerRequest));
    }

    @Test
    void testRegisterEmptyUsername() {
        registerRequest.setUsername("   ");

        when(userRepository.findByUsername("   ")).thenReturn(Optional.empty());

        assertThrows(BadRequestException.class, () -> authService.register(registerRequest));
    }

    @Test
    void testRegisterNullPassword() {
        registerRequest.setPassword(null);

        when(userRepository.findByUsername("newuser")).thenReturn(Optional.empty());

        assertThrows(BadRequestException.class, () -> authService.register(registerRequest));
    }

    @Test
    void testRegisterEmptyPassword() {
        registerRequest.setPassword("   ");

        when(userRepository.findByUsername("newuser")).thenReturn(Optional.empty());

        assertThrows(BadRequestException.class, () -> authService.register(registerRequest));
    }

    @Test
    void testLoginSuccess() {
        when(userRepository.findByUsername("testuser")).thenReturn(Optional.of(testUser));
        when(passwordEncoder.matches("password123", "encodedPassword")).thenReturn(true);
        when(jwtService.generateToken("testuser")).thenReturn("jwt-token");

        AuthResponse response = authService.login(authRequest);

        assertNotNull(response);
        assertEquals("jwt-token", response.getToken());
        assertEquals(Role.USER, response.getRole());
    }

    @Test
    void testLoginUserNotFound() {
        when(userRepository.findByUsername("testuser")).thenReturn(Optional.empty());

        assertThrows(UnauthorizedException.class, () -> authService.login(authRequest));
    }

    @Test
    void testLoginInvalidPassword() {
        when(userRepository.findByUsername("testuser")).thenReturn(Optional.of(testUser));
        when(passwordEncoder.matches("password123", "encodedPassword")).thenReturn(false);

        assertThrows(UnauthorizedException.class, () -> authService.login(authRequest));
    }

    @Test
    void testAdminLoginSuccess() {
        testUser.setRole(Role.ADMIN);
        when(userRepository.findByUsername("testuser")).thenReturn(Optional.of(testUser));
        when(passwordEncoder.matches("password123", "encodedPassword")).thenReturn(true);
        when(jwtService.generateToken("testuser")).thenReturn("admin-jwt-token");

        AuthResponse response = authService.adminLogin(authRequest);

        assertNotNull(response);
        assertEquals("admin-jwt-token", response.getToken());
        assertEquals(Role.ADMIN, response.getRole());
    }

    @Test
    void testAdminLoginUserNotFound() {
        when(userRepository.findByUsername("testuser")).thenReturn(Optional.empty());

        assertThrows(UnauthorizedException.class, () -> authService.adminLogin(authRequest));
    }

    @Test
    void testAdminLoginInvalidPassword() {
        testUser.setRole(Role.ADMIN);
        when(userRepository.findByUsername("testuser")).thenReturn(Optional.of(testUser));
        when(passwordEncoder.matches("password123", "encodedPassword")).thenReturn(false);

        assertThrows(UnauthorizedException.class, () -> authService.adminLogin(authRequest));
    }

    @Test
    void testAdminLoginNotAdmin() {
        testUser.setRole(Role.USER);
        when(userRepository.findByUsername("testuser")).thenReturn(Optional.of(testUser));
        when(passwordEncoder.matches("password123", "encodedPassword")).thenReturn(true);

        assertThrows(ForbiddenException.class, () -> authService.adminLogin(authRequest));
    }

    @Test
    void testGetUserByUsernameSuccess() {
        when(userRepository.findByUsername("testuser")).thenReturn(Optional.of(testUser));

        User user = authService.getUserByUsername("testuser");

        assertNotNull(user);
        assertEquals("testuser", user.getUsername());
    }

    @Test
    void testGetUserByUsernameNotFound() {
        when(userRepository.findByUsername("nonexistent")).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> authService.getUserByUsername("nonexistent"));
    }
}
