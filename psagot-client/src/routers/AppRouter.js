import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import Layout from '../pages/Layout';
import CalendarPage from '../pages/CalendarPage';
import CourseScreen from "../components/CourseScreen";
import Rooms from '../components/Rooms';
import UsersTable from '../pages/UsersTable';

const AppRouter = () => {
    return (
        <Routes>
            <Route path='/' element={<Layout />}>
                <Route path='/' element={<HomePage />} />
                <Route path='/courses' element={<span>page Courses</span>} />
                <Route path='/meetings' element={<span>page Meetings</span>} />
                <Route path='/users' element={<UsersTable />} />
                {/* <Route path='/usersPage' element={<UsersTable />} /> */}
                <Route path='/rooms' element={<Rooms />} />
                <Route path="/calendar" element={<CalendarPage />} />
            </Route>
        </Routes>
    );
};

export default AppRouter;
