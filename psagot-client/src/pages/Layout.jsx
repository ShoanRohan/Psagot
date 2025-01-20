import React from "react";
import Header from "../components/Header";
import Section from "../components/Section";
import Login  from "../components/Login";
import Footer from "../components/Footer";
import { Box } from "@mui/material";

const Layout = () => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header />
            <Section />
            <Login/>
            <Footer />
        </Box>
    );
}

export default Layout;