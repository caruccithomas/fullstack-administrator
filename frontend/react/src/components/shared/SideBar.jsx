import React from 'react';
import {
    Avatar,
    Box,
    CloseButton,
    Drawer,
    DrawerContent,
    Flex,
    HStack,
    Icon,
    IconButton,
    Link,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
    Text,
    useColorModeValue,
    useDisclosure,
    VStack,
    Image,
    Container,
    Divider,
    border
} from '@chakra-ui/react';

import {
    FiHome,
    FiMenu,
    FiSettings,
    FiUsers
} from 'react-icons/fi';
import {useAuth} from "../context/AuthContext.jsx";
import { customerProfilePictureUrl } from '../../services/client.js';

const LinkItems = [
    {name: 'Inicio', route: '/dashboard', icon: FiHome},
    {name: 'Usuarios', route: '/dashboard/customers',  icon: FiUsers},
    {name: 'Configuración', route: '/dashboard/settings', icon: FiSettings},
];

export default function SidebarWithHeader({children}) {
    const {isOpen, onOpen, onClose} = useDisclosure();
    return (
        <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
            <SidebarContent
                onClose={() => onClose}
                display={{base: 'none', md: 'block'}}
            />
            <Drawer
                autoFocus={false}
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                returnFocusOnClose={false}
                onOverlayClick={onClose}
                size="full">
                <DrawerContent>
                    <SidebarContent onClose={onClose} />
                </DrawerContent>
            </Drawer>
            {/* mobilenav */}
            <MobileNav onOpen={onOpen} />
            <Box ml={{base: 0, md: 60}} p="4">
                {children}
            </Box>
        </Box>
    );
}

const SidebarContent = ({onClose, ...rest}) => {
    return (
        <Box
            transition="3s ease"
            bg={useColorModeValue('white', 'gray.900')}
            shadow={"lg"}
            w={{base: 'full', md: 60}}
            pos="fixed"
            h="full"
            {...rest}>
            <Flex display={"flex"} justifyContent="flex-end">
                <CloseButton display={{base: 'flex', md: 'none'}}
                    onClick={onClose}
                    m={3}
                />
            </Flex>
            <Flex w={"full"} display={"flex"} flexDirection="column" alignItems="center">
                <Container minH={20} display={"flex"} justifyContent={"center"} alignItems="center">
                    <Image
                        maxW={"140px"}
                        boxSize='s'
                        src='https://i.ibb.co/8Kpf9BP/logo.png'
                        alt='icon'
                    />
                </Container>
                <Container m={{base: 6, sm: 0}} fontSize={"15px"}>
                    {LinkItems.map((link) => (
                        <NavItem key={link.name} route={link.route} icon={link.icon}>
                            {link.name}
                        </NavItem>
                    ))}
                </Container>
            </Flex>
        </Box>
    );
};

const NavItem = ({icon, route, children, ...rest}) => {
    return (
        <Link href={route} style={{textDecoration: 'none'}} _focus={{boxShadow: 'none'}}>
            <Flex
                align="center"
                p="4"
                mx="4"
                borderRadius="lg"
                role="group"
                cursor="pointer"
                _hover={{
                    bg: 'blue.400',
                    color: 'white',
                }}
                {...rest}>
                {icon && (
                    <Icon
                        mr="4"
                        fontSize="16"
                        _groupHover={{
                            color: 'white',
                        }}
                        as={icon}
                    />
                )}
                {children}
            </Flex>
        </Link>
    );
};

const MobileNav = ({onOpen, ...rest}) => {
    const { logOut, customer } = useAuth()

    return (
        <Flex
            ml={{base: 0, md: 60}}
            px={{base: 4, md: 4}}
            height="20"
            alignItems="center"
            bg={useColorModeValue('white', 'gray.900')}
            shadow={"sm"}
            justifyContent={{base: 'space-between', md: 'flex-end'}}
            {...rest}
        >
            <IconButton
                display={{base: 'flex', md: 'none'}}
                onClick={onOpen}
                variant="ghost"
                aria-label="open menu"
                icon={<FiMenu/>}
            />
            <HStack spacing={{base: '0', md: '6'}}>
                <Flex alignItems={'center'}>
                    <Menu>
                        <MenuButton
                            transition="all 0.3s"
                            _focus={{boxShadow: 'none'}}>
                            <HStack p={2}>
                                <VStack
                                    display={{base: 'none', sm: 'flex'}}
                                    alignItems="flex-end"
                                    spacing="0"
                                >
                                    <Text fontSize="sm">{customer?.username}</Text>
                                    {customer?.roles.map((role, id) => (
                                        <Text key={id} fontSize="xs" color="gray.600">
                                            {role}
                                        </Text>
                                    ))}
                                </VStack>
                                <Avatar size={'sm'} src={''} />
                            </HStack>
                        </MenuButton>
                        <MenuList
                            bg={useColorModeValue('white', 'gray.900')}
                            borderColor={useColorModeValue('gray.200', 'gray.700')}>
                            <MenuItem>Visualizar</MenuItem>
                            <MenuItem>Modificar perfil</MenuItem>
                            <MenuDivider/>
                            <MenuItem onClick={logOut}>
                                Cerrar sesión
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>
            </HStack>
        </Flex>
    );
};