import React, { useState } from 'react'
import RoomsSearchBar from "../components/RoomsSearchBar"
import ExampleUseGenericPopup from '../components/ExampleUseGenericPopup'
import RoomsGrid from '../components/RoomsGrid'
import { Box, Button, IconButton, Stack, Typography } from '@mui/material'
import excelIcon from "../assets/icons/excelIcon.svg";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const Rooms = () => {
    const [openDialog, setOpenDialog] = useState(false);

  const buttonStyles = {
  height: "44px",
  padding: "0px 20px",
  gap: "8px",
  borderRadius: "50px",
  boxShadow: "none",
  fontFamily: "Rubik",
  fontWeight: 400,
  fontSize: "16px",
  lineHeight: "18.96px",
  backgroundColor: "#326DEF",
  color: "white",
  "&:hover": {
    backgroundColor: "#2857C4",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
  },
  "&:active": {
    backgroundColor: "#234E9D",
    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.3)",
  },
};
 
  return (
    <div>
         <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3,
                direction: "rtl",
              }}
            >
              <Typography
                variant="h1"
                align="right"
                sx={{
                  fontFamily: "Rubik, sans-serif",
                  fontWeight: 700,
                  fontSize: "40px",
                  color: "#0D1783",
                }}
              >
                חדרים
              </Typography>
      
              <Stack direction="row" spacing={2} sx={{ direction: "ltr" }}>
                <Button
                  variant="contained"
                  sx={{ ...buttonStyles, backgroundColor: "#326DEF" }}
      
                  startIcon={<AddCircleOutlineIcon />}
                  onClick={() => setOpenDialog(true)}
                >
                  הוספת חדר
                </Button>
                <IconButton
                 // onClick={exportAllCoursesToExcel}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "44px",
                    width: "44px",
                    padding: 0,
                  }}
                >
                  <Box
                    component="img"
                    src={excelIcon}
                    alt="ייצוא לאקסל"
                    sx={{
                      height: "24px",
                      width: "24px",
                      verticalAlign: "middle",
                      mt: "-4px",
                    }}
                  />
                </IconButton>
              </Stack>
            </Box>
        <RoomsSearchBar/>
        <RoomsGrid></RoomsGrid>
        {/* תוספת זמנית של רשימת כל החדרים 

        <TempRoomsList/>
        <ExampleUseGenericPopup/>*/}
    </div>
  )
}

export default Rooms



