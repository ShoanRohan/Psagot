import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import Layout from '../pages/Layout';
import CoursesGrid from '../components/CourseGrid';
import CourseManagement from '../components/CourseManagement';
import Login from '../components/Login'; 
import Register from '../components/Register';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';

const AppRouter = () => {
    return (
        <Routes>
            <Route path='/' element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path='CourseGrid' element={<CoursesGrid />} />
                <Route path='CourseManagement' element={<CourseManagement />} />
            </Route>

            <Route path='' element={<LoginPage />}>
                <Route path='login' element={<Login />} />
                <Route path='Register' element={<Register />} />
            </Route>
        </Routes>
    );
};

export default AppRouter;
