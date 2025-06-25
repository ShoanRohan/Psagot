import * as React from "react";
import {
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltOffOutlinedIcon from "@mui/icons-material/FilterAltOffOutlined";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { fetchAllTopicFotCourseByCourseId } from "../features/topic/topicActions";

const sharedStyles = {
  width: "150px",
  height: "43px",
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
  minWidth: "100px",
  height: "40px",
  borderRadius: "50px",
  boxShadow: "none",
  fontFamily: "Rubik",
  fontWeight: 400,
  fontSize: "16px",
  textTransform: "none",
};

const TopicsSearch = ({ id }) => {
  const dispatch = useDispatch();
  const { topics, status } = useSelector((state) => state.topic);
  const { lecturers } = useSelector((state) => state.user);

  const initialState = {
    topicName: "",
    lecturerName: "",
  };

  const [filters, setFilters] = useState(initialState);

  useEffect(() => {
    if (status === "idle" && id) {
      dispatch(fetchAllTopicFotCourseByCourseId(id));
    }
  }, [status, dispatch, id]);

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        backgroundColor: "white",
        fontFamily: "Rubik",
        direction: "rtl",
        borderRadius: "10px",
        background: "#FFF",
  
      //  width: "1482px",
      //   transform: "rotate(90deg)",
          padding:"30px 32px" ,
     

/* Drop Shadow */
    boxShadow: "0px 0px 4px 0px rgba(220, 226, 236, 0.80)",
      }}
    >
      {/* שדות בחירה */}
      <Box sx={{ display: "flex", gap: "20px" }}>
        <FormControl variant="standard" sx={sharedStyles}>
          <InputLabel>נושא</InputLabel>
          <Select
            value={filters.topicName}
            onChange={(e) =>
              setFilters({ ...filters, topicName: e.target.value })
            }
            sx={sharedStyles}
          >
            {topics?.map((topic) => (
              <MenuItem key={topic.topicId} value={topic.name}>
                {topic.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl variant="standard" sx={sharedStyles}>
          <InputLabel>שם מרצה</InputLabel>
          <Select
            value={filters.lecturerName}
            onChange={(e) =>
              setFilters({ ...filters, lecturerName: e.target.value })
            }
            sx={sharedStyles}
          >
            {lecturers?.map((lecturer) => (
              <MenuItem key={lecturer.id} value={lecturer.name}>
                {lecturer.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl variant="standard" sx={sharedStyles}>
          <InputLabel>סטאטוס</InputLabel>
          <Select
            value={filters.lecturerName}
            onChange={(e) =>
              setFilters({ ...filters, lecturerName: e.target.value })
            }
            sx={sharedStyles}
          >
            {lecturers?.map((lecturer) => (
              <MenuItem key={lecturer.id} value={lecturer.name}>
                {lecturer.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* כפתורים */}
      <Box sx={{ display: "flex", gap: "10px" }}>
        <Button
          variant="outlined"
          sx={buttonStyles}
          // startIcon={<FilterAltOffOutlinedIcon sx={{ marginLeft: 1 }}/>}
          // startIcon={<SearchIcon sx={{ marginLeft: 1 }} />}
          onClick={() => setFilters(initialState)}
        >
          ניקוי
        </Button>

        <Button
         
          variant="contained"
          sx={{ ...buttonStyles, backgroundColor: "#1976d2", color: "white" }}
          startIcon={<SearchIcon sx={{ marginLeft: 1 }}/>}
          disabled={true} // הכפתור מושבת
        >
          חיפוש
        </Button>
              
      </Box>
    </Box>
  );
};

export default TopicsSearch;