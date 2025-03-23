import React from "react";
import { Box, Button, Typography, Tabs, Tab, IconButton } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CourseDetails from "./CourseDetails";
import CourseTopics from "./CourseTopics";
import "./CourseScreen.css"; // ייבוא עיצוב
import exlIcon from "../assets/icons/exl.svg"; // ייבוא אייקון ה-Excel

const CourseScreen = () => {
  const [tabIndex, setTabIndex] = React.useState(0);

  const handleTabChange = (event, newIndex) => {
    setTabIndex(newIndex);
  };

  return (
    <Box className="course-container">
      {/* כותרת הקורס */}
      <Box className="course-header">
        <Box>
          <Typography className="course-title">קורס אדריכלות</Typography>
          <Typography className="course-status">סטטוס הקורס: פעיל</Typography>
        </Box>

        {/* קבוצה שמכילה את האייקון של האקסל וכפתור "הוספת נושא" */}
        <Box className="course-actions" sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <IconButton>
            <img src={exlIcon} alt="Excel Icon" width="24px" height="24px" />
          </IconButton>
          <Button variant="contained" startIcon={<AddCircleOutlineIcon />} className="add-topic-btn">
            הוספת נושא
          </Button>
        </Box>
      </Box>

      {/* בר ניווט */}
      <Tabs value={tabIndex} onChange={handleTabChange} className="course-tabs">
        <Tab label="פרטי קורס" className="course-tab" />
        <Tab label="נושאי קורס" className="course-tab" />
      </Tabs>

      {/* תוכן בהתאם ללשונית */}
      <Box mt={2}>
        {tabIndex === 0 && <CourseDetails />}
        {tabIndex === 1 && <CourseTopics />}
      </Box>
    </Box>
  );
};

export default CourseScreen;
