package com.example.shop.cart.application.service.impl;

import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.shop.cart.application.dto.CartAddressUpdateDto;
import com.example.shop.cart.application.dto.CartItemInsertDto;
import com.example.shop.cart.application.dto.CartItemUpdateDto;
import com.example.shop.cart.application.dto.CartResponseDto;
import com.example.shop.cart.application.service.CartService;
import com.example.shop.cart.domain.model.Cart;
import com.example.shop.cart.domain.repository.CartRepository;
import com.example.shop.catalog.domain.model.CatalogItem;
import com.example.shop.catalog.domain.repository.CatalogRepository;

import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class CartServiceImpl implements CartService {

    private final CartRepository cartRepository;
    private final CatalogRepository catalogItemRepository;

    private Cart loadOrCreateCart(UUID userId) {
        return cartRepository.findByUserId(userId)
                .orElseGet(() -> Cart.builder()
                .userId(userId)
                .build());
    }

    @Override
    @Transactional(readOnly = true)
    public CartResponseDto getCart(UUID userId) {
        Cart cart = loadOrCreateCart(userId);
        //? Persistimos un nuevo carrito vacío para que quede en BD
        cartRepository.save(cart);
        return new CartResponseDto(cart);
    }

    @Override
    public void addItem(UUID userId, CartItemInsertDto dto) {
        Cart cart = loadOrCreateCart(userId);

        // 1) Cargo la entidad CatalogItem desde BD
        CatalogItem product = catalogItemRepository.findById(dto.getProductId())
                .orElseThrow(() -> new EntityNotFoundException("Producto no encontrado: " + dto.getProductId()));

        cart.addItem(product, dto.getQuantity());

        cartRepository.save(cart);
    }

    @Override
    public void updateItem(UUID userId, UUID productId, CartItemUpdateDto dto) {
        Cart cart = loadOrCreateCart(userId);
        cart.updateItem(productId, dto.getQuantity());
        cartRepository.save(cart);
    }

    @Override
    public void removeItem(UUID userId, UUID productId) {
        Cart cart = loadOrCreateCart(userId);
        cart.removeItem(productId);
        cartRepository.save(cart);
    }

    @Override
    public void updateAddress(UUID userId, CartAddressUpdateDto dto) {
        Cart cart = loadOrCreateCart(userId);
        cart.setShippingAddress(dto.getAddress());
        cartRepository.save(cart);
    }
}
