import { Box, Button, Typography } from "@mui/material";
import React from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import CourseGrid from "../components/CoursesGrid";
import { useSelector } from "react-redux";
import circlePlus from "../assets/icons/circle-plus.png";
import exptExcel from "../assets/icons/excelExport.png";
import { styled } from "@mui/system";
import CourseSearch from "../components/CourseSearch";

const CoursesPage = () => {
  const Course = useSelector((state) => state.course?.courses || []); 


  const exportToExcel = () => {
    if (!Course || Course.length === 0) {
      alert("אין נתונים לייצוא!");
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(Course);


    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Course");


    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });


    const data = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8" });
    saveAs(data, "Course.xlsx");
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
    height: "4.35%",
    top: "7.5%",
    transform: "translateX(-50%)",
    fontFamily: "Rubik",
    fontWeight: 700,
    fontSize: "4.5vh", 
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
          width: "2.5rem",
          height: "2.5rem",
          top: "7.78%",
          left: "16%",
          borderRadius: "0.68vh",
          padding: "0.2rem",
          backgroundColor: "#F0F1F3",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minWidth: "2.5rem",
          minHeight: "2.5rem",
        }}
      >
        <img src={exptExcel} alt="אייקון ייצוא לאקסל" style={{ width: "75%", height: "80%" }} />
      </Button>

      <Button
        variant="contained"
        sx={{
          position: "absolute",
          width: "9.5rem",
          height: "2.5rem",
          top: "7.78%",
          left: "1.5%",
          borderRadius: "50vh",
          padding: "0 1.3%",
          gap: "0.5vw",
          backgroundColor: "#326DEF",
          display: "flex",
          alignItems: "center",
          minWidth: "9.5rem",
          minHeight: "2.5rem",
        }}
      >
        <img src={circlePlus} alt="אייקון הוספת קורס" style={{ width: "0.76vw", height: "1.8vh" }} />
        <Typography
          sx={{
            fontFamily: "Rubik",
            fontWeight: 400,
            fontSize: "1.8vh",
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
      <CourseGrid />
    </Box>

      <Box
  sx={{
    display: "flex",
    flexDirection: "column",
    padding: "35px 24px 10px 24px",
    alignItems: "center",
    alignSelf: "stretch",
    borderRadius: "10px",
    background: "#FFF",
    boxShadow: "0px 0px 4px 0px rgba(220, 226, 236, 0.80)",
    marginTop: "15vh",
    marginX: "2rem",
  }}
>
  <CourseGrid />
</Box>

    </NoPaddingBox>
  );
};

export default CoursesPage;
