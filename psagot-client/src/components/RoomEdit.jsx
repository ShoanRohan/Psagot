import React, { useEffect, useState } from 'react';
import { Button, Stack, Box, Snackbar, Alert, TextField, MenuItem, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addRoomAction, updateRoomAction } from '../features/room/roomActions';
import './RoomDetails.css';
import { setSelectedRoom } from '../features/room/roomSlice';
import { useNavigate } from 'react-router-dom';

function RoomEdit() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [capacity, setCapacity] = useState('');
  const [equipment, setEquipment] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const { selectedRoom } = useSelector((state) => state.room);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedRoom && selectedRoom.roomId) {
      setNumber(selectedRoom.roomId);
      setCapacity(selectedRoom.capacity);
      setName(selectedRoom.name);

      const selectedEquipment = [];
      if (selectedRoom.projector) selectedEquipment.push('projector');
      if (selectedRoom.computer) selectedEquipment.push('computer');
      if (selectedRoom.speaker) selectedEquipment.push('speaker');
      setEquipment(selectedEquipment);
    }
  }, [selectedRoom]);

  const validateField = (field, value) => {
    switch (field) {
      case 'name':
        return value.trim() ? '' : 'יש להזין שם חדר';
      case 'capacity':
        return !value || Number(value) <= 0 ? 'יש להזין מספר מקומות חוקי' : '';
      case 'equipment':
        return value.length === 0 ? 'יש לבחור לפחות פריט אחד' : '';
      default:
        return '';
    }
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    setFormErrors((prev) => ({ ...prev, name: validateField('name', value) }));
  };

  const handleCapacityChange = (e) => {
    const value = e.target.value;
    setCapacity(value);
    setFormErrors((prev) => ({ ...prev, capacity: validateField('capacity', value) }));
  };

  const handleEquipmentChange = (e) => {
    const value = e.target.value;
    setEquipment(value);
    setFormErrors((prev) => ({ ...prev, equipment: validateField('equipment', value) }));
  };

  const handleSave = async () => {
    const errors = {
      name: validateField('name', name),
      capacity: validateField('capacity', capacity),
      equipment: validateField('equipment', equipment),
    };

    setFormErrors(errors);

    if (Object.values(errors).some((msg) => msg)) {
      setMessage('אנא תקן את השגיאות בטופס');
      setError(true);
      setOpenSnackbar(true);
      return;
    }

    let room = {
      name,
      capacity: Number(capacity),
      projector: equipment.includes('projector'),
      computer: equipment.includes('computer'),
      speaker: equipment.includes('speaker'),
    };

    if (selectedRoom) {
      room.roomId = number;
    }

    const action = selectedRoom ? updateRoomAction : addRoomAction;

    try {
      await dispatch(action(room)).unwrap();
      setMessage(selectedRoom ? 'החדר עודכן בהצלחה' : 'החדר נוסף בהצלחה');
      setError(false);
      setOpenSnackbar(true);
      dispatch(setSelectedRoom(null));
      navigate('/rooms');
    } catch (err) {
      setMessage('אירעה שגיאה, נסה שנית');
      setError(true);
      setOpenSnackbar(true);
    }
  };

  const handleCancel = () => {
    dispatch(setSelectedRoom(null));
    navigate('/rooms');
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
          onClick={handleCancel}
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
              onChange={handleNameChange}
              error={!!formErrors.name}
              helperText={formErrors.name}
              InputProps={{ className: 'text-input' }}
            />

            <TextField
              label="מספר חדר"
              variant="standard"
              type="number"
              className="text-field"
              value={number}
              disabled
              InputProps={{ className: 'text-input' }}
            />

            <TextField
              label="מספר מקומות"
              variant="standard"
              type="number"
              className="text-field"
              value={capacity}
              onChange={handleCapacityChange}
              error={!!formErrors.capacity}
              helperText={formErrors.capacity}
              InputProps={{ className: 'text-input' }}
            />

            <TextField
              select
              label="ציוד"
              variant="standard"
              className="text-field"
              SelectProps={{ multiple: true }}
              value={equipment}
              onChange={handleEquipmentChange}
              error={!!formErrors.equipment}
              helperText={formErrors.equipment}
              InputProps={{ className: 'text-input' }}
            >
              <MenuItem value="projector">מקרן</MenuItem>
              <MenuItem value="computer">מחשב</MenuItem>
              <MenuItem value="speaker">רמקול</MenuItem>
            </TextField>
          </Box>
        </Box>
      </Box>

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
        <Alert severity={error ? 'error' : 'success'} onClose={() => setOpenSnackbar(false)}>
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default RoomEdit;
