package com.example.shop.auth.application.service.impl;

import java.time.LocalDate;
import java.time.Period;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.shop.auth.application.dtos.RegisterUserRequest;
import com.example.shop.auth.application.service.UserRegistrationService;
import com.example.shop.auth.domain.models.User;
import com.example.shop.auth.domain.repositories.UserRepository;

@Service
@Transactional
public class UserRegistrationServiceImpl implements UserRegistrationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserRegistrationServiceImpl(UserRepository userRepository,
            PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void register(RegisterUserRequest req) {
        Period age = Period.between(req.getDateOfBirth(), LocalDate.now());
        if (age.getYears() < 18) {
            throw new IllegalArgumentException("Debe ser mayor de 18 años");
        }
        if (userRepository.existsByEmail(req.getEmail())) {
            throw new IllegalStateException("Email ya registrado");
        }
        User u = new User();
        u.setFirstName(req.getFirstName());
        u.setLastName(req.getLastName());
        u.setAddress(req.getAddress());
        u.setEmail(req.getEmail());
        u.setPasswordHash(passwordEncoder.encode(req.getPassword()));
        u.setDateOfBirth(req.getDateOfBirth());

        userRepository.save(u);
    }
}
