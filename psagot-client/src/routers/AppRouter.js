import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import Layout from '../pages/Layout';
import MeetingLocatorBar from '../components/MeetingLocatorBar';
import MeetingTable from '../components/MeetingTable';

const AppRouter = () => {
    return (
        <Routes>
            <Route path='/' element={<Layout/>}>
                <Route path='/' element={<HomePage/>}/>
                <Route path='/components/MeetingLocatorBar' element={<MeetingLocatorBar/>}/>
                <Route path='/components/MeetingTable' element={<MeetingTable/>}/>
            </Route>
        </Routes>
    );
};

export default AppRouter;