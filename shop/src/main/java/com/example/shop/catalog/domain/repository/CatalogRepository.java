package com.example.shop.catalog.domain.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.example.shop.catalog.domain.model.CatalogItem;

public interface CatalogRepository {

    List<CatalogItem> findAll();

    Page<CatalogItem> search(String term, Pageable pageable);

    Optional<CatalogItem> findById(UUID id);

    long count();

    List<CatalogItem> saveAll(List<CatalogItem> items);

    void deleteAll();
}
