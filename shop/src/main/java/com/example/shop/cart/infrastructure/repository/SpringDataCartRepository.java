package com.example.shop.cart.infrastructure.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.shop.cart.domain.model.Cart;

public interface SpringDataCartRepository
        extends JpaRepository<Cart, UUID> {

    Optional<Cart> findByUserId(UUID userId);
}
