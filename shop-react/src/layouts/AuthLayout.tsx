import bgImage from "@/assets/auth-bg-2.jpg";
import { Box, Flex, Heading, chakra } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Outlet } from "react-router-dom";

const MotionContainer = chakra(motion.div);

export function AuthLayout() {
  return (
    <Flex
      position="relative"
      align="center"
      justify="center"
      minH="100vh"
      // Fondo deportivo (reemplaza con tu imagen)
      bgImage={`url(${bgImage})`}
      bgSize="cover"
      bgPos="center"
    >
      {/* Capa oscura semitransparente */}
      <Box
        position="absolute"
        top={0}
        left={0}
        w="100%"
        h="100%"
        bg="blackAlpha.600"
      />

      {/* Contenedor animado */}
      <MotionContainer
        zIndex={1}
        bg="whiteAlpha.900"
        p={[6, 8]}
        borderRadius="lg"
        boxShadow="2xl"
        w="full"
        maxW="md"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ ease: "easeOut" }}
      >
        <Heading
          mb={6}
          textAlign="center"
          // Texto con gradiente deportivo
          bgGradient="linear(to-r, teal.300, blue.500)"
          bgClip="text"
          fontSize={["2xl", "3xl"]}
        >
          SportsStore
        </Heading>

        <Outlet />
      </MotionContainer>
    </Flex>
  );
}
