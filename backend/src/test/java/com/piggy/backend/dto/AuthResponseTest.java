package com.piggy.backend.dto;

import com.piggy.backend.entity.Role;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class AuthResponseTest {

    @Test
    void testAuthResponseCreationWithToken() {
        AuthResponse response = new AuthResponse("jwt-token-123");
        assertNotNull(response);
        assertEquals("jwt-token-123", response.getToken());
    }

    @Test
    void testAuthResponseCreationWithTokenAndRole() {
        AuthResponse response = new AuthResponse("jwt-token-123", Role.USER);
        assertNotNull(response);
        assertEquals("jwt-token-123", response.getToken());
        assertEquals(Role.USER, response.getRole());
    }

    @Test
    void testSetAndGetToken() {
        AuthResponse response = new AuthResponse("initial-token");
        response.setToken("new-token");
        assertEquals("new-token", response.getToken());
    }

    @Test
    void testSetAndGetRole() {
        AuthResponse response = new AuthResponse("token");
        response.setRole(Role.ADMIN);
        assertEquals(Role.ADMIN, response.getRole());
    }

    @Test
    void testAuthResponseWithAdminRole() {
        AuthResponse response = new AuthResponse("admin-token", Role.ADMIN);
        assertEquals(Role.ADMIN, response.getRole());
    }

    @Test
    void testAuthResponseWithMakerRole() {
        AuthResponse response = new AuthResponse("maker-token", Role.MAKER);
        assertEquals(Role.MAKER, response.getRole());
    }

    @Test
    void testAuthResponseWithCheckerRole() {
        AuthResponse response = new AuthResponse("checker-token", Role.CHECKER);
        assertEquals(Role.CHECKER, response.getRole());
    }
}
