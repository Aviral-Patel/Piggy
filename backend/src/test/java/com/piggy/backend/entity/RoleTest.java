package com.piggy.backend.entity;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class RoleTest {

    @Test
    void testRoleValues() {
        Role[] roles = Role.values();
        assertEquals(4, roles.length);
    }

    @Test
    void testRoleUser() {
        assertEquals("USER", Role.USER.name());
    }

    @Test
    void testRoleAdmin() {
        assertEquals("ADMIN", Role.ADMIN.name());
    }

    @Test
    void testRoleMaker() {
        assertEquals("MAKER", Role.MAKER.name());
    }

    @Test
    void testRoleChecker() {
        assertEquals("CHECKER", Role.CHECKER.name());
    }

    @Test
    void testRoleValueOf() {
        assertEquals(Role.USER, Role.valueOf("USER"));
        assertEquals(Role.ADMIN, Role.valueOf("ADMIN"));
        assertEquals(Role.MAKER, Role.valueOf("MAKER"));
        assertEquals(Role.CHECKER, Role.valueOf("CHECKER"));
    }
}
