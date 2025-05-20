import React, { useState } from 'react';
import { Typography, Button, Container } from '@mui/material';
import RoomForm from '../pages/RoomForm'; // ודא שהנתיב נכון

const HomePage = () => {
  const [showForm, setShowForm] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState({});

  const handleAddRoomClick = () => {
    setIsEdit(false);
    setSelectedRoom({});
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

      <Button
        variant="contained"
        color="primary"
        onClick={handleAddRoomClick}
        sx={{ mt: 3 }}
      >
        הוסף חדר
      </Button>

      <RoomForm
        isEdit={isEdit}
        initialData={selectedRoom}
        onSave={handleRoomSubmit}
        open={showForm}
        onClose={() => setShowForm(false)}
      />
    </Container>
  );
};

export default HomePage;







