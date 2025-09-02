import React from "react";
import Section from "../components/Section";
import { Box } from "@mui/material";
import Sidebar from "../components/Sidebar";

const Layout = () => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', minHeight: '100vh' }}>
            <Sidebar/>
            <Section />
        </Box>
    );
}

export default Layout;
