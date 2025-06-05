import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import Layout from '../pages/Layout';
import CoursesPage from '../pages/CoursesPage';
import Login from '../components/Login';
import Register from '../components/Register';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';

const AppRouter = () => {
    return (
        <Routes>
            <Route path='/' element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path='courses' element={<CoursesPage />} />
                {/* <Route path='meetings' element={<MeetingsPage />} /> */}
            </Route>

            <Route path='' element={<LoginPage />}>
                <Route path='login' element={<Login />} />

            </Route>
            <Route path='' element={<RegisterPage />}>
                <Route path='Register' element={<Register />} />

            </Route>

        </Routes>
    );
};

export default AppRouter;