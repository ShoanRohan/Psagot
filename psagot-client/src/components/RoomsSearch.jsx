import React, { useState } from 'react';
import { Box, TextField, Button, FormControl, InputLabel, Select, MenuItem, Checkbox, ListItemText } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const equipmentOptions = ["מקרן", "רמקול", "לוח", "מחשב"];

const RoomsSearch = () => {
  const [roomName, setRoomName] = useState('');
  const [selectedEquipment, setSelectedEquipment] = useState([]);
  const [numSeats, setNumSeats] = useState('');

  // פונקציה לניקוי כל השדות
  const handleClear = () => {
    setRoomName('');
    setSelectedEquipment([]);
    setNumSeats('');
  };

  // שינוי ערך הציוד שנבחר
  const handleEquipmentChange = (event) => {
    const { value } = event.target;
    setSelectedEquipment(value);
  };

  // מוודא שמספר המקומות לא יהיה קטן מ-0
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
        justifyContent: 'space-between', 
        bgcolor: 'white', 
        p: 2, 
        borderRadius: 2, 
        boxShadow: 1,
        maxWidth: '80%',
        margin: 'auto',
        direction: 'rtl' // יישור לימין
      }}
    >
      {/* שדות הקלט */}
      <Box sx={{ display: 'flex', gap: 2, flexGrow: 1, justifyContent: 'flex-start' }}>
        <TextField 
          label="שם חדר" 
          variant="standard" 
          sx={{ minWidth: '150px', textAlign: "right" }} 
          inputProps={{ style: { textAlign: "right", direction: "rtl" } }} 
          InputLabelProps={{ sx: { right: 0, textAlign: "right", direction: "rtl" } }} 
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
        />

        {/* רכיב ציוד עם אפשרות לסמן מספר פריטים */}
        <FormControl 
          variant="standard" 
          sx={{ minWidth: '150px', direction: "rtl", textAlign: "right" }} 
        >
          <InputLabel 
            sx={{ textAlign: "right", direction: "rtl", right: 0, transformOrigin: "right" }}
          >
            ציוד
          </InputLabel>
          <Select
            multiple
            value={selectedEquipment}
            onChange={handleEquipmentChange}
            renderValue={(selected) => 
              selected.length > 2 ? `${selected.slice(0, 2).join(", ")}...` : selected.join(", ")
            } // מקצר את הטקסט אם נבחרו מעל 2 פריטים
            sx={{
              textAlign: "right",
              direction: "rtl",
              display: "flex",
              justifyContent: "flex-end",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              '& .MuiSelect-icon': {
                left: 0, // ממקם את החץ בצד שמאל
                right: 'unset',
              }
            }}
            MenuProps={{ PaperProps: { sx: { textAlign: "right", direction: "rtl" } } }} 
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
          sx={{ minWidth: '150px', textAlign: "right" }} 
          inputProps={{ style: { textAlign: "right", direction: "rtl" }, min: 0 }} 
          InputLabelProps={{ sx: { right: 0, textAlign: "right", direction: "rtl" } }} 
          value={numSeats}
          onChange={handleNumSeatsChange} // הפעלת הפונקציה שבודקת שאין מספרים שליליים
        />
      </Box>

      {/* כפתורים */}
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button 
          variant="outlined" 
          sx={{ borderRadius: '20px', px: 3 }}
          onClick={handleClear}
        >
          ניקוי חיפוש
        </Button>

        <Button 
          variant="contained" 
          sx={{ bgcolor: 'navy', color: 'white', borderRadius: '20px', px: 3, display: 'flex', alignItems: 'center', gap: 1 }}
        >
          <SearchIcon sx={{ mr: 1 }} /> חיפוש
        </Button>
      </Box>
    </Box>
  );
};

export default RoomsSearch;
