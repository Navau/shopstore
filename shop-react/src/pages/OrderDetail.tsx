// src/pages/OrderDetail.tsx
import { useOrder } from "@/hooks/useOrder.hook";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Badge,
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Heading,
  HStack,
  IconButton,
  Image,
  Input,
  Spinner,
  Text,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { FaCheck, FaEdit, FaTimes } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";

export function OrderDetail() {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const { orderDetail, fetchOrder, loading, error, updateOrder } = useOrder();
  const [editMode, setEditMode] = useState(false);
  const [addr, setAddr] = useState("");
  const toast = useToast();

  // Confirm dialogs
  const {
    isOpen: isOpenCancel,
    onOpen: onOpenCancel,
    onClose: onCloseCancel,
  } = useDisclosure();
  const {
    isOpen: isOpenComplete,
    onOpen: onOpenComplete,
    onClose: onCloseComplete,
  } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (orderId) fetchOrder(orderId);
  }, [orderId, fetchOrder]);

  useEffect(() => {
    if (orderDetail) setAddr(orderDetail.shippingAddress);
  }, [orderDetail]);

  if (loading || !orderDetail) {
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

  const { status, orderDate, items, total, shippingAddress } = orderDetail;

  const handleSaveAddress = async () => {
    try {
      await updateOrder(orderId!, { shippingAddress: addr });
      toast({
        title: "Dirección actualizada",
        status: "success",
        duration: 2000,
      });
      setEditMode(false);
    } catch {
      toast({ title: "Error al actualizar", status: "error", duration: 2000 });
    }
  };

  const confirmCancel = async () => {
    try {
      await updateOrder(orderId!, { status: "CANCELLED" });
      toast({ title: "Pedido cancelado", status: "warning", duration: 2000 });
    } catch {
      toast({ title: "Error al cancelar", status: "error", duration: 2000 });
    }
    onCloseCancel();
  };

  const confirmComplete = async () => {
    try {
      await updateOrder(orderId!, { status: "CONFIRMED" });
      toast({ title: "Pedido completado", status: "success", duration: 2000 });
    } catch {
      toast({ title: "Error al completar", status: "error", duration: 2000 });
    }
    onCloseComplete();
  };

  return (
    <>
      <Box maxW="4xl" mx="auto" p={{ base: 4, md: 8 }}>
        {/* Header */}
        <Flex
          direction={{ base: "column", md: "row" }}
          align={{ base: "flex-start", md: "center" }}
          justify="space-between"
          mb={6}
          gap={4}
        >
          <Heading size="lg">Pedido #{orderId}</Heading>
          <Badge
            colorScheme={
              status === "PENDING"
                ? "yellow"
                : status === "CONFIRMED"
                ? "green"
                : "red"
            }
            fontSize="md"
            px={3}
            py={1}
          >
            {status}
          </Badge>
        </Flex>

        {/* Date */}
        <Text fontSize="sm" color="gray.600" mb={4}>
          Fecha: {new Date(orderDate).toLocaleString()}
        </Text>

        {/* Dirección */}
        <Box bg="gray.50" p={4} borderRadius="md" mb={6}>
          <Flex
            direction={{ base: "column", md: "row" }}
            align="center"
            justify="space-between"
            mb={2}
          >
            <Text fontWeight="semibold" flex="1">
              Dirección de envío
            </Text>
            {status === "PENDING" && !editMode && (
              <IconButton
                size="sm"
                aria-label="Editar dirección"
                icon={<FaEdit />}
                variant="ghost"
                onClick={() => setEditMode(true)}
              />
            )}
          </Flex>

          {editMode ? (
            <HStack spacing={2} w="100%" flexWrap="wrap">
              <Input
                flex="1"
                value={addr}
                onChange={(e) => setAddr(e.target.value)}
              />
              <IconButton
                size="sm"
                aria-label="Guardar"
                icon={<FaCheck />}
                onClick={handleSaveAddress}
              />
              <IconButton
                size="sm"
                aria-label="Cancelar"
                icon={<FaTimes />}
                onClick={() => {
                  setAddr(shippingAddress);
                  setEditMode(false);
                }}
              />
            </HStack>
          ) : (
            <Text>{shippingAddress}</Text>
          )}
        </Box>

        {/* Artículos */}
        <Heading size="md" mb={4}>
          Artículos
        </Heading>
        <VStack spacing={4} mb={6}>
          {items.map((item) => (
            <Flex
              key={item.productId}
              direction={{ base: "column", md: "row" }}
              align="center"
              p={4}
              borderWidth="1px"
              borderRadius="md"
              w="100%"
              gap={4}
            >
              <Image
                src={item.imageUrl}
                alt={item.name}
                boxSize={{ base: "100%", md: "80px" }}
                objectFit="cover"
                borderRadius="md"
              />
              <Box flex="1">
                <Text fontWeight="semibold">{item.name}</Text>
                <Text fontSize="sm" color="gray.600">
                  {item.quantity} × ${item.price.toFixed(2)}
                </Text>
              </Box>
              <Text fontWeight="bold">
                ${(item.price * item.quantity).toFixed(2)}
              </Text>
            </Flex>
          ))}
        </VStack>

        <Divider mb={6} />

        {/* Total */}
        <Flex
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          align="center"
          mb={8}
          gap={4}
        >
          <Text fontSize="lg">Total:</Text>
          <Text fontSize="2xl" fontWeight="bold">
            ${total.toFixed(2)}
          </Text>
        </Flex>

        {/* Acciones */}
        <HStack spacing={4} wrap="wrap">
          <Button variant="outline" onClick={() => navigate(-1)}>
            Volver
          </Button>
          {status === "PENDING" && (
            <>
              <Button colorScheme="red" onClick={onOpenCancel}>
                Cancelar pedido
              </Button>
              <Button colorScheme="green" onClick={onOpenComplete}>
                Marcar como recibido
              </Button>
            </>
          )}
        </HStack>
      </Box>

      {/* Modal Cancelar */}
      <AlertDialog
        isOpen={isOpenCancel}
        leastDestructiveRef={cancelRef}
        onClose={onCloseCancel}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader>Confirmar cancelación</AlertDialogHeader>
            <AlertDialogBody>
              ¿Seguro que deseas cancelar el pedido #{orderId}?
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onCloseCancel}>
                No
              </Button>
              <Button colorScheme="red" onClick={confirmCancel} ml={3}>
                Sí, cancelar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      {/* Modal Completar */}
      <AlertDialog
        isOpen={isOpenComplete}
        leastDestructiveRef={cancelRef}
        onClose={onCloseComplete}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader>Confirmar completado</AlertDialogHeader>
            <AlertDialogBody>
              ¿Has recibido el pedido #{orderId}?
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onCloseComplete}>
                No
              </Button>
              <Button colorScheme="green" onClick={confirmComplete} ml={3}>
                Sí, completar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
