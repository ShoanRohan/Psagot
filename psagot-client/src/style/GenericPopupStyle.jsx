import { Dialog, styled, Typography, IconButton } from "@mui/material";

export const DialogGeneric = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    width: "566px",
    height: "261px",
    borderRadius: "10px",
    padding: "20px",
  },
}));

export const TitleGeneric = styled(Typography)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  fontSize: "18px",
  padding: "0px 10px",
}));

export const XButton = styled(IconButton)(({ theme }) => ({
  fontSize: "2px",
  padding: "4px",
}));
