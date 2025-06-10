import React from "react";
import { Box } from "@mui/material";
import Sidebar from "../components/Sidebar";


const Layout = () => {
    return (
         <Box sx={{ display: 'flex', flexDirection: 'row', minHeight: '100vh', maxWidth: '100vw' }}>
            <Sidebar sx={{flexGrow: 0}}/>
            <Section sx={{flexGrow: 1}}/>

        </Box>
    );
}



export default Layout;


