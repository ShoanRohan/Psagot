import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import Layout from '../pages/Layout';
import CourseSearch from '../components/CourseSearch';
import CoursePage from '../components/CoursePage';
import TopicsSearch from '../components/TopicsSearch'
import CourseScreen from '../components/CourseScreen';


const AppRouter = () => {
    return (
        <Routes>
            <Route path='/' element={<Layout/>}/>

            <Route path='/course' element={<CourseScreen />}/>
            {/* <Route path='/TopicsSearch' element={<TopicsSearch id={1}/>}/> */}
                

        </Routes>
        //<Route path='/' element={<HomePage/>}/>

    );
};

export default AppRouter;