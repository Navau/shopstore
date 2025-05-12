package com.example.shop.auth.application.service.impl;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.shop.auth.application.service.PasswordResetService;
import com.example.shop.auth.domain.models.PasswordResetToken;
import com.example.shop.auth.domain.models.User;
import com.example.shop.auth.domain.repositories.PasswordResetTokenRepository;
import com.example.shop.auth.domain.repositories.UserRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class PasswordResetServiceImpl implements PasswordResetService {

    private final UserRepository userRepo;
    private final PasswordResetTokenRepository tokenRepo;
    @Autowired
    private JavaMailSender mailSender;
    private final PasswordEncoder encoder;

    @Override
    public void createAndSendToken(String email) {
        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado"));

        String token = UUID.randomUUID().toString();
        Instant expiresAt = Instant.now().plus(1, ChronoUnit.HOURS);

        // Busca un token existente, o crea uno nuevo
        PasswordResetToken prt = tokenRepo.findByUser(user)
                .orElseGet(PasswordResetToken::new);

        prt.setUser(user);
        prt.setToken(token);
        prt.setExpiresAt(expiresAt);

        tokenRepo.save(prt);

        // Construye el enlace y envía el email
        String link = "http://localhost:5173/reset-password?token=" + token;
        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setTo(email);
        msg.setSubject("Recuperar contraseña");
        msg.setText("Haz clic en el siguiente enlace para restablecer tu contraseña:\n\n" + link);
        mailSender.send(msg);
    }

    @Override
    public void resetPassword(String token, String newPassword) {
        PasswordResetToken prt = tokenRepo.findByToken(token)
                .orElseThrow(() -> new IllegalArgumentException("Token inválido"));
        if (prt.getExpiresAt().isBefore(Instant.now())) {
            throw new IllegalArgumentException("Token expirado");
        }
        User user = prt.getUser();
        user.setPasswordHash(encoder.encode(newPassword));
        userRepo.save(user);
        tokenRepo.delete(prt);
    }
}
