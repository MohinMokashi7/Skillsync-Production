package com.example.SkillSync.security;

import org.springframework.beans.factory.annotation.Value; // <-- Import this
import org.springframework.stereotype.Component;
import org.springframework.security.core.Authentication;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import java.util.Date;
import java.security.Key;

@Component
public class JwtTokenProvider {

    @Value("${app.jwt-secret}")
    private String jwtSecret;

    @Value("${app.jwt-expiration-ms}")
    private int jwtExpirationInMs;

    // 1. Helper method to parse the secret string into a real cryptographic key
    private Key getSigningKey() {
        return Keys.hmacShaKeyFor(jwtSecret.getBytes());
    }

    // 2. The method that CREATES the token
    public String generateToken(Authentication authentication) {
        String username = authentication.getName(); // Get the user's email
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + jwtExpirationInMs);

        // Build the token
        return Jwts.builder()
                .setSubject(username) // The "subject" is the user
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(getSigningKey(), SignatureAlgorithm.HS512) // Sign it with our secret key
                .compact();
    }

    // 3. The method that READS the username from the token
    public String getUsernameFromToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    // 4. The method that VALIDATES if the token is good
    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(getSigningKey())
                    .build()
                    .parseClaimsJws(token);
            return true;
        } catch (Exception ex) {
            // Catches any error (expired, tampered, wrong signature)
            return false;
        }
    }
}