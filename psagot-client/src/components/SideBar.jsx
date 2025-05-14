import React from 'react';
import { NavLink } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/BarChart';
import EventIcon from '@mui/icons-material/DeviceHub';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PersonIcon from '@mui/icons-material/Person';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import '../styles/SideBar.css';
import { useSelector } from 'react-redux';

const menuItems = [
  { path: "/", icon: <HomeIcon />, text: "מסך ראשי", exact: true },
  { path: "/courses", icon: <PeopleIcon />, text: "קורסים", exact: true },
  { path: "/meetings", icon: <EventIcon />, text: "מפגשים", exact: true },
  { path: "/rooms", icon: <MeetingRoomIcon />, text: "חדרים", exact: true },
  { path: "/calendar", icon: <CalendarMonthIcon />, text: "לוח שנה", exact: true },
  { path: "/users", icon: <PersonIcon />, text: "משתמשים", exact: true }
];

const SideBar = () => {
  const { selectedUser } = useSelector((state) => state.user);

  return (
    <Stack direction="column" spacing={0}>
      <Stack direction="column" spacing={0}>
        <img src="/assets/logo_psagot.png" alt="Logo" className="sidebar-logo" />
      </Stack>

      <Stack direction="column" spacing={1} className='navItems'>
        {menuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            end={item.exact}
            className="navLink"
          >
            <Button startIcon={item.icon} className="styledButton">
              {item.text}
            </Button>
          </NavLink>
        ))}
      </Stack>

      <Box className="user-profile-container">
        <Box className="user-info">
          <Typography className="user-name">
            {selectedUser?.name ?? "משתמש לא מחובר"}
          </Typography>
          <Typography className="user-role">
            {selectedUser?.userTypeName ?? "ללא תפקיד"}
          </Typography>
        </Box>
        <Avatar className="user-avatar">
          <AccountCircleIcon />
        </Avatar>
      </Box>
    </Stack>
  );
};

export default SideBar;
