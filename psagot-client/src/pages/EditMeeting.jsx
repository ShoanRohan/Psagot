/*
import React, { useState, useEffect } from "react";
import {
  Grid,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Typography,
  MenuItem,
  Box,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { fetchAllCourses } from '../features/course/courseActions';
import { fetchAllTopic } from '../features/topic/topicActions';
import { fetchAllRooms } from '../features/room/roomActions';
import {useDispatch, useSelector } from 'react-redux';


const EditMeeting = ({onSave, onCancel }) => {
  const [meeting, setMeeting] = useState({
    topicId: "",
    courseId: "",
    topicName: "",
    lecturerName: "",
    date: "",
    startTime: "",
    endTime: "",
    roomId: "",
    meetingNumber: "",
    status: "פעיל",
    isSystemPart: false,
  });

  const dispatch = useDispatch();
  const courses = useSelector(state => state.course.courses || []);
  const topics = useSelector(state => state.topic.topics || []);
  const rooms= useSelector(state => state.room.rooms || []);
  const [validationErrors, setValidationErrors] = useState({});
  const [isSystemPart, setIsSystemPart] = useState(false);
  const [isValidPlacement, setIsValidPlacement] = useState(true);
  const [placementReason, setPlacementReason] = useState("");

  useEffect(() => {
    if (!meeting.topicId && !meeting.courseId) {
      setIsSystemPart(true);
    } else {
      setIsSystemPart(false);
    }
  }, [meeting.topicId, meeting.courseId]);

  useEffect(() => {
    setMeeting((prev) => ({ ...prev, isSystemPart }));
  }, [isSystemPart]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "courseId") {
      setMeeting((prev) => ({ ...prev, courseId: value, topicId: "" }));
    } else if (name === "topicId") {
      setMeeting((prev) => ({ ...prev, topicId: value, meetingNumber: "" }));
    } else {
      setMeeting((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validatePlacement = () => {
    let isValid = true;
    let reasons = [];

    // These conditions are examples — real logic must come from server validation
    if (meeting.topicId && (meeting.startTime === "" || meeting.date === "")) {
      isValid = false;
      reasons.push("שעות או ימים לא מתאימים לנושא");
    }
    if (meeting.courseId && !meeting.topicId && (meeting.startTime === "" || meeting.date === "")) {
      isValid = false;
      reasons.push("שעות או ימים לא מתאימים לקורס");
    }
    if (meeting.roomId === "1") {
      isValid = false;
      reasons.push("החדר אינו מתאים למאפייני הנושא");
    }
    if (meeting.courseId && meeting.roomId === "2") {
      isValid = false;
      reasons.push("החדר קטן מדי לכמות התלמידים בקורס");
    }

    setIsValidPlacement(isValid);
    setPlacementReason(reasons.join(", "));

    return isValid;
  };

  const handleSave = () => {
    const valid = validatePlacement();
    if (!valid) {
      const confirmSave = window.confirm(
        `האם לשמור את המפגש למרות שהשיבוץ לא תקין?\n${placementReason}`
      );
      if (!confirmSave) return;
    }
    onSave({ ...meeting, isValidPlacement });
  };

  const textFieldStyle = {
    width: 200,
    height: 45,
    '& .MuiInputBase-root': { height: 45 },
    '& .MuiOutlinedInput-root': {
      height: 45,
      '& fieldset': {
        borderBottom: '1px solid #C6C6C6',
        borderTop: 'none',
        borderLeft: 'none',
        borderRight: 'none',
        borderRadius: 0,
      },
      '&:hover fieldset': { borderBottom: '1px solid #C6C6C6' },
      '&.Mui-focused fieldset': { borderBottom: '1px solid #C6C6C6' },
    },
  };

  return (
    <Box sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={4} sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
        <Grid item>
          <TextField
            label="שם נושא"
            name="topicName"
            value={meeting.topicName}
            onChange={handleChange}
            sx={textFieldStyle}
          />
        </Grid>
        <Grid item>
          <TextField
            label="שם מרצה"
            name="lecturerName"
            value={meeting.lecturerName}
            onChange={handleChange}
            sx={textFieldStyle}
          />
        </Grid>
        <Grid item>
          <TextField
            label="תאריך"
            name="date"
            type="date"
            value={meeting.date}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            sx={textFieldStyle}
          />
        </Grid>
        <Grid item>
          <TextField
            label="שעת התחלה"
            name="startTime"
            type="time"
            value={meeting.startTime}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            sx={textFieldStyle}
          />
        </Grid>
        <Grid item>
          <TextField
            label="שעת סיום"
            name="endTime"
            type="time"
            value={meeting.endTime}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            sx={textFieldStyle}
          />
        </Grid>
        <Grid item>
          <TextField
            select
            label="חדר"
            name="roomId"
            value={meeting.roomId}
            onChange={handleChange}
            sx={textFieldStyle}
          >
            {rooms.map((room) => (
              <MenuItem key={room.id} value={room.id}>{room.name}</MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item>
          <TextField
            label="מספר מפגש"
            name="meetingNumber"
            value={meeting.meetingNumber}
            onChange={handleChange}
            disabled
            sx={textFieldStyle}
          />
        </Grid>
        <Grid item>
          <TextField
            label="סטטוס"
            name="status"
            value={meeting.status}
            disabled
            sx={textFieldStyle}
          />
        </Grid>
        <Grid item>
          <FormControlLabel
            control={<Switch checked={isSystemPart} onChange={() => setIsSystemPart(!isSystemPart)} />}
            label="חלק מהמערכת"
          />
        </Grid>
        {!isValidPlacement && (
          <Grid item>
            <Typography color="error">שיבוץ לא תקין: {placementReason}</Typography>
          </Grid>
        )}
        <Grid item>
          <Button variant="contained" color="primary" onClick={handleSave} startIcon={<AddIcon />}>הוסף מפגש</Button>
        </Grid>
        <Grid item>
          <Button variant="outlined" color="secondary" onClick={onCancel}>ביטול</Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EditMeeting;*/


