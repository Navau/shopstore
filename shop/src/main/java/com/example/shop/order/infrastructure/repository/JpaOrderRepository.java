package com.example.shop.order.infrastructure.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Repository;

import com.example.shop.order.domain.model.Order;
import com.example.shop.order.domain.repository.OrderRepository;

@Repository
public class JpaOrderRepository implements OrderRepository {

    private final SpringDataOrderRepository springRepo;

    public JpaOrderRepository(SpringDataOrderRepository springRepo) {
        this.springRepo = springRepo;
    }

    @Override
    public Order save(Order order) {
        return springRepo.save(order);
    }

    @Override
    public Optional<Order> findById(UUID orderId) {
        return springRepo.findById(orderId);
    }

    @Override
    public List<Order> findByUserId(UUID userId) {
        return springRepo.findAllByUserId(userId);
    }
}
