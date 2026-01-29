package com.piggy.backend.service;

import com.piggy.backend.dto.UpdateUserRoleRequest;
import com.piggy.backend.dto.UserDTO;
import com.piggy.backend.entity.Role;
import com.piggy.backend.entity.User;
import com.piggy.backend.exception.BadRequestException;
import com.piggy.backend.exception.ForbiddenException;
import com.piggy.backend.exception.ResourceNotFoundException;
import com.piggy.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AdminService {

    private final UserRepository userRepository;

    public AdminService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<UserDTO> getAllNonAdminUsers() {
        List<User> users = userRepository.findByRoleNot(Role.ADMIN);
        return users.stream()
                .map(user -> new UserDTO(user.getId(), user.getUsername(), user.getRole()))
                .collect(Collectors.toList());
    }

    public UserDTO updateUserRole(Long userId, UpdateUserRoleRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        // Prevent changing admin role
        if (user.getRole() == Role.ADMIN) {
            throw new ForbiddenException("Cannot modify admin user role");
        }

        // Validate the new role
        if (request.getRole() == null) {
            throw new BadRequestException("Role is required");
        }

        user.setRole(request.getRole());
        userRepository.save(user);

        return new UserDTO(user.getId(), user.getUsername(), user.getRole());
    }
}
