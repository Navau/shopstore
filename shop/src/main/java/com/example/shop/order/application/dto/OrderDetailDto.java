package com.example.shop.order.application.dto;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import com.example.shop.order.domain.enums.OrderStatus;
import com.example.shop.order.domain.model.Order;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderDetailDto {

    private UUID orderId;
    private Instant orderDate;
    private String shippingAddress;
    private OrderStatus status;
    private BigDecimal total;
    private List<OrderItemDto> items;

    public OrderDetailDto(Order order) {
        this.orderId = order.getId();
        this.orderDate = order.getOrderDate();
        this.shippingAddress = order.getShippingAddress();
        this.status = order.getStatus();
        this.total = order.getTotal();
        this.items = order.getItems().stream()
                .map(OrderItemDto::new)
                .collect(Collectors.toList());
    }
}
