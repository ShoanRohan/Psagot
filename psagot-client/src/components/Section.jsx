import React from 'react';
import { Box, Container } from '@mui/material';
import { Outlet } from 'react-router-dom';

const Section = () => {
    return (
        <Box sx={{ flexGrow: 1, py: 2 }}>
            <Container maxWidth="xl">
                <Outlet />
            </Container>
        </Box>
    );
};

export default Section;
