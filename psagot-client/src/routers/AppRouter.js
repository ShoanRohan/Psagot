import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import Layout from '../pages/Layout';
import AddMeeting from '../pages/AddMeeting';
import MeetingButton from '../pages/MeetingButton';
import MeetingLocatorBar from '../pages/MeetingLocatorBar';


const AppRouter = () => {
    return (
        <Routes>
            <Route path='/' element={<Layout/>}>
            <Route path='/' element={<HomePage/>}/>
            <Route path='/AddMeeting' element={<AddMeeting/>}/>
            </Route>
        </Routes>
    );
};

export default AppRouter;