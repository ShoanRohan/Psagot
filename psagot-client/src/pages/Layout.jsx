import React from "react";
import SideBar from "../components/SideBar";
import Section from "../components/Section";
import { Box } from "@mui/material";

const Layout = () => {
    return (
        <Box
        sx={{ display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden', }} >
        <SideBar />
        <Box sx={{display: 'flex',flexDirection: 'column',flexGrow: 1,overflow: 'auto',  }}>
        <Section />
        </Box>
    </Box>
    );
}

export default Layout;