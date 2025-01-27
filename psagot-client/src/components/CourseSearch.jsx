import React, { useState } from "react";
import { Box, Select, MenuItem, FormControl, InputLabel, TextField } from "@mui/material";
import MasterButton from "./MasterButton";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltOffOutlinedIcon from "@mui/icons-material/FilterAltOffOutlined";

//text design
const sharedStyles = {
  width: "200px",
  height: "43px",
  fontFamily: "Rubik",
  fontWeight: 400,
  fontSize: "16px",
  lineHeight: "18.96px",
  textAlign: "right",
  direction: "rtl",

  "& .MuiInputLabel-root": {
    right: "0",
    transformOrigin: "top right",
  },

  "& .MuiSelect-icon": {
    right: "unset",
    left: "10px",
  },
};

const CourseSearch = () => {
  const [coursCode, setCourseCode] = useState("");
  const [courseName, setCourseName] = useState("");
  const [courseCoordinator, setCourseCoordinator] = useState("");
  const [year, setYear] = useState("");


  return (
    <Box
      sx={{
        width: "1480px",
        height: "94px",
        position: "relative",
        top: "164px",
        left: "80px",
        borderRadius: "10px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "25px 24px",
        backgroundColor: "#f1f2f2",
      }}
    >
    <Box
        sx={{
          display: "flex",
          gap: "30px",
        }}
      >
        <FormControl
          variant="standard"
          sx={sharedStyles}
        >
          <InputLabel>קוד קורס</InputLabel>
          <Select
            value={coursCode}
            onChange={(e) => setCourseCode(e.target.value)}
            sx={sharedStyles}
          >
            <MenuItem value={1011}>1011</MenuItem>
            <MenuItem value={1987}>1987</MenuItem>
            <MenuItem value={1234}>1234</MenuItem>
          </Select>
        </FormControl>

        <FormControl
          variant="standard"
          sx={sharedStyles}
        >
          <InputLabel>שם הקורס</InputLabel>
          <Select
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            sx={sharedStyles}
          >
            <MenuItem value={"ריאקט"}>ריאקט</MenuItem>
            <MenuItem value={"אדריכלות"}>אדריכלות</MenuItem>
            <MenuItem value={"פייתון"}>פייתון</MenuItem>
          </Select>
        </FormControl>

        <TextField variant="standard" label="רכזת" sx={sharedStyles}
          value={courseCoordinator}
          onChange={(e) => setCourseCoordinator(e.target.value)}
        />

        <FormControl
          variant="standard"
          sx={sharedStyles}
        >
          <InputLabel>שנה</InputLabel>
          <Select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            sx={sharedStyles}
          >
            <MenuItem value={2023}>2023</MenuItem>
            <MenuItem value={2024}>2024</MenuItem>
            <MenuItem value={2025}>2025</MenuItem>
          </Select>
        </FormControl>
      </Box>

    <Box
         sx={{
         display: "flex",
         justifyContent: "center",
         alignItems: "center",
         gap: "15px",
         }}
    >

        <MasterButton
          text="ניקוי"
          icon={<FilterAltOffOutlinedIcon />}
         
          onClick={() => {
            setYear("");
            setCourseCode("");
            setCourseName("");
            setCourseCoordinator("");
            console.log("ניקוי");
          }}
        />

        <MasterButton
          text="חיפוש"
          icon={<SearchIcon />}
        />
      </Box>
    </Box>
  );
};

export default CourseSearch;