import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import Layout from '../pages/Layout';
import Rooms from '../components/Rooms';

const AppRouter = () => {
    return (
        <Routes>
            <Route path='/' element={<Layout/>}>
                <Route path='/' element={<Rooms/>}/>
            </Route>
        </Routes>
    );
};

export default AppRouter;