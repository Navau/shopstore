import { CartDrawer } from "@/components/layouts/CartDrawer";
import { Box, Flex, useDisclosure } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { Footer, Navbar } from "../components";

export function MainLayout() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex direction="column" minH="100vh">
      <Navbar onOpenCart={onOpen} />
      <CartDrawer isOpen={isOpen} onClose={onClose} />
      <Box flex="1" p={4}>
        <Outlet context={{ openCart: onOpen }} />
      </Box>
      <Footer />
    </Flex>
  );
}
