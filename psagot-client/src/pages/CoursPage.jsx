import React, { useState } from "react";
import { Box, Typography, Button, Tabs, Tab } from "@mui/material";
import CourseDetails from "../components/CourseDetails"; // עדכני את הנתיב בהתאם למיקום הקובץ אצלך

const CoursPage = () => { 
  const [tabValue, setTabValue] = useState(0);

  const selectedCourse = {
    id: 1,
    name: "קורס ארכיטקטורה",
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ p: 3, backgroundColor: "#f5f7fa", minHeight: "100vh" }}>
      {/* שורת כותרת עם שם הקורס והכפתורים */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        {/* כותרת: שם הקורס */}
        <Box>
          <Typography variant="h5" sx={{ fontWeight: "bold", color: "#0b2d72" }}>
            {selectedCourse.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            פרטי קורס
          </Typography>
        </Box>

        {/* כפתורים */}
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            variant="contained"
            color="primary"
            sx={{
              borderRadius: "30px",
              px: 4,
              py: 1,
              textTransform: "none",
            }}
          >
            שמור
          </Button>
          <Button
            variant="outlined"
            color="primary"
            sx={{
              borderRadius: "30px",
              px: 4,
              py: 1,
              textTransform: "none",
            }}
          >
            ביטול
          </Button>
        </Box>
      </Box>

      {/* טאבים */}
      <Tabs value={tabValue} onChange={handleTabChange}>
        <Tab label="פרטי קורס" />
        <Tab label="נושאי קורס" />
      </Tabs>

      {/* תוכן לפי טאב */}
      <Box sx={{ mt: 2 }}>
        {tabValue === 0 && <CourseDetails />}
        {tabValue === 1 && (
          <Typography variant="body1">כאן יהיו נושאי הקורס</Typography>
        )}
      </Box>
    </Box>
  );
};

export default CoursPage; 
