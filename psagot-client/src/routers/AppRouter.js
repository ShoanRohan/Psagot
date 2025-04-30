import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import Layout from '../pages/Layout';
import AddMeeting from '../pages/AddMeeting';
import MeetingButton from '../pages/MeetingButton';
import { ExportIconButton } from '../pages/ExcelButton';
import MeetingLocatorBar from '../components/MeetingLocatorBar';
import MeetingTable from '../components/MeetingTable';

const AppRouter = () => {
    return (
        <Routes>        
            <Route path='/' element={<Layout/>}>  
                <Route index element={<HomePage/>}/>
                
                <Route path='add-meeting' element={<AddMeeting />} />
                <Route path='export-excel' element={< ExportIconButton />} />

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
