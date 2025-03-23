import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import Layout from '../pages/Layout';
import CourseSearch from '../components/CourseSearch';
import CoursePage from '../components/CoursePage';


const AppRouter = () => {
    return (
        <Routes>
            <Route path='/' element={<Layout/>}>

            </Route>
        </Routes>
        //<Route path='/' element={<HomePage/>}/>

    );
};

export default AppRouter;