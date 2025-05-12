package com.example.shop.catalog.infrastructure.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.shop.catalog.application.dto.CatalogItemResponse;
import com.example.shop.catalog.application.service.CatalogSeedService;
import com.example.shop.catalog.application.service.CatalogService;
import com.example.shop.catalog.domain.model.CatalogItem;
import com.example.shop.common.api.ApiResponse;
import com.example.shop.common.api.PagedResponse;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/catalog")
@AllArgsConstructor
public class CatalogController {

    private final CatalogService catalogService;
    private final CatalogSeedService seedService;

    @GetMapping
    public ResponseEntity<ApiResponse<PagedResponse<CatalogItemResponse>>> list(
            @RequestParam(required = false) String search,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Page<CatalogItemResponse> pg = catalogService.getCatalog(search, PageRequest.of(page, size));
        PagedResponse<CatalogItemResponse> body = new PagedResponse<>(
                pg.getContent(),
                pg.getNumber(),
                pg.getSize(),
                pg.getTotalElements(),
                pg.getTotalPages()
        );
        return ResponseEntity.ok(ApiResponse.success(body));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<CatalogItemResponse>> getById(
            @PathVariable UUID id
    ) {
        CatalogItemResponse item = catalogService.getById(id);
        return ResponseEntity.ok(ApiResponse.success(item));
    }

    @PostMapping("/seed")
    public ResponseEntity<List<CatalogItem>> seedCatalog() {
        List<CatalogItem> seeded = seedService.refreshSeed();
        return ResponseEntity.ok(seeded);
    }
}
