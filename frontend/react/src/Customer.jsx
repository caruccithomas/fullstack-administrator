import {
    Wrap,
    Spinner,
    Text,
    Button,
    Card
} from '@chakra-ui/react';
import SidebarWithHeader from "./components/global/Navbars.jsx";
import { useEffect, useState } from 'react';
import { SwapVert } from '@mui/icons-material'
import { getCustomers } from "./services/client.js";
import CardWithImage from "./components/customer/CustomerCard.jsx";
import CreateCustomerDrawer from "./components/customer/CreateCustomerDrawer.jsx";
import {errorNotification} from "./services/notification.js";

const Customer = () => {

    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [err, setError] = useState("");

    const fetchCustomers = () => {
        setLoading(true);
        getCustomers().then(res => {
            setCustomers(res.data)
        }).catch(err => {
            setError(err.response.data.message)
            errorNotification(
                err.code,
                err.response.data.message
            )
        }).finally(() => {
            setLoading(false)
        })
    }

    useEffect(() => {
        fetchCustomers();
    }, [])

    if (loading) {
        return (
            <SidebarWithHeader>
                <Wrap
                    display='flex'
                    alignItems='center'
                    justifyContent='center'
                    minW='full'
                >
                    <Spinner
                        thickness='3px'
                        speed='0.65s'
                        emptyColor='#555'
                        color='purple.500'
                        size='lg'
                    />
                </Wrap>
            </SidebarWithHeader>
        )
    }

    if (err) {
        return (
            <SidebarWithHeader>
                <Wrap
                    w={"full"}
                    justify={"space-between"}
                    shadow={"md"}
                    bgColor={"#fff"}
                    rounded={10}
                >
                    <CreateCustomerDrawer
                        fetchCustomers={fetchCustomers}
                    />
                </Wrap>
                <Text mt={"1em"} ml={1}>¡Ups! Hubo un error procesando la información</Text>
            </SidebarWithHeader>
        )
    }

    if(customers.length <= 0) {
        return (
            <SidebarWithHeader>
                <Wrap
                    w={"full"}
                    justify={"space-between"}
                    shadow={"md"}
                    bgColor={"#fff"}
                    rounded={10}
                >
                    <CreateCustomerDrawer
                        fetchCustomers={fetchCustomers}
                    />
                </Wrap>
                <Text>No se encontraron usuarios existentes</Text>
            </SidebarWithHeader>
        )
    }

    return (
        <SidebarWithHeader>
            <Wrap
                w={"full"}
                justify={"space-between"}
                shadow={"md"}
                bgColor={"#fff"}
                rounded={10}
            >
                <CreateCustomerDrawer fetchCustomers={fetchCustomers} />
                {/* Crear filtros */}
                <Button bgColor={"white"} pl={6}>
                    <Text pr={2} fontWeight={400} fontSize={"15px"}>
                        Ordenar
                    </Text>
                    <SwapVert />
                </Button>
            </Wrap>
            <div className="card-container">
                {customers.map((customer, index) => (
                    <Card key={index}>
                        <CardWithImage
                            {...customer}
                            imageNumber={index}
                            fetchCustomers={fetchCustomers}
                        />
                    </Card>
                ))}
            </div>
        </SidebarWithHeader>
    )
}

export default Customer;