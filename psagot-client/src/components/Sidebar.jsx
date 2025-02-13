import React from "react";
import { NavLink } from "react-router-dom";
import { Box, Tabs, Tab, Avatar, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import logoWhite from "../assets/imgs/logoWhite.svg";
import house from "../assets/icons/house.svg";
import calendar from "../assets/icons/calendar.svg";
import BorderAll from "../assets/icons/borderAll.svg";
import networkWired from "../assets/icons/networkWired.svg";
import userIcon from "../assets/icons/userIcon.svg";
import courses from "../assets/icons/courses.svg";


const Sidebar = () => {
    const user = useSelector((state) => state.user.selectedUser);
    const isAdmin = user?.role === "admin";

    const navItems = [
        { text: "מסך ראשי", icon: <img src={house} alt="house" style={{ width: 20, height: 20 }} />, path: "/home" },
        { text: "קורסים", icon: <img src={courses} alt="courses" style={{ width: 20, height: 20 }} />, path: "/courses" },
        { text: "מפגשים", icon: <img src={networkWired} alt="networkWired" style={{ width: 20, height: 20 }} />, path: "/meetings" },
        { text: "חדרים", icon: <img src={BorderAll} alt="BorderAll" style={{ width: 20, height: 20 }} />, path: "/rooms" },
        { text: "לוח שנה", icon: <img src={calendar} alt="calendar" style={{ width: 20, height: 20 }} />, path: "/calendar" },
        { text: "משתמשים", icon: <img src={userIcon} alt="user" style={{ width: 20, height: 20 }} />, path: "/calendar" },
    ];

    if (isAdmin) {
        navItems.push({ text: "משתמשים", icon: <img src={userIcon} alt="user" style={{ width: 24, height: 24 }} />, path: "/users" });
    }

    return (
        <Box
            sx={{
                width: 280,
                height: "100vh",
                backgroundColor: "#0d1783",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                paddingTop: 2,
                borderRadius: "40px 0px 0px 40px"
            }}
        >
            {/* לוגו */}
            <Box sx={{ width: 193, height: 60, mb: 4 }}>
                <img
                    src={logoWhite}
                    alt="Logo"
                    style={{ width: "100%", height: "100%", objectFit: "contain" }}
                />
            </Box>

            {/* ניווט */}
            <Tabs
                orientation="vertical"
                variant="fullWidth"
                sx={{ width: "100%" }}
            >
                {navItems.map((item) => (
                    <Tab
                        key={item.text}
                        label={
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                {item.icon}
                                <Typography
                                    sx={{
                                        fontFamily: "Rubik",
                                        fontWeight: 400,
                                        fontSize: "22px",
                                        lineHeight: "33px",
                                        letterSpacing: "0%",
                                        textAlign: "right"
                                    }}
                                >
                                    {item.text}
                                </Typography>
                            </Box>
                        }
                        component={NavLink}
                        to={item.path}
                        sx={{
                            color: "white",
                            '&.active': { backgroundColor: "#FFFFFF3D" },
                            padding: "10px 20px",
                            borderRadius: "10px",
                            justifyContent: "flex-start"
                        }}
                    />
                ))}
            </Tabs>

            {/* משתמש מחובר */}
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    mt: 3,
                    width: 50,
                    height: 160,
                    position: "relative",
                    top: 250,
                    flexDirection: "column",
                    justifyContent: "center"
                }}
            >
                <Avatar sx={{ bgcolor: "#B2CC53" }}>
                    {user?.name?.charAt(0)}
                </Avatar>
                <Typography
                    color="white"
                    sx={{
                        fontFamily: "Rubik, sans-serif",
                        fontWeight: 500,
                        fontSize: "22px",
                        lineHeight: "26.07px",
                        textAlign: "right"
                    }}
                >
                    {user?.name || "משתמש"}
                </Typography>
            </Box>

        </Box>
    );
};

export default Sidebar;
