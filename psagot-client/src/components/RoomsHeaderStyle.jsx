import { styled } from "@mui/system";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";

const HeaderContainer = styled(Box)({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px",
    gap: "8px",
    flexWrap: "nowrap",
    overflow: "hidden",
    minWidth: 0,
});

const Title = styled(Typography)({
    fontFamily: "Rubik",
    fontWeight: 700,
    fontSize: "40px",
    color: "#112B83",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    minWidth: 0,
});

const ButtonsWrapper = styled(Box)({
    display: "flex",
    alignItems: "center",
    gap: "8px",
    flexShrink: 0,
});

const ExportButton = styled(IconButton)({
    width: "40px",
    height: "40px",
    minWidth: "40px",
    padding: "5px",
    background: "#F0F1F3",
    borderRadius: "6.88px",
    flexShrink: 0,
});

const PdfLogo = styled("img")({
    width: "24px",
    height: "24px",
    marginTop:"0px",
  });


const AddRoomButton = styled(Button)({
    fontFamily: "Rubik",
    width: "145px",
    height: "44px",
    borderRadius: "50px",
    paddingRight: "24px",
    paddingLeft: "24px",
    fontSize: "16px",
    fontWeight: 400,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textTransform: "none",
    border: "1px solid #326DEF",
    color: "white",
    backgroundColor: "#326DEF",
    gap: "8px", // רווח בין האייקון לטקסט
    whiteSpace: "nowrap", // מונע שבירת שורות
    flexWrap: "nowrap", // מונע שבירת שורות בתוך הכפתור
    minWidth: "auto", // מונע הרחבת יתר של הכפתור
    boxShadow: "none",
});

const ListViewButton = styled(Button)({
    fontFamily: "Rubik",
    width: "158px",
    height: "44px",
    borderRadius: "50px",
    borderWidth: "1px",
    borderColor: "#326DEF",
    color: "#326DEF",
    paddingRight: "24px",
    paddingLeft: "24px",
    fontSize: "1rem !important",
    fontWeight: 400,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textTransform: "none",
    gap: "8px", // רווח בין האייקון לטקסט
    whiteSpace: "nowrap", // מונע שבירת שורות
    flexWrap: "nowrap", // מונע שבירת שורות בתוך הכפתור
    minWidth: "auto", // מונע הרחבת יתר של הכפתור
});



export { HeaderContainer, Title, ButtonsWrapper, ExportButton, AddRoomButton, ListViewButton, PdfLogo }
