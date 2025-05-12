import { useCart } from "@/hooks/useCart.hook";
import { useOrder } from "@/hooks/useOrder.hook";
import {
  Box,
  Button,
  Divider,
  Flex,
  IconButton,
  Image,
  Input,
  Spinner,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  FaCheck,
  FaEdit,
  FaTimes,
  FaTrash,
  FaWindowClose,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export function CartDrawer({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { cart, loading, fetchCart, updateItem, removeItem, setAddress } =
    useCart();
  const { createOrder, loading: orderLoading } = useOrder();
  const [editMode, setEditMode] = useState(false);
  const [addressInput, setAddressInput] = useState(cart.shippingAddress || "");
  const toast = useToast();
  const navigate = useNavigate();

  const handleConfirmOrder = async () => {
    if (cart.items.length === 0) {
      toast({
        title: "Carrito vacío",
        description:
          "Agrega al menos un artículo para poder confirmar tu pedido.",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    if (!cart.shippingAddress) {
      toast({
        title: "Dirección faltante",
        description: "Debes definir una dirección de envío antes de confirmar.",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    try {
      const orderId = await createOrder();
      toast({
        title: "Pedido confirmado",
        description: `Tu orden #${orderId} ha sido creada.`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onClose();
      navigate(`/orders/${orderId}`);
    } catch {
      toast({
        title: "Error al confirmar",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchCart();
      setAddressInput(cart.shippingAddress || "");
      setEditMode(false);
    }
  }, [isOpen, fetchCart, cart.shippingAddress]);

  if (!isOpen) return null;

  return (
    <>
      <Box
        position="fixed"
        top="0"
        right="0"
        h="100vh"
        w={{ base: "100%", md: "400px" }}
        bg="white"
        boxShadow="xl"
        transform="translateX(0)"
        transition="transform 0.3s ease-out"
        zIndex="modal"
        display="flex"
        flexDirection="column"
      >
        <Flex
          align="center"
          justify="space-between"
          p={4}
          bg="gray.100"
          borderBottom="1px solid"
          borderColor="gray.200"
        >
          <Text fontSize="2xl" fontWeight="bold">
            Carrito
          </Text>
          <IconButton
            aria-label="Cerrar"
            icon={<FaWindowClose />}
            size="sm"
            variant="ghost"
            onClick={onClose}
          />
        </Flex>

        {loading ? (
          <Spinner m="auto" size="xl" />
        ) : (
          <Stack flex="1" p={4} spacing={4} overflowY="auto">
            {/* Items */}
            {cart.items.map((item) => (
              <Stack
                key={item.productId}
                direction="row"
                align="center"
                spacing={4}
              >
                <Image
                  boxSize="60px"
                  src={item.imageUrl}
                  alt={item.name}
                  objectFit="cover"
                />
                <Box flex="1">
                  <Text fontWeight="semibold">{item.name}</Text>
                  <Flex align="center" mt={1}>
                    <Button
                      size="xs"
                      onClick={() =>
                        updateItem(item.productId, item.quantity - 1)
                      }
                      disabled={item.quantity <= 1}
                    >
                      −
                    </Button>
                    <Text mx={2}>{item.quantity}</Text>
                    <Button
                      size="xs"
                      onClick={() =>
                        updateItem(item.productId, item.quantity + 1)
                      }
                    >
                      +
                    </Button>
                    <Text ml="auto" fontWeight="bold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </Text>
                  </Flex>
                </Box>
                <IconButton
                  aria-label="Eliminar"
                  icon={<FaTrash />}
                  size="sm"
                  variant="ghost"
                  onClick={() => removeItem(item.productId)}
                />
              </Stack>
            ))}

            <Divider />

            {/* Dirección */}
            <Box>
              <Text fontSize="md" fontWeight="semibold" mb={2}>
                Dirección de envío
              </Text>

              {editMode ? (
                <Flex>
                  <Input
                    value={addressInput}
                    onChange={(e) => setAddressInput(e.target.value)}
                    placeholder="Ingresa tu dirección"
                  />
                  <IconButton
                    aria-label="Guardar dirección"
                    icon={<FaCheck />}
                    size="sm"
                    ml={2}
                    onClick={async () => {
                      try {
                        await setAddress(addressInput);
                        toast({
                          title: "Dirección actualizada",
                          status: "success",
                          duration: 2000,
                          isClosable: true,
                        });
                        setEditMode(false);
                      } catch {
                        toast({
                          title: "Error al guardar",
                          status: "error",
                          duration: 2000,
                          isClosable: true,
                        });
                      }
                    }}
                  />
                  <IconButton
                    aria-label="Cancelar edición"
                    icon={<FaTimes />}
                    size="sm"
                    ml={2}
                    onClick={() => {
                      setAddressInput(cart.shippingAddress || "");
                      setEditMode(false);
                    }}
                  />
                </Flex>
              ) : (
                <Flex align="center">
                  <Text flex="1">
                    {cart.shippingAddress || "No has definido tu dirección aún"}
                  </Text>
                  <IconButton
                    aria-label="Editar dirección"
                    icon={<FaEdit />}
                    size="sm"
                    variant="ghost"
                    onClick={() => setEditMode(true)}
                  />
                </Flex>
              )}
            </Box>

            <Divider />

            {/* Subtotal */}
            <Box>
              <Text fontSize="lg">
                Total:{" "}
                <Text as="span" fontWeight="bold">
                  $
                  {cart.items
                    .reduce((sum, i) => sum + i.price * i.quantity, 0)
                    .toFixed(2)}
                </Text>
              </Text>
            </Box>

            {/* Confirmar pedido */}
            <Button
              colorScheme="teal"
              w="full"
              isLoading={orderLoading}
              onClick={handleConfirmOrder}
              isDisabled={cart.items.length === 0 || !cart.shippingAddress}
            >
              Confirmar pedido
            </Button>
          </Stack>
        )}
      </Box>

      {/* Overlay */}
      <Box
        position="fixed"
        top="0"
        left="0"
        w="100vw"
        h="100vh"
        bg="blackAlpha.600"
        onClick={onClose}
        zIndex="overlay"
      />
    </>
  );
}
