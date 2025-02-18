import React from "react";
import Header from "../components/Header";
import Section from "../components/Section";
import UserTable from "../components/UserTable";
import Footer from "../components/Footer";
import { Box } from "@mui/material";


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