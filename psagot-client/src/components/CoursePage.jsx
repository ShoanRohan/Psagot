import React from "react";
import CourseSearch from "./CourseSearch";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import GridOnIcon from "@mui/icons-material/GridOn"; // אייקון אקסל
import { Stack } from "@mui/material"; // מסדר כפתורים בשורה
import CourseGrid from "./CourseGrid";

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

const CoursePage = () => {
  return (
    <Box sx={{ p: 3 }}>
      {/* כותרת עם כפתורים */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
          width: "105%",
          marginX: "auto",
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
          קורסים
        </Typography>

        {/* כפתורים בצד שמאל */}
        <Stack direction="row" spacing={2}>
          {/* כפתור עגול עם אייקון בלבד */}
          <IconButton >
            <GridOnIcon />
          </IconButton>

          <Button variant="contained" sx={buttonStyles}>
            הוספת קורס
          </Button>
        </Stack>
      </Box>

      <CourseSearch />
      <CourseGrid />
    </Box>
  );
};

export default CoursePage;