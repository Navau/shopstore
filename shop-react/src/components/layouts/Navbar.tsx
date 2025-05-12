import { useAuth } from "@/hooks/useAuth.hook";
import { useCart } from "@/hooks/useCart.hook";
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  chakra,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  HStack,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FaShoppingCart } from "react-icons/fa";
import { Link as RouterLink, useNavigate } from "react-router-dom";

const MotionBox = chakra(motion.div);

export function Navbar(props: { onOpenCart: () => void }) {
  const { onOpenCart } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { cart } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <>
      <MotionBox
        as="nav"
        position="sticky"
        top="0"
        zIndex="1000"
        bg="white"
        borderBottom="1px solid"
        borderColor="gray.200"
        px={{ base: 4, md: 8 }}
        py={4}
        boxShadow="sm"
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transitionDuration="500ms"
        transitionTimingFunction="ease-in-out"
        transitionDelay="200ms"
      >
        <Flex align="center" justify="space-between" maxW="1200px" mx="auto">
          {/* Logo */}
          <Link as={RouterLink} to="/" _hover={{ textDecoration: "none" }}>
            <Text
              fontSize={{ base: "xl", md: "2xl" }}
              fontWeight="bold"
              color="gray.800"
            >
              SportsStore
            </Text>
          </Link>

          {/* Desktop Links */}
          <HStack
            as="ul"
            listStyleType="none"
            spacing={8}
            display={{ base: "none", md: "flex" }}
          >
            {[
              { label: "Inicio", path: "/" },
              { label: "Productos", path: "/" },
              { label: "Contacto", path: "/" },
              { label: "Mi Información", path: "/profile" },
            ].map(({ label, path }) => (
              <Link
                as={RouterLink}
                to={path}
                key={label}
                _hover={{ color: "teal.500" }}
                fontWeight="medium"
                color="gray.700"
              >
                {label}
              </Link>
            ))}
          </HStack>

          {/* Cart, User Menu & Hamburger */}
          <Flex align="center">
            {/* Cart Button */}
            <IconButton
              aria-label="Abrir carrito"
              icon={
                <Box position="relative">
                  <FaShoppingCart />
                  {cart?.items?.length > 0 && (
                    <Box
                      position="absolute"
                      top="0"
                      right="0"
                      w="2"
                      h="2"
                      bg="red.500"
                      borderRadius="full"
                    />
                  )}
                </Box>
              }
              variant="ghost"
              color="gray.700"
              mr={2}
              onClick={onOpenCart}
            />

            {/* User Menu */}
            <Menu>
              <MenuButton
                as={IconButton}
                aria-label="Cuenta de usuario"
                icon={
                  <Avatar
                    size="sm"
                    name={`${user?.firstName} ${user?.lastName}`}
                  />
                }
                variant="ghost"
                mr={2}
              />
              <MenuList>
                <MenuItem as={RouterLink} to="/profile">
                  Mi perfil
                </MenuItem>
                <MenuItem onClick={handleLogout}>Cerrar sesión</MenuItem>
              </MenuList>
            </Menu>

            {/* Mobile Hamburger */}
            <IconButton
              aria-label="Menú"
              icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
              display={{ base: "flex", md: "none" }}
              variant="ghost"
              color="gray.700"
              onClick={isOpen ? onClose : onOpen}
            />
          </Flex>
        </Flex>
      </MotionBox>

      {/* Mobile Drawer */}
      <Drawer placement="top" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton mt={2} />
          <DrawerBody>
            <VStack spacing={4} mt={10} align="start">
              {[
                { label: "Inicio", path: "/" },
                { label: "Productos", path: "/" },
                { label: "Contacto", path: "/" },
                { label: "Mi Información", path: "/profile" },
              ].map(({ label, path }) => (
                <Link
                  as={RouterLink}
                  to={path}
                  key={label}
                  w="full"
                  onClick={onClose}
                  fontSize="lg"
                  fontWeight="medium"
                  color="gray.700"
                >
                  {label}
                </Link>
              ))}

              {/* Carrito */}
              <Box w="full">
                <IconButton
                  aria-label="Abrir carrito"
                  icon={
                    <Box position="relative">
                      <FaShoppingCart />
                      {cart?.items?.length > 0 && (
                        <Box
                          position="absolute"
                          top="0"
                          right="0"
                          w="2"
                          h="2"
                          bg="red.500"
                          borderRadius="full"
                        />
                      )}
                    </Box>
                  }
                  variant="ghost"
                  color="gray.700"
                  mr={2}
                  onClick={onOpenCart}
                />
                <Text as="span" ml={2} fontWeight="medium" color="gray.700">
                  Carrito
                </Text>
              </Box>

              {/* Atajos de usuario */}
              <Link
                as={RouterLink}
                to="/profile"
                w="full"
                onClick={onClose}
                fontSize="lg"
                fontWeight="medium"
                color="gray.700"
              >
                Mi perfil
              </Link>
              <Link
                w="full"
                onClick={() => {
                  onClose();
                  handleLogout();
                }}
                fontSize="lg"
                fontWeight="medium"
                color="gray.700"
              >
                Cerrar sesión
              </Link>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
