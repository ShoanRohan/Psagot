import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Box, Avatar, Typography } from "@mui/material";
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
    const navigate = useNavigate();

    const navItems = [
        { text: "מסך ראשי", icon: house, path: "/home" },
        { text: "קורסים", icon: courses, path: "/courses" },
        { text: "מפגשים", icon: networkWired, path: "/meetings" },
        { text: "חדרים", icon: BorderAll, path: "/rooms" },
        { text: "לוח שנה", icon: calendar, path: "/calendar" },
    ];

    if (isAdmin) {
        navItems.push({ text: "משתמשים", icon: userIcon, path: "/users" });
    }

    return (
        <Box
            sx={{
                width: 220,
                backgroundColor: "#0d1783",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                paddingTop: 2,
                borderRadius: "40px 0px 0px 40px"
            }}
        >
            {/* לוגו */}
            <Box sx={{ width: 193, height: 60, mb: 9.5,mt:6 }}>
                <img
                    src={logoWhite}
                    alt="Logo"
                    style={{ width: "100%", height: "100%", objectFit: "contain" }}
                />
            </Box>

            {/* ניווט */}
            <Box sx={{ width: "100%", flexGrow: 1 }}>
                {navItems.map((item) => (
                    <NavLink
                        key={item.text}
                        to={item.path}
                        style={({ isActive }) => ({
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                            padding: "10px 20px",
                            color: "white",
                            textDecoration: "none",
                            backgroundColor: isActive ? "#FFFFFF3D" : "transparent",
                            borderRadius: "10px",
                            marginBottom: 8,
                            margin: 'auto 1.625rem'
                        })}
                    >
                        <img src={item.icon} alt={item.text} style={{ width: 20, height: 20 }} />
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
                    </NavLink>
                ))}
            </Box>

            {/* משתמש מחובר */}
            <Box 
                sx={{
                    width: "100%",
                    textAlign: "center",
                    paddingY: 2,
                    cursor: "pointer",
                    borderTop: "1px solid #ffffff55",
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
                onClick={() => navigate("/profile")}
            >
                <Avatar
                 src={user?.avatarUrl}
                 sx={{ bgcolor: "#B2CC53", margin: "0 1.265rem" }}
>
                <Avatar sx={{ bgcolor: "#B2CC53" }}>
                {user?.name?.charAt(0)}
                </Avatar>
                <div>
                <Typography
                    color="white" 
                    sx={{
                        fontFamily: "Rubik, sans-serif",
                        fontWeight: 500,
                        fontSize: "22px",
                        lineHeight: "26px",
                        mt: 1,
                        
                    }}
                >
                    {user?.name || "משתמש"}
                </Typography>
                <Typography
                    color="white"
                    sx={{
                        fontFamily: "Rubik, sans-serif",
                        fontWeight: 300,
                        fontSize: "16px",
                        lineHeight: "20px",
                    }}
                >
                    {user?.userTypeName  || "סוג משתמש"}
                </Typography>
                </div>
            </Box>

        </Box>
    );
};

export default Sidebar;
