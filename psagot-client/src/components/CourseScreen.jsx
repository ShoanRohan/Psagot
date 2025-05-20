import React, { useEffect } from "react";
import { Box, Button, Typography, Tabs, Tab, IconButton } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourseById } from "../features/course/courseActions";
import CourseDetails from "./CourseDetails";
import CourseTopics from "./CourseTopics";
import "./CourseScreen.css";
import exlIcon from "../assets/icons/exl.svg";

const CourseScreen = ({ courseId }) => {
  const dispatch = useDispatch();
  const course = useSelector((state) => state.course.selectedCourse);
  const [tabIndex, setTabIndex] = React.useState(0);

  useEffect(() => {
    if (courseId) {
      dispatch(fetchCourseById(courseId));
    }
  }, [dispatch, courseId]);

  const handleTabChange = (event, newIndex) => {
    setTabIndex(newIndex);
  };
  console.log(course)
  return (
    <Box className="course-container">
      {/* כותרת הקורס */}
      <Box className="course-header" sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
  
          <Typography className="course-title">
            {course ? course.name : "טוען..."}
          </Typography>
          {/* <Typography className="course-status">סטטוס הקורס: {course ? course.status : "טוען..."}</Typography> */}
       

        {/* קבוצה שמכילה את האייקון של האקסל וכפתור "הוספת נושא" */}
        <Box className="course-actions" sx={{ display: "flex",justifyContent:"center", gap: "10px" }}>
          <IconButton>
            <img src={exlIcon} alt="הורדת אקסל" style={{width:"24px", height:"24px", marginTop:"0px"}}/>
          </IconButton>
          <Button variant="contained" startIcon={<AddCircleOutlineIcon />} className="add-topic-btn">
            הוספת נושא
          </Button>
        </Box>
      </Box>
      <Typography className="course-status">סטטוס הקורס: {course ? course.statusName : "טוען..."}</Typography>
{/* 
      <Box 
      className="helpBox"
  component="section"
  sx={{
    position: "relative",
    left: "50%",
    right: "50%",
    marginLeft: "-50vw",
    marginRight: "-50vw",
    width: "100vw",
    pt: 2,     // אם תרצה קצת ריווח למעלה
  }}
> */}

      {/* בר ניווט */}
      <Tabs value={tabIndex} onChange={handleTabChange} className="course-tabs">
        <Tab label="פרטי קורס" className="course-tab" />
        <Tab label="נושאי קורס" className="course-tab" />
      </Tabs>

      {/* תוכן בהתאם ללשונית */}
      <Box mt={2} >
        {tabIndex === 0 && <CourseDetails />}
        {tabIndex === 1 && <CourseTopics />}
      </Box>

    </Box>
  );
};

export default CourseScreen;
