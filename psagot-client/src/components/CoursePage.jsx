import React from "react";
import CourseSearch from "./CourseSearch";
import CoursesTable from "./CourseTable";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const CoursesPage = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" align="right" color="primary" fontWeight="bold">
        קורסים
      </Typography>
      <CourseSearch />
      <CoursesTable />
    </Box>
  );
};

export default CoursesPage;
