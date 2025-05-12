package com.example.shop.auth.application.service;

import java.util.UUID;

import com.example.shop.auth.application.dtos.UserRequestUpdate;
import com.example.shop.auth.application.dtos.UserResponse;

public interface UserService {

    UserResponse getUser(UUID id);

    UserResponse getUserByEmail(String email);

    void updateUser(UUID id, UserRequestUpdate user);

    void deleteUser(UUID id);
}
