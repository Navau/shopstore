package com.example.shop.order.application.dto;

import java.math.BigDecimal;
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
public class OrderCreateResponseDto {

    private UUID orderId;
    private OrderStatus status;
    private BigDecimal total;

    public OrderCreateResponseDto(Order order) {
        this.orderId = order.getId();
        this.status = order.getStatus();
        this.total = order.getTotal();
    }
}
