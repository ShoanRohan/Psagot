import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import Layout from '../pages/Layout';
import CalendarPage from '../pages/CalendarPage';
import MeetingsTable from '../components/MeetingsTable'

const AppRouter = () => {
    return (
        <Routes>
            <Route path='/' element={<Layout />}>
                <Route path='/' element={<HomePage />} />
                <Route path="/calendar" element={<CalendarPage />} />
                <Route path='/MeetingsTable' element={<MeetingsTable />} />
            </Route>
        </Routes>
    );
};

export default AppRouter;