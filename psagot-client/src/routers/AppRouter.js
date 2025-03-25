import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import Layout from '../pages/Layout';
import TopicsSearch from '../components/TopicsSearch'
import CourseScreen from '../components/CourseScreen';

const AppRouter = () => {
    return (
        <Routes>
            <Route path='/' element={<Layout/>}>
            <Route path='/' element={<CourseScreen />}/>
            <Route path='/TopicsSearch' element={<TopicsSearch id={1}/>}/>
                
            </Route>
        </Routes>
    );
};

export default AppRouter;