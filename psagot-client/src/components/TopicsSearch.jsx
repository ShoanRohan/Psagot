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
  width: "109px",
  height: "44px",
  gap: "8px",
  borderRadius: "50px",
  boxShadow: "none",
  fontFamily: "Rubik",
  fontWeight: 400,
  fontSize: "16px",
  lineHeight: "18.96px",
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
        width: "90%",
        margin: "auto",
        position: "relative",
        top: "100px",
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
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          gap: "30px",
          flexWrap: "wrap",
          flex: 1,
          marginRight: "auto",
        }}
      >
        {/* נושא */}
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

        {/* שם מרצה */}
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
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: "15px",
          marginLeft: "auto",
        }}
      >
        {/* ניקוי */}
        <Button
          variant="contained"
          sx={buttonStyles}
          startIcon={<FilterAltOffOutlinedIcon />}
          onClick={() => setFilters(initialState)}
        >
          ניקוי
        </Button>

        {/* חיפוש */}
        <Button variant="contained" sx={buttonStyles} startIcon={<SearchIcon />}>
          חיפוש
        </Button>
      </Box>
    </Box>
  );
};

export default TopicsSearch;
