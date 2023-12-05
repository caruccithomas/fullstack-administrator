import React, { useEffect, useRef } from 'react';
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
    InputRightElement,
    VStack
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

import { useAuth } from "../context/AuthContext.jsx";
import { EMPTY_AVATAR } from '../../constants/constants.js';
import { useLocation } from 'react-router-dom';

const LinkItems = [
    {name: 'Dashboard', route: '/dashboard', icon: DashboardIcon},
    {name: 'Manage Team', route: '/customers',  icon: GroupIcon},
    {name: 'Calendar', route: '/calendar', icon: CalendarIcon}
];

export default function SidebarWithHeader({children}) {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const containerRef = useRef();

    const handleOutsideClick = (e) => {
        if (containerRef.current && !containerRef.current.contains(e.target)) {
            onClose();
        }
    }

    useEffect(() => {
        document.addEventListener('click', handleOutsideClick);
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, []);
    
    return (
        <Box minH="100vh" minW={60} ref={containerRef}>
            <SidebarContent
                onClose={onClose}
                display={{base: 'none', md: 'block'}}
                bgColor={"#fff"}
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
                    <SidebarContent onClose={onClose} />
                </DrawerContent>
            </Drawer>

            {/* page content */}
            <Flex flexDirection={"column"} mx={3}>
                <MobileNav onOpen={onOpen} />
                <Box pl={{base: 0, md: 60}}>
                    {children}
                </Box>
            </Flex>
        </Box>
    );
}

const SidebarContent = ({onClose, ...rest}) => {

    return (
        <Box
            w={{base: "full", md: 60}}
            h="full"
            pos="fixed"
            {...rest}
        >

            {/* sidebar */}
            <Flex display="flex" flexDirection="column" alignItems="left">
                <Flex display="flex" alignItems="center" pl={6}>
                    <Image
                        maxW="140px"
                        src='https://i.ibb.co/rZSjZLb/brand.png'
                        alt='brand'
                        py={6}
                    />
                </Flex>
                <Flex display="flex" alignItems="center" flexDirection="column">
                    {LinkItems.map((link) => (
                        <NavItem
                            key={link.name}
                            route={link.route}
                            icon={link.icon}
                        >
                            {link.name}
                        </NavItem>
                    ))}
                </Flex>
            </Flex>
        </Box>
    );
};

const NavItem = ({icon, route, children, ...rest}) => {
    const location = useLocation();
    const isActive = location.pathname === route;

    return (
        <Link
            href={route}
            w={60}
            cursor="pointer"
            fontWeight={isActive ? 'semibold' : 'normal'}
            fontSize={"0.938rem"}
            color={isActive ? 'purple.500' : '#555'}
            _focus={{boxShadow: 'none'}}
            _hover={{
                textDecoration: 'none',
                color: 'purple.500'
            }}
        >
            <Flex
                // Convertir esto en un LIGHT THEME
                borderRight={isActive ? '4px' : 0}
                borderColor='purple.500'
                align="center"
                p={3}
                pl={8}
                role="group"
                {...rest}
            >
                {icon && (
                    <Icon
                        mr="6"
                        fontSize="lg"
                        as={icon}
                    />
                )}
                {children}
            </Flex>
        </Link>
    );
};

const MobileNav = ({onOpen, ...rest}) => {
    const { logOut } = useAuth()

    return (
        <HStack>
            <Flex
                w={"full"}
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
                    <Flex pl={{base: 0, md: 60}} flex={1}>
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
                            aria-label="settings"
                            icon={<LightModeIcon />} 
                        />
                        <MenuButton>
                            <Avatar ml={2} mr={{base: 2, md: 0}} size={'xs'} src={EMPTY_AVATAR} />
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