import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Layout from "../pages/Layout";
import CourseScreen from "../components/CourseScreen";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />} />
      <Route path="/course" element={<CourseScreen />} />
    </Routes>
    //<Route path='/' element={<HomePage/>}/>
  );
};

export default AppRouter;
