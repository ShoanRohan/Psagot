import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllRooms } from "../features/room/roomActions";
import { Typography, Box, Paper, Button } from "@mui/material";

// עוזר להמיר שדות ציוד
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

  const [pageIndex, setPageIndex] = useState(0);
  const pageSize = 2;

  // טען חדרים מהשרת בהתחלה
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchAllRooms());
    }
  }, [status, dispatch]);

  // תוצאות להצגה – או סינון או כל החדרים
  const activeRooms = filteredRooms ?? rooms;

  // אפס עמוד כל פעם שהתוצאות משתנות
  useEffect(() => {
    setPageIndex(0);
  }, [activeRooms]);

  const totalPages = Math.ceil(activeRooms.length / pageSize);
  const start = pageIndex * pageSize;
  const end = start + pageSize;
  const displayRooms = activeRooms.slice(start, end);

  // מצבי טעינה / שגיאה
  if (status === "loading") return <Typography>טוען חדרים...</Typography>;
  if (status === "failed") return <Typography>שגיאה: {error}</Typography>;

  return (
    <Box mt={2}>
      {displayRooms.length === 0 ? (
        <Typography>לא נמצאו חדרים מתאימים.</Typography>
      ) : (
        displayRooms.map((room) => (
          <Paper key={room.id} style={{ margin: "10px 0", padding: 10 }}>
            <Typography variant="h6">{room.name}</Typography>
            <Typography>ציוד: {getRoomEquipment(room).join(", ")}</Typography>
            <Typography>מספר מקומות: {room.capacity}</Typography>
          </Paper>
        ))
      )}

      {/* כפתורי פגינציה */}
      {totalPages > 1 && (
        <Box
          mt={3}
          display="flex"
          justifyContent="center"
          alignItems="center"
          gap={2}
          style={{ backgroundColor: "#f4f4f4", padding: "12px", borderRadius: "8px" }}
        >
          <Button
            variant="outlined"
            disabled={pageIndex === 0}
            onClick={() => setPageIndex((prev) => prev - 1)}
          >
            הקודם
          </Button>
          <Typography>
            עמוד {pageIndex + 1} מתוך {totalPages}
          </Typography>
          <Button
            variant="outlined"
            disabled={pageIndex >= totalPages - 1}
            onClick={() => setPageIndex((prev) => prev + 1)}
          >
            הבא
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default TempRoomsList;
