import {
    Text,
    Button,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    useDisclosure,
    Wrap,
} from "@chakra-ui/react";
import UpdateCustomerForm from "./UpdateCustomerForm.jsx";
import { MdEditNote } from "react-icons/md";

const UpdateCustomerDrawer = ({ fetchCustomers, initialValues, customerId }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return <>
        <Button
            fontSize={'15px'}
            shadow={'md'}
            _hover={{
                color: '#0d8ef2',
                transform: 'scale(0.9)'
            }}
            onClick={onOpen}
            columnGap={1}
        >
            <Wrap>
                <Text>Editar</Text>
                <MdEditNote
                    size={18}
                />
            </Wrap>
        </Button>
        <Drawer isOpen={isOpen} onClose={onClose} size={"xl"}>
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Editar Usuario</DrawerHeader>
                <DrawerBody>
                    <UpdateCustomerForm
                        fetchCustomers={fetchCustomers}
                        initialValues={initialValues}
                        customerId={customerId}
                    />
                </DrawerBody>
                <DrawerFooter>
                    <Button
                        colorScheme={"telegram"}
                        w={"150px"}
                        onClick={onClose}
                    >
                        Volver
                    </Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
        </>

}

export default UpdateCustomerDrawer;