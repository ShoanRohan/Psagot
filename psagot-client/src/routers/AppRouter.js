import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import Layout from '../pages/Layout';
import AddMeeting from '../pages/AddMeeting';

const AppRouter = () => {
    return (
        <Routes>
            <Route path='/' element={<Layout/>}>
            <Route path="/add-meeting" element={<AddMeeting />} />
                <Route path='/' element={<HomePage/>}/>
            </Route>
        </Routes>
    );
};

export default AppRouter;