package com.example.shop.catalog.application.service;

import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.example.shop.catalog.application.dto.CatalogItemResponse;

public interface CatalogService {

    /**
     * Lista todo el catálogo, opcionalmente filtrado
     */
    Page<CatalogItemResponse> getCatalog(String search, Pageable pageable);

    /**
     * Detalle de un ítem por ID
     */
    CatalogItemResponse getById(UUID id);
}
