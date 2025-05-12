package com.example.shop.order.application.dto;

import java.math.BigDecimal;

import com.example.shop.order.domain.enums.OrderStatus;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderUpdateRequestDto {

    private String shippingAddress;

    private OrderStatus status;

    private BigDecimal total;
}
