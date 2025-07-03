import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Tabs,
  Tab,
  Snackbar,
  Alert,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CourseDetails from "../components/CourseDetails";
import {
  fetchCourseById,
  updateCourseAction,
} from "../features/course/courseActions";
import { setCourse } from "../features/course/courseSlice";

import TopicsGrid from "../components/TopicsGrid";
import { useDispatch, useSelector } from "react-redux";
import TopicSearch from "../components/TopicSearch";
import { fetchCourseById,updateCourseAction } from "../features/course/courseActions";

const CoursPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const selectedCourse = useSelector((state) => state.course.selectedCourse);
  const [tabValue, setTabValue] = useState(0);

  // Snackbar state
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success", // 'success' | 'error' | 'info' | 'warning'
  });

  const handleSnackbarClose = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  useEffect(() => {
    if (id) {
      dispatch(fetchCourseById(id));
    }
  }, [id, dispatch]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleSave = async () => {
    try {
      await dispatch(updateCourseAction(selectedCourse));
      setSnackbar({
        open: true,
        message: "הקורס עודכן בהצלחה",
        severity: "success",
      });
    } catch (error) {
      console.error("שגיאה בעדכון הקורס:", error);
      setSnackbar({
        open: true,
        message: "ארעה שגיאה בעת עדכון הקורס",
        severity: "error",
      });
    }
  };

  const handleCancel = () => {
    window.location.reload();
  };

  const handleSetCourse = (updater) => {
    dispatch(
      setCourse(typeof updater === "function" ? updater(selectedCourse) : updater)
    );
  };

  return (
    <Box sx={{ p: 3, backgroundColor: "#f5f7fa", minHeight: "100vh" }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Box>
          <Typography variant="h5" sx={{ fontWeight: "bold", color: "#0b2d72" }}>
            {selectedCourse?.name || "טעינה..."}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            פרטי קורס
          </Typography>
        </Box>

<Box sx={{ display: "flex", gap: 1 }}>
          <Button
            variant="contained"
            color="primary"
            sx={{ borderRadius: "30px", px: 4, py: 1, textTransform: "none" }}
            onClick={handleSave}
            disabled={!selectedCourse}
          >
            שמור
          </Button>
          <Button
            variant="outlined"
            color="primary"
            sx={{ borderRadius: "30px", px: 4, py: 1, textTransform: "none" }}
            onClick={handleCancel}
          >
            ביטול
          </Button>
        </Box>
      </Box>

      {/* Tabs */}
      <Tabs value={tabValue} onChange={handleTabChange}>
        <Tab label="פרטי קורס" />
        <Tab label="נושאי קורס" />
      </Tabs>

      {/* Tab Content */}
      <Box sx={{ mt: 2 }}>
        {tabValue === 0 && selectedCourse && (
          <CourseDetails course={selectedCourse} setCourse={handleSetCourse} />
        )}
        {tabValue === 1 && (
          <>
           <TopicSearch  />
          <TopicsGrid topics={topics.filter(topic => topic.courseId === selectedCourse.id)} />
          </>
        )}
      </Box>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CoursPage;
