package com.example.shop.catalog.infrastructure.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import com.example.shop.catalog.domain.model.CatalogItem;
import com.example.shop.catalog.domain.repository.CatalogRepository;

import lombok.AllArgsConstructor;

@Repository
@AllArgsConstructor
public class JpaCatalogRepository implements CatalogRepository {

    private final SpringDataCatalogItemRepository springDataRepo;

    @Override
    public List<CatalogItem> findAll() {
        return springDataRepo.findAll();
    }

    @Override
    public Page<CatalogItem> search(String term, Pageable pageable) {
        if (term == null || term.isBlank()) {
            return springDataRepo.findAll(pageable);
        }
        return springDataRepo.findByNameContainingIgnoreCaseOrDescriptionContainingIgnoreCase(
                term, term, pageable);
    }

    @Override
    public Optional<CatalogItem> findById(UUID id) {
        return springDataRepo.findById(id);
    }

    @Override
    public List<CatalogItem> saveAll(List<CatalogItem> items) {
        return springDataRepo.saveAll(items);
    }

    @Override
    public long count() {
        return springDataRepo.count();
    }

    @Override
    public void deleteAll() {
        springDataRepo.deleteAll();
    }
}
