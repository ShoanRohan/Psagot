import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import Layout from '../pages/Layout';
import RoomsGrid from '../components/RoomsGrid';

const AppRouter = () => {
    return (
        <Routes>
            <Route path='/' element={<Layout/>}>
                <Route path='/' element={<RoomsGrid/>}/>
            </Route>
        </Routes>
    );
};

export default AppRouter;