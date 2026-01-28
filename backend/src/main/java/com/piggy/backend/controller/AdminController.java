package com.piggy.backend.controller;

import com.piggy.backend.dto.UpdateUserRoleRequest;
import com.piggy.backend.dto.UserDTO;
import com.piggy.backend.service.AdminService;
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
    public List<UserDTO> getAllNonAdminUsers() {
        return adminService.getAllNonAdminUsers();
    }

    @PutMapping("/users/{userId}/role")
    public UserDTO updateUserRole(
            @PathVariable Long userId,
            @RequestBody UpdateUserRoleRequest request) {
        return adminService.updateUserRole(userId, request);
    }
}
