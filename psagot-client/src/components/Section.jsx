import React from 'react';
import { Box, Container } from '@mui/material';
import { Outlet } from 'react-router-dom';
import MeetingLocatorBar from './MeetingLocatorBar';

const Section = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Container component="main">
                <Outlet />
                <MeetingLocatorBar/>
            </Container>
        </Box>
    );
};

export default Section;
