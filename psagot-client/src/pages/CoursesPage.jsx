import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Typography, Container } from "@mui/material";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import CourseGrid from "../components/CoursesGrid";
import { filterCourses } from "../features/course/courseActions";
import CourseSearch from "../components/CourseSearch";
import circlePlus from "../assets/icons/circle-plus.png";
import exptExcel from "../assets/icons/excelExport.png";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";


const CoursesPage = () => {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.course.courses);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(filterCourses({ statusId: 1 }));
  }, [dispatch]);

  const exportToExcel = () => {
    if (!courses || courses.length === 0) {
      alert("אין נתונים לייצוא!");
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(courses);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Courses");

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    });
    saveAs(data, "Courses.xlsx");
  };


  return (
    <Container
      maxWidth={false} 
      sx={{
        maxWidth: "none !important",
        width: "96%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "var(--Brand-10, #FAFCFF)",
        position: "relative",

      }}
    >
<Box
  sx={{
    marginTop: "3%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: "2% 1.25%", 
    boxSizing: "border-box",
  }}
>
 
  <Typography
    variant="h1"
    sx={{
      color: "var(--Brand-90, #0D1783)",
      textAlign: "right",
      fontFamily: "Rubik",
      fontSize: "4.5vh",
      fontStyle: "normal",
      fontWeight: 700,
      lineHeight: "normal",
      textTransform: "capitalize",
    }}
  >
    קורסים
  </Typography>


  <Box
    sx={{
      display: "flex",
      flexDirection: "row-reverse",
      alignItems: "center",
      gap: "16px", 
    }}
  >

    <Button
      variant="contained"
      onClick={() => navigate('/newCourse')}
      sx={{
        width: "152px",
        height: "40px",
        borderRadius: "50vh",
        padding: "0 16px",
        gap: "8px",
        backgroundColor: "#326DEF",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minWidth: "152px",
        minHeight: "40px",
      }}
    >
      <img src={circlePlus} alt="הוספת קורס" style={{ width: "16px", height: "16px" }} />
      <Typography
        sx={{
          fontFamily: "Rubik",
          fontWeight: 400,
          fontSize: "16px",
          lineHeight: "100%",
          textAlign: "center",
          color: "#FFFFFF",
          textTransform: "capitalize",
        }}
      >
        הוספת קורס
      </Typography>
    </Button>

    <Button
      onClick={exportToExcel}
      sx={{
        width: "40px",
        height: "40px",
        borderRadius: "8px",
        padding: "0",
        backgroundColor: "#F0F1F3",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minWidth: "40px",
        minHeight: "40px",
      }}
    >
      <img src={exptExcel} alt="ייצוא לאקסל" style={{ width: "24px", height: "24px" }} />
    </Button>
  </Box>
</Box>


      <CourseSearch  />

      <CourseGrid courses={courses} />
     </Container>
  );
};

export default CoursesPage;