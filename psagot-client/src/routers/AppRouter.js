import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Layout from "../pages/Layout";
import CourseScreen from "../components/CourseScreen";
import CoursesPage from "../components/CoursesPage"

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />} >
      <Route index element={<HomePage />} />
      <Route path="course" element={<CourseScreen />} />
      <Route path="courses" element={<CoursesPage />} />
      </Route>
    </Routes>
    //<Route path='/' element={<HomePage/>}/>
  );
};

export default AppRouter;
