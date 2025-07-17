import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import Layout from '../pages/Layout';
import CoursesPage from '../pages/CoursesPage';
import Login from '../components/Login';
import Register from '../components/Register';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import UserManagement from '../pages/UserManagement';
import RoomsGrid from '../components/RoomsGrid';
import RoomsPage from '../pages/RoomsPage';
import RoomsScheduleSearch from '../components/RoomsScheduleSearch';
import RoomEdit from '../components/RoomEdit';
import RoomsScheduleGrid from '../components/RoomsScheduleGrid';

const AppRouter = () => {
    return (
        <Routes>
            <Route path='/' element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path='courses' element={<CoursesPage />} />
                <Route path='users' element={<UserManagement />} />
                {/* <Route path='meetings' element={<MeetingsPage />} /> */}
                <Route path='rooms'  element= {<RoomsPage/>}/>
                <Route path='edit'  element= {<RoomEdit/>}/>
            </Route>

            <Route path='' element={<LoginPage />}>
                <Route path='login' element={<Login />} />

            </Route>
            <Route path='' element={<RegisterPage />}>
                <Route path='Register' element={<Register />} />

            </Route>


        </Routes>
       
       
    );
};

export default AppRouter;