import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import Layout from '../pages/Layout';
import MeetingButton from '../pages/MeetingButton';



const AppRouter = () => {
    return (
        <Routes>
            <Route path='/' element={<Layout/>}>
           
            <Route path='/' element={<HomePage/>}/>           
            </Route>
        </Routes>
    );
};

export default AppRouter;

// <Route path='/' element={<HomePage/>}/>