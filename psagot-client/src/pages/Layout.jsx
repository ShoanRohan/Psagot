import React from "react";
import Header from "../components/Header";
import Section from "../components/Section";
import Footer from "../components/Footer";
import { Box } from "@mui/material";

const Layout = () => {
    return (
        <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            <Header />
            <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <Section />
            </Box>
            {/* <Footer /> */}
        </Box>
    );
}

export default Layout;