import { Dialog, styled, Typography, IconButton, Button, DialogActions } from "@mui/material";

// דיאלוג רספונסיבי
export const DialogGeneric = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    width: "90% !important",
    maxWidth: "600px !important",
    [theme.breakpoints.down("sm")]: {
      width: "95% !important",
      margin: "8px !important",
    },
    borderRadius: "1.5% !important",
    padding: "2% !important",
    fontFamily: "Rubik, sans-serif !important",
    boxShadow: "none !important",
  },
  "& .MuiBackdrop-root": {
    backgroundColor: "rgba(0, 0, 0, 0.1) !important",
  },
}));

// כותרת עליונה עם כפתור סגירה
export const TitleGeneric = styled(Typography)(({ theme }) => ({
  display: "flex !important",
  justifyContent: "space-between !important",
  alignItems: "center !important",
  fontSize: "clamp(1.1rem, 2.5vw, 1.3rem) !important",
  padding: "0 1% !important",
  margin: "2% 1% 0 1% !important",
  fontFamily: "Rubik, sans-serif !important",
  fontWeight: "500 !important",
}));

// כפתור X
export const XButton = styled(IconButton)(({ theme }) => ({
  padding: "0.3rem !important",
  "& svg": {
    fontSize: "1.3rem !important",
    width: "1.4rem !important",
    height: "1.3rem !important",
  },
}));

// טקסט מודגש פחות
export const ContentTextBold = styled(Typography)(({ theme }) => ({
  fontSize: "clamp(1.3rem, 3vw, 1.6rem) !important",
  fontWeight: "400 !important",
  fontFamily: "Rubik, sans-serif !important",
  margin: "1rem 0 0.5rem 0 !important",
  textAlign: "center !important",
}));

// טקסט רגיל
export const ContentTextRegular = styled(Typography)(({ theme }) => ({
  fontSize: "clamp(1rem, 2.5vw, 1.2rem) !important",
  fontFamily: "Rubik, sans-serif !important",
  textAlign: "center !important",
}));

export const CancelButton = styled(Button)(({ theme }) => ({
  padding: "0.6rem 2rem !important",
  borderRadius: "50px !important",
  fontFamily: "Rubik, sans-serif !important",
  fontSize: "clamp(1.1rem, 2.2vw, 1.3rem) !important",
  fontWeight: "400 !important",
  textTransform: "none !important",
  backgroundColor: "transparent !important",
  color: "#1E53CB !important",
  border: "1px solid #1E53CB !important",
  "&:hover": {
    backgroundColor: "rgba(30, 83, 203, 0.08) !important",
  },
}));

export const SaveButton = styled(Button)(({ theme }) => ({
  padding: "0.6rem 2rem !important",
  borderRadius: "50px !important",
  fontFamily: "Rubik, sans-serif !important",
  fontSize: "clamp(1.1rem, 2.2vw, 1.3rem) !important",
  fontWeight: "400 !important",
  textTransform: "none !important",
  backgroundColor: "#326DEF !important",
  color: "#FFFFFF !important",
  border: "1px solid #326DEF !important",
  "&:hover": {
    backgroundColor: "#275FD4 !important",
  },
}));


// מיכל כפתורים
export const ActionsContainer = styled(DialogActions)(({ theme }) => ({
  display: "flex !important",
  justifyContent: "center !important",
  gap: "0.6rem !important",
  paddingBottom: "1.5rem !important",
  flexWrap: "wrap !important",
}));
