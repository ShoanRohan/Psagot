import React, { useEffect } from "react";
import { Box, Button, Typography, Tabs, Tab, IconButton } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourseById } from "../features/course/courseActions";
import CourseDetails from "./CourseDetails";
import CourseTopics from "./CourseTopics";
import "./CourseScreen.css";
import excelIcon from "../assets/icons/exl.svg";
import { useParams } from 'react-router-dom';
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { selectFilteredTopics } from "../features/topic/topicSlice";


const CourseScreen = () => {
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const course = useSelector((state) => state.course.selectedCourse);
  const [tabIndex, setTabIndex] = React.useState(0);
  const topics = useSelector(selectFilteredTopics);

  useEffect(() => {
    if (courseId) {
      dispatch(fetchCourseById(courseId));
    }
  }, [dispatch, courseId]);

  const handleTabChange = (event, newIndex) => {
    setTabIndex(newIndex);
  };
  console.log(course)

  const handleExportTopicsToExcel = () => {
    if (!topics || topics.length === 0) {
      console.warn("אין נושאים לייצוא");
      return;
    }
  
    const worksheet = XLSX.utils.json_to_sheet(
      topics.map((topic) => ({
        "קוד מפגש": topic?.topicId,
        "נושא": topic?.name,
        "שם מרצה": topic?.teacherName,
        "תאריך התחלה": new Date(topic?.startDate).toLocaleDateString("he-IL"),
        "תאריך סיום": new Date(topic?.endDate).toLocaleDateString("he-IL"),
        "מספר מפגשים": topic?.numberOfMeetings,
        "ציוד": [
          topic?.computers ? 'מחשב' : null ,
          topic?.projector ? 'מקרן' : null, 
          topic?.microphone ? 'הגברה' : null
        ].filter(Boolean).join(", "),
  }))
    );
  
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "נושאים");
  
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
  
    const fileData = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });
  
    saveAs(fileData, "topics.xlsx");
  };

  return (
    <Box className="course-container">
      {/* כותרת הקורס */}
      <Box className="course-header" sx={{ display: "flex", alignItems: "center", gap: "10px" }}>

        <Typography className="course-title">
          {course ? course.name : "טוען..."}
        </Typography>
        {/* <Typography className="course-status">סטטוס הקורס: {course ? course.status : "טוען..."}</Typography> */}


        {/* קבוצה שמכילה את האייקון של האקסל וכפתור "הוספת נושא" */}
        {tabIndex === 1 &&
        <Box className="course-actions" sx={{ display: "flex", justifyContent: "center", gap: "10px" }}>
          <IconButton  onClick={handleExportTopicsToExcel}>
            <img src={excelIcon} alt="הורדת אקסל" style={{ width: "24px", height: "24px", marginTop: "0px" }} />
          </IconButton>
          <Button variant="contained" startIcon={<AddCircleOutlineIcon />} className="add-topic-btn">
            הוספת נושא
          </Button>
        </Box>
        }
      </Box>
      <Typography className="course-status">סטטוס הקורס: {course ? course.statusName : "טוען..."}</Typography>

      {/* <Box
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
