package com.example.shop.catalog.domain.model;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.util.UUID;

import com.example.shop.common.models.AuditableEntity;

import lombok.*;

@Entity
@Table(name = "catalog")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CatalogItem extends AuditableEntity {

    @Id
    @GeneratedValue
    private UUID id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, length = 1000)
    private String description;

    @Column(name = "image_url", nullable = false)
    private String imageUrl;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal price;

    @Column(name = "available_quantity", nullable = false)
    private int availableQuantity;
}
