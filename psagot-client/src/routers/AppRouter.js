import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import Layout from '../pages/Layout';
import { Register } from '../components/Register';
import Courses from '../components/Courses';



const AppRouter = () => {
    return (
        <Routes>
            <Route path='/' element={<Layout/>}>
                <Route path='/' element={<HomePage/>}/>
                <Route path='/Register' element={<Register/>}/>
                <Route path='/Courses' element={<Courses />} />
            </Route>
        </Routes>
    );
};

export default AppRouter;

