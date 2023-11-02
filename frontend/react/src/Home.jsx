import SidebarWithHeader from "./components/shared/SideBar.jsx";
import {Text} from "@chakra-ui/react";

const Home = () => {

    return (
        <SidebarWithHeader>
            <Text fontSize={"md"}>Panel de Administración</Text>
        </SidebarWithHeader>
    )
}

export default Home;