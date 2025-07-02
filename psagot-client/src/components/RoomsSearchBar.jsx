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
import { useDispatch } from "react-redux";
import {
  filterRooms,
  resetFilter,
  updateFilteredRooms,
} from "../features/room/roomSlice";
import "../styles/RoomsSearchBar.css";

const myEequipment = ["מקרן", "רמקולים", "מחשבים"];
const RoomsSearchBar = () => {
  const roomSearchEmpty = {
    roomName: "",
    equipment: [],
    capacity: "",
  };
  const [capacityError, setCapacityError] = useState("");
  const [roomSearch, setRoomSearch] = useState(roomSearchEmpty);

  const dispatch = useDispatch();
  const validate = () => {
    const isValid =
      !roomSearch?.capacity ||
      (!isNaN(roomSearch?.capacity) && roomSearch?.capacity > 0);
    setCapacityError(isValid ? "" : "חייב להיות מספר חיובי");
    return isValid;
  };
  const clean = () => {
    setRoomSearch(roomSearchEmpty); // תאפס את השדות בטופס
    setCapacityError(""); // תאפס שגיאות
    dispatch(resetFilter());
  };

  const handleChangeRoomSearch = (e) => {
    let { name, value } = e.target;
    if (name === "equipment") {
    setRoomSearch({ ...roomSearch, equipment: value });
    return;
  }
     if (name === "capacity") {
    if (value === "") {
      setCapacityError("");
    } else if (Number(value) <= 0) {
      setCapacityError("חייב להיות מספר חיובי");
    } else {
      setCapacityError("");
    }
  }
    setRoomSearch({ ...roomSearch, [name]: value });
  };
  const findRooms = () => {
    const projector = roomSearch.equipment.includes("מקרן");
    const speakers = roomSearch.equipment.includes("רמקולים");
    const computers = roomSearch.equipment.includes("מחשבים");
    dispatch(
      filterRooms({
      ...roomSearch,
      projector,
      speakers,
      computers,
        isNewSearch: true,
      })
    );
    dispatch(updateFilteredRooms());
  };
  return (
      <Box className="rooms-search-bar">
      <div className="search-fields">
        <TextField
          label="שם חדר"
          variant="outlined"
          size="small"
          className="textField"
          name="roomName"
          value={roomSearch?.roomName}
          onChange={handleChangeRoomSearch}
        />
        <FormControl size="small" className="textField equipment-select">
          <InputLabel id="equipment-label">ציוד</InputLabel>
          <Select
            labelId="equipment-label"
            multiple
            name="equipment"
            value={roomSearch?.equipment}
            onChange={handleChangeRoomSearch}
            renderValue={(selected) =>
              selected.length ? selected.join(", ") : ""
            }
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
          label="מספר מקומות"
          variant="outlined"
          size="small"
          type="number"
          className="textField"
          name="capacity"
          value={roomSearch?.capacity}
          onChange={handleChangeRoomSearch}
          error={!!capacityError}
          helperText={capacityError || " "}
        />
      </div>
      <div className="search-buttons">
        {(roomSearch.roomName ||
          roomSearch.capacity ||
          roomSearch.equipment.length > 0) && (
          <Button
            variant="outlined"
            color="primary"
            onClick={clean}
            className="clear-button"
          >
            ניקוי
          </Button>
 
       )}
        <Button
          variant="contained"
          color="primary"
          startIcon={<SearchIcon />}
          disabled={
            !roomSearch?.capacity?.length &&
            !roomSearch?.roomName?.length &&
            !roomSearch?.equipment?.length
          }
          onClick={findRooms}
          className="search-button"
        >
          <span className="search-button-text">חיפוש</span>
        </Button>
      </div>
      </Box>
  );
};
export default RoomsSearchBar;