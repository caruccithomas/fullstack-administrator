import {
    AlertDialog,
    AlertDialogBody, AlertDialogContent,
    AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay,
    Avatar,
    Box,
    Button,
    Flex,
    Heading,
    Image,
    Stack,
    Tag,
    Text,
    Wrap,
    useColorModeValue, useDisclosure,
} from '@chakra-ui/react';

import {useRef} from 'react'
import {customerProfilePictureUrl, deleteCustomer} from "../../services/client.js";
import {errorNotification, successNotification} from "../../services/notification.js";
import UpdateCustomerDrawer from "./UpdateCustomerDrawer.jsx";
import { MdDelete } from 'react-icons/md';

export default function CardWithImage({id, name, email, age, gender, imageNumber, fetchCustomers}) {
    const randomUserGender = gender === "MALE" ? "men" : "women";

    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = useRef()

    return (
        <Box
            w={'full'}
            h={'full'}
            bg={useColorModeValue('white', 'gray.800')}
            pb={{base: 5, sm: 8}}
            boxShadow={'lg'}
            rounded={'md'}
            overflow={'hidden'}
        >
            <Image
                h={'120px'}
                w={'full'}
                src={'https://i.ibb.co/P4rNTkd/profile-Bg.jpg'}
                objectFit={'cover'}
            />
            <Flex justify={'center'} mt={-12}>
                <Avatar
                    size={'xl'}
                    src={
                        customerProfilePictureUrl(id)
                        // `https://randomuser.me/api/portraits/${gender}/${imageNumber}.jpg`
                    }
                    alt={'profile image'}
                    shadow={'xl'}
                />
            </Flex>
                
            <Box p={6}>
                <Stack spacing={2} align={'center'} textAlign={'center'}>
                    <Tag borderRadius={"full"}>{id}</Tag>
                    <Heading fontSize={'xl'} fontWeight={500} fontFamily={'body'}>
                        {name}
                    </Heading>
                    <Text color={'gray.500'}>{email}</Text>
                    <Text color={'gray.500'}>{gender} / {age} años</Text>
                </Stack>
            </Box>
            <Stack direction={'row'} justify={'center'} spacing={4}>
                <Stack>
                    <UpdateCustomerDrawer
                        initialValues={{ name, email, age }}
                        customerId={id}
                        fetchCustomers={fetchCustomers}
                    />
                </Stack>
                <Stack>
                    <Button
                        fontSize={'15px'}
                        shadow={'md'}
                        _hover={{
                            color: 'red',
                            transform: 'scale(0.9)'
                        }}
                        onClick={onOpen}
                        columnGap={1}
                    >
                        <Wrap
                            display={'flex'}
                            alignItems={'center'}
                            justifyContent={'center'}
                        >
                            <MdDelete 
                                size={18}
                            />
                            <Text>Eliminar</Text>
                        </Wrap>
                    </Button>
                    <AlertDialog
                        isOpen={isOpen}
                        leastDestructiveRef={cancelRef}
                        onClose={onClose}
                    >
                        <AlertDialogOverlay>
                            <AlertDialogContent>
                                <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                                    Eliminar Usuario
                                </AlertDialogHeader>
                    
                                <AlertDialogBody>
                                    ¿Estás seguro de que quieres eliminar a {name}? Esta acción no podrá deshacerse
                                </AlertDialogBody>
                    
                                <AlertDialogFooter>
                                    <Button ref={cancelRef} onClick={onClose}>
                                        Cancelar
                                    </Button>
                                    <Button colorScheme='red' onClick={() => {
                                        deleteCustomer(id).then(res => {
                                            console.log(res)
                                            successNotification(
                                                'Éxito',
                                                `El usuario ${name} ha sido eliminado`
                                            )
                                            fetchCustomers();
                                            
                                        }).catch(err => {
                                            console.log(err);
                                            errorNotification(
                                                err.code,
                                                err.response.data.message
                                            )
                                        }).finally(() => {
                                            onClose()
                                        })
                                    }} ml={3}>
                                        Si, eliminar
                                    </Button>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialogOverlay>
                    </AlertDialog>
                </Stack>                  
            </Stack>
        </Box>
    );
}