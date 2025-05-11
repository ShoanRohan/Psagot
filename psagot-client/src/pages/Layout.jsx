import React from "react";      
import Section from "../components/Section";
import { Box } from "@mui/material";
import AddMeeting from "./AddMeeting";
import MeetingButton from "./MeetingButton";
import MeetingLocatorBar from "./MeetingLocatorBar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

const Layout = () => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', minHeight: '100vh' }}>
            <Sidebar/>
            <Section />
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            <MeetingButton />
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
           <footer />
            
        </Box>
    );
}

export default Layout;

/*
  <Section />
            <Footer />
*/
