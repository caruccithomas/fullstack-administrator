import {
    Button,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    useDisclosure
} from "@chakra-ui/react";
import CreateCustomerForm from "../shared/CreateCustomerForm.jsx";
import {MdAdd} from 'react-icons/md'

const CreateCustomerDrawer = ({ fetchCustomers }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <Button
                leftIcon={<MdAdd />}
                bgColor={"#fff"}
                onClick={onOpen}
                pr={6}
                fontWeight={400}
                fontSize={"15px"}
            >
                Nuevo
            </Button>
            <Drawer isOpen={isOpen} onClose={onClose} size={"xl"}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Crear Usuario</DrawerHeader>

                    <DrawerBody>
                        <CreateCustomerForm
                            onSuccess={fetchCustomers}
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
    )
}

export default CreateCustomerDrawer;