import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import Layout from '../pages/Layout';
import CalendarPage from '../pages/CalendarPage';
import MeetingsTable from '../components/MeetingsTable';
import RoomTable from '../components/RoomTable';
import RoomsHeader from '../components/RoomsHeader';

const AppRouter = () => {
    return (
        <Routes>
            <Route path='/' element={<Layout />}>
                <Route path='/' element={<HomePage />} />
                <Route path='/courses' element={<span>page Courses</span>} />
                <Route path='/meetings' element={<MeetingsTable />} />
                <Route path='/users' element={<span>page Users</span>} />
                <Route path='/rooms' element={<RoomsHeader/>} />
                <Route path="/calendar" element={<CalendarPage />} />
                <Route path="/meetings/:id" element={<h1>���� �����</h1>}/>
                <Route path="/roomsHeader" element={<RoomsHeader/>} />
            </Route>
        </Routes>
    );
};

export default AppRouter;