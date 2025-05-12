import { useAuth } from "@/hooks/useAuth.hook";
import {
  Box,
  Button,
  chakra,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import type { FormikHelpers } from "formik";
import { Form, Formik } from "formik";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

const MotionStack = chakra(motion.div);

interface ForgotValues {
  email: string;
}

const forgotSchema = Yup.object({
  email: Yup.string()
    .email("Formato de email inválido")
    .required("Obligatorio"),
});

export function ForgotPassword() {
  const { sendPasswordReset } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const initialValues: ForgotValues = { email: "" };

  const handleSubmit = async (
    values: ForgotValues,
    { setSubmitting, setFieldError }: FormikHelpers<ForgotValues>
  ) => {
    try {
      await sendPasswordReset(values.email);
      toast({
        title: "Correo enviado",
        description: "Revisa tu bandeja para restablecer tu contraseña.",
        status: "success",
      });
      navigate("/login", { replace: true });
    } catch (err: any) {
      setFieldError(
        "email",
        err.response?.data?.message || "Error al enviar correo"
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box maxW="md" w="full" mx="auto" px={4} py={8}>
      <Formik
        initialValues={initialValues}
        validationSchema={forgotSchema}
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
                  Recuperar contraseña
                </Text>

                <FormControl
                  id="email"
                  isInvalid={Boolean(errors.email && touched.email)}
                >
                  <FormLabel>Email</FormLabel>
                  <Input
                    name="email"
                    type="email"
                    placeholder="juan@ejemplo.com"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    variant="filled"
                    _focus={{ borderColor: "teal.400" }}
                  />
                  <FormErrorMessage>{errors.email}</FormErrorMessage>
                </FormControl>

                <Button
                  type="submit"
                  w="full"
                  bgGradient="linear(to-r, teal.400, blue.500)"
                  color="white"
                  _hover={{ bgGradient: "linear(to-r, teal.500, blue.600)" }}
                  isLoading={isSubmitting}
                >
                  Enviar enlace
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
