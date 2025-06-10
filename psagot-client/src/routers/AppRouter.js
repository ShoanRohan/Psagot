import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import Layout from '../pages/Layout';
import CalendarPage from '../pages/CalendarPage';
import CoursesPage from "../pages/CoursesPage";
import CoursePage from '../pages/CoursePage';
import AddTopic from '../components/AddTopic';
import CourseScreen from '../components/CourseScreen';

const AppRouter = () => {
    return (
        <Routes>
            <Route path='/' element={<Layout />}>
                <Route path='/' element={<AddTopic open={true}/>} />
                <Route path='/courses' element={<CoursePage/>} />
                <Route path='/course/:id' element={<CourseScreen/>} />  
                <Route path='/meetings' element={<span>page Meetings</span>} />
                <Route path='/users' element={<span>page Users</span>} />
                <Route path='/rooms' element={<span>page Rooms</span>} />
                <Route path="/calendar" element={<CalendarPage />} />
            </Route>
        </Routes>
    );
};

export default AppRouter;
