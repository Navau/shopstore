package com.example.shop.auth.infrastructure.controllers;

import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.shop.auth.application.dtos.ForgotPasswordDto;
import com.example.shop.auth.application.dtos.LoginRequest;
import com.example.shop.auth.application.dtos.LoginResponse;
import com.example.shop.auth.application.dtos.RegisterUserRequest;
import com.example.shop.auth.application.dtos.ResetPasswordDto;
import com.example.shop.auth.application.dtos.UserRequestUpdate;
import com.example.shop.auth.application.dtos.UserResponse;
import com.example.shop.auth.application.service.JwtService;
import com.example.shop.auth.application.service.PasswordResetService;
import com.example.shop.auth.application.service.UserRegistrationService;
import com.example.shop.auth.application.service.UserService;
import com.example.shop.auth.infrastructure.service.CustomUserDetails;
import com.example.shop.common.api.ApiResponse;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@AllArgsConstructor
public class AuthController {

    private final UserService userService;
    private final UserRegistrationService registrationService;
    private final AuthenticationManager authManager;
    private final JwtService jwtService;
    private final PasswordResetService passwordResetService;

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<Void>> register(
            @RequestBody @Valid RegisterUserRequest req
    ) {
        registrationService.register(req);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(ApiResponse.success(null));
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<LoginResponse>> login(
            @RequestBody @Valid LoginRequest req
    ) {
        Authentication auth = authManager.authenticate(
                new UsernamePasswordAuthenticationToken(req.getEmail(), req.getPassword())
        );
        String token = jwtService.generateToken(auth);
        LoginResponse payload = new LoginResponse(token, jwtService.getExpiration());
        return ResponseEntity.ok(ApiResponse.success("Login exitoso", payload));
    }

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<UserResponse>> me(Authentication auth) {
        String email = auth.getName();
        UserResponse profile = userService.getUserByEmail(email);
        return ResponseEntity.ok(ApiResponse.success(profile));
    }

    @PatchMapping("/me")
    public ResponseEntity<ApiResponse<UserResponse>> updateProfile(
            Authentication authentication,
            @RequestBody @Valid UserRequestUpdate req
    ) {
        CustomUserDetails principal = (CustomUserDetails) authentication.getPrincipal();
        UUID userId = principal.getId();
        userService.updateUser(userId, req);
        UserResponse updated = userService.getUser(userId);
        return ResponseEntity.ok(ApiResponse.success("Perfil actualizado", updated));
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<ApiResponse<Void>> forgotPassword(@RequestBody ForgotPasswordDto body) {
        passwordResetService.createAndSendToken(body.getEmail());
        return ResponseEntity.ok(ApiResponse.success(null));
    }

    @PostMapping("/reset-password")
    public ResponseEntity<ApiResponse<Void>> resetPassword(@RequestBody ResetPasswordDto dto) {
        passwordResetService.resetPassword(dto.getToken(), dto.getNewPassword());
        return ResponseEntity.ok(ApiResponse.success(null));
    }

}
