//19.5.25
import React, { useEffect, useState } from 'react';
import { Button, Stack, Box, Snackbar, Alert, TextField, MenuItem, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addRoomAction } from '../features/room/roomActions';
import "./RoomDetails.css";

function RoomEdit() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [capacity, setCapacity] = useState('');
  const [equipment, setEquipment] = useState([]); // שונה ממבנה אובייקט למערך
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const { selectedRoom } = useSelector(state => state.room);
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedRoom && selectedRoom.roomId) {
      setNumber(selectedRoom.roomId);
      setCapacity(selectedRoom.capacity);
      setName(selectedRoom.name);

      // המרה מאובייקט למערך
      const selectedEquipment = [];
      if (selectedRoom.projector) selectedEquipment.push("projector");
      if (selectedRoom.computer) selectedEquipment.push("computer");
      if (selectedRoom.speaker) selectedEquipment.push("speaker");
      setEquipment(selectedEquipment);
    }
  }, [selectedRoom]);

  const handleEquipmentChange = (event) => {
    const { value } = event.target;
    setEquipment(value);
  };

  const handleSave = () => {
    const room = {
      roomId: number,
      name,
      capacity,
      projector: equipment.includes("projector"),
      computer: equipment.includes("computer"),
      speaker: equipment.includes("speaker"),
    };

    dispatch(addRoomAction(room));
    setMessage("החדר נשמר בהצלחה!");
    setError(false);
    setOpenSnackbar(true);
  };

  return (
    <Box>
      <Stack direction="row" spacing={2} sx={{ justifyContent: 'flex-start', mb: 2 }}>
        <Button
          variant="contained"
          sx={{ borderRadius: '25px', px: 4, bgcolor: '#1976d2' }}
          onClick={handleSave}
        >
          שמור
        </Button>
        <Button
          variant="outlined"
          sx={{ borderRadius: '25px', px: 4, color: '#1976d2', borderColor: '#1976d2' }}
        >
          ביטול
        </Button>
      </Stack>

      <Box className="page-container">
        <Box className="room-details-container">
          <Typography className="room-details-title">פרטים טכניים</Typography>

          <Box className="room-details-form">
            <TextField
              label="שם חדר"
              variant="standard"
              className="text-field"
              value={name}
              onChange={(e) => setName(e.target.value)}
              InputProps={{ className: "text-input" }}
            />
            <TextField
              label="מספר חדר"
              variant="standard"
              type="number"
              className="text-field"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              InputProps={{ className: "text-input" }}
            />
            <TextField
              label="מספר מקומות"
              variant="standard"
              type="number"
              className="text-field"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              InputProps={{ className: "text-input" }}
            />
            <TextField
              select
              label="ציוד"
              variant="standard"
              className="text-field"
              SelectProps={{ multiple: true }}
              value={equipment}
              onChange={handleEquipmentChange}
              InputProps={{ className: "text-input" }}
            >
              <MenuItem value="projector">מקרן</MenuItem>
              <MenuItem value="computer">מחשב</MenuItem>
              <MenuItem value="speaker">רמקול</MenuItem>
            </TextField>
          </Box>
        </Box>
      </Box>

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
        <Alert severity={error ? "error" : "success"} onClose={() => setOpenSnackbar(false)}>
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default RoomEdit;
