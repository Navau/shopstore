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
} from "@chakra-ui/react";
import type { FormikHelpers } from "formik";
import { Form, Formik } from "formik";
import { motion } from "framer-motion";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

const MotionStack = chakra(motion.div);

interface LoginValues {
  email: string;
  password: string;
}

const loginSchema = Yup.object({
  email: Yup.string()
    .email("Formato de email inválido")
    .required("El email es obligatorio"),
  password: Yup.string()
    .min(8, "Mínimo 8 caracteres")
    .required("La contraseña es obligatoria"),
});

export function Login() {
  const initialValues: LoginValues = { email: "", password: "" };
  const { login } = useAuth();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const toggleShow = () => setShow(!show);

  const handleSubmit = async (
    values: LoginValues,
    { setSubmitting, setFieldError }: FormikHelpers<LoginValues>
  ) => {
    try {
      await login(values);
      navigate("/", { replace: true });
    } catch (err: any) {
      setFieldError(
        "email",
        err.response?.data?.message || "Credenciales inválidas"
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box maxW="md" w="full" mx="auto" px={4} py={8}>
      <Formik
        initialValues={initialValues}
        validationSchema={loginSchema}
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

              <FormControl
                id="password"
                isInvalid={Boolean(errors.password && touched.password)}
              >
                <FormLabel>Contraseña</FormLabel>
                <InputGroup>
                  <Input
                    name="password"
                    type={show ? "text" : "password"}
                    placeholder="••••••••"
                    value={values.password}
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
                <FormErrorMessage>{errors.password}</FormErrorMessage>
              </FormControl>

              <Text textAlign="right" fontSize="sm" mb={4}>
                <chakra.span
                  color="teal.400"
                  cursor="pointer"
                  onClick={() => navigate("/forgot-password")}
                  fontWeight="bold"
                >
                  ¿Olvidaste tu contraseña?
                </chakra.span>
              </Text>

              <Button
                type="submit"
                w="full"
                bgGradient="linear(to-r, teal.400, blue.500)"
                color="white"
                _hover={{ bgGradient: "linear(to-r, teal.500, blue.600)" }}
                isLoading={isSubmitting}
              >
                Entrar
              </Button>

              <Text textAlign="center" fontSize="sm">
                ¿No tienes cuenta?{" "}
                <chakra.span
                  color="teal.400"
                  cursor="pointer"
                  onClick={() => navigate("/register")}
                  fontWeight="bold"
                >
                  Regístrate
                </chakra.span>
              </Text>
            </MotionStack>
          </Form>
        )}
      </Formik>
    </Box>
  );
}
