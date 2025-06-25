import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllRooms } from "../features/room/roomActions";
import { Typography, Box, Paper } from "@mui/material";

const getRoomEquipment = (room) => {
  const equipment = [];
  if (room.projector) equipment.push("מקרן");
  if (room.computers) equipment.push("מחשבים");
  if (room.speakers) equipment.push("רמקולים");
  return equipment;
};

const TempRoomsList = () => {
  const dispatch = useDispatch();
  const { rooms, filteredRooms, status, error } = useSelector((state) => state.room);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchAllRooms());
    }
  }, [status, dispatch]);

  // קובע אם בוצע סינון כלשהו
  const isFiltering = filteredRooms !== null && filteredRooms !== undefined;
  const displayRooms = isFiltering ? filteredRooms : rooms;

  if (status === 'loading') return <Typography>טוען חדרים...</Typography>;
  if (status === 'failed') return <Typography>שגיאה: {error}</Typography>;
  if (!displayRooms.length) return <Typography>לא נמצאו חדרים מתאימים.</Typography>;

  return (
    <Box mt={2}>
      {displayRooms.map((room, i) => (
        <Paper key={room.id} style={{ margin: "10px 0", padding: 10 }}>
          <Typography variant="h6">{room.name}</Typography>
          <Typography>ציוד: {getRoomEquipment(room).join(", ")}</Typography>
          <Typography>מספר מקומות: {room.capacity}</Typography>
        </Paper>
      ))}
    </Box>
  );
};

export default TempRoomsList;
