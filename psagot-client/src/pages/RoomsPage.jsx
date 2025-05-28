import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setViewMode } from '../features/room/roomSlice';
import RoomsScheduleSearch from '../components/RoomsScheduleSearch';
import RoomSchedule from '../components/RoomsScheduleGrid';
import { Box, Button, Typography, IconButton, Tooltip } from '@mui/material';
import ExcelIcon from '../assets/icons/excelIcon.svg';

const RoomsPage = () => {
  const dispatch = useDispatch();
  const viewMode = useSelector((state) => state.room.viewMode);

  const toggleView = () => {
    dispatch(setViewMode(viewMode === 'rooms' ? 'schedule' : 'rooms'));
  };

  const handleAddRoom = () => {
    alert("הוספת חדר - פעולה לא מוגדרת עדיין");
  };

  const handleExportToExcel = () => {
    alert("ייצוא לאקסל - פעולה לא מוגדרת עדיין");
  };

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
          mt: 4,
          flexWrap: 'wrap',
          gap: 2,
        }}
      >
        <Typography
          sx={{
            fontSize: '2.2rem',
            color: '#0D47A1',
            fontWeight: 'bold',
            margin: 0,
          }}
        >
          חדרים
        </Typography>

        {/* פס חיפוש ממורכז */}
        {viewMode === 'schedule' && (
  <Box
    sx={{
      position: 'relative',
      right: '20px', // מזיז ימינה
      top: '-8px',   // מעלה מעט
      flex: 1,
      display: 'flex',
      justifyContent: 'center',
    }}
  >
    <RoomsScheduleSearch />
  </Box>
)}


        <Box
          sx={{
            display: 'flex',
            gap: 2,
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
        >
          <Tooltip title="ייצוא לאקסל">
            <IconButton onClick={handleExportToExcel}>
              <img src={ExcelIcon} alt="Excel" style={{ width: 32, height: 32 }} />
            </IconButton>
          </Tooltip>

          <Button
            variant="outlined"
            onClick={toggleView}
            sx={{
              borderRadius: '20px',
              borderColor: '#1976d2',
              color: '#1976d2',
              fontWeight: 'bold',
              px: 2,
            }}
          >
            {viewMode === 'rooms' ? 'תצוגת לו"ז ' : 'תצוגת רשימה'}
          </Button>

          <Button
            variant="contained"
            onClick={handleAddRoom}
            sx={{
              borderRadius: '20px',
              backgroundColor: '#1976d2',
              color: '#fff',
              fontWeight: 'bold',
              px: 2,
              '&:hover': {
                backgroundColor: '#115293',
              },
            }}
          >
            הוספת חדר
          </Button>
        </Box>
      </Box>

      <Box sx={{ position: 'relative', minHeight: '400px' }}>
        <Box
          sx={{
            display: viewMode === 'rooms' ? 'block' : 'none',
            transition: 'all 0.3s ease',
          }}
        >
          {/* תצוגת רשימה */}
        </Box>

        <Box
          sx={{
            display: viewMode === 'schedule' ? 'block' : 'none',
            transition: 'all 0.3s ease',
          }}
        >
          <RoomSchedule />
        </Box>
      </Box>
    </Box>
  );
};

export default RoomsPage;
