import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import Layout from '../pages/Layout';
import Meetings from '../components/Meetings';
import Calendar from '../components/Calendar';
import Users from '../components/Users';
import Rooms from '../components/Rooms';

const AppRouter = () => {
    return (
        <Routes>
            <Route path='/' element={<Layout />}>
                <Route path='/' element={<HomePage />} />
                <Route path='/courses' element={<span>page courses</span>} />
                <Route path='/meetings' element={<Meetings />} />
                <Route path='/calendar' element={<Calendar />} />
                <Route path='/users' element={<Users />} />
                <Route path='/rooms' element={<Rooms />} />
            </Route>
        </Routes>
    );
};

export default AppRouter;