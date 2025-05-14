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
  const roomSearchEmpty = {
    roomName: "",
    equipment: [],
    capacity: 0
  };
  const [capacityError, setCapacityError] = useState("");
  const [roomSearch, setRoomeSearch] = useState(roomSearchEmpty);

  const dispatch = useDispatch();
  const validate = () => {
    const isValid = !roomSearch?.capacity || (!isNaN(roomSearch?.capacity) && roomSearch?.capacity > 0);
    setCapacityError(isValid ? "" : "מספר המקומות חייב להיות מספר חיובי");
    return isValid;
  };
  const clean = () => {
    setRoomeSearch(roomSearchEmpty);
    dispatch(filterRooms({}));
  }
  const handleChangeRoomSearch = (e) => {
    let { name, value } = e.target;
    setRoomeSearch({ ...roomSearch, [name]: value });
  }
  const findRooms = () => {
    if (!validate()) return;
    const projector = roomSearch.equipment.includes("מקרן");
    const speakers = roomSearch.equipment.includes("רמקולים");
    const computers = roomSearch.equipment.includes("מחשבים");
    dispatch(filterRooms({
      ...roomSearch,
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
          name="roomName"
          value={roomSearch?.roomName}
          onChange={handleChangeRoomSearch}
        />
        <FormControl size="small" className="textField">
          <InputLabel id="equipment-label">ציוד</InputLabel>
          <Select
            labelId="equipment-label"
            multiple
            name="equipment"
            value={roomSearch?.equipment}
            onChange={handleChangeRoomSearch}
            renderValue={(selected) => selected.join(', ')}
          >
            {myEequipment.map((item) => (
              <MenuItem key={item} value={item}>
                <Checkbox checked={roomSearch?.equipment.indexOf(item) > -1} />
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
          name="capacity"
          value={roomSearch?.capacity}
          onChange={handleChangeRoomSearch}
          error={!!capacityError}
          helperText={capacityError}
        />
        <Button
          variant="contained"
          color="primary"
          startIcon={<SearchIcon />}
          disabled={!roomSearch?.capacity?.length && !roomSearch?.roomName?.length && !roomSearch?.equipment?.length}
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