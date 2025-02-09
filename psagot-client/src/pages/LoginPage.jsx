import React from "react";
import Login from '../components/Login';
import { Box } from "@mui/material";
import loginImage from '../assets/imgs/login_image.svg';
import logoPsagot from '../assets/imgs/logo_psagot.svg';

const LoginPage = () => {
    return (
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundColor: "#96cfec",
          display: "flex",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            width: "32%",
            height: "100%",
            backgroundColor: "#fff",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            borderBottomLeftRadius: "5%",
            borderTopLeftRadius: "5%",
            padding: "2%",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: "8%",
              width: "24%",
              height: "20%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img 
              src={logoPsagot} 
              alt="Logo" 
              style={{
                width: "100%",
                height: "auto",
                objectFit: "contain",
              }} 
            />
          </Box>

          <Box sx={{ marginTop: "10%", width: "80%" }}>
            <Login />
          </Box>
        </Box>

        <Box
          sx={{
            width: "68%",
            height: "100%",
            backgroundImage: `url(${loginImage})`,
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        />
      </Box> 
    );
};

export default LoginPage;
