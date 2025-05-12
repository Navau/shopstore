package com.example.shop.cart.domain.repository;

import java.util.Optional;
import java.util.UUID;

import com.example.shop.cart.domain.model.Cart;

public interface CartRepository {

    Optional<Cart> findByUserId(UUID userId);

    Cart save(Cart cart);

    void delete(Cart cart);
}
