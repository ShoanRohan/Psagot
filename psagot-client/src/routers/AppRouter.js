import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import Layout from '../pages/Layout';
import TopicsSearch from '../components/TopicsSearch'

const AppRouter = () => {
    return (
        <Routes>
            <Route path='/' element={<Layout/>}>
                <Route path='/' element={<TopicsSearch id={1}/>}/>
            </Route>
        </Routes>
    );
};

export default AppRouter;