package com.piggy.backend.dto;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class AuthRequestTest {

    @Test
    void testAuthRequestCreation() {
        AuthRequest request = new AuthRequest();
        assertNotNull(request);
    }

    @Test
    void testSetAndGetUsername() {
        AuthRequest request = new AuthRequest();
        request.setUsername("testuser");
        assertEquals("testuser", request.getUsername());
    }

    @Test
    void testSetAndGetPassword() {
        AuthRequest request = new AuthRequest();
        request.setPassword("password123");
        assertEquals("password123", request.getPassword());
    }

    @Test
    void testNullUsername() {
        AuthRequest request = new AuthRequest();
        assertNull(request.getUsername());
    }

    @Test
    void testNullPassword() {
        AuthRequest request = new AuthRequest();
        assertNull(request.getPassword());
    }

    @Test
    void testEmptyUsername() {
        AuthRequest request = new AuthRequest();
        request.setUsername("");
        assertEquals("", request.getUsername());
    }

    @Test
    void testEmptyPassword() {
        AuthRequest request = new AuthRequest();
        request.setPassword("");
        assertEquals("", request.getPassword());
    }
}
