import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {
    Alert,
    AlertIcon,
    Box,
    Button,
    Flex,
    FormLabel,
    Image,
    Input,
    Link,
    Stack,
    Text
} from '@chakra-ui/react';
import * as Yup from 'yup';
import {Formik, Form, useField} from "formik";
import {useAuth} from "../context/AuthContext.jsx";
import {errorNotification} from "../../services/notification.js";
import SimpleSlider from '../shared/Slider.jsx';

const MyTextInput = ({label, ...props}) => {
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input>. We can use field meta to show an error
    // message if the field is invalid and it has been touched (i.e. visited)
    const [field, meta] = useField(props);
    return (
        <Box>
            <FormLabel htmlFor={props.id || props.name}>{label}</FormLabel>
            <Input className="text-input" {...field} {...props} />
            {meta.touched && meta.error ? (
                <Alert className="error" status={"error"} mt={2}>
                    <AlertIcon/>
                    {meta.error}
                </Alert>
            ) : null}
        </Box>
    );
};

const LoginForm = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    return (
        <Formik
            validateOnMount={true}
            validationSchema={
                Yup.object({
                    username: Yup.string()
                        .email("Debe ingresar un correo válido")
                        .required("El correo electrónico es requerido"),
                    password: Yup.string()
                        .max(20, "Debe ingresar una clave que contenga hasta 20 caracteres")
                        .required("La contraseña es requerida")
                })
            }
            initialValues={{username: '', password: ''}}
            onSubmit={(values, {setSubmitting}) => {
                setSubmitting(true);
                login(values).then(res => {
                    navigate("/dashboard")
                    console.log("Ha iniciado sesión con éxito");
                }).catch(err => {
                    errorNotification(
                        err.code,
                        err.response.data.message
                    )
                }).finally(() => {
                    setSubmitting(false);
                })
            }}>

            {({isValid, isSubmitting}) => (
                <Form>
                    <Stack mt={15} spacing={15}>
                        <MyTextInput
                            label={"Correo electrónico"}
                            name={"username"}
                            type={"email"}
                            placeholder={"Ingresa tu correo electrónico"}
                        />
                        <MyTextInput
                            label={"Contraseña"}
                            name={"password"}
                            type={"password"}
                            placeholder={"Ingresa tu contraseña"}
                        />

                        <Button
                            type={"submit"}
                            disabled={!isValid || isSubmitting}>
                            Ingresar
                        </Button>
                    </Stack>
                </Form>
            )}

        </Formik>
    )
}

const Login = () => {
    const { customer } = useAuth();
    const navigate = useNavigate();
    // const [ isTablet ] = useMediaQuery("(max-width: 992px)");

    useEffect(() => {
        if (customer) {
            navigate("/dashboard");
        }
    })

    return (
        <Stack direction={{base: 'column', lg: 'row'}} h="100vh">
            <Flex p={10} flex={1}>
                <Stack
                    w={'full'}
                    spacing={10}
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"center"}
                >
                    <Image
                        src={"https://i.ibb.co/8Kpf9BP/logo.png"}
                        boxSize={'s'}
                        width={"full"}
                        maxWidth={220}
                        alt={"icon"}
                        alignSelf={"center"}
                    />
                    <Box
                        w={"full"}
                        maxW={350}
                    >
                        <LoginForm />
                    </Box>
                    <div className='click-here-box'>
                        <Text>¿No tienes una cuenta?</Text>
                        <Link color={"blue.600"} href={"/signup"}>
                            Registrate aquí
                        </Link>
                    </div>
                </Stack>
            </Flex>
            <Flex flex={1} p={10} bgGradient={'linear(to-r, blue.600, cyan.400)'}>
                <Stack
                    w={'full'}
                    m={"auto 0"}
                >
                    <SimpleSlider />
                </Stack>
            </Flex>
        </Stack>
    );
}

export default Login;