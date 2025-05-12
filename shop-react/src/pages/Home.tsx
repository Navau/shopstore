// src/pages/Home.tsx
import { useCart } from "@/hooks/useCart.hook";
import { useProducts } from "@/hooks/useProduct.hook";
import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  HStack,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  SimpleGrid,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

interface LayoutContext {
  openCart: () => void;
}

export function Home() {
  const { openCart } = useOutletContext<LayoutContext>();
  const { products, loading, error, page, totalPages, setPage, onSearch } =
    useProducts(1, 8);
  const { addItem, loading: cartLoading } = useCart();

  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch(searchInput);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchInput]);

  if (loading) {
    return (
      <Center h="60vh">
        <Spinner size="xl" />
      </Center>
    );
  }
  if (error) {
    return (
      <Center h="60vh">
        <Text color="red.500">{error}</Text>
      </Center>
    );
  }

  return (
    <Box p={6}>
      {/* Search bar */}
      <InputGroup maxW="md" mx="auto" mb={6}>
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="gray.500" />
        </InputLeftElement>
        <Input
          placeholder="Buscar productos..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </InputGroup>

      {/* Pagination (top) */}
      {totalPages > 1 && (
        <HStack spacing={2} justify="center" mb={6}>
          <Button onClick={() => setPage(page - 1)} disabled={page === 1}>
            Anterior
          </Button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
            <Button
              key={num}
              onClick={() => setPage(num)}
              variant={num === page ? "solid" : "outline"}
              colorScheme="teal"
            >
              {num}
            </Button>
          ))}
          <Button
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
          >
            Siguiente
          </Button>
        </HStack>
      )}

      {/* Products grid */}
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={6}>
        {products.map((prod) => (
          <Box
            key={prod.id}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            bg="white"
            _hover={{ boxShadow: "lg" }}
            transition="box-shadow 0.2s"
          >
            <Image
              src={prod.imageUrl}
              alt={prod.name}
              boxSize="200px"
              objectFit="cover"
              w="full"
            />
            <Box p={4}>
              <Text fontWeight="bold" fontSize="lg" mb={2}>
                {prod.name}
              </Text>
              <Text noOfLines={2} fontSize="sm" color="gray.600" mb={2}>
                {prod.description}
              </Text>
              <Text fontSize="xl" fontWeight="semibold" mb={4}>
                ${prod.price.toFixed(2)}
              </Text>
              <Button
                size="sm"
                colorScheme="teal"
                isDisabled={prod.availableQuantity === 0 || cartLoading}
                isLoading={cartLoading}
                onClick={async () => {
                  await addItem(prod.id, 1);
                  openCart();
                }}
              >
                {prod.availableQuantity > 0 ? "Añadir al carrito" : "Agotado"}
              </Button>
            </Box>
          </Box>
        ))}
      </SimpleGrid>

      {/* Pagination (bottom) */}
      {totalPages > 1 && (
        <HStack spacing={2} justify="center" mt={8}>
          <Button onClick={() => setPage(page - 1)} disabled={page === 1}>
            Anterior
          </Button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
            <Button
              key={num}
              onClick={() => setPage(num)}
              variant={num === page ? "solid" : "outline"}
              colorScheme="teal"
            >
              {num}
            </Button>
          ))}
          <Button
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
          >
            Siguiente
          </Button>
        </HStack>
      )}
    </Box>
  );
}
