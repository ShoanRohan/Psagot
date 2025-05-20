import React from "react";
import Header from "../components/Header";
import Section from "../components/Section";
import Footer from "../components/Footer";
import { Box } from "@mui/material";


const Layout = () => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', minHeight: '100vh', maxWidth: '100vw' }}>
            <Sidebar sx={{flexGrow: 0}}/>
            <Section sx={{flexGrow: 1}}/>
        </Box>
    );
}

export default Layout;