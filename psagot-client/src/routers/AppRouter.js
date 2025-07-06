import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CalendarPage from '../pages/CalendarPage';
import CoursesPage from "../pages/CoursesPage";
import CourseScreen from '../components/CourseScreen';
import MeetingsTable from '../components/MeetingsTable';
import Login from '../components/Login';
import Layout from '../pages/Layout';
import Rooms from '../pages/Rooms';
import UsersPage from '../pages/UsersPage';

const AppRouter = () => {
    return (
        <Routes>
            {/* הלוגין מחוץ ללייאאוט */}
            <Route path="/" element={<Login />} />

            {/* כל שאר הדפים עטופים בלייאאוט */}
            <Route element={<Layout />}>
                <Route path="/courses" element={<CoursesPage />} />
                <Route path="/course/:id" element={<CourseScreen />} />
                <Route path="/meetings" element={<MeetingsTable />} />
                <Route path='/users' element={<UsersPage />} />
                <Route path="/rooms" element={<Rooms />} />
                <Route path="/calendar" element={<CalendarPage />} />
                <Route path="/meetings/:id" element={<h1>פגישות ID</h1>} />
            </Route>
        </Routes>
    );
};

export default AppRouter;