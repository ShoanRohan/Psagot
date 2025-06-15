import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import Layout from '../pages/Layout';
import MeetingLocatorBar from '../pages/MeetingLocatorBar';
import LocatorBar from '../components/LocatorBar';
import MeetingTable from '../components/MeetingTable';
import MeetingsPage from '../components/MeetingsPage';
import EditUser from '../components/EditUser';





const AppRouter = () => {
    return (
        
        <Routes>
             <Route path='/' element={<Layout/>}></Route>
                {/* <Route index element={<HomePage/>}></Route> */}
                <Route path='LocatorBar' element={<LocatorBar/>}></Route>
                <Route path='MeetingLocatorBar' element={<MeetingLocatorBar/>}/>
                <Route path='/' element={<MeetingsPage/>}/>
                <Route path='MeetingTable' element={<MeetingTable/>}/>   
                <Route path='/user/:userId' element={<EditUser/>}/>
       </Routes>  
           
    );}

export default AppRouter;