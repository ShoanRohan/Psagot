import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import Layout from '../pages/Layout';
import CalendarPage from '../pages/CalendarPage';
import MeetingsTable from '../components/MeetingsTable';
import RoomTable from '../components/RoomTable';
const AppRouter = () => {
    return (
        <Routes>
            <Route path='/' element={<Layout />}>
                <Route path='/' element={<HomePage />} />
                <Route path='/courses' element={<span>page Courses</span>} />
                <Route path='/meetings' element={<MeetingsTable />} />
                <Route path='/users' element={<span>page Users</span>} />
                <Route path='/rooms' element={<RoomTable />} />
                <Route path="/calendar" element={<CalendarPage />} />
            </Route>
        </Routes>
    );
};

export default AppRouter;