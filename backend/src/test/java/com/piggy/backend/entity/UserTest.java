package com.piggy.backend.entity;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class UserTest {

    @Test
    void testUserCreation() {
        User user = new User();
        assertNotNull(user);
    }

    @Test
    void testSetAndGetId() {
        User user = new User();
        user.setId(1L);
        assertEquals(1L, user.getId());
    }

    @Test
    void testSetAndGetUsername() {
        User user = new User();
        user.setUsername("testuser");
        assertEquals("testuser", user.getUsername());
    }

    @Test
    void testSetAndGetPassword() {
        User user = new User();
        user.setPassword("password123");
        assertEquals("password123", user.getPassword());
    }

    @Test
    void testDefaultRole() {
        User user = new User();
        assertEquals(Role.USER, user.getRole());
    }

    @Test
    void testSetAndGetRole() {
        User user = new User();
        user.setRole(Role.ADMIN);
        assertEquals(Role.ADMIN, user.getRole());
    }

    @Test
    void testSetRoleToMaker() {
        User user = new User();
        user.setRole(Role.MAKER);
        assertEquals(Role.MAKER, user.getRole());
    }

    @Test
    void testSetRoleToChecker() {
        User user = new User();
        user.setRole(Role.CHECKER);
        assertEquals(Role.CHECKER, user.getRole());
    }
}
