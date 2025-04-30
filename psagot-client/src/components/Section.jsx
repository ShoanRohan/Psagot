import React from 'react';
import { Box, Container } from '@mui/material';
import { Outlet } from 'react-router-dom';
import MeetingTable from './MeetingTable';

const Section = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Container component="main">
                <Outlet />
                <MeetingTable/>

            </Container>
        </Box>
    );
};

export default Section;
