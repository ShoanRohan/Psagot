import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Tabs, Tab } from "@mui/material";
import { useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CourseDetails from "../components/CourseDetails";
import TopicDialog from "../components/TopicDialog";
import TopicsGrid from "../components/TopicsGrid";
import TopicSearch from "../components/TopicSearch";
import { fetchCourseById, updateCourseAction } from "../features/course/courseActions";

const CoursPage = () => {
  const [tabValue, setTabValue] = useState(0);
  const { id } = useParams();
  const [searchParams] = useSearchParams();

  const [selectedCourse, setSelectedCourse] = useState(null);
  const topics = useSelector((state) => state.topic.topics);
  const dispatch = useDispatch();
  const courseFromStore = useSelector((state) => state.course.selectedCourse);

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState(null);

  useEffect(() => {
    if (id) {
      dispatch(fetchCourseById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (courseFromStore) {
      setSelectedCourse(courseFromStore);
    }
  }, [courseFromStore]);

  // ✅ פתיחה אוטומטית של דיאלוג לפי topicId מה־URL
  useEffect(() => {
    const topicIdFromQuery = searchParams.get("topicId");
    if (topicIdFromQuery && topics.length > 0) {
      const topicToEdit = topics.find(t => t.id === parseInt(topicIdFromQuery));
      if (topicToEdit) {
        handleOpenDialog(topicToEdit);
      }
    }
  }, [searchParams, topics]);

  const handleTabChange = (event, newValue) => setTabValue(newValue);

  const handleSave = async () => {
    try {
      await dispatch(updateCourseAction(selectedCourse)).unwrap();
      alert("הקורס עודכן בהצלחה");
    } catch (error) {
      console.error("שגיאה בעדכון הקורס:", error);
      alert("ארעה שגיאה בעת עדכון הקורס");
    }
  };

  const handleCancel = () => window.location.reload();

  const handleOpenDialog = (topic) => {
    console.log("handleOpenDialog נקרא עם נושא:", topic);
    setSelectedTopic(topic);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedTopic(null);
  };

  return (
    <Box sx={{ p: 3, backgroundColor: "#f5f7fa", minHeight: "94vh" }}>
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

      <Tabs value={tabValue} onChange={handleTabChange}>
        <Tab label="פרטי קורס" />
        <Tab label="נושאי קורס" />
      </Tabs>

      <Box sx={{ mt: 2 }}>
        {tabValue === 0 && selectedCourse && (
          <CourseDetails course={selectedCourse} setCourse={setSelectedCourse} />
        )}

        {tabValue === 1 && (
          <>
<Button
              variant="contained"
              color="secondary"
              onClick={() => handleOpenDialog({ courseId: selectedTopic?.id })}
              sx={{ mb: 2 }}
            >
              ערוך נושא קורס
            </Button>
            <TopicSearch />
            <TopicsGrid topics={topics.filter(topic => topic.courseId === selectedCourse?.id)}/>
            {selectedTopic && (
              <TopicDialog open={openDialog} onClose={handleCloseDialog} initialData={selectedTopic} />
            )}

          </>
        )}
      </Box>
    </Box>

  );
};

export default CoursPage;
