import React, { useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

export default function SearchBar() {
  const [roomName, setRoomName] = useState("");
  const [equipment, setEquipment] = useState("");
  const [capacity, setCapacity] = useState("");
  
  return (
    <Box className="box">

      {/* שדה חיפוש */}
      <TextField
        placeholder="שם חדר"
        variant="outlined"
        size="small"
        className="textField"
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
      />

      <TextField
        placeholder="ציוד"
        variant="outlined"
        size="small"
        className="textField"
        value={equipment}
        onChange={(e) => setEquipment(e.target.value)}
      />

      <TextField
        placeholder="מספר מקומות"
        variant="outlined"
        size="small"
        type="number"
        className="textField"
        value={capacity}
        onChange={(e) => setCapacity(e.target.value)}
      />

       {/* כפתור חיפוש */}
       <Button variant="contained" color="primary" startIcon={<SearchIcon />}>
        חיפוש
      </Button>

      {/* כפתור איפוס */}
      <Button variant="outlined" color="primary" startIcon={<RestartAltIcon />}>
        ניקוי
      </Button>
    </Box>
  );
}
