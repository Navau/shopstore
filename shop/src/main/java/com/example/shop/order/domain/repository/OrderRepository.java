package com.example.shop.order.domain.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import com.example.shop.order.domain.model.Order;

public interface OrderRepository {

    //? Guarda o actualiza una orden
    Order save(Order order);

    //? Busca una orden por su UUID
    Optional<Order> findById(UUID orderId);

    //? Lista todas las órdenes de un usuario
    List<Order> findByUserId(UUID userId);
}
