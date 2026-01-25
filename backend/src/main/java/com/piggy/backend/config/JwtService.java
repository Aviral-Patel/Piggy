package com.piggy.backend.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;

@Service
public class JwtService {

    private final Key signingKey;
    private final long expirationMs;

    public JwtService(
            @Value("${jwt.secret:}") String secretBase64,
            @Value("${jwt.expiration-ms:86400000}") long expirationMs
    ) {

        if (secretBase64 == null || secretBase64.isBlank()) {

            throw new IllegalStateException("JWT secret is not configured. Set 'jwt.secret' to a Base64-encoded key (at least 256 bits).");
        }
        byte[] keyBytes;
        try {
            keyBytes = Decoders.BASE64.decode(secretBase64);
        } catch (IllegalArgumentException e) {
            throw new IllegalStateException("Invalid Base64 in 'jwt.secret'. Provide a Base64-encoded key.", e);
        }
        if (keyBytes.length < 32) {
            throw new IllegalStateException("JWT secret key too short. Provide >= 256 bits (32 bytes) after Base64 decoding.");
        }
        this.signingKey = Keys.hmacShaKeyFor(keyBytes);
        this.expirationMs = expirationMs;
    }

    public String generateToken(String username) {
        long now = System.currentTimeMillis();
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date(now))
                .setExpiration(new Date(now + expirationMs))
                .signWith(signingKey, SignatureAlgorithm.HS256)
                .compact();
    }

    public String extractUsername(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(signingKey)
                .build()
                .parseClaimsJws(token)
                .getBody();
        return claims.getSubject();
    }
}
