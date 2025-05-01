import React, { useEffect, useState } from "react";
import CourseSearch from "./CourseSearch";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import GridOnIcon from "@mui/icons-material/GridOn"; // אייקון אקסל
import { Stack } from "@mui/material"; // מסדר כפתורים בשורה
import CourseGrid from "./CourseGrid";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import excelIcon from  '../assets/icons/excelIcon.svg'
import { useDispatch, useSelector } from "react-redux";
import {  fetchFilteredPaginatedCourses } from "../features/course/courseActions";
import { selectCurrentPage, selectPageSize, selectTotalCount, setCurrentPage, setPageSize } from "../features/course/courseSlice";


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
  backgroundColor: "#326DEF",
  color: "white",
  "&:hover": {
    backgroundColor: "#2857C4",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
  },
  "&:active": {
    backgroundColor: "#234E9D",
    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.3)",
  },
};
const CoursesPage = () => {
  const dispatch = useDispatch();
  const initialState = {
    courseCode: "",
    courseName: "",
    courseCoordinator: "",
    year: "",
  };
  
  const [filters, setFilters] = useState(initialState);

  const currentPage = useSelector(selectCurrentPage);

  const pageSize = useSelector(selectPageSize);

  const totalCount = useSelector(selectTotalCount);

  const changePage = async (page) =>
    await dispatch(setCurrentPage(page));

  const handleSearch = async () => {
    const params = {
      ...filters,
      pageNumber: currentPage,
      pageSize: pageSize,
    };
    dispatch(setCurrentPage(1));
    await dispatch(fetchFilteredPaginatedCourses(params));
    setFilters(initialState)
  };

  const handlePageSizeChange = (newPageSize) => {
    dispatch(setCurrentPage(1));
    console.log(newPageSize)
    dispatch(setPageSize(newPageSize));
  };

  useEffect(() => {
    const fetchData = async () => {
      const params = {
        ...filters,
        pageNumber: currentPage,
        pageSize: pageSize,
      };
      console.log("Fetching with params:", params); // לוודא שהפילטרים נמצאים כאן
      await dispatch(fetchFilteredPaginatedCourses(params));
    };
  
    fetchData();
  }, [dispatch, currentPage, pageSize]);
 
  return (
    <Box sx={{ p: 3,  width:"92%",
    }}>
      {/* כותרת עם כפתורים */}
      <Box
             sx={{
              
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "16px",
              width: "105%",
              marginX: "auto",
            }}
          >
            <Typography
              variant="h1"
              align="right"
              sx={{
                fontFamily: "Rubik, sans-serif",
                fontWeight: 700,
                fontSize: "40px",
                color: "#0D1783",
              }}
            >
          קורסים
        </Typography>
       
       
        {/* כפתורים בצד שמאל */}
        <Stack direction="row" spacing={2}>
          {/* כפתור עגול עם אייקון בלבד */}
          <IconButton >
           <img src={excelIcon} alt="ייצוא לאקסל" />
          </IconButton>
          <Button variant="contained" sx={buttonStyles}
                    startIcon={<AddCircleOutlineIcon />}
>
            הוספת קורס

          </Button>
        </Stack>
      </Box>
      <CourseSearch filters={filters} setFilters={setFilters} onSearch={handleSearch} initialState={initialState} />
      <CourseGrid totalCount={totalCount} currentPage={currentPage} pageSize={pageSize} onPageChange={changePage} onPageSizeChange={newPageSize => handlePageSizeChange(newPageSize)} />
    </Box>
  );
};
export default CoursesPage;