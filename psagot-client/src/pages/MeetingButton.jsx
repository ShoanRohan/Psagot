import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const MeetingButton = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/AddMeeting');
    };

    const addButtonStyle = {
        width: 100,
        height: 50,
        position: 'relative',
        top: '0px', 
        left: '0px',
        right: '100px', 
        borderRadius: '50px',
        paddingRight: '24px',
        paddingLeft: '24px',
        gap: '8px',
        border: '1px solid #326DEF',
        color: '#326DEF',
        backgroundColor: 'transparent',
        textTransform: 'none',
        fontWeight: 'normal',
    };

    return (
        <Button 
            variant="outlined" 
            color="primary" 
            onClick={handleClick}
            sx={addButtonStyle}
        >
            הוספת מפגש
        </Button>
    );
};

export default MeetingButton;