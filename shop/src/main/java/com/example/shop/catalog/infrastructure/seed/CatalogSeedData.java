package com.example.shop.catalog.infrastructure.seed;

import java.math.BigDecimal;
import java.util.List;

import com.example.shop.catalog.domain.model.CatalogItem;

public class CatalogSeedData {

    /**
     * Devuelve la lista de items a insertar
     */
    public static List<CatalogItem> items() {
        return List.of(
                create(
                        "Pelota de Fútbol",
                        "Pelota oficial FIFA, costuras reforzadas",
                        "https://picsum.photos/seed/football/300/200",
                        "29.99",
                        50
                ),
                create(
                        "Zapatillas Running",
                        "Zapatillas ultraligeras para maratón",
                        "https://picsum.photos/seed/running/300/200",
                        "89.50",
                        30
                ),
                create(
                        "Guantes de Boxeo",
                        "Guantes acolchados de cuero sintético",
                        "https://picsum.photos/seed/boxing/300/200",
                        "45.00",
                        20
                ),
                create(
                        "Balón de Baloncesto",
                        "Balón de cuero de alta resistencia para exteriores",
                        "https://picsum.photos/seed/basketball/300/200",
                        "39.99",
                        40
                ),
                create(
                        "Raqueta de Tenis",
                        "Raqueta de grafito ligera para jugadores intermedios",
                        "https://picsum.photos/seed/tennis/300/200",
                        "120.00",
                        15
                ),
                create(
                        "Guante de Béisbol",
                        "Guante de cuero premium para zurdos",
                        "https://picsum.photos/seed/baseball/300/200",
                        "55.00",
                        25
                ),
                create(
                        "Casco de Ciclismo",
                        "Casco aerodinámico con ventilación avanzada",
                        "https://picsum.photos/seed/cycling/300/200",
                        "75.00",
                        18
                ),
                create(
                        "Camiseta Deportiva",
                        "Camiseta transpirable de poliéster",
                        "https://picsum.photos/seed/jersey/300/200",
                        "25.00",
                        60
                ),
                create(
                        "Botella de Agua",
                        "Botella reutilizable de acero inoxidable 750ml",
                        "https://picsum.photos/seed/water-bottle/300/200",
                        "18.50",
                        80
                ),
                create(
                        "Esterilla de Yoga",
                        "Esterilla antideslizante de 6mm",
                        "https://picsum.photos/seed/yoga/300/200",
                        "30.00",
                        22
                ),
                create(
                        "Mancuernas",
                        "Par de mancuernas recubiertas en neopreno (5kg cada una)",
                        "https://picsum.photos/seed/dumbbells/300/200",
                        "65.00",
                        12
                ),
                create(
                        "Cuerda para Saltar",
                        "Cuerda ajustable con mangos ergonómicos",
                        "https://picsum.photos/seed/jump-rope/300/200",
                        "12.00",
                        50
                ),
                create(
                        "Bandana Deportiva",
                        "Bandana absorbente de sudor para cabeza",
                        "https://picsum.photos/seed/headband/300/200",
                        "8.00",
                        75
                ),
                create(
                        "Espinilleras",
                        "Juego de espinilleras livianas con almohadilla EVA",
                        "https://picsum.photos/seed/shin-guards/300/200",
                        "20.00",
                        30
                ),
                create(
                        "Bolsa de Deporte",
                        "Bolsa de lona con compartimento para calzado",
                        "https://picsum.photos/seed/sports-bag/300/200",
                        "45.00",
                        20
                ),
                create(
                        "Gafas de Natación",
                        "Gafas antivaho con correa ajustable",
                        "https://picsum.photos/seed/goggles/300/200",
                        "15.00",
                        40
                ),
                create(
                        "Patineta",
                        "Patineta street con ruedas de PU de 52mm",
                        "https://picsum.photos/seed/skateboard/300/200",
                        "70.00",
                        10
                ),
                create(
                        "Tabla de Surf",
                        "Tabla de surf shortboard de poliéster 6'2\"",
                        "https://picsum.photos/seed/surfboard/300/200",
                        "250.00",
                        5
                ),
                create(
                        "Gafas de Esquí",
                        "Gafas de esquí con lente polarizada y correa ajustable",
                        "https://picsum.photos/seed/ski-goggles/300/200",
                        "60.00",
                        15
                ),
                create(
                        "Palos de Golf",
                        "Set de palos de golf para principiantes (12 piezas)",
                        "https://picsum.photos/seed/golf/300/200",
                        "300.00",
                        8
                )
        );
    }

    private static CatalogItem create(
            String name,
            String description,
            String imageUrl,
            String price,
            int availableQuantity
    ) {
        return CatalogItem.builder()
                .name(name)
                .description(description)
                .imageUrl(imageUrl)
                .price(new BigDecimal(price))
                .availableQuantity(availableQuantity)
                .build();
    }
}
