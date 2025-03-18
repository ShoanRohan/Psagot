import { Box, Button, Typography, TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CourseGrid from "./CourseGrid";
import circlePlus from "../assets/icons/circle-plus.png";
import exptExcel from "../assets/icons/image 6.png";
import * as XLSX from "xlsx";

const CoursesManagement = () => {
  const exportToExcel = () => {
    const data = [
      { Name: "Course 1", Duration: "3 months" },
      { Name: "Course 2", Duration: "6 months" },
    ];

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Courses");
    XLSX.writeFile(wb, "courses.xlsx");
  };

  return (
    <Box sx={{
      padding: 0,
      direction: "rtl",
      width: "100%",
      margin: "0 auto",
      fontFamily: "Rubik" 
    }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2, px: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: "bold", color: "#112B83" }}>
          קורסים
        </Typography>

        <Box sx={{ display: "flex", gap: 1.5 }}>
          <Button sx={{ backgroundColor: "#F0F1F3", borderRadius: "6px", padding: "5px 6px", minWidth: "40px" }}>
            <img src={exptExcel} alt="ייצוא לאקסל" style={{ width: 24, height: 24 }} />
          </Button>
          <Button
            variant="contained"
            sx={{ display: "flex", alignItems: "center", gap: 1, backgroundColor: "#326DEF", borderRadius: "40px", px: 2, py: 0.5, fontSize: "0.9rem" }}
          >
            <img src={circlePlus} alt="הוספת קורס" style={{ width: 18, height: 18 }} />
            הוספת קורס
          </Button>
        </Box>
      </Box>

      {/* Search Field */}
      <Box sx={{ mb: 2, width: "100%", padding: 0 }}>
        <TextField
          placeholder="חיפוש"
          variant="outlined"
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {/* Courses Table */}
      <Box sx={{ width: "100%"}}>
        <CourseGrid />
      </Box>
    </Box>
  )
};

export default CoursesManagement;
