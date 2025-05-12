package com.example.shop.auth.application.service.impl;

import java.util.UUID;

import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.shop.auth.application.dtos.UserRequestUpdate;
import com.example.shop.auth.application.dtos.UserResponse;
import com.example.shop.auth.application.service.UserService;
import com.example.shop.auth.domain.models.User;
import com.example.shop.auth.domain.repositories.UserRepository;

import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    public UserResponse getUser(UUID id) {
        return userRepository.findById(id)
                .map(UserResponse::new)
                .orElseThrow(() -> new IllegalArgumentException("No se encontró el usuario con el id: " + id));
    }

    @Override
    public UserResponse getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .map(UserResponse::new)
                .orElseThrow(()
                        -> new UsernameNotFoundException("Usuario no encontrado: " + email)
                );
    }

    @Override
    public void updateUser(UUID id, UserRequestUpdate user) {
        User entity = userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("No se encontró el usuario con el id: " + id));

        if (user.getEmail() != null && !entity.getEmail().equals(user.getEmail())) {
            if (userRepository.existsByEmail(user.getEmail())) {
                throw new IllegalArgumentException("El email '" + user.getEmail() + "' ya se encuentra en uso.");
            }
            entity.setEmail(user.getEmail());
        }

        if (user.getFirstName() != null) {
            entity.setFirstName(user.getFirstName());
        }

        if (user.getLastName() != null) {
            entity.setLastName(user.getLastName());
        }

        if (user.getAddress() != null) {
            entity.setAddress(user.getAddress());
        }

        if (user.getDateOfBirth() != null) {
            entity.setDateOfBirth(user.getDateOfBirth());
        }

        userRepository.save(entity);
    }

    @Override
    public void deleteUser(UUID id) {
        User entity = userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("No se encontró el usuario con el id: " + id));

        userRepository.delete(entity);
    }

}
