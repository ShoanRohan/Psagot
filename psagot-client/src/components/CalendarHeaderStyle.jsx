import { styled } from "@mui/system";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import IconButton from "@mui/material/IconButton";

const HeaderContainer = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
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
  minWidth: 0,
  flexWrap: "wrap",
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


const ViewButtonsContainer = styled(ButtonGroup)({
  display: "flex",
  flexWrap: "nowrap",
  gap: "4px",
  minWidth: 0,
  overflow: "hidden",
});

const ViewButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "isActive",
})(({ isActive }) => ({
  fontFamily: "Rubik",
  fontSize: "16px",
  fontWeight: 400,
  borderRadius: "50px !important",
  borderColor: "#326DEF !important",
  color: isActive ? "#FFFFFF" : "#326DEF",
  background: isActive ? "#1E53CB" : "#FFFFFF",
  minWidth: "auto",
  whiteSpace: "nowrap",
  flexShrink: 0,
  marginLeft: "0 !important",
}));


export { HeaderContainer, Title, ButtonsWrapper, ExportButton, ViewButtonsContainer, ViewButton , PdfLogo }
