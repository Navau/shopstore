package com.example.shop.order.application.dto;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.UUID;

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
public class OrderSummaryDto {

    private UUID orderId;
    private Instant orderDate;
    private OrderStatus status;
    private String shippingAddress;
    private BigDecimal total;

    public OrderSummaryDto(Order order) {
        this.orderId = order.getId();
        this.orderDate = order.getOrderDate();
        this.status = order.getStatus();
        this.shippingAddress = order.getShippingAddress();
        this.total = order.getTotal();
    }
}
