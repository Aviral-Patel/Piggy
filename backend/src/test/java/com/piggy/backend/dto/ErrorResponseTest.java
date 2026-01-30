package com.piggy.backend.dto;

import org.junit.jupiter.api.Test;
import java.time.LocalDateTime;
import static org.junit.jupiter.api.Assertions.*;

class ErrorResponseTest {

    @Test
    void testErrorResponseDefaultConstructor() {
        ErrorResponse response = new ErrorResponse();
        assertNotNull(response);
        assertNotNull(response.getTimestamp());
    }

    @Test
    void testErrorResponseParameterizedConstructor() {
        ErrorResponse response = new ErrorResponse(404, "Not Found", "Resource not found", "/api/users/1");
        
        assertNotNull(response.getTimestamp());
        assertEquals(404, response.getStatus());
        assertEquals("Not Found", response.getError());
        assertEquals("Resource not found", response.getMessage());
        assertEquals("/api/users/1", response.getPath());
    }

    @Test
    void testSetAndGetTimestamp() {
        ErrorResponse response = new ErrorResponse();
        LocalDateTime timestamp = LocalDateTime.of(2024, 1, 15, 10, 30);
        response.setTimestamp(timestamp);
        assertEquals(timestamp, response.getTimestamp());
    }

    @Test
    void testSetAndGetStatus() {
        ErrorResponse response = new ErrorResponse();
        response.setStatus(500);
        assertEquals(500, response.getStatus());
    }

    @Test
    void testSetAndGetError() {
        ErrorResponse response = new ErrorResponse();
        response.setError("Internal Server Error");
        assertEquals("Internal Server Error", response.getError());
    }

    @Test
    void testSetAndGetMessage() {
        ErrorResponse response = new ErrorResponse();
        response.setMessage("An unexpected error occurred");
        assertEquals("An unexpected error occurred", response.getMessage());
    }

    @Test
    void testSetAndGetPath() {
        ErrorResponse response = new ErrorResponse();
        response.setPath("/api/transactions");
        assertEquals("/api/transactions", response.getPath());
    }

    @Test
    void testBadRequestError() {
        ErrorResponse response = new ErrorResponse(400, "Bad Request", "Invalid input", "/api/auth/register");
        assertEquals(400, response.getStatus());
        assertEquals("Bad Request", response.getError());
    }

    @Test
    void testUnauthorizedError() {
        ErrorResponse response = new ErrorResponse(401, "Unauthorized", "Invalid credentials", "/api/auth/login");
        assertEquals(401, response.getStatus());
        assertEquals("Unauthorized", response.getError());
    }

    @Test
    void testForbiddenError() {
        ErrorResponse response = new ErrorResponse(403, "Forbidden", "Access denied", "/api/admin/users");
        assertEquals(403, response.getStatus());
        assertEquals("Forbidden", response.getError());
    }

    @Test
    void testTimestampIsSetOnCreation() {
        LocalDateTime before = LocalDateTime.now().minusSeconds(1);
        ErrorResponse response = new ErrorResponse();
        LocalDateTime after = LocalDateTime.now().plusSeconds(1);
        
        assertTrue(response.getTimestamp().isAfter(before));
        assertTrue(response.getTimestamp().isBefore(after));
    }
}
