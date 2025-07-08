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
                    <Outlet />
                </Box>
            </Box>

            {/* Footer - Stretches across the bottom */}
            <Footer />
        </Box>
    );
}



export default Layout;

