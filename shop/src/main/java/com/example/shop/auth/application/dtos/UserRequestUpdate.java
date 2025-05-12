package com.example.shop.auth.application.dtos;

import java.time.LocalDate;
import java.util.UUID;

import io.micrometer.common.lang.Nullable;
import jakarta.validation.constraints.Email;
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
public class UserRequestUpdate {

    @Nullable
    @Size(min = 1, max = 50)
    private String firstName;

    @Nullable
    @Size(min = 1, max = 50)
    private String lastName;

    @Nullable
    @Size(max = 200)
    private String address;

    @Nullable
    @Email
    private String email;

    @Nullable
    private LocalDate dateOfBirth;
}
