import React from "react";
import { Button } from "@mui/material";

const MasterButton = ({ text, icon, onClick }) => {
  return (
    <Button
      variant="contained"
      sx={{
        width: "109px",
        height: "44px",
        padding: "0 24px",
        gap: "8px",
        backgroundColor: "#326def",
        color: "white",
        borderRadius: "50px",
        display: "flex",
        alignItems: "center",
        fontFamily: "Rubik",
        fontWeight: 400,
        fontSize: "16px",  
        lineHeight: "18.96px",
        textAlign: "center",
        boxShadow: "none",
        justifyContent: "center",
        alignItems: "center", 
        "&:hover": {
          backgroundColor: "#2856b8",
          boxShadow: "none",
        },
      }}
      startIcon={icon} 
      onClick={onClick}
    >
        {text}
    </Button>
  );
};

export default MasterButton;