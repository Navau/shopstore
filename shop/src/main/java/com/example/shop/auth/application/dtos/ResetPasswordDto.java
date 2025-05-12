package com.example.shop.auth.application.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ResetPasswordDto {

    @NotBlank(message = "El token es requerido")
    private String token;

    @NotBlank(message = "La nueva contrase a es requerida")
    @Size(min = 8, message = "La nueva contrase a debe tener al menos 8 caracteres")
    private String newPassword;

}
