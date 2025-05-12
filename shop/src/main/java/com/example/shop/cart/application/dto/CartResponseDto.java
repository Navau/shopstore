package com.example.shop.cart.application.dto;

import java.util.List;
import java.util.stream.Collectors;

import com.example.shop.cart.domain.model.Cart;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

/**
 * DTO que representa todo el carrito: lista de ítems + dirección de envío.
 */
@Getter
@Setter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CartResponseDto {

    private List<CartItemResponseDto> items;

    private String shippingAddress;

    public CartResponseDto(Cart cart) {
        this.items = cart.getItems().stream()
                .map(CartItemResponseDto::new)
                .collect(Collectors.toList());
        this.shippingAddress = cart.getShippingAddress();
    }
}
