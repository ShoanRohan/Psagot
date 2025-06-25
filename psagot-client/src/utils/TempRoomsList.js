import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllRooms } from "../features/room/roomActions";
import { Typography, Box, Paper, Button } from "@mui/material";
import RoomForm from "../pages/RoomForm"; // ודא שהנתיב נכון

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
  const { user } = useSelector((state) => state.auth); // נניח שיש שם תפקיד

  const [editRoom, setEditRoom] = useState(null);
  const [formOpen, setFormOpen] = useState(false);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchAllRooms());
    }
  }, [status, dispatch]);

  const isFiltering = filteredRooms !== null && filteredRooms !== undefined;
  const displayRooms = isFiltering ? filteredRooms : rooms;

  const handleEditClick = (room) => {
    setEditRoom(room);
    setFormOpen(true);
  };

  const handleSave = (updatedRoom) => {
    console.log("נשמר:", updatedRoom);
    setFormOpen(false);
    setEditRoom(null);
    // כאן תוכל לקרוא ל־dispatch לעדכון ה־room אם נדרש
  };

  if (status === 'loading') return <Typography>טוען חדרים...</Typography>;
  if (status === 'failed') return <Typography>שגיאה: {error}</Typography>;
  if (!displayRooms.length) return <Typography>לא נמצאו חדרים מתאימים.</Typography>;

  return (
    <Box mt={2}>
      {displayRooms.map((room) => (
        <Paper key={room.id} style={{ margin: "10px 0", padding: 10 }}>
          <Typography variant="h6">{room.name}</Typography>
          <Typography>ציוד: {getRoomEquipment(room).join(", ")}</Typography>
          <Typography>מספר מקומות: {room.capacity}</Typography>

          {(user.role === "מנהלת" || user.role === "מזכירה") && (
            <Button
              variant="outlined"
              color="primary"
              size="small"
              onClick={() => handleEditClick(room)}
              sx={{ mt: 1 }}
            >
              ערוך חדר
            </Button>
          )}
        </Paper>
      ))}

      {formOpen && (
        <RoomForm
          isEdit={true}
          initialData={editRoom}
          onSave={handleSave}
          open={formOpen}
          onClose={() => setFormOpen(false)}
        />
      )}
    </Box>
  );
};

export default TempRoomsList;
