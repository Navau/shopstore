package com.example.shop.cart.application.dto;

import java.math.BigDecimal;
import java.util.UUID;

import com.example.shop.cart.domain.model.CartItem;

import jakarta.persistence.Column;
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
public class CartItemResponseDto {

    private UUID productId;
    private String name;
    private String description;
    private String imageUrl;
    private BigDecimal price;

    @Column(name = "available_quantity", nullable = false)
    private int availableQuantity;
    private int quantity;

    public CartItemResponseDto(CartItem item) {
        this.productId = item.getProduct().getId();
        this.name = item.getProduct().getName();
        this.description = item.getProduct().getDescription();
        this.imageUrl = item.getProduct().getImageUrl();
        this.price = item.getProduct().getPrice();
        this.availableQuantity = item.getProduct().getAvailableQuantity();
        this.quantity = item.getQuantity();
    }
}
