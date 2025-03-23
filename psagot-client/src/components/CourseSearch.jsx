import React, { useState, useEffect,useMemo } from "react";
import { Box, Select, MenuItem, FormControl, InputLabel, TextField, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltOffOutlinedIcon from "@mui/icons-material/FilterAltOffOutlined";
import { useDispatch, useSelector } from "react-redux";
import { fetchCoordinators } from "../features/user/userAction";


// סטייל לשדות בחירה

const sharedStyles = {
  width: "150px",
  textAlign: "right",
  direction: "rtl",
  "& .MuiInputLabel-root": {
    right: "0",
    transformOrigin: "top right",
  },
  "& .MuiSelect-icon": {
    right: "unset",
    left: "0px",
  },
};

const buttonStyles = {
  height: "44px",
  padding: "0px 20px",
  gap: "8px",
  borderRadius: "50px",
  boxShadow: "none",
  fontFamily: "Rubik",
  fontWeight: 400,
  fontSize: "16px",
  lineHeight: "18.96px",
};

const CourseSearch = () => {
  const dispatch = useDispatch();
  const coordinators = useSelector((state) => state.user.coordinatorsCode);
  const currentYear = new Date().getFullYear();

  const initialState = {
    courseCode: "",
    courseName: "",
    courseCoordinator: "",
    year: "",
  };

  const [filters, setFilters] = useState(initialState);
  

  useEffect(() => {
     dispatch(fetchCoordinators());
  }, [dispatch]);
  
  useEffect(() => {
    console.log(coordinators); // Undefined
  }, [coordinators]);

  // פונקציה לטיפול במיקוxsxד בשדה השנה
  const handleYearFocus = () => {
    if (!filters.year) {
      setFilters((prevFilters) => ({ ...prevFilters, year: currentYear }));
    }
  };

  // פונקציה לטיפול בשינוי ערך בשדה השנה
  const handleYearChange = (e) => {
    const value = e.target.value;
    if (value === "" || (/^\d+$/.test(value) && value >= 2016 && value <= 2050)) {
      setFilters((prevFilters) => ({ ...prevFilters, year: value }));
    }
  };

  // פונקציה לטיפול בשינוי ערך בשדה קוד הקורס
  const handleCourseCodeChange = (e) => {
    const value = e.target.value;
    if (value === "" || (/^\d+$/.test(value) && value > 0)) {
      setFilters((prevFilters) => ({ ...prevFilters, courseCode: value }));
    }
  };
  

   // בדיקה אם היה שינוי בערכים
   const isSearchDisabled = useMemo(() => {
    return JSON.stringify(filters) === JSON.stringify(initialState);
  }, [filters]);

  return (
    <Box
    sx={{
      width: "100%",
      margin: "auto",
      //position: "relative",
      borderRadius: "4px",
      padding: "25px 24px",
      backgroundColor: "white",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      fontFamily: "Rubik",
      fontWeight: 400,
      fontSize: "16px",
      lineHeight: "18.96px",
      textAlign: "right",
      direction: "rtl",
    }}
  >
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        gap: "20px",
        flexWrap: "nowrap",
        flex: 1,
        marginRight: 0,
      }}
    >
        {/* קוד קורס - ערך מספרי בלבד */}
        <TextField
          label="קוד קורס"
          type="number"
          variant="standard"
          sx={{ ...sharedStyles, order: -1}}
          value={filters.courseCode}
          onChange={handleCourseCodeChange}
        />

        {/* שם קורס - טקסט */}
        <TextField
          label="שם הקורס"
          variant="standard"
          sx={sharedStyles}
          value={filters.courseName}
          onChange={(e) => setFilters({ ...filters, courseName: e.target.value })}
        />
        

        {/* רכזת - מתוך רשימה */}
        <FormControl variant="standard" sx={sharedStyles}>
          <InputLabel>רכזת</InputLabel>
          <Select
            value={filters.courseCoordinator}
            onChange={(e) => setFilters({ ...filters, courseCoordinator: e.target.value })}
            sx={sharedStyles}
          >
            {coordinators && coordinators?.map((coordinator) => (
              <MenuItem key={coordinator.userId} value={coordinator.userId}>
                {coordinator.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          variant="standard"
          label="שנה"
          type="number"
          value={filters.year}
          onFocus={handleYearFocus}
          onChange={handleYearChange}
          inputProps={{ min: 2016, max: 2050 }}
          sx={sharedStyles}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          gap: "15px",
        }}
      >
        <Button
          variant="outlined"
          sx={{
            ...buttonStyles,
          }}
          
          //startIcon={<FilterAltOffOutlinedIcon />}
          onClick={() => {
            setFilters(initialState);
            dispatch(fetchCoordinators()); // טוען מחדש את הקורסים
            //לבדוק שטעינת הקורסים מתבצעת דרך fetchCoordinators
          }}
        >
          ניקוי
        </Button>

        <Button
          variant="contained"
          backgroundColor= "#326DEF"
          sx={buttonStyles}
          startIcon={<SearchIcon />}
          disabled={isSearchDisabled} // הכפתור מושבת אם אין שינוי
        >
          חיפוש
        </Button>
      </Box>
    </Box>
  );
};
export default CourseSearch;