import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import Layout from '../pages/Layout';
import CalendarPage from '../pages/CalendarPage';

const AppRouter = () => {
    return (
        <Routes>
            <Route path='/' element={<Layout />}>
                <Route path='/' element={<HomePage />} />
                <Route path='/courses' element={<span>page Courses</span>} />
                <Route path='/meetings' element={<span>page Meetings</span>} />
                <Route path='/users' element={<span>page Users</span>} />
                <Route path='/rooms' element={<span>page Rooms</span>} />
                <Route path="/calendar" element={<CalendarPage />} />
            </Route>
        </Routes>
    );
};

export default AppRouter;