import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Tabs, Tab } from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";
import CourseDetails from "../components/CourseDetails"; // עדכני את הנתיב בהתאם

const CoursPage = () => {
  const [tabValue, setTabValue] = useState(0);
  const { id } = useParams(); // קבלת מזהה קורס מה-URL

  const [selectedCourse, setSelectedCourse] = useState(null); // קורס נבחר

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`/api/Course/GetCourseById/${id}`);
        setSelectedCourse(response.data);
      } catch (error) {
        console.error("שגיאה בשליפת פרטי קורס:", error);
      }
    };

    if (id) fetchCourse();
  }, [id]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleSave = async () => {
    try {
      await axios.put("/api/Course/UpdateCourse", selectedCourse);
      alert("הקורס עודכן בהצלחה");
    } catch (error) {
      console.error("שגיאה בעדכון הקורס:", error);
      alert("ארעה שגיאה בעת עדכון הקורס");
    }
  };

  const handleCancel = () => {
    // רענון מחדש של הנתונים מהשרת (אפשר גם לעשות ניווט אחורה)
    window.location.reload();
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
        <Box>
          <Typography variant="h5" sx={{ fontWeight: "bold", color: "#0b2d72" }}>
            {selectedCourse?.name || "טעינה..."}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            פרטי קורס
          </Typography>
        </Box>

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
            onClick={handleSave}
            disabled={!selectedCourse}
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
            onClick={handleCancel}
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
        {tabValue === 0 && selectedCourse && (
          <CourseDetails course={selectedCourse} setCourse={setSelectedCourse} />
        )}
        {tabValue === 1 && (
          <Typography variant="body1">כאן יהיו נושאי הקורס</Typography>
        )}
      </Box>
    </Box>
  );
};

export default CoursPage;
