import React from "react";
import Header from "../components/Header";
import Section from "../components/Section";
import Footer from "../components/Footer";
import CourseGrid from "../components/CourseGrid";
import { Box } from "@mui/material";
import CoursesPage from "../components/CoursesPage";

const Layout = () => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            {/* <Header />
            <Section />
            <Footer /> */}
            <CoursesPage/>
        </Box>
    );
}

export default Layout;