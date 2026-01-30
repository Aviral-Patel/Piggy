package com.piggy.backend.dto;

import com.piggy.backend.entity.Role;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class UserDTOTest {

    @Test
    void testUserDTODefaultConstructor() {
        UserDTO dto = new UserDTO();
        assertNotNull(dto);
    }

    @Test
    void testUserDTOParameterizedConstructor() {
        UserDTO dto = new UserDTO(1L, "testuser", Role.USER);
        assertEquals(1L, dto.getId());
        assertEquals("testuser", dto.getUsername());
        assertEquals(Role.USER, dto.getRole());
    }

    @Test
    void testSetAndGetId() {
        UserDTO dto = new UserDTO();
        dto.setId(100L);
        assertEquals(100L, dto.getId());
    }

    @Test
    void testSetAndGetUsername() {
        UserDTO dto = new UserDTO();
        dto.setUsername("newuser");
        assertEquals("newuser", dto.getUsername());
    }

    @Test
    void testSetAndGetRole() {
        UserDTO dto = new UserDTO();
        dto.setRole(Role.ADMIN);
        assertEquals(Role.ADMIN, dto.getRole());
    }

    @Test
    void testUserDTOWithAdminRole() {
        UserDTO dto = new UserDTO(1L, "admin", Role.ADMIN);
        assertEquals(Role.ADMIN, dto.getRole());
    }

    @Test
    void testUserDTOWithMakerRole() {
        UserDTO dto = new UserDTO(1L, "maker", Role.MAKER);
        assertEquals(Role.MAKER, dto.getRole());
    }

    @Test
    void testUserDTOWithCheckerRole() {
        UserDTO dto = new UserDTO(1L, "checker", Role.CHECKER);
        assertEquals(Role.CHECKER, dto.getRole());
    }

    @Test
    void testAllRoles() {
        UserDTO dto = new UserDTO();
        for (Role role : Role.values()) {
            dto.setRole(role);
            assertEquals(role, dto.getRole());
        }
    }

    @Test
    void testNullValues() {
        UserDTO dto = new UserDTO();
        assertNull(dto.getId());
        assertNull(dto.getUsername());
        assertNull(dto.getRole());
    }
}
