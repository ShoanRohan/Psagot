import React, { useState } from "react";
import { Box, TextField, Button, Select, MenuItem, Checkbox, ListItemText, InputLabel, FormControl } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { useDispatch } from "react-redux";
import { filterRooms } from "../features/room/roomSlice";
import TempRoomsList from "./TempRoomsList";

const RoomsSearchBar = () => {
  const [roomName, setRoomName] = useState("");
  const [equipment, setEquipment] = useState([]);
  const [capacity, setCapacity] = useState();
  const [find, setFind] = useState(true);
  const [capacityError, setCapacityError] = useState("");

  const dispatch = useDispatch();

  const validate = () => {
    let isValid = true;
    if (capacity && (isNaN(capacity) || capacity <= 0)) {
      setCapacityError("מספר המקומות חייב להיות מספר חיובי");
      isValid = false;
    } else {
      setCapacityError("");
    }
    return isValid;
  };
  const handleReset = () => {
    setRoomName("");
    setCapacity("");
    setEquipment([]);
    setFind(true);
    dispatch({ type: "room/resetFilter" }); // פעולה להבאת כל החדרים
  };

  return (
    <Box className="box">
      <TextField
        placeholder="שם חדר"
        variant="outlined"
        size="small"
        className="textField"
        value={roomName}
        onChange={(e) => { setRoomName(e.target.value); setFind(false) }}
      />
      <FormControl size="small" className="textField">
        <InputLabel id="equipment-label">ציוד</InputLabel>
        <Select
          labelId="equipment-label"
          multiple
          value={equipment}
          onChange={(e) => { setEquipment(e.target.value); setFind(false); }}
          renderValue={(selected) => selected.join(', ')}
        >
          {["מקרן", "רמקולים", "מחשבים"].map((item) => (
            <MenuItem key={item} value={item}>
              <Checkbox checked={equipment.indexOf(item) > -1} />
              <ListItemText primary={item} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        placeholder="מספר מקומות"
        variant="outlined"
        size="small"
        type="number"
        className="textField"
        value={capacity}
        onChange={(e) => { setCapacity(e.target.value); setFind(false); }}
        error={!!capacityError}
        helperText={capacityError}
      />
      <Button
        variant="contained"
        color="primary"
        startIcon={<SearchIcon />}
        disabled={find}
        onClick={() => {
          if (!validate()) return;
          const projector = equipment.includes("מקרן");
          const speakers = equipment.includes("רמקולים");
          const computers = equipment.includes("מחשבים");
          dispatch(filterRooms({
            roomName,
            capacity,
            projector,
            speakers,
            computers,
          }));
        }}
      >
        חיפוש
      </Button>
      <Button
        variant="outlined"
        color="primary"
        startIcon={<RestartAltIcon />}
        onClick={handleReset}
      >
        ניקוי
      </Button>
    </Box>
  );
}

export default RoomsSearchBar