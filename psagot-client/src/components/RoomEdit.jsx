//19.5.25

import React, { useState } from 'react';
import { Button, Stack, Box, Snackbar, Alert } from '@mui/material';
import RoomDetails from './RoomDetails';
import { addRoom } from '../utils/roomUtil';

function RoomEdit() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [capacity, setCapacity] = useState('');
  const [equipment, setEquipment] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleSave = async () => {
    const room = {
      name,
      number,
      capacity,
      equipment,
    };

    try {
      await addRoom(room);
      setMessage('החדר נשמר בהצלחה!');
      setError(false);
    } catch (err) {
      console.error(err);
      setMessage('אירעה שגיאה בעת שמירת החדר');
      setError(true);
    } finally {
      setOpenSnackbar(true);
    }
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

      <RoomDetails
        name={name}
        setName={setName}
        number={number}
        setNumber={setNumber}
        capacity={capacity}
        setCapacity={setCapacity}
        equipment={equipment}
        setEquipment={setEquipment}
      />

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
        <Alert severity={error ? "error" : "success"} onClose={() => setOpenSnackbar(false)}>
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default RoomEdit;




// import React from 'react';
// import Button from '@mui/material/Button';
// import Stack from '@mui/material/Stack';
// import { Box } from '@mui/material';
// import RoomDetails from './RoomDetails';

// function RoomEdit() {
//   return (
//     <Box >

//     <Stack direction="row" spacing={2} sx={{ justifyContent: 'flex-start', mb: 2 }}> 
//       <Button variant="contained" sx={{ borderRadius: '25px', px: 4, bgcolor: '#1976d2' }}>
//         שמור
//       </Button>
//       <Button variant="outlined" sx={{ borderRadius: '25px', px: 4, color: '#1976d2', borderColor: '#1976d2' }}>
//         ביטול
//       </Button>
//     </Stack>
//   <RoomDetails/>

//     </Box>
//   );
// }

// export default RoomEdit ;