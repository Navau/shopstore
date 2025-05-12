package com.example.shop.auth.application.dtos;

import jakarta.validation.constraints.*;
import lombok.*;

@Getter
@Setter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LoginResponse {

    @NotBlank
    private String accessToken;
    @NotBlank
    private long expiresIn;
}
