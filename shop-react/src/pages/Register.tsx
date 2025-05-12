import { useAuth } from "@/hooks/useAuth.hook";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  SimpleGrid,
  Text,
  chakra,
} from "@chakra-ui/react";
import type { FormikHelpers } from "formik";
import { Form, Formik } from "formik";
import { motion } from "framer-motion";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

const MotionGrid = chakra(motion.div);

interface RegisterValues {
  firstName: string;
  lastName: string;
  address: string;
  email: string;
  dateOfBirth: string;
  password: string;
  confirmPassword: string;
}

const registerSchema = Yup.object({
  firstName: Yup.string().required("Debe ingresar tus nombres"),
  lastName: Yup.string().required("Debe ingresar tus apellidos"),
  address: Yup.string().required("La dirección es obligatoria"),
  email: Yup.string()
    .email("Formato de email inválido")
    .required("El email es obligatorio"),
  dateOfBirth: Yup.string()
    .required("La fecha es obligatoria")
    .test("age", "Debes ser mayor de 18 años", (value) => {
      if (!value) return false;
      const diff = new Date().getFullYear() - new Date(value).getFullYear();
      return diff >= 18;
    }),
  password: Yup.string()
    .min(8, "Mínimo 8 caracteres")
    .required("La contraseña es obligatoria"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Las contraseñas deben coincidir")
    .required("Debes confirmar la contraseña"),
});

export function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const toggleShow = () => setShow(!show);

  const initialValues: RegisterValues = {
    firstName: "",
    lastName: "",
    address: "",
    email: "",
    dateOfBirth: "",
    password: "",
    confirmPassword: "",
  };

  const handleSubmit = async (
    values: RegisterValues,
    { setSubmitting, setFieldError }: FormikHelpers<RegisterValues>
  ) => {
    try {
      await register(values);
      navigate("/login", { replace: true });
    } catch (err: any) {
      console.log(err);
      setFieldError("email", err.response.data.message || "Error al registrar");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box maxW="lg" mx="auto" mt="8" px={[4, 0]}>
      <Formik
        initialValues={initialValues}
        validationSchema={registerSchema}
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
            <MotionGrid
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ease: "easeOut" }}
            >
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                <FormControl
                  id="firstName"
                  isInvalid={Boolean(errors.firstName && touched.firstName)}
                >
                  <FormLabel>Nombres</FormLabel>
                  <Input
                    name="firstName"
                    placeholder="Ej: Juan"
                    value={values.firstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <FormErrorMessage>{errors.firstName}</FormErrorMessage>
                </FormControl>

                <FormControl
                  id="lastName"
                  isInvalid={Boolean(errors.lastName && touched.lastName)}
                >
                  <FormLabel>Apellidos</FormLabel>
                  <Input
                    name="lastName"
                    placeholder="Ej: Pérez"
                    value={values.lastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <FormErrorMessage>{errors.lastName}</FormErrorMessage>
                </FormControl>

                <FormControl
                  id="address"
                  isInvalid={Boolean(errors.address && touched.address)}
                >
                  <FormLabel>Dirección de envío</FormLabel>
                  <Input
                    name="address"
                    placeholder="Ej: Calle Falsa #123"
                    value={values.address}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <FormErrorMessage>{errors.address}</FormErrorMessage>
                </FormControl>

                <FormControl
                  id="email"
                  isInvalid={Boolean(errors.email && touched.email)}
                >
                  <FormLabel>Email</FormLabel>
                  <Input
                    name="email"
                    type="email"
                    placeholder="Ej: juan@ejemplo.com"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <FormErrorMessage>{errors.email}</FormErrorMessage>
                </FormControl>

                <FormControl
                  id="dateOfBirth"
                  isInvalid={Boolean(errors.dateOfBirth && touched.dateOfBirth)}
                >
                  <FormLabel>Fecha de nacimiento</FormLabel>
                  <Input
                    name="dateOfBirth"
                    type="date"
                    value={values.dateOfBirth}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <FormErrorMessage>{errors.dateOfBirth}</FormErrorMessage>
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

                <FormControl
                  id="confirmPassword"
                  isInvalid={Boolean(
                    errors.confirmPassword && touched.confirmPassword
                  )}
                >
                  <FormLabel>Confirmar contraseña</FormLabel>
                  <InputGroup>
                    <Input
                      name="confirmPassword"
                      type={show ? "text" : "password"}
                      placeholder="••••••••"
                      value={values.confirmPassword}
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
                  <FormErrorMessage>{errors.confirmPassword}</FormErrorMessage>
                </FormControl>
              </SimpleGrid>

              <Button
                mt={6}
                type="submit"
                colorScheme="green"
                w="full"
                isLoading={isSubmitting}
                size="lg"
              >
                Crear cuenta
              </Button>

              <Text textAlign="center" fontSize="sm">
                ¿Ya tienes una cuenta?{" "}
                <chakra.span
                  color="teal.400"
                  cursor="pointer"
                  onClick={() => navigate("/login")}
                  fontWeight="bold"
                >
                  Iniciar sesión
                </chakra.span>
              </Text>
            </MotionGrid>
          </Form>
        )}
      </Formik>
    </Box>
  );
}
