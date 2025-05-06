import React from "react";
import Header from "../components/Header";
import Section from "../components/Section";
import Footer from "../components/Footer";
import { Box } from "@mui/material";
//import { Outlet } from "react-router-dom";
//import CoursesPage from "../components/CoursesPage";

const Layout = () => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        <Section /> 
        <Box sx={{ flexGrow: 1 }}>
        </Box>
        <Footer />
    </Box>
    );
}

export default Layout;