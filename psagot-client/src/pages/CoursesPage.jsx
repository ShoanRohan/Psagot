import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Typography } from "@mui/material";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import CourseGrid from "../components/CoursesGrid";
import { filterCourses } from "../features/course/courseActions";
import CourseSearch from "../components/CourseSearch";
import circlePlus from "../assets/icons/circle-plus.png";
import exptExcel from "../assets/icons/excelExport.png";
import { styled } from "@mui/system";

const CoursesPage = () => {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.course.courses);

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

  const NoPaddingBox = styled(Box)({
    padding: '0 !important',
    margin: '0 !important',
  });

  return (
    <NoPaddingBox
      sx={{
        maxWidth: "none !important",
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#FFFFFF",
        position: "relative",
        margin: 0,
      }}
    >
      <Typography
        variant="h1"
        sx={{
          position: "absolute",
          top: "60px",
          right: "24px", // Aligned with the start of CourseSearch and grid (24px from right)
          fontFamily: "Rubik",
          fontWeight: 700,
          fontSize: "48px",
          lineHeight: "normal",
          textAlign: "right",
          color: "var(--Brand-90, #0D1783)",
          textTransform: "capitalize",
          fontStyle: "normal",
        }}
      >
        קורסים
      </Typography>

      <Button
        onClick={exportToExcel}
        sx={{
          position: "absolute",
          width: "40px",
          height: "40px",
          top: "60px",
          left: "184px", // Adjusted to be side by side with 24px gap (152px width of "Add Course" + 24px gap + 8px adjustment)
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

      <Button
        variant="contained"
        sx={{
          position: "absolute",
          width: "152px",
          height: "40px",
          top: "60px",
          left: "24px",
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

      <CourseSearch />

      <CourseGrid courses={courses} />
    </NoPaddingBox>
  );
};

export default CoursesPage;