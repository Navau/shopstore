package com.example.shop.cart.infrastructure.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Repository;

import com.example.shop.cart.domain.model.Cart;
import com.example.shop.cart.domain.repository.CartRepository;

@Repository
public class JpaCartRepository implements CartRepository {

    private final SpringDataCartRepository springDataRepo;

    public JpaCartRepository(SpringDataCartRepository springDataRepo) {
        this.springDataRepo = springDataRepo;
    }

    @Override
    public Optional<Cart> findByUserId(UUID userId) {
        return springDataRepo.findByUserId(userId);
    }

    @Override
    public Cart save(Cart cart) {
        return springDataRepo.save(cart);
    }

    @Override
    public void delete(Cart cart) {
        springDataRepo.delete(cart);
    }
}
