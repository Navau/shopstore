// src/pages/Profile.tsx
import { useAuth } from "@/hooks/useAuth.hook";
import { useOrder } from "@/hooks/useOrder.hook";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Avatar,
  Badge,
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  IconButton,
  Input,
  Spinner,
  Stack,
  Text,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useEffect, useRef, useState } from "react";
import { FaCheck, FaEdit, FaTimes } from "react-icons/fa";
import { Link as RouterLink } from "react-router-dom";
import * as Yup from "yup";

type SectionKey =
  | "Perfil"
  | "Pedidos"
  | "Direcciones"
  | "Tarjetas"
  | "Autenticación"
  | "Favoritos";
const menuItems: SectionKey[] = [
  "Perfil",
  "Pedidos",
  "Direcciones",
  "Tarjetas",
  "Autenticación",
  "Favoritos",
];

interface IUserForm {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  dateOfBirth: string;
}
const profileSchema = Yup.object({
  firstName: Yup.string().required(),
  lastName: Yup.string().required(),
  email: Yup.string().email().required(),
  address: Yup.string().required(),
  dateOfBirth: Yup.date()
    .required()
    .test("edad", "Debes ser mayor de 18", (val) =>
      val ? new Date().getFullYear() - new Date(val).getFullYear() >= 18 : false
    ),
});

