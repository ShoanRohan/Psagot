

import React, { useState } from "react";
import { TextField, MenuItem, Typography, Box } from "@mui/material";
import "./RoomDetails.css"; 

const RoomDetails = () => {
  const [equipment, setEquipment] = useState([]);

  const handleEquipmentChange = (event) => {
    setEquipment(event.target.value);
  };

  return (
    <Box className="page-container">
      <Box className="room-details-container">
        <Typography className="room-details-title">פרטים טכניים</Typography>

        <Box className="room-details-form">
          <TextField label="שם חדר" variant="standard" className="text-field" InputProps={{ className: "text-input" }} />
          <TextField label="מספר חדר" variant="standard" type="number" className="text-field" InputProps={{ className: "text-input" }} />
          <TextField label="מספר מקומות" variant="standard" type="number" className="text-field" InputProps={{ className: "text-input" }} />
          
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
            <MenuItem value="מקרן">מקרן</MenuItem>
            <MenuItem value="לוח">לוח</MenuItem>
            <MenuItem value="מחשב">מחשב</MenuItem>
          </TextField>
        </Box>
      </Box>
    </Box>
  );
};

export default RoomDetails;