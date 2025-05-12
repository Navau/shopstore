package com.example.shop.auth.application.dtos;

import java.time.LocalDate;

import jakarta.validation.constraints.*;
import lombok.*;

@Getter
@Setter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RegisterUserRequest {

    @NotBlank
    private String firstName;

    @NotBlank
    private String lastName;

    @NotBlank
    private String address;

    @Email
    @NotBlank
    private String email;

    @NotNull
    @Past
    private LocalDate dateOfBirth;

    @NotBlank
    @Size(min = 8)
    private String password;

}
