package com.example.shop.catalog.infrastructure.repository;

import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.shop.catalog.domain.model.CatalogItem;

public interface SpringDataCatalogItemRepository
        extends JpaRepository<CatalogItem, UUID> {

    Page<CatalogItem> findByNameContainingIgnoreCaseOrDescriptionContainingIgnoreCase(
            String name, String description, Pageable pageable);
}
