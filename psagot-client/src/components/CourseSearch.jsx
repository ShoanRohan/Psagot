import React, { useState, useEffect } from "react";
import {
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltOffOutlinedIcon from "@mui/icons-material/FilterAltOffOutlined";
import { useDispatch, useSelector } from "react-redux";
import { fetchCoordinators } from "../features/user/userAction";

// סטייל לשדות בחירה
const sharedStyles = {
  width: "100%",
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

const CourseSearch = ({ filters, setFilters, onSearch, initialState }) => {
  const dispatch = useDispatch();
  const coordinators = useSelector((state) => state.user.coordinators);
  const currentYear = new Date().getFullYear();

  const [wasModified, setWasModified] = useState(false);

  useEffect(() => {
    dispatch(fetchCoordinators());
  }, [dispatch]);

  const handleYearFocus = () => {
    if (!filters.year) {
      setFilters((prev) => ({ ...prev, year: currentYear }));
      setWasModified(true);
    }
  };

  const handleYearChange = (e) => {
    const value = e.target.value;
    if (value === "" || (/^\d+$/.test(value) && value >= 2016 && value <= 2050)) {
      setFilters((prev) => ({ ...prev, year: value }));
      setWasModified(true);
    }
  };

  const handleCourseCodeChange = (e) => {
    const value = e.target.value;
    if (value === "" || (/^\d+$/.test(value) && value > 0)) {
      setFilters((prev) => ({ ...prev, courseCode: value }));
      setWasModified(true);
    }
  };

  const isSearchDisabled = !wasModified;

  return (
    <Box
      sx={{
        margin: "auto",
        gap: 20,
        borderRadius: "10px",
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
        WebkitBackdropFilter: "blur(4px)",
        boxShadow: "0px 4px 12px rgba(220, 226, 236, 0.8)",
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
        <TextField
          label="קוד קורס"
          type="number"
          variant="standard"
          sx={{ ...sharedStyles, order: -1 }}
          value={filters.courseCode}
          onChange={handleCourseCodeChange}
        />

        <TextField
          label="שם הקורס"
          variant="standard"
          sx={sharedStyles}
          value={filters.courseName}
          onChange={(e) => {
            setFilters({ ...filters, courseName: e.target.value });
            setWasModified(true);
          }}
        />

        <FormControl variant="standard" sx={sharedStyles}>
          <InputLabel>רכזת</InputLabel>
          <Select
            value={filters.courseCoordinator}
            onChange={(e) => {
              setFilters({ ...filters, courseCoordinator: e.target.value });
              setWasModified(true);
            }}
            sx={sharedStyles}
          >
            {coordinators?.map((coordinator) => (
              <MenuItem key={coordinator.userId} value={coordinator.name}>
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
          sx={buttonStyles}
          onClick={() => {
            setFilters(initialState);
            dispatch(fetchCoordinators());
            // intentionally NOT resetting wasModified
          }}
        >
          ניקוי
        </Button>
        <Button
          variant="contained"
          sx={{ ...buttonStyles, backgroundColor: "#326DEF" }}
          startIcon={<SearchIcon />}
          disabled={isSearchDisabled}
          onClick={() => {
            onSearch();
          }}
        >
          חיפוש
        </Button>
      </Box>
    </Box>
  );
};

export default CourseSearch;
