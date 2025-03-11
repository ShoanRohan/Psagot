// // import React from 'react';
// // import { NavLink } from 'react-router-dom';
// // import { Stack, Button, styled } from '@mui/material';
// // import HomeIcon from '@mui/icons-material/Home';
// // import PeopleIcon from '@mui/icons-material/BarChart';
// // import EventIcon from '@mui/icons-material/DeviceHub';
// // import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
// // import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
// // import PersonIcon from '@mui/icons-material/Person';
// // import  './Header.css';

// // const StyledButton = styled(Button)
// // (({ theme }) => ({
// //   // justifyContent: 'flex-start',
// //   // padding: '12px',
// //   // color: 'white',
// //   // textAlign: 'right',
// //   // width: '100%',
// //   // gap: '12px',
// //   // fontFamily: 'rubik',
// //   // fontSize: '22px',
// //   // lineHeight: '33px',
  
// //   '&:hover': {
// //     backgroundColor: 'rgba(255,255,255,0.1)',
// //   },
// //   '&.active': {
// //     backgroundColor: 'rgba(255,255,255,0.2)',
// //   }
// // }));

// // // const StyledButton=({})=>{
// // // return <Button className='styledButton'></Button>
// // // }
// // // const StyledButton = ({ children, ...props }) => { 
// // //   return <Button className='styledButton' {...props}>
// // //     {children}</Button>;
// // //      };

// // const StyledNavLink = styled(NavLink)({
// //   textDecoration: 'none',
// //   width: '100%',
// //   '&.active button': {
// //     backgroundColor: 'rgba(255,255,255,0.2)',
// //   }
// // });

// // const Header = () => {
// //   return (
// //     <Stack 
// //       direction="column" 
// //       spacing={2} 
// //       className='Stack1'
// //     >
// //       <Stack 
// //         direction="column" 
// //         spacing={3}
// //         className='Stack2' 
// //         // sx={{ 
// //         //   width: '100%',
// //         //   alignItems: 'center',
// //         //   marginBottom: '60px'
// //         // }}
// //       >
      
// //         <img 
// //           src="/assets/logo_psagot.png" 
// //           alt="Logo" 
// //         />
        
// //       </Stack>

// //       <Stack direction="column" spacing={1}>
// //         <StyledNavLink to="/" end>
// //           <StyledButton startIcon={<HomeIcon />} className='styledButton'>
// //             מסך ראשי
// //           </StyledButton>
// //         </StyledNavLink>
// //         <StyledNavLink to="/courses">
// //           <StyledButton startIcon={<PeopleIcon />}className='styledButton'>
// //             קורסים
// //           </StyledButton>
// //         </StyledNavLink>
// //         <StyledNavLink to="/meetings">
// //           <StyledButton startIcon={<EventIcon />}>
// //             מפגשים
// //           </StyledButton>
// //         </StyledNavLink>
// //         <StyledNavLink to="/rooms">
// //           <StyledButton startIcon={<MeetingRoomIcon />}>
// //             חדרים
// //           </StyledButton>
// //         </StyledNavLink>
// //         <StyledNavLink to="/calendar">
// //           <StyledButton startIcon={<CalendarMonthIcon />}>
// //             לוח שנה
// //           </StyledButton>
// //         </StyledNavLink>
// //         <StyledNavLink to="/users">
// //           <StyledButton startIcon={<PersonIcon />}>
// //             משתמשים
// //           </StyledButton>
// //         </StyledNavLink>
// //       </Stack>

// //       <Stack 
// //         direction="row" 
// //         alignItems="center" 
// //         spacing={1} 
// //         sx={{ 
// //           position: 'absolute', 
// //           bottom: '16px', 
// //           left: '16px' 
// //         }}
// //       >
        
// //       </Stack>
// //     </Stack>
    
// //   );
// // };

// // export default Header;



import React from 'react';
import { NavLink } from 'react-router-dom';
import { Stack, Button } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/BarChart';
import EventIcon from '@mui/icons-material/DeviceHub';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PersonIcon from '@mui/icons-material/Person';
import './Header.css';

const Header = () => {
  return (
    <Stack direction="column" spacing={2} className='Stack1'>
      <Stack direction="column" spacing={3} className='Stack2'>
        <img src="/assets/logo_psagot.png" alt="Logo" />
      </Stack>

      <Stack direction="column" spacing={1}>
        <NavLink to="/" end className="navLink">
          <Button startIcon={<HomeIcon />} className="styledButton">
            מסך ראשי
          </Button>
        </NavLink>
        <NavLink to="/courses" className="navLink">
          <Button startIcon={<PeopleIcon />} className="styledButton">
            קורסים
          </Button>
        </NavLink>
        <NavLink to="/meetings" className="navLink">
          <Button startIcon={<EventIcon />} className="styledButton">
            מפגשים
          </Button>
        </NavLink>
        <NavLink to="/rooms" className="navLink">
          <Button startIcon={<MeetingRoomIcon />} className="styledButton">
            חדרים
          </Button>
        </NavLink>
        <NavLink to="/calendar" className="navLink">
          <Button startIcon={<CalendarMonthIcon />} className="styledButton">
            לוח שנה
          </Button>
        </NavLink>
        <NavLink to="/users" className="navLink">
          <Button startIcon={<PersonIcon />} className="styledButton">
            משתמשים
          </Button>
        </NavLink>
      </Stack>
    </Stack>
  );
};

export default Header;



