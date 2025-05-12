import { useAuth } from "@/hooks/useAuth.hook";
import {
  Box,
  Button,
  chakra,
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import type { FormikHelpers } from "formik";
import { Form, Formik } from "formik";
import { motion } from "framer-motion";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";

const MotionStack = chakra(motion.div);

interface ResetValues {
  newPassword: string;
}

const resetSchema = Yup.object({
  newPassword: Yup.string()
    .min(8, "Mínimo 8 caracteres")
    .required("Obligatorio"),
});

export function ResetPassword() {
  const { resetPassword } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const { search } = useLocation();
  const token = new URLSearchParams(search).get("token") || "";
  const [show, setShow] = useState(false);
  const toggleShow = () => setShow(!show);

  const initialValues: ResetValues = { newPassword: "" };

  const handleSubmit = async (
    values: ResetValues,
    { setSubmitting, setFieldError }: FormikHelpers<ResetValues>
  ) => {
    try {
      await resetPassword(token, values.newPassword);
      toast({ title: "Contraseña actualizada", status: "success" });
      navigate("/login", { replace: true });
    } catch (err: any) {
      setFieldError(
        "newPassword",
        err.response?.data?.message || "Error al restablecer"
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box maxW="md" w="full" mx="auto" px={4} py={8}>
      <Formik
        initialValues={initialValues}
        validationSchema={resetSchema}
        onSubmit={handleSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          isSubmitting,
        }) => (
          <Form noValidate>
            <MotionStack
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ease: "easeOut" }}
            >
              <VStack spacing={6} align="stretch">
                <Text fontSize="2xl" textAlign="center">
                  Restablecer contraseña
                </Text>

                <FormControl
                  id="newPassword"
                  isInvalid={Boolean(errors.newPassword && touched.newPassword)}
                >
                  <FormLabel>Contraseña</FormLabel>
                  <InputGroup>
                    <Input
                      name="newPassword"
                      type={show ? "text" : "password"}
                      placeholder="••••••••"
                      value={values.newPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      variant="filled"
                      _focus={{ borderColor: "teal.400" }}
                    />
                    <InputRightElement>
                      <IconButton
                        aria-label={
                          show ? "Ocultar contraseña" : "Mostrar contraseña"
                        }
                        icon={show ? <FaEyeSlash /> : <FaEye />}
                        size="sm"
                        variant="ghost"
                        onClick={toggleShow}
                      />
                    </InputRightElement>
                  </InputGroup>
                  <FormErrorMessage>{errors.newPassword}</FormErrorMessage>
                </FormControl>

                <Button
                  type="submit"
                  w="full"
                  bgGradient="linear(to-r, teal.400, blue.500)"
                  color="white"
                  _hover={{ bgGradient: "linear(to-r, teal.500, blue.600)" }}
                  isLoading={isSubmitting}
                >
                  Restablecer
                </Button>

                <Text textAlign="center" fontSize="sm">
                  <chakra.span
                    color="teal.400"
                    cursor="pointer"
                    onClick={() => navigate("/login")}
                    fontWeight="bold"
                  >
                    Volver al login
                  </chakra.span>
                </Text>
              </VStack>
            </MotionStack>
          </Form>
        )}
      </Formik>
    </Box>
  );
}
