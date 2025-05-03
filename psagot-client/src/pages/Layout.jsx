import React from "react";
import SideBar from "../components/SideBar";
import Section from "../components/Section";
import { Box, Container, Stack } from "@mui/material";

const Layout = () => {
    return (
        <>
        {/* // <Container fixed> */}
            {/* sx={{ width: '15%', minWidth: '120px', maxWidth: '200px', flexShrink: 0, height: '100%' }} */}
            {/* <Box sx={{ display: "flex",
            flexDirection: "row",
  justifyContent:'flex-start', width:"100vw", height:"100vh"}} */}
  <Box sx={{ display: 'flex', width: '100vw', height: '100vh', overflow: 'hidden' }}>
            <Box sx={{ width: '15%', minWidth: '200px', maxWidth: '280px'}} >
                <SideBar />
            </Box>
            <Box sx={{ width: '85%', minWidth: '720px', maxWidth: '2000px'}}>
                <Section />
            </Box>
            </Box>
        {/* // </Container> */}
        </>
    );
}

export default Layout;
