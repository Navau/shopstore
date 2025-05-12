package com.example.shop.order.application.dto;

import java.math.BigDecimal;
import java.util.UUID;

import com.example.shop.order.domain.model.OrderItem;

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
public class OrderItemDto {

    private UUID productId;

    private String name;

    private String description;

    private String imageUrl;

    private BigDecimal price;

    private int availableQuantity;

    private int quantity;

    private BigDecimal unitPrice;

    public OrderItemDto(OrderItem item) {
        this.productId = item.getProduct().getId();
        this.name = item.getProduct().getName();
        this.description = item.getProduct().getDescription();
        this.imageUrl = item.getProduct().getImageUrl();
        this.price = item.getProduct().getPrice();
        this.availableQuantity = item.getProduct().getAvailableQuantity();
        this.quantity = item.getQuantity();
        this.unitPrice = item.getUnitPrice();
    }
}
