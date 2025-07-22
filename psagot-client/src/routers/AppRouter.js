import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import Layout from '../pages/Layout';
import LocatorBar from '../components/LocatorBar';
import MeetingTable from '../components/MeetingTable';
import MeetingsPage from '../components/MeetingsPage';
import UpdateUser from '../components/UpdateUser';
import UserManagement from '../pages/UserManagement';
import UserPage from '../components/UserPage';



const AppRouter = () => {
    return (
        <Routes>
                <Route path='/' element={<Layout/>}>
                {/* <Route index element={<HomePage/>}></Route> */}
                <Route path='LocatorBar' element={<LocatorBar/>}></Route>
                <Route path='MeetingsPage' element={<MeetingsPage />} />
                <Route path='MeetingTable' element={<MeetingTable/>}/>   
                <Route path='/userUpdate/:userId' element={<UpdateUser/>}/>
                {/* <Route path='/users' element={<UserManagement/>}/> */}
                <Route path='/Users' element={<UserPage/>} />
                </Route>
       </Routes>  
           
    );}

export default AppRouter;  