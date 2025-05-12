package com.example.shop.order.domain.model;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import com.example.shop.common.models.AuditableEntity;
import com.example.shop.order.domain.enums.OrderStatus;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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
@Table(name = "orders")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Order extends AuditableEntity {

    @Id
    @GeneratedValue
    private UUID id;

    //? Usuario que hizo la orden
    @Column(name = "user_id", nullable = false, updatable = false)
    private UUID userId;

    //? Dirección de envío al momento de confirmar
    @Column(name = "shipping_address", length = 500, nullable = false)
    private String shippingAddress;

    //? Fecha/hora en que se creó la orden
    @Column(name = "order_date", nullable = false, updatable = false)
    private Instant orderDate;

    //? Estado actual de la orden
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private OrderStatus status;

    //? Total calculado (sumatoria de unitPrice * quantity)
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal total;

    //? Ítems que forman esta orden
    @OneToMany(
            mappedBy = "order",
            cascade = CascadeType.ALL,
            orphanRemoval = true,
            fetch = FetchType.LAZY
    )
    @Builder.Default
    private List<OrderItem> items = new ArrayList<>();

    //? Método de conveniencia para añadir un ítem y actualizar el total al vuelo.
    public void addItem(OrderItem item) {
        item.setOrder(this);
        items.add(item);
        this.total = this.total.add(item.getUnitPrice().multiply(
                BigDecimal.valueOf(item.getQuantity())
        ));
    }
}
