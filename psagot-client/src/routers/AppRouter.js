import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import Layout from '../pages/Layout';
import CoursesPage from '../pages/CoursesPage';
import Login from '../components/Login';
import Register from '../components/Register';
import LoginPage from '../pages/LoginPage';
import UserManagement from '../pages/UserManagement';
import RegisterPage from '../pages/RegisterPage';
import CreateCourse from '../components/CreateCourse';

const AppRouter = () => {
    return (
        <Routes>
            {/* ניווט ברירת מחדל ישירות ל-login */}
            <Route path="/" element={<Navigate to="/login" />} />

            {/* עמודי אפליקציה אחרי התחברות */}
            <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path="/user" element={<UserManagement />} />
                <Route path="/courses" element={<CoursesPage />} />
            </Route>

            {/* עמוד התחברות */}
            <Route path="/login" element={<LoginPage />}>
                <Route index element={<Login />} />
            </Route>
            <Route path='/register' element={<RegisterPage />}>
                <Route index element={<Register />} />
        
        <Routes>  
             <Route path='/' element={<Layout/>}>
                <Route path='/home' element={<HomePage />} />  
                <Route path='user' element={<UserManagement />}/>
                <Route path='newCourse' element={<CreateCourse />}/>
            </Route> 
                
            <Route path='/' element={<LoginPage/>}> 
                <Route path='login' element={<Login/>}/> 
            </Route>
        </Routes>
    );
};

export default AppRouter;