import { Box, Button, Typography } from "@mui/material";
import React from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import CourseGrid from "../components/CoursesGrid";
import { useSelector } from "react-redux";
import circlePlus from "../assets/icons/circle-plus.png";
import exptExcel from "../assets/icons/excelExport.png";
import CourseSearch from "../components/CourseSearch";
import "./CoursesPage.css";

const CoursesPage = () => {
  const courses = useSelector((state) => state.course?.courses || []);

  const exportToExcel = () => {
    if (!courses || courses.length === 0) {
      alert("אין נתונים לייצוא!");
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(courses);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Courses");

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8" });
    saveAs(data, "Courses.xlsx");
  };

  return (
    <Box className="courses-page-container">
      <Typography variant="h1" className="courses-title">
        קורסים
      </Typography>
      <Box className="buttons-container">
        <Button onClick={exportToExcel} className="export-button">
          <img src={exptExcel} alt="אייקון ייצוא לאקסל" className="button-icon" />
        </Button>
        <Button className="add-course-button">
          <img src={circlePlus} alt="אייקון הוספת קורס" className="button-icon add-course-icon" />
          <Typography className="button-text">הוספת קורס</Typography>
        </Button>
      </Box>
      <Box className="search-container">
        <CourseSearch />
      </Box>
      <Box className="grid-container">
        <CourseGrid />
      </Box>
    </Box>
  );
};

export default CoursesPage;