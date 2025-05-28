import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setViewMode } from '../features/room/roomSlice';
import { fetchAllRooms, fetchRoomsScheduleByDate } from '../features/room/roomActions';
import RoomsScheduleSearch from '../components/RoomsScheduleSearch';
import RoomSchedule from '../components/RoomsScheduleGrid';
import { Box, Button } from '@mui/material';

const RoomsPage = () => {
  const dispatch = useDispatch();
  const viewMode = useSelector((state) => state.room.viewMode);

  const toggleView = () => {
    dispatch(setViewMode(viewMode === 'rooms' ? 'schedule' : 'rooms'));
  };

  const handleAddRoom = () => {
    alert("הוספת חדר - פעולה לא מוגדרת עדיין");
  };

  return (
    <Box>
      {/* Header with buttons */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
          mt: 4,
        }}
      >
        <h2 style={{ margin: 0 }}>חדרים</h2>

        <Box sx={{ display: 'flex', gap: 2 }}>
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

      {/* Search bar for schedule mode */}
      {viewMode === 'schedule' && (
        <Box sx={{ mb: 2 }}>
          <RoomsScheduleSearch />
        </Box>
      )}

      {/* Main content container */}
      <Box sx={{ position: 'relative', minHeight: '400px' }}>
        {/* Room List */}
        <Box
          sx={{
            display: viewMode === 'rooms' ? 'block' : 'none',
            transition: 'all 0.3s ease',
          }}
        >
          {/* תצוגת רשימה (כשתרצה להוסיף את הרכיבים הרלוונטיים) */}
        </Box>

        {/* Schedule View */}
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
