package com.example.shop.order.application.service;

import java.util.List;
import java.util.UUID;

import com.example.shop.order.application.dto.OrderCreateResponseDto;
import com.example.shop.order.application.dto.OrderDetailDto;
import com.example.shop.order.application.dto.OrderSummaryDto;
import com.example.shop.order.application.dto.OrderUpdateRequestDto;

public interface OrderService {

    OrderCreateResponseDto createOrder(UUID userId);

    void updateOrder(UUID id, OrderUpdateRequestDto order);

    List<OrderSummaryDto> listOrders(UUID userId);

    OrderDetailDto getOrderById(UUID userId, UUID orderId);
}
