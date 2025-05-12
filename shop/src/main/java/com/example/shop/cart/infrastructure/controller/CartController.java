package com.example.shop.cart.infrastructure.controller;

import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.shop.auth.infrastructure.service.CustomUserDetails;
import com.example.shop.cart.application.dto.CartAddressUpdateDto;
import com.example.shop.cart.application.dto.CartItemInsertDto;
import com.example.shop.cart.application.dto.CartItemUpdateDto;
import com.example.shop.cart.application.dto.CartResponseDto;
import com.example.shop.cart.application.service.CartService;
import com.example.shop.common.api.ApiResponse;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/api/cart")
public class CartController {

    private final CartService cartService;

    //? Extrae el UUID del usuario a partir del subject del JWT.
    private UUID currentUserId(Authentication auth) {
        CustomUserDetails principal = (CustomUserDetails) auth.getPrincipal();
        return principal.getId();
    }

    //? GET /api/cart Obtiene el carrito del usuario (crea uno vacío si no existía).
    @GetMapping
    public ResponseEntity<ApiResponse<CartResponseDto>> getCart(Authentication auth) {
        UUID userId = currentUserId(auth);
        CartResponseDto cart = cartService.getCart(userId);
        return ResponseEntity
                .ok(ApiResponse.success(cart));
    }

    //? POST /api/cart/items Agrega un ítem al carrito (o suma cantidad si ya existe).
    @PostMapping("/items")
    public ResponseEntity<ApiResponse<Void>> addItem(
            @RequestBody @Valid CartItemInsertDto dto,
            Authentication auth
    ) {
        UUID userId = currentUserId(auth);
        cartService.addItem(userId, dto);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(ApiResponse.success(null));
    }

    //? PUT /api/cart/items/{productId} Actualiza la cantidad de un ítem existente.
    @PutMapping("/items/{productId}")
    public ResponseEntity<ApiResponse<Void>> updateItem(
            @PathVariable UUID productId,
            @RequestBody @Valid CartItemUpdateDto dto,
            Authentication auth
    ) {
        UUID userId = currentUserId(auth);
        cartService.updateItem(userId, productId, dto);
        return ResponseEntity
                .ok(ApiResponse.success(null));
    }

    //? DELETE /api/cart/items/{productId} Elimina un ítem del carrito.
    @DeleteMapping("/items/{productId}")
    public ResponseEntity<ApiResponse<Void>> removeItem(
            @PathVariable UUID productId,
            Authentication auth
    ) {
        UUID userId = currentUserId(auth);
        cartService.removeItem(userId, productId);
        return ResponseEntity
                .status(HttpStatus.NO_CONTENT)
                .body(ApiResponse.success(null));
    }

    //? PUT /api/cart/address Actualiza la dirección de envío del carrito.
    @PutMapping("/address")
    public ResponseEntity<ApiResponse<Void>> updateAddress(
            @RequestBody @Valid CartAddressUpdateDto dto,
            Authentication auth
    ) {
        UUID userId = currentUserId(auth);
        cartService.updateAddress(userId, dto);
        return ResponseEntity
                .ok(ApiResponse.success(null));
    }
}
