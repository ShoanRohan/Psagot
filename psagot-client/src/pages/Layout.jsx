import React from "react";
import SideBar from "../components/SideBar";
import Section from "../components/Section";
import Footer from "../components/Footer";
import CourseGrid from "../components/CourseGrid";
import { Box } from "@mui/material";
import CoursesPage from "../components/CoursesPage";

const Layout = () => {
    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', width: '100vh'}}>
            <SideBar />
            <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <Section />
            </Box>
        </Box>
    );
}

export default Layout;