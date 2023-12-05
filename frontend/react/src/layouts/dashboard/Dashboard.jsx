import { Box, SimpleGrid, Text } from "@chakra-ui/react";
import SidebarWithHeader from "../../components/global/Navbars.jsx";
import { statusArray } from "../../data/mockData.js";

const Dashboard = () => {

    return (
        <SidebarWithHeader>
            <SimpleGrid columns={{base: 1, sm: 2, lg: 4}} spacing={3}>
                {statusArray.map((e) => (
                    <Box key={e} bg={"white"} p={4} shadow={"sm"}>
                        <Text>{e.title}</Text>
                        <Text>{e.number}</Text>
                    </Box>
                ))}
            </SimpleGrid>
        </SidebarWithHeader>
    )
}

export default Dashboard;