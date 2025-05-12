package com.example.shop.catalog.application.service;

import java.util.List;

import com.example.shop.catalog.domain.model.CatalogItem;

public interface CatalogSeedService {

    public List<CatalogItem> refreshSeed();

}
