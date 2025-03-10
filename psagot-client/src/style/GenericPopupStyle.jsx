import { Dialog, styled, Padding, DialogTitle, Typography } from "@mui/material";

export const DialogGeneric = styled(Dialog)(({ theme }) => ({
    "& .MuiDialog-paper": {
    width: "29.47%", 
    height: "24.16%",
    borderRadius: "10px", 
    border: "1px solid black", 
    // padding: "2.08%", 
    position: "fixed",
    top: "35.55%",
    left: "31.25%",
    gap: "2.22%",
    },
}));

export const TitleGeneric = styled(Typography)(({ theme }) => ({
    width: "486px",
    height: "21px",
    margin: "8px",
    display: "flex",
    justifyContent: "space-between"
}));
