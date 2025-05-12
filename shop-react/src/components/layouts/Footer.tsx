import { Flex, Icon, Link, Text, chakra } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

const MotionBox = chakra(motion.div);

export function Footer() {
  return (
    <MotionBox
      as="footer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transitionDuration={"500ms"}
      transitionTimingFunction="ease-in-out"
      transitionDelay={"200ms"}
      bg="gray.800"
      color="gray.200"
      borderTop="1px solid"
      borderColor="gray.700"
      py={8}
      px={{ base: 4, md: 16 }}
    >
      <Flex
        direction={{ base: "column", md: "row" }}
        align="center"
        justify="space-between"
        maxW="6xl"
        mx="auto"
        mb={4}
      >
        {/* Brand */}
        <Text fontSize={{ base: "xl", md: "2xl" }} fontWeight="bold">
          SportsStore
        </Text>

        {/* Navigation Links */}
        <Flex mt={{ base: 4, md: 0 }} gap={{ base: 4, md: 8 }}>
          <Link href="/about" color="gray.200" _hover={{ color: "white" }}>
            Nosotros
          </Link>
          <Link href="/contact" color="gray.200" _hover={{ color: "white" }}>
            Contacto
          </Link>
          <Link href="/terms" color="gray.200" _hover={{ color: "white" }}>
            Términos
          </Link>
        </Flex>

        {/* Social Icons */}
        <Flex mt={{ base: 4, md: 0 }} gap={6}>
          <Link
            href="https://facebook.com"
            isExternal
            _hover={{ color: "white" }}
          >
            <Icon as={FaFacebookF} boxSize={5} />
          </Link>
          <Link
            href="https://twitter.com"
            isExternal
            _hover={{ color: "white" }}
          >
            <Icon as={FaTwitter} boxSize={5} />
          </Link>
          <Link
            href="https://instagram.com"
            isExternal
            _hover={{ color: "white" }}
          >
            <Icon as={FaInstagram} boxSize={5} />
          </Link>
        </Flex>
      </Flex>

      {/* Copyright */}
      <Text fontSize="sm" textAlign="center">
        © {new Date().getFullYear()} SportsStore. Todos los derechos reservados.
      </Text>
    </MotionBox>
  );
}
