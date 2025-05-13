import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import SearchIcon from "@mui/icons-material/Search";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { useDispatch } from "react-redux";
import { filterRooms } from "../features/room/roomSlice";
import "../styles/RoomsSearchBar.css";

const myEequipment = ["מקרן", "רמקולים", "מחשבים"]

const RoomsSearchBar = () => {
  const [roomName, setRoomName] = useState("");
  const [equipment, setEquipment] = useState([]);
  const [capacity, setCapacity] = useState();
  const [capacityError, setCapacityError] = useState("");
  //האם מיותר?
  const [roomSearch, setRoomeSearch] = useState();
  const dispatch = useDispatch();
  const validate = () => {
    const isValid = !capacity || (!isNaN(capacity) && capacity > 0);
    setCapacityError(isValid ? "" : "מספר המקומות חייב להיות מספר חיובי");
    return isValid;
  };
  const clean = () => {
    setRoomName("");
    setCapacity("");
    setEquipment([]);
    dispatch(filterRooms({}));
  }
  const handleChangeRoomSearch = (e) => {
    let { name, value } = e.target;
    //האם מיותר?
    setRoomeSearch({ ...roomSearch, [name]: value });
    if (name === "roomName") setRoomName(value);
  }
  const findRooms = () => {
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
  }
  return (
      <Box className="rooms-search-bar">
        <TextField
          placeholder="שם חדר"
          variant="outlined"
          size="small"
          className="textField"
          value={roomName}
          name="roomName"
          onChange={handleChangeRoomSearch}
        />
        <FormControl size="small" className="textField">
          <InputLabel id="equipment-label">ציוד</InputLabel>
          <Select
            labelId="equipment-label"
            multiple
            value={equipment}
            name="equipment"
            onChange={(e) => { setEquipment(e.target.value); }}
            renderValue={(selected) => selected.join(', ')}
          >
            {myEequipment.map((item) => (
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
          onChange={(e) => { setCapacity(e.target.value); }}
          error={!!capacityError}
          helperText={capacityError}
        />
        <Button
          variant="contained"
          color="primary"
          startIcon={<SearchIcon />}
          disabled={!capacity?.length && !roomName?.length && !equipment?.length}
          onClick={() => findRooms()}
        >
          חיפוש
        </Button>
        <Button
          variant="outlined"
          color="primary"
          startIcon={<RestartAltIcon />}
          onClick={clean}
        >
          ניקוי
        </Button>
      </Box>
  );
};

export default RoomsSearchBar