import { Dialog, styled, Typography, IconButton, Button, DialogActions } from "@mui/material";

export const DialogGeneric = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    width: "566px",
    height: "261px",
    borderRadius: "10px",
    padding: "20px",
    fontFamily: "Rubik !important",
     boxShadow: "none",
  },
  "& .MuiBackdrop-root": {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
}));

export const TitleGeneric = styled(Typography)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  fontSize: "19px",
  padding: "0px 10px",
  margin: "20px 10px 0px 10px",
  fontFamily: "Rubik !important",
  fontWeight: 500
}));

export const XButton = styled(IconButton)(({ theme }) => ({
  padding: "4px",
  fontFamily: "Rubik !important",
  "& svg": {
    fontSize: "16px",
    width: "16px",
    height: "18px",
  },
}));

export const ContentTextBold = styled(Typography)(({ theme }) => ({
  fontSize: "22px",
  fontWeight: 400,
  fontFamily: "Rubik",
  margin: "10px 0px 10px 0px",
}));

export const ContentTextRegular = styled(Typography)(({ theme }) => ({
  fontSize: "17x",
  fontFamily: "Rubik",
}));

export const CancelButton = styled(Button)(({ theme }) => ({
  width: "83px",
  height: "50px",
  borderRadius: "50px",
  fontFamily: "Rubik",
  fontSize: "18px !important",
  fontWeight: 100,
  textTransform: "none",
}));

export const SaveButton = styled(Button)(({ theme }) => ({
  width: "83px",
  height: "50px",
  borderRadius: "50px",
  fontFamily: "Rubik",
  fontSize: "18px !important",
  fontWeight: 100,
  textTransform: "none",
}));

export const ActionsContainer = styled(DialogActions)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  gap: "10px",
  paddingBottom: "16px",
}));