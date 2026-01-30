package com.piggy.backend.exception;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class ExceptionTest {

    @Test
    void testBadRequestException() {
        BadRequestException exception = new BadRequestException("Bad request message");
        assertEquals("Bad request message", exception.getMessage());
        assertInstanceOf(RuntimeException.class, exception);
    }

    @Test
    void testUnauthorizedException() {
        UnauthorizedException exception = new UnauthorizedException("Unauthorized message");
        assertEquals("Unauthorized message", exception.getMessage());
        assertInstanceOf(RuntimeException.class, exception);
    }

    @Test
    void testForbiddenException() {
        ForbiddenException exception = new ForbiddenException("Forbidden message");
        assertEquals("Forbidden message", exception.getMessage());
        assertInstanceOf(RuntimeException.class, exception);
    }

    @Test
    void testResourceNotFoundException() {
        ResourceNotFoundException exception = new ResourceNotFoundException("Resource not found message");
        assertEquals("Resource not found message", exception.getMessage());
        assertInstanceOf(RuntimeException.class, exception);
    }

    @Test
    void testBadRequestExceptionThrown() {
        assertThrows(BadRequestException.class, () -> {
            throw new BadRequestException("Test bad request");
        });
    }

    @Test
    void testUnauthorizedExceptionThrown() {
        assertThrows(UnauthorizedException.class, () -> {
            throw new UnauthorizedException("Test unauthorized");
        });
    }

    @Test
    void testForbiddenExceptionThrown() {
        assertThrows(ForbiddenException.class, () -> {
            throw new ForbiddenException("Test forbidden");
        });
    }

    @Test
    void testResourceNotFoundExceptionThrown() {
        assertThrows(ResourceNotFoundException.class, () -> {
            throw new ResourceNotFoundException("Test not found");
        });
    }
}
