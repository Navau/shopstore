package com.example.shop.catalog.application.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.shop.catalog.application.service.CatalogSeedService;
import com.example.shop.catalog.domain.model.CatalogItem;
import com.example.shop.catalog.domain.repository.CatalogRepository;
import com.example.shop.catalog.infrastructure.seed.CatalogSeedData;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
@Transactional
public class CatalogSeedServiceImpl implements CatalogSeedService {

    private final CatalogRepository repo;

    @Override
    public List<CatalogItem> refreshSeed() {
        repo.deleteAll();
        List<CatalogItem> items = CatalogSeedData.items();
        return repo.saveAll(items);
    }
}
