package com.example.shop.catalog.application.dto;

import com.example.shop.catalog.domain.model.CatalogItem;
import java.math.BigDecimal;
import java.util.UUID;

import lombok.*;

@Getter
@Setter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CatalogItemResponse {

    private UUID id;
    private String name;
    private String description;
    private String imageUrl;
    private BigDecimal price;
    private int availableQuantity;

    public CatalogItemResponse(CatalogItem item) {
        this.id = item.getId();
        this.name = item.getName();
        this.description = item.getDescription();
        this.imageUrl = item.getImageUrl();
        this.price = item.getPrice();
        this.availableQuantity = item.getAvailableQuantity();
    }
}
