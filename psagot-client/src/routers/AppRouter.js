import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '../pages/Layout';
import RoomsSearch from '../components/RoomsSearch';
const AppRouter = () => {
    return (
        <Routes>
            <Route path='/' element={<Layout/>}>
                <Route path='/' element={<RoomsSearch/>}/>
            </Route>
        </Routes>
    );
};

export default AppRouter;