export function Profile() {
  const { user, updateProfile, logout } = useAuth();
  const toast = useToast();
  const [section, setSection] = useState<SectionKey>("Perfil");
  const {
    orders,
    fetchOrders,
    loading: ordersLoading,
    error: ordersError,
    updateOrder,
  } = useOrder();

  // editing state
  const [editingOrderId, setEditingOrderId] = useState<string | null>(null);
  const [newAddress, setNewAddress] = useState("");
  const [targetOrderId, setTargetOrderId] = useState("");

  // confirm dialogs
  const {
    isOpen: isOpenProfile,
    onOpen: onOpenProfile,
    onClose: onCloseProfile,
  } = useDisclosure();
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
  const formikRef = useRef<any>(null);

  useEffect(() => {
    if (section === "Pedidos") fetchOrders();
  }, [section, fetchOrders]);
  if (!user)
    return (
      <Center h="100vh">
        <Spinner size="xl" />
      </Center>
    );

  const initialValues: IUserForm = {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    address: user.address,
    dateOfBirth: user.dateOfBirth.split("T")[0],
  };

  const handleSubmit = async (vals: IUserForm) => {
    await updateProfile(vals);
    toast({
      title: "Perfil actualizado",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const confirmCancel = async () => {
    await updateOrder(targetOrderId, { status: "CANCELLED" });
    toast({ title: "Pedido cancelado", status: "warning", duration: 2000 });
    onCloseCancel();
    fetchOrders();
  };
  const confirmComplete = async () => {
    await updateOrder(targetOrderId, { status: "CONFIRMED" });
    toast({ title: "Pedido completado", status: "success", duration: 2000 });
    onCloseComplete();
    fetchOrders();
  };

  return (
    <>
      <Flex direction={{ base: "column", md: "row" }} minH="100vh" bg="gray.50">
        {/* Sidebar */}
        <Box
          w={{ base: "100%", md: "250px" }}
          borderRight={{ base: "none", md: "1px solid" }}
          borderBottom={{ base: "1px solid", md: "none" }}
          borderColor="gray.200"
          bg="white"
          p={{ base: 4, md: 6 }}
        >
          <VStack align="start" spacing={6}>
            <Avatar size="lg" name={`${user.firstName} ${user.lastName}`} />
            <Text fontSize="lg" fontWeight="bold">
              Hola, {user.firstName}
            </Text>
            <VStack w="100%" align="stretch" spacing={1} fontSize="md">
              {menuItems.map((item) => (
                <Box
                  key={item}
                  px={3}
                  py={2}
                  cursor="pointer"
                  fontWeight={section === item ? "semibold" : "normal"}
                  bg={section === item ? "teal.50" : undefined}
                  borderLeft={section === item ? "4px solid" : undefined}
                  borderColor={section === item ? "teal.500" : undefined}
                  onClick={() => setSection(item)}
                >
                  {item}
                </Box>
              ))}
            </VStack>
            <Button
              variant="outline"
              colorScheme="red"
              size="sm"
              onClick={logout}
            >
              Cerrar sesión
            </Button>
          </VStack>
        </Box>

        {/* Main */}
        <Box flex="1" p={{ base: 4, md: 8 }}>
          <Box
            bg="white"
            p={{ base: 4, md: 6 }}
            borderRadius="md"
            boxShadow="sm"
          >
            {/* PERFIL */}
            {section === "Perfil" && (
              <>
                <Text fontSize="2xl" mb={4} fontWeight="bold">
                  Datos personales
                </Text>
                <Formik
                  innerRef={formikRef}
                  initialValues={initialValues}
                  validationSchema={profileSchema}
                  enableReinitialize
                  onSubmit={async (vals, { setSubmitting }) => {
                    await handleSubmit(vals);
                    setSubmitting(false);
                  }}
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    isSubmitting,
                  }) => (
                    <Form>
                      <Stack spacing={4}>
                        {[
                          "firstName",
                          "lastName",
                          "email",
                          "dateOfBirth",
                          "address",
                        ].map((field) => {
                          const label = {
                            firstName: "Nombres",
                            lastName: "Apellidos",
                            email: "Email",
                            dateOfBirth: "Fecha de nacimiento",
                            address: "Dirección de Ubicación de Usuario",
                          }[field];
                          const type =
                            field === "email"
                              ? "email"
                              : field === "dateOfBirth"
                              ? "date"
                              : "text";
                          return (
                            <FormControl
                              key={field}
                              isInvalid={Boolean(
                                (errors as any)[field] &&
                                  (touched as any)[field]
                              )}
                            >
                              <FormLabel>{label}</FormLabel>
                              <Input
                                name={field}
                                type={type}
                                value={(values as any)[field]}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                              <FormErrorMessage>
                                {(errors as any)[field]}
                              </FormErrorMessage>
                            </FormControl>
                          );
                        })}
                        <Button
                          onClick={() => {
                            formikRef.current
                              ?.validateForm()
                              .then((errs: any) => {
                                if (!errs || !Object.keys(errs).length)
                                  onOpenProfile();
                              });
                          }}
                          isLoading={isSubmitting}
                          colorScheme="teal"
                          alignSelf="start"
                        >
                          Guardar cambios
                        </Button>
                      </Stack>
                    </Form>
                  )}
                </Formik>
              </>
            )}

            {/* PEDIDOS */}
            {section === "Pedidos" && (
              <>
                <Text fontSize="2xl" mb={4} fontWeight="bold">
                  Mis Pedidos
                </Text>
                {ordersLoading ? (
                  <Center>
                    <Spinner />
                  </Center>
                ) : ordersError ? (
                  <Text color="red.500">{ordersError}</Text>
                ) : orders.length === 0 ? (
                  <Text>No tienes pedidos aún.</Text>
                ) : (
                  <VStack spacing={4}>
                    {orders.map((o) => {
                      const isEditing = editingOrderId === o.orderId;
                      return (
                        <Box
                          key={o.orderId}
                          w="100%"
                          bg="gray.50"
                          p={4}
                          borderRadius="md"
                        >
                          <Flex
                            direction={{ base: "column", md: "row" }}
                            justify="space-between"
                            align={{ base: "flex-start", md: "center" }}
                          >
                            <VStack align="start" spacing={1}>
                              <Text fontWeight="semibold">
                                Pedido #{o.orderId}
                              </Text>
                              <HStack spacing={2}>
                                <Badge
                                  colorScheme={
                                    o.status === "PENDING" ? "yellow" : "green"
                                  }
                                >
                                  {o.status}
                                </Badge>
                                <Text fontSize="sm" color="gray.600">
                                  {new Date(o.orderDate).toLocaleDateString()}
                                </Text>
                              </HStack>
                            </VStack>
                            <HStack mt={{ base: 4, md: 0 }} spacing={2}>
                              <Text fontWeight="bold">
                                ${o.total.toFixed(2)}
                              </Text>
                              <Button
                                as={RouterLink}
                                to={`/orders/${o.orderId}`}
                                size="sm"
                                colorScheme="teal"
                              >
                                Ver detalle
                              </Button>
                            </HStack>
                          </Flex>

                          <Box mt={4}>
                            <Text fontSize="sm" fontWeight="semibold" mb={1}>
                              Dirección de envío
                            </Text>
                            {o.status === "PENDING" ? (
                              isEditing ? (
                                <HStack spacing={2}>
                                  <Input
                                    flex="1"
                                    value={newAddress}
                                    onChange={(e) =>
                                      setNewAddress(e.target.value)
                                    }
                                  />
                                  <IconButton
                                    icon={<FaCheck />}
                                    size="sm"
                                    aria-label="Guardar dirección"
                                    onClick={async () => {
                                      await updateOrder(o.orderId, {
                                        shippingAddress: newAddress,
                                      });
                                      toast({
                                        title: "Dirección actualizada",
                                        status: "success",
                                        duration: 2000,
                                      });
                                      setEditingOrderId(null);
                                      fetchOrders();
                                    }}
                                  />
                                  <IconButton
                                    icon={<FaTimes />}
                                    size="sm"
                                    aria-label="Cancelar edición"
                                    onClick={() => setEditingOrderId(null)}
                                  />
                                </HStack>
                              ) : (
                                <IconButton
                                  icon={<FaEdit />}
                                  size="sm"
                                  aria-label="Editar dirección"
                                  onClick={() => {
                                    setEditingOrderId(o.orderId);
                                    setNewAddress(o.shippingAddress);
                                  }}
                                />
                              )
                            ) : (
                              <Text>{o.shippingAddress}</Text>
                            )}
                          </Box>

                          {o.status === "PENDING" && (
                            <HStack mt={3} spacing={2} wrap="wrap">
                              <Button
                                size="sm"
                                colorScheme="red"
                                onClick={() => {
                                  setTargetOrderId(o.orderId);
                                  onOpenCancel();
                                }}
                              >
                                Cancelar
                              </Button>
                              <Button
                                size="sm"
                                colorScheme="green"
                                onClick={() => {
                                  setTargetOrderId(o.orderId);
                                  onOpenComplete();
                                }}
                              >
                                Completar
                              </Button>
                            </HStack>
                          )}
                        </Box>
                      );
                    })}
                  </VStack>
                )}
              </>
            )}

            {/* OTROS */}
            {section !== "Perfil" && section !== "Pedidos" && (
              <Text fontSize="lg" color="gray.600">
                {section} — funcionalidad en desarrollo...
              </Text>
            )}
          </Box>
        </Box>
      </Flex>

      {/* Confirmar perfil */}
      <AlertDialog
        isOpen={isOpenProfile}
        leastDestructiveRef={cancelRef}
        onClose={onCloseProfile}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Confirmar actualización
            </AlertDialogHeader>
            <AlertDialogBody>
              ¿Seguro que deseas actualizar tu información?
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onCloseProfile}>
                No
              </Button>
              <Button
                colorScheme="teal"
                ml={3}
                onClick={() => {
                  formikRef.current?.submitForm();
                  onCloseProfile();
                }}
              >
                Sí, actualizar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      {/* Confirmar cancelación */}
      <AlertDialog
        isOpen={isOpenCancel}
        leastDestructiveRef={cancelRef}
        onClose={onCloseCancel}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Confirmar cancelación
            </AlertDialogHeader>
            <AlertDialogBody>
              ¿Seguro que deseas cancelar el pedido #{targetOrderId}?
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onCloseCancel}>
                No
              </Button>
              <Button colorScheme="red" ml={3} onClick={confirmCancel}>
                Sí, cancelar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      {/* Confirmar completado */}
      <AlertDialog
        isOpen={isOpenComplete}
        leastDestructiveRef={cancelRef}
        onClose={onCloseComplete}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Confirmar completado
            </AlertDialogHeader>
            <AlertDialogBody>
              ¿Marcar pedido #{targetOrderId} como completado?
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onCloseComplete}>
                No
              </Button>
              <Button colorScheme="green" ml={3} onClick={confirmComplete}>
                Sí, completar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
