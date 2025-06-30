import React, { useEffect } from "react";
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
  const {
    rooms,
    filteredRooms,
    status,
    error,
    pageIndex,
    pageSize,
    isSearchActive,
  } = useSelector((state) => state.room);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchAllRooms());
    }
  }, [status, dispatch]);

  const activeRooms = filteredRooms ?? rooms;
  const totalPages = Math.ceil(activeRooms.length / pageSize);
  const start = pageIndex * pageSize;
  const end = start + pageSize;
  const displayRooms = activeRooms.slice(start, end);

  if (status === "loading") return <Typography>טוען חדרים...</Typography>;
  if (status === "failed") return <Typography>שגיאה: {error}</Typography>;

  return (
    <Box mt={2}>
      {displayRooms.length === 0 ? (
        <Typography>
          {isSearchActive ? "לא נמצאו חדרים מתאימים." : "אין חדרים להצגה."}
        </Typography>
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
            onClick={() =>
              dispatch({
                type: "room/filterRooms",
                payload: {
                  ...filteredRooms?.filters,
                  pageIndex: pageIndex - 1,
                  pageSize,
                },
              })
            }
          >
            הקודם
          </Button>
          <Typography>
            עמוד {pageIndex + 1} מתוך {totalPages}
          </Typography>
          <Button
            variant="outlined"
            disabled={pageIndex >= totalPages - 1}
            onClick={() =>
              dispatch({
                type: "room/filterRooms",
                payload: {
                  ...filteredRooms?.filters,
                  pageIndex: pageIndex + 1,
                  pageSize,
                },
              })
            }
          >
            הבא
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default TempRoomsList;
