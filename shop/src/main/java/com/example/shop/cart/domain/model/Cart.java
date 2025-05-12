package com.example.shop.cart.domain.model;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import com.example.shop.catalog.domain.model.CatalogItem;
import com.example.shop.common.models.AuditableEntity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "cart")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Cart extends AuditableEntity {

    @Id
    @GeneratedValue
    private UUID id;

    @Column(name = "user_id", nullable = false, updatable = false)
    private UUID userId;

    @Column(name = "shipping_address", length = 500)
    private String shippingAddress;

    @OneToMany(
            mappedBy = "cart",
            cascade = CascadeType.ALL,
            orphanRemoval = true,
            fetch = FetchType.LAZY
    )
    @Builder.Default
    private List<CartItem> items = new ArrayList<>();

    //? --------------------------------------------------
    //? MÉTODOS DE DOMINIO PARA GESTIÓN DE ÍTEMS EN EL CARRITO
    //? --------------------------------------------------
    //? Agrega una cantidad al ítem dado. Si el item ya existe (mismo productId), 
    //? incrementa la cantidad. Si no, crea uno nuevo.
    public void addItem(CatalogItem product, int quantity) {
        for (CartItem item : items) {
            if (item.getProduct().getId().equals(product.getId())) {
                item.setQuantity(item.getQuantity() + quantity);
                return;
            }
        }
        CartItem newItem = CartItem.builder()
                .cart(this)
                .product(product)
                .quantity(quantity)
                .build();
        items.add(newItem);
    }

    public void updateItem(UUID productId, int quantity) {
        for (CartItem item : items) {
            if (item.getProduct().getId().equals(productId)) {
                item.setQuantity(quantity);
                return;
            }
        }
    }

    public void removeItem(UUID productId) {
        items.removeIf(item -> item.getProduct().getId().equals(productId));
    }

}
