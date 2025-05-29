import React, { useEffect } from "react";
import Section from "../components/Section";
import Sidebar from "../components/Sidebar";
import { Box } from "@mui/material"; 
import { useDispatch } from "react-redux"
import { fetchUserById } from "../features/user/userAction";

const Layout = () => {
const dispatch = useDispatch();
  const userId = localStorage.getItem("userId");
    useEffect(() => {
    if (userId && userId.trim() !== "") {
      console.log("Dispatching fetchUserById with ID:", userId);
      dispatch(fetchUserById(userId));
    }
  }, [dispatch, userId]);

    return (
         <Box sx={{ display: 'flex', flexDirection: 'row', minHeight: '100vh', maxWidth: '100vw', backgroundColor: '#f5f7fa' }}>
            <Sidebar sx={{flexGrow: 0}}/>
            <Section sx={{flexGrow: 1}}/>
        </Box>
    );
}

export default Layout;