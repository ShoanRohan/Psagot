import React from "react";
import Header from "../components/Header";
import Section from "../components/Section";
import Footer from "../components/Footer";
import { Box } from "@mui/material";

import MeetingButton from "../components/MeetingButton";
import { Outlet } from 'react-router-dom';

//import Sidebar from "../components/Sidebar";




const Layout = () => {
    return (

        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
         
            

            <Header />
            <Section />
       
            
           
<Footer />
        </Box>
    );
}


//<Sidebar/>
/*
 <Header />
            <Section />
            <Footer />
   <Outlet /> 
*/

export default Layout;


