import React from "react";
import Header from "../components/Header";
import Section from "../components/Section";
import Footer from "../components/Footer";
import { Box } from "@mui/material";
import MeetingButton from "./MeetingButton";


const Layout = () => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header />
            <Section />

            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            <MeetingButton />
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            <Footer />
        </Box>
    );
}

export default Layout;

