import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import Layout from '../pages/Layout';
import { Register } from '../components/Register';
import CoursesGrid from '../components/CourseGrid';
import CourseManagement from '../components/CourseManagement';



const AppRouter = () => {
    return (
        <Routes>
            <Route path='/' element={<Layout/>}>
                <Route path='/' element={<HomePage/>}/>
                <Route path='/Register' element={<Register/>}/>
                <Route path='/CourseGrid' element={<CoursesGrid />} />
                <Route path='/CourseManagement' element={<CourseManagement />} />
            </Route>
        </Routes>
    );
};

export default AppRouter;

