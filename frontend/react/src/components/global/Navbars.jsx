import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from "../context/AuthContext.jsx";
import { EMPTY_AVATAR } from '../../constants/constants.js';

import {
    Avatar,
    Box,
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
    useDisclosure,
    Image,
    InputGroup,
    InputLeftElement,
    Input,
    VStack,
    Text,
    Stack
} from '@chakra-ui/react';

import {
    CalendarMonthOutlined as CalendarIcon,
    DashboardOutlined as DashboardIcon,
    GroupOutlined as GroupIcon,
    Menu as MenuIcon,
    NotificationsOutlined as NotificationIcon,
    LightModeOutlined as LightModeIcon,
    Search as SearchIcon
} from '@mui/icons-material';

const LinkItems = [
    {name: 'Dashboard', route: '/dashboard', icon: DashboardIcon},
    {name: 'Manage Team', route: '/customers',  icon: GroupIcon},
    {name: 'Calendar', route: '/calendar', icon: CalendarIcon},
    {name: 'Dashboard', route: '/dashboard', icon: DashboardIcon},
    {name: 'Calendar', route: '/calendar', icon: CalendarIcon}
];

const SidebarWithHeader = ({children}) => {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const containerRef = useRef();
    
    // [Click Event] Sidebar Mobile
    useEffect(() => {
        document.addEventListener('click', handleOutsideClick);
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, []);

    const handleOutsideClick = (e) => {
        if (containerRef.current && !containerRef.current.contains(e.target)) {
            onClose();
        }
    }
    
    return (
        <Box ref={containerRef}>
            <RenderSidebarContent
                onClose={onClose}
                display={{base: 'none', md: 'block'}}
            />
            <Drawer
                autoFocus={false}
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                returnFocusOnClose={false}
                isLazy
            >
                <DrawerContent maxW={60}>
                    <RenderSidebarContent onClose={onClose} />
                </DrawerContent>
            </Drawer>

            {/* Mobile Navbar and Page Content */}
            <Flex flexDirection={"column"} mx={3}>
                <RenderMobileNav onOpen={onOpen} />
                <Box pl={{base: 0, md: 60}}>
                    {children}
                </Box>
            </Flex>
        </Box>
    );
}

const RenderSidebarContent = ({onClose, ...rest}) => {

    return (
        <VStack
            w={60}
            h="full"
            minH="100vh"
            pos="fixed"
            alignItems="left"
            // Convertir este BG en un LIGHT THEME
            // (junto al bg #f7f7f7 del index.css)
            bgColor="#fff"
            {...rest}
        >
            <Flex flexDir={"column"} flexGrow={1}>
                <Stack>
                    <Image
                        maxW="140px"
                        src='https://i.ibb.co/rZSjZLb/brand.png'
                        alt='brand'
                        m={6}
                    />
                </Stack>
                <Box>
                    {LinkItems.map((link) => (
                        <RenderNavItem
                            key={link.name}
                            route={link.route}
                            icon={link.icon}
                        >
                            {link.name}
                        </RenderNavItem>
                    ))}
                </Box>
            </Flex>
            <Flex 
                flexDir="column"
                alignItems="center"
                p={6} 
                bgColor={"yellow.200"}
            >
                <Stack bgColor="purple.500">
                    <Image
                        maxW='200px'
                        src='https://i.ibb.co/PTCQScC/github.png'
                        alt='github'
                    />
                </Stack>
            </Flex>
        </VStack>
    );
};

const RenderNavItem = ({icon, route, children, ...rest}) => {
    const location = useLocation();
    const isActive = location.pathname === route;

    return (
        <Link
            href={route}
            w={60}
            cursor='pointer'
            fontWeight={isActive ? 'semibold' : 'normal'}
            fontSize='0.938rem'
            color={isActive ? 'purple.500' : '#555'}
            _focus={{boxShadow: 'none'}}
            _hover={{
                textDecoration: 'none',
                color: 'purple.500',
                transition: 'all 0.5s ease'
            }}
        >
            <Flex
                borderLeft={isActive ? '4px' : 'auto'}
                borderColor='purple.500'
                align='center'
                p={3}
                pl={8}
                role='group'
                {...rest}
            >
                {icon && (
                    <Icon
                        mr={5}
                        fontSize="lg"
                        as={icon}
                    />
                )}
                {children}
            </Flex>
        </Link>
    );
};

const RenderMobileNav = ({onOpen, ...rest}) => {
    const { customer, setCustomerFromToken, logOut } = useAuth();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await setCustomerFromToken();
                setLoading(false);
            } catch (err) {
                console.error("Error loading user data: ", err);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return (
            <Text>Loading</Text>
        );
    };

    // Format username
    const capitalizeFirstLetter = (name) => {
        return name.charAt(0).toUpperCase() + name.slice(1);
    };

    const email = customer.username;
    const fullname = email.split('@')[0].split('.');
    const username = fullname.map(capitalizeFirstLetter).join(' ')

    return (
        <HStack>
            <Flex
                w="full"
                height="20"
                alignItems="center"
                {...rest}
            >
                <IconButton
                    display={{base: 'flex', md: 'none'}}
                    onClick={onOpen}
                    size={"md"}
                    variant="ghost"
                    aria-label="menu"
                    icon={<MenuIcon />}
                />
                <Menu>                
                    <Flex
                        flex={1}
                        pl={{base: 0, md: 60}}
                        px={3}
                    >
                        <InputGroup bgColor={"#fff"}>
                            <InputLeftElement
                                pointerEvents="none"
                                color="#555"
                                h={"full"}
                                children={<SearchIcon />}
                            />
                            <Input
                                size="sm"
                                type="text"
                                placeholder="Quick search"
                                shadow="sm"
                                border="none"
                                focusBorderColor="purple.500"
                            />
                        </InputGroup>
                    </Flex>
                    <Flex flex={{base: 0, md: 1}} justifyContent={"end"}>
                        <IconButton
                            size={"md"}
                            variant="ghost"
                            aria-label="notifications"
                            icon={<NotificationIcon />} 
                        />
                        <IconButton
                            size={"md"}
                            variant="ghost"
                            aria-label="theme"
                            icon={<LightModeIcon />} 
                        />
                        <MenuButton>
                            <Avatar
                                name={username}
                                mr={{base: 2, md: 0}}
                                ml={2}
                                size={'sm'}
                            />
                        </MenuButton>
                    </Flex>
                    <MenuList>
                        <MenuItem>User details</MenuItem>
                        <MenuItem>Modify profile</MenuItem>
                        <MenuDivider/>
                        <MenuItem onClick={logOut}>
                            Logout
                        </MenuItem>
                    </MenuList>
                </Menu>
            </Flex>
        </HStack>
    );
};

export default SidebarWithHeader;