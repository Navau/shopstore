package com.example.shop.order.application.service.impl;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.shop.cart.domain.model.Cart;
import com.example.shop.cart.domain.repository.CartRepository;
import com.example.shop.catalog.domain.model.CatalogItem;
import com.example.shop.order.application.dto.OrderCreateResponseDto;
import com.example.shop.order.application.dto.OrderDetailDto;
import com.example.shop.order.application.dto.OrderSummaryDto;
import com.example.shop.order.application.dto.OrderUpdateRequestDto;
import com.example.shop.order.application.service.OrderService;
import com.example.shop.order.domain.enums.OrderStatus;
import com.example.shop.order.domain.model.Order;
import com.example.shop.order.domain.model.OrderItem;
import com.example.shop.order.domain.repository.OrderRepository;

import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final CartRepository cartRepository;

    @Override
    public OrderCreateResponseDto createOrder(UUID userId) {
        Cart cart = cartRepository.findByUserId(userId)
                .orElseThrow(() -> new IllegalStateException("No se encontró un carrito para el usuario"));

        if (cart.getItems().isEmpty()) {
            throw new IllegalStateException("El carrito está vacío");
        }

        Order order = Order.builder()
                .userId(userId)
                .shippingAddress(cart.getShippingAddress())
                .orderDate(Instant.now())
                .status(OrderStatus.PENDING)
                .total(BigDecimal.ZERO)
                .build();

        cart.getItems().forEach(ci -> {
            CatalogItem product = ci.getProduct();
            OrderItem oi = OrderItem.builder()
                    .product(product)
                    .quantity(ci.getQuantity())
                    .unitPrice(product.getPrice())
                    .build();
            order.addItem(oi);
        });

        Order saved = orderRepository.save(order);
        cart.getItems().clear();
        cartRepository.save(cart);

        return new OrderCreateResponseDto(saved);
    }

    @Override
    public void updateOrder(UUID id, OrderUpdateRequestDto order) {
        Order entity = orderRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("No se encontró la orden con el id: " + id));

        if (order.getShippingAddress() != null && !order.getShippingAddress().isBlank()) {
            // Solo si sigue pendiente
            if (entity.getStatus() == OrderStatus.PENDING) {
                entity.setShippingAddress(order.getShippingAddress());
            } else {
                throw new IllegalStateException("Solo se puede cambiar dirección en estado PENDING");
            }
        }

        if (order.getStatus() != null) {
            entity.setStatus(order.getStatus());
        }

        if (order.getTotal() != null) {
            entity.setTotal(order.getTotal());
        }

        orderRepository.save(entity);
    }

    @Override
    @Transactional(readOnly = true)
    public List<OrderSummaryDto> listOrders(UUID userId) {
        return orderRepository.findByUserId(userId).stream()
                .map(OrderSummaryDto::new)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public OrderDetailDto getOrderById(UUID userId, UUID orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new IllegalArgumentException("Orden no encontrada: " + orderId));

        //? Verifica que la orden pertenezca al usuario
        if (!order.getUserId().equals(userId)) {
            throw new AccessDeniedException("No tienes permiso para ver esta orden");
        }

        return new OrderDetailDto(order);
    }
}
