import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchRoom, clearSearchRoom } from '../features/room/roomSlice';
import { fetchAllRoomsBySearchWithPagination } from '../features/room/roomActions';

const equipmentOptions = ['מקרן', 'רמקול', 'מחשב'];

const RoomsSearch = () => {
  const [roomName, setRoomName] = useState('');
  const [selectedEquipment, setSelectedEquipment] = useState([]);
  const [numSeats, setNumSeats] = useState('');
  const dispatch = useDispatch();
  const searchStatus = useSelector((state) => state.room.searchStatus);

  const handleClear = () => {
    setRoomName('');
    setSelectedEquipment([]);
    setNumSeats('');
    dispatch(clearSearchRoom());
    dispatch(
      fetchAllRoomsBySearchWithPagination({
        pageNumber: 1,
        pageSize: 10,
        roomName: '',
        mic: false,
        projector: false,
        computer: false,
        numOfSeats: 0,
      })
    );
  };

  const handleSearch = () => {
    const searchParams = {
      RoomName: roomName,
      Mic: selectedEquipment.includes('רמקול'),
      Projector: selectedEquipment.includes('מקרן'),
      Computer: selectedEquipment.includes('מחשב'),
      NumOfSeats: parseInt(numSeats) || 0,
      PageNumber: 1,
      PageSize: 10,
    };

    dispatch(setSearchRoom(searchParams));
    dispatch(
      fetchAllRoomsBySearchWithPagination({
        pageNumber: 1,
        pageSize: 10,
        ...searchParams,
      })
    );
  };

  const handleEquipmentChange = (event) => {
    const { value } = event.target;
    setSelectedEquipment(value);
  };

  const handleNumSeatsChange = (event) => {
    const value = event.target.value;
    if (value === '' || (Number(value) >= 0 && Number.isInteger(Number(value)))) {
      setNumSeats(value);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        bgcolor: 'white',
        p: 2,
        borderRadius: '12px',
        boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.1)',
        maxWidth: '85%',
        margin: '20px auto',
        direction: 'rtl',
        height: '72px',
        gap: 2,
      }}
    >
      <TextField
        label="שם חדר"
        variant="standard"
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
        sx={{
          minWidth: '160px',
          '& .MuiInputLabel-root': {
            right: 0,
            textAlign: 'right',
            direction: 'rtl',
          },
          '& input': {
            textAlign: 'right',
            direction: 'rtl',
            fontSize: '15px',
          },
        }}
      />

      <FormControl
        variant="standard"
        sx={{
          minWidth: '160px',
          direction: 'rtl',
          textAlign: 'right',
        }}
      >
        <InputLabel
          sx={{ textAlign: 'right', direction: 'rtl', right: 0, transformOrigin: 'right' }}
        >
          ציוד
        </InputLabel>
        <Select
          multiple
          value={selectedEquipment}
          onChange={handleEquipmentChange}
          renderValue={(selected) =>
            selected.length > 2 ? `${selected.slice(0, 2).join(', ')}...` : selected.join(', ')
          }
          sx={{
            textAlign: 'right',
            direction: 'rtl',
            '& .MuiSelect-icon': {
              left: 0,
              right: 'unset',
            },
          }}
          MenuProps={{ PaperProps: { sx: { textAlign: 'right', direction: 'rtl' } } }}
        >
          {equipmentOptions.map((option) => (
            <MenuItem key={option} value={option}>
              <Checkbox checked={selectedEquipment.indexOf(option) > -1} />
              <ListItemText primary={option} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        label="מספר המקומות"
        type="number"
        variant="standard"
        value={numSeats}
        onChange={handleNumSeatsChange}
        sx={{
          minWidth: '140px',
          '& input': {
            textAlign: 'right',
            direction: 'rtl',
          },
          '& .MuiInputLabel-root': {
            right: 0,
            textAlign: 'right',
            direction: 'rtl',
          },
        }}
        inputProps={{ min: 0 }}
      />

      <Box sx={{ display: 'flex', gap: 1, marginRight: 'auto' }}>
        {searchStatus === 'true' && (
          <Button
            variant="outlined"
            sx={{ borderRadius: '20px', px: 3, height: '36px' }}
            onClick={handleClear}
          >
            ניקוי
          </Button>
        )}
        <Button
          variant="contained"
          onClick={handleSearch}
          sx={{
            bgcolor: '#2962ff',
            color: 'white',
            borderRadius: '20px',
            px: 3,
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            boxShadow: 'none',
          }}
        >
          <SearchIcon sx={{ mr: 1 }} /> חיפוש
        </Button>
      </Box>
    </Box>
  );
};

export default RoomsSearch;
