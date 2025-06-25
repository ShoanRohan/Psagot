import React, { useState } from 'react';
import { Typography, Button, Container, Stack } from '@mui/material';
import RoomForm from '../pages/RoomForm'; // ודא שהנתיב נכון

const HomePage = () => {
  const [showForm, setShowForm] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [userRole] = useState('manager'); // כאן אתה מגדיר את תפקיד המשתמש

  const handleAddRoomClick = () => {
    setIsEdit(false);
    setSelectedRoom({});
    setShowForm(true);
  };

  const handleEditRoomClick = () => {
    setIsEdit(true);
    setSelectedRoom({
      roomId: 1,
      name: '106',
      projector: true,
      computers: false,
      speakers: true,
      capacity: 30, // שים לב לתיקון: copacity => capacity
    });
    setShowForm(true);
  };

  const handleRoomSubmit = (roomData) => {
     console.log(isEdit ? 'Room edited:' : 'Room submitted:', roomData);
    setShowForm(false);
  };

  return (
    <Container style={{ textAlign: 'center', padding: 20 }}>
      <Typography variant="h5" gutterBottom>
        ברוכים הבאים למערכת פסגות
      </Typography>

      <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 3 }}>
        <Button variant="contained" color="primary" onClick={handleAddRoomClick}>
          הוסף חדר
        </Button>

        <Button variant="outlined" color="secondary" onClick={handleEditRoomClick}>
          ערוך חדר
        </Button>
      </Stack>

      <RoomForm
        isEdit={isEdit}
        initialData={selectedRoom}
        onSave={handleRoomSubmit}
        open={showForm}
        onClose={() =>{setShowForm(false); setSelectedRoom(null)} }
        userRole={userRole}
      />
    </Container>
  );
};

export default HomePage;








