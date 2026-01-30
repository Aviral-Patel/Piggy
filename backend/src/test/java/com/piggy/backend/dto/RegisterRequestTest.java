package com.piggy.backend.dto;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class RegisterRequestTest {

    @Test
    void testRegisterRequestCreation() {
        RegisterRequest request = new RegisterRequest();
        assertNotNull(request);
    }

    @Test
    void testSetAndGetUsername() {
        RegisterRequest request = new RegisterRequest();
        request.setUsername("newuser");
        assertEquals("newuser", request.getUsername());
    }

    @Test
    void testSetAndGetPassword() {
        RegisterRequest request = new RegisterRequest();
        request.setPassword("securepassword");
        assertEquals("securepassword", request.getPassword());
    }

    @Test
    void testNullUsername() {
        RegisterRequest request = new RegisterRequest();
        assertNull(request.getUsername());
    }

    @Test
    void testNullPassword() {
        RegisterRequest request = new RegisterRequest();
        assertNull(request.getPassword());
    }

    @Test
    void testUsernameWithSpecialCharacters() {
        RegisterRequest request = new RegisterRequest();
        request.setUsername("user@email.com");
        assertEquals("user@email.com", request.getUsername());
    }

    @Test
    void testPasswordWithSpecialCharacters() {
        RegisterRequest request = new RegisterRequest();
        request.setPassword("P@ssw0rd!#$%");
        assertEquals("P@ssw0rd!#$%", request.getPassword());
    }
}
