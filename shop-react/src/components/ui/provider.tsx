"use client";

import { ChakraProvider, extendTheme } from "@chakra-ui/react";

export function Provider(props: { children: React.ReactNode }) {
  const colors = {
    brand: {
      900: "#1a365d",
      800: "#153e75",
      700: "#2a69ac",
    },
  };

  const theme = extendTheme({ colors });
  return <ChakraProvider theme={theme}>{props.children}</ChakraProvider>;
}
