import React from "react";
import Header from "../components/Header";
import Section from "../components/Section";
import Footer from "../components/Footer";
import { Box } from "@mui/material";
import UserTable from "../components/UserTable";

const Layout = () => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header />
            <Section /> 
            <UserTable/>
            <Footer />
           
        </Box>
    );
}

export default Layout;