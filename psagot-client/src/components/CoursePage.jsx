import React from 'react';
import CourseSearch from './CourseSearch'; // ייבוא הקומפוננטה של החיפוש
import CourseGrid from './CourseGrid'; // ייבוא הטבלה של הקורסים
import Button from "@mui/material/Button";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Box } from '@mui/material';

const CoursesPage = () => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', }}>
        <Box sx={{ display: "flex", justifyContent: "start", m: 2 }}>
      <Button
        variant="contained"
        sx={{
          backgroundColor: "#2979FF", // צבע כחול בהתאם לעיצוב
          color: "white",
          borderRadius: "20px",
          fontWeight: "bold",
          textTransform: "none",
          padding: "8px 16px",
          "&:hover": {
            backgroundColor: "#1565C0", // כהה יותר במעבר עכבר
          },
        }}
        startIcon={<AddCircleOutlineIcon />}
      >
        הוספת קורס
      </Button>
    </Box>
      <CourseSearch />
      <CourseGrid />
  </div>
    );
};

export default CoursesPage;
