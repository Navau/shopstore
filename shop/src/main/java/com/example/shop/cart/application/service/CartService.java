package com.example.shop.cart.application.service;

import java.util.UUID;

import com.example.shop.cart.application.dto.CartAddressUpdateDto;
import com.example.shop.cart.application.dto.CartItemInsertDto;
import com.example.shop.cart.application.dto.CartItemUpdateDto;
import com.example.shop.cart.application.dto.CartResponseDto;

public interface CartService {

    CartResponseDto getCart(UUID userId);

    void addItem(UUID userId, CartItemInsertDto dto);

    void updateItem(UUID userId, UUID productId, CartItemUpdateDto dto);

    void removeItem(UUID userId, UUID productId);

    void updateAddress(UUID userId, CartAddressUpdateDto dto);
}
