package com.example.shop.order.infrastructure.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.shop.auth.infrastructure.service.CustomUserDetails;
import com.example.shop.common.api.ApiResponse;
import com.example.shop.order.application.dto.OrderCreateResponseDto;
import com.example.shop.order.application.dto.OrderDetailDto;
import com.example.shop.order.application.dto.OrderSummaryDto;
import com.example.shop.order.application.dto.OrderUpdateRequestDto;
import com.example.shop.order.application.service.OrderService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/orders")
@AllArgsConstructor
public class OrderController {

    private final OrderService orderService;

    private UUID currentUserId(Authentication auth) {
        CustomUserDetails principal = (CustomUserDetails) auth.getPrincipal();
        return principal.getId();
    }

    @PostMapping
    public ResponseEntity<ApiResponse<OrderCreateResponseDto>> createOrder(
            Authentication auth
    ) {
        UUID userId = currentUserId(auth);
        OrderCreateResponseDto dto = orderService.createOrder(userId);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(ApiResponse.success(dto));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<OrderSummaryDto>>> listOrders(
            Authentication auth
    ) {
        UUID userId = currentUserId(auth);
        List<OrderSummaryDto> list = orderService.listOrders(userId);
        return ResponseEntity
                .ok(ApiResponse.success(list));
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<ApiResponse<OrderDetailDto>> getOrder(
            @PathVariable UUID orderId,
            Authentication auth
    ) {
        UUID userId = currentUserId(auth);
        OrderDetailDto detail = orderService.getOrderById(userId, orderId);
        return ResponseEntity
                .ok(ApiResponse.success(detail));
    }

    @PatchMapping("/{orderId}")
    public ResponseEntity<ApiResponse<Void>> updateAddress(
            @PathVariable UUID orderId,
            @RequestBody OrderUpdateRequestDto body
    ) {
        orderService.updateOrder(orderId, body);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(ApiResponse.success(null));
    }

}
