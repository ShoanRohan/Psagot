import React from "react";
import SideBar from "../components/SideBar";
import Section from "../components/Section";
import { Box } from "@mui/material";

const Layout = () => {
    return (
        <Box sx={{ display: 'flex', width: '100vw', height: '100vh' }}>
            <Box className="sideBarStyle"><SideBar/></Box>
            <Box className="mainContentStyle"><Section/></Box>
        </Box>
    );
}

export default Layout;
