import React from "react";
import Section from "../components/Section";
import { Box } from "@mui/material";
//import { Outlet } from 'react-router-dom';

//import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MeetingButton from "./MeetingButton";


const Layout = () => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', minHeight: '100vh' }}>
         
      
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            <MeetingButton />
           
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            
        </Box>
    );
}

//<Sidebar/>
/*
 <Header />
            <Section />
            <Footer />

*/

export default Layout;


