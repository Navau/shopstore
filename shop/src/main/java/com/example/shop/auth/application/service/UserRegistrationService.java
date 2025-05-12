package com.example.shop.auth.application.service;

import com.example.shop.auth.application.dtos.RegisterUserRequest;

public interface UserRegistrationService {

    void register(RegisterUserRequest request);
}
