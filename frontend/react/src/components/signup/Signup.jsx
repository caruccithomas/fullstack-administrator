import {useAuth} from "../context/AuthContext.jsx";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {Box, Flex, Heading, Image, Link, Stack, Text, useMediaQuery} from "@chakra-ui/react";
import CreateCustomerForm from "../shared/CreateCustomerForm.jsx";
import SimpleSlider from "../shared/Slider.jsx";

const Signup = () => {
    const { customer, setCustomerFromToken } = useAuth();
    const navigate = useNavigate();
    const [isTablet] = useMediaQuery("(max-width: 992px)");

    useEffect(() => {
        if (customer) {
            navigate("/dashboard/customers");
        }
    })

    return (
        <Stack direction={{base: 'column-reverse', lg: 'row'}}>
            <Flex
                flex={1}
                p={10}
                bgGradient={'linear(to-r, cyan.400, blue.600)'}
                minH={"100vh"}
            >
                <Stack
                    w={'full'}
                    m={"auto 0"}
                >
                    <SimpleSlider />
                </Stack>
            </Flex>
            <Flex p={10} flex={1}>
                <Stack
                    w={'full'}
                    minH={isTablet ? "100vh" : "100%"}
                    spacing={2}
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
                        <CreateCustomerForm onSuccess={(token) => {
                            localStorage.setItem("access_token", token)
                            setCustomerFromToken()
                            navigate("/dashboard");
                        }}/>
                    </Box>
                    <div className='click-here-box'>
                        <Text>¿Ya tienes una cuenta?</Text>
                        <Link color={"blue.500"} href={"/"}>
                            Inicia sesión aquí
                        </Link>
                    </div>
                </Stack>
            </Flex>
        </Stack>
    );
}

export default Signup;