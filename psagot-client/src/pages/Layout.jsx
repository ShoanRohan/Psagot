import React from "react";
import { Box } from "@mui/material";
import Sidebar from "../components/Sidebar";
import Section from "../components/Section";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";



const Layout = () => {
    return (
        //עיצוב דפי הפרויקט
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            width: '100vw',
            overflowX: 'hidden'
        }}>

            <Header />

            {/* עיצוב התפריט בצד כל עמוד ועיצוב תכולת העמוד עצמו */}
            <Box sx={{
                display: 'flex',
                flexGrow: 1,
                width: '100%',
                overflowX: 'hidden'
            }}>
                {/* ייבוא התפריט*/}
                <Sidebar />

                {/* איזון רווחי העמוד לפי התוכן שנמצא באמצע העמוד, בהשוואה למה שמוצג בתחתית ובחלק העליון של העמוד */}
                <Box component="main" sx={{
                    flexGrow: 1,
                    p: 3,
                    overflowY: 'auto',
                }}>
                </Box>
            </Box>

            {/* Footer - Stretches across the bottom */}
            <Footer />
        </Box>
    );
}



export default Layout;

/*
           {/* רינדור הקומפננטות שנמצאות בראאוטר, ככה שידע בכל פעם לאן לגשת לפי התפריט */
           /*
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column', // Main container stacks elements vertically (Header, Content, Footer)
                        minHeight: '100vh',     // Ensures layout takes full viewport height
                        width: '100vw',         // Ensures layout takes full viewport width
                        overflowX: 'hidden'     // Prevent horizontal scrolling on the overall layout
                    }}>
                        /*
                        {/* Header - Stretches across the top */
                        /*
                        <Header />
/*
                        {/* Main Content Area - Contains Sidebar and the Page Content */
                        /*
                        <Box sx={{
                            display: 'flex',
                            flexGrow: 1,           // Allows this box to take up available vertical space
                            width: '100%',         // Ensure it takes full width
                            overflowX: 'hidden'    // Prevent inner horizontal overflow from affecting this box
                        }}>
                            {/* Sidebar - Fixed width */
                            /*
                            <Sidebar /> {/* Sidebar typically has its own fixed width defined internally */
/*
                            {/* Content Section - Takes remaining horizontal space */
                            /*
                            <Box component="main" sx={{
                                flexGrow: 1,             // Allows this box to take remaining horizontal space
                                p: 3,                    // Add some padding around the page content
                                overflowY: 'auto',       // Allow vertical scrolling if page content is long
                                // Important: The maxWidth and horizontal padding should be handled by the Container
                                // INSIDE the actual page components (like MeetingPage.js)
                                // You might also add a background color here for visual separation
                                // backgroundColor: '#f0f2f5',
                            }}>
                                {/* This is where your routed components (like MeetingPage, CoursesPage etc.) will render */
                                /*
                                <Outlet />
                                /*
*/