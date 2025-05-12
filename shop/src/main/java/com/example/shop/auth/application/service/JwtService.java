package com.example.shop.auth.application.service;

import org.springframework.security.core.Authentication;

public interface JwtService {

    String generateToken(Authentication auth);

    boolean validateToken(String token);

    String getUsernameFromToken(String token);

    long getExpiration();
}
