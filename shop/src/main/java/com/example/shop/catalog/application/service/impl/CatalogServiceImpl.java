package com.example.shop.catalog.application.service.impl;

import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.shop.catalog.application.dto.CatalogItemResponse;
import com.example.shop.catalog.application.service.CatalogService;
import com.example.shop.catalog.domain.model.CatalogItem;
import com.example.shop.catalog.domain.repository.CatalogRepository;

import lombok.AllArgsConstructor;

@Service
@Transactional(readOnly = true)
@AllArgsConstructor
public class CatalogServiceImpl implements CatalogService {

    private final CatalogRepository catalogRepository;

    @Override
    public Page<CatalogItemResponse> getCatalog(String search, Pageable pageable) {
        Page<CatalogItem> page = catalogRepository.search(search, pageable);
        return page.map(CatalogItemResponse::new);
    }

    @Override
    public CatalogItemResponse getById(UUID id) {
        CatalogItem item = catalogRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Item no encontrado: " + id));
        return new CatalogItemResponse(item);
    }
}
