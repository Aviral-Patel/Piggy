package com.piggy.backend.controller;

import com.piggy.backend.dto.UpdateUserRoleRequest;
import com.piggy.backend.dto.UserDTO;
import com.piggy.backend.service.AdminService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @GetMapping("/users")
    public ResponseEntity<List<UserDTO>> getAllNonAdminUsers() {
        List<UserDTO> users = adminService.getAllNonAdminUsers();
        return ResponseEntity.ok(users);
    }

    @PutMapping("/users/{userId}/role")
    public ResponseEntity<UserDTO> updateUserRole(
            @PathVariable Long userId,
            @RequestBody UpdateUserRoleRequest request) {
        UserDTO updatedUser = adminService.updateUserRole(userId, request);
        return ResponseEntity.ok(updatedUser);
    }
}
