package com.example.shop.auth.application.service;

public interface PasswordResetService {

    void createAndSendToken(String email);

    void resetPassword(String token, String newPassword);
}
