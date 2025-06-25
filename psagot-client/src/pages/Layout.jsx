import React from "react";
import SideBar from "../components/SideBar";
import Section from "../components/Section";
import Footer from "../components/Footer";
import CourseGrid from "../components/CourseGrid";
import { Box } from "@mui/material";
import CoursesPage from "../components/CoursesPage";

const Layout = () => {
    return (
        <Box sx={{ display: 'flex', width: '100vw', height: '100vh' }}>
            <Box className="sideBarStyle"><SideBar/></Box>
            <Box className="mainContentStyle"><Section/></Box>
        </Box>
    );
}

export default Layout;
