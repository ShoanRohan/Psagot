import React from 'react';
import { NavLink } from 'react-router-dom';
import { Stack, Button, styled } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/BarChart';
import EventIcon from '@mui/icons-material/DeviceHub';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PersonIcon from '@mui/icons-material/Person';

const StyledButton = styled(Button)(({ theme }) => ({
  justifyContent: 'flex-start',
  padding: '12px',
  color: 'white',
  textAlign: 'right',
  width: '100%',
  gap: '12px',
  fontFamily: 'rubik',
  fontSize: '22px',
  lineHeight: '33px',
  '&:hover': {
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  '&.active': {
    backgroundColor: 'rgba(255,255,255,0.2)',
  }
}));

const StyledNavLink = styled(NavLink)({
  textDecoration: 'none',
  width: '100%',
  '&.active button': {
    backgroundColor: 'rgba(255,255,255,0.2)',
  }
});

const Header = () => {
  return (
    <Stack 
      direction="column" 
      spacing={2} 
      sx={{ 
        backgroundColor: '#1A237E', 
        height: '100vh', 
        width: '240px',
        //top: '-6213px',
        //left: '8252px',
        borderTopLeftRadius: '40px', 
        borderBottomLeftRadius: '40px', 
        //transform: 'rotate(90deg)',
        padding: '16px',
        color: 'white'
      }}
    >
      <Stack 
        direction="column" 
        spacing={3} 
        sx={{ 
          width: '100%',
          alignItems: 'center',
          marginBottom: '60px'
        }}
      >
      
        <img 
          src="/assets/logo_psagot.png" 
          alt="Logo" 
          style={{
            width: '80%',
            maxHeight: '60px',
            objectFit: 'contain',
            marginTop: '50px'
          }}
        />
        
      </Stack>

      <Stack direction="column" spacing={1}>
        <StyledNavLink to="/" end>
          <StyledButton startIcon={<HomeIcon />}>
            מסך ראשי
          </StyledButton>
        </StyledNavLink>
        <StyledNavLink to="/courses">
          <StyledButton startIcon={<PeopleIcon />}>
            קורסים
          </StyledButton>
        </StyledNavLink>
        <StyledNavLink to="/meetings">
          <StyledButton startIcon={<EventIcon />}>
            מפגשים
          </StyledButton>
        </StyledNavLink>
        <StyledNavLink to="/rooms">
          <StyledButton startIcon={<MeetingRoomIcon />}>
            חדרים
          </StyledButton>
        </StyledNavLink>
        <StyledNavLink to="/calendar">
          <StyledButton startIcon={<CalendarMonthIcon />}>
            לוח שנה
          </StyledButton>
        </StyledNavLink>
        <StyledNavLink to="/users">
          <StyledButton startIcon={<PersonIcon />}>
            משתמשים
          </StyledButton>
        </StyledNavLink>
      </Stack>

      <Stack 
        direction="row" 
        alignItems="center" 
        spacing={1} 
        sx={{ 
          position: 'absolute', 
          bottom: '16px', 
          left: '16px' 
        }}
      >
        
      </Stack>
    </Stack>
    
  );
};

export default Header;