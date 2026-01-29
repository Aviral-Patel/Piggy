package com.piggy.backend.dto;

import com.piggy.backend.entity.Role;

public class AuthResponse {
    private String token;
    private Role role;

    public AuthResponse(String token) {
        this.token = token;
    }

    public AuthResponse(String token, Role role) {
        this.token = token;
        this.role = role;
    }

    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }
    
    public Role getRole() { return role; }
    public void setRole(Role role) { this.role = role; }
}
