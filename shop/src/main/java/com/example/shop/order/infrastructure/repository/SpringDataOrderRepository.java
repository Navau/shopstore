package com.example.shop.order.infrastructure.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.shop.order.domain.model.Order;

public interface SpringDataOrderRepository
        extends JpaRepository<Order, UUID> {

    List<Order> findAllByUserId(UUID userId);
}
