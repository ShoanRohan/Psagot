import React from "react";
import Header from "../components/Header";
import Section from "../components/Section";
import Footer from "../components/Footer";
import CourseGrid from "../components/CourseGrid";
import { Box } from "@mui/material";
import CoursePage from "../components/CoursePage";

const Layout = () => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            {/* <Header />
            <Section />
            <Footer /> */}
            <CoursePage />
        </Box>
    );
}

export default Layout;