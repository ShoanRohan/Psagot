import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import Layout from '../pages/Layout';
import LocatorBar from '../components/LocatorBar';
import MeetingTable from '../components/MeetingTable';
import MeetingsPage from '../components/MeetingsPage';
import EditUser from '../components/EditUser';
import UserPage from '../components/UserPage';

const AppRouter = () => {
    return (
        <Routes>
             <Route path='/' element={<Layout/>}>
                {/* <Route index element={<HomePage/>}></Route> */}
                <Route path='LocatorBar' element={<LocatorBar/>}></Route>
            <Route path='/Users' element={<UserPage />} />
            <Route path='Meetings' element={<MeetingsPage />} />
                <Route path='MeetingTable' element={<MeetingTable/>}/>   
                <Route path='/user/:userId' element={<EditUser/>}/>
                </Route>
       </Routes>  
           
    );}

export default AppRouter;  