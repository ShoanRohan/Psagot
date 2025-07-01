import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import '../styles/MeetingForm.css';
import { useDispatch } from 'react-redux';
import { addMeetingAction, updateMeetingAction } from '../features/meeting/meetingActions';

const MeetingForm = ({ mode = 'add', meetingData = {}, onSave, onCancel }) => {
  const isEditMode = mode === 'edit';
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    meetingNumber: '',
    topicName: '',
    courseName: '',
    lecturerName: '',
    date: '',
    year: '',
    startTime: '',
    endTime: '',
    semester: '',
    recording: '',
    correctAssignment: '',
    reason: ''
  });

  useEffect(() => {
    if (isEditMode && meetingData) {
      setFormData(prev => ({ ...prev, ...meetingData }));
    }
  }, [meetingData, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      let result;
      if (isEditMode) {
        result = await dispatch(updateMeetingAction(formData)).unwrap();
      } else {
        result = await dispatch(addMeetingAction(formData)).unwrap();
      }
      onSave(result);
    } catch (err) {
      console.error('שגיאה בשמירה:', err);
      alert('אירעה שגיאה בשמירת המפגש');
    }
  };

  return (
    <Box className="meeting-form-wrapper" dir="rtl">
      <Box className="meeting-form-header">
        <Box>
          <Typography variant="h4" className="main-title">מפגשים</Typography>
          <Typography className="subtitle">מפגשים / פרטי מפגש</Typography>
        </Box>
        <Box className="buttons-group">
          <Button variant="contained" className="rounded-button" onClick={handleSave}>שמור</Button>
          <Button variant="outlined" className="rounded-button" onClick={onCancel}>ביטול</Button>
        </Box>
      </Box>

      <Box className="form-box">
        <Typography className="section-title">פרטים טכניים</Typography>

        <Grid container spacing={3} className="fields-grid">
          <Grid item xs={3}>
            <TextField
              fullWidth
              label="מספר מפגש"
              variant="standard"
              name="meetingNumber"
              value={formData.meetingNumber}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={3}>
            <TextField
              fullWidth
              label="שם נושא"
              variant="standard"
              name="topicName"
              value={formData.topicName}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={3}>
            <TextField
              fullWidth
              label="שם קורס"
              variant="standard"
              name="courseName"
              value={formData.courseName}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={3}>
            <TextField
              fullWidth
              label="שם מרצה"
              variant="standard"
              name="lecturerName"
              value={formData.lecturerName}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={3}>
            <TextField
              fullWidth
              label="תאריך"
              type="date"
              name="date"
              variant="standard"
              InputLabelProps={{ shrink: true }}
              value={formData.date}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={3}>
            <FormControl fullWidth variant="standard">
              <InputLabel>שנה</InputLabel>
              <Select
                className="select-left-arrow"
                name="year"
                value={formData.year}
                onChange={handleChange}
              >
                <MenuItem value="2023">2023</MenuItem>
                <MenuItem value="2024">2024</MenuItem>
                <MenuItem value="2025">2025</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={3}>
            <FormControl fullWidth variant="standard">
              <InputLabel>שעת התחלה</InputLabel>
              <Select
                className="select-left-arrow"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
              >
                <MenuItem value="08:00">08:00</MenuItem>
                <MenuItem value="09:00">09:00</MenuItem>
                <MenuItem value="10:00">10:00</MenuItem>
                <MenuItem value="11:00">11:00</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={3}>
            <FormControl fullWidth variant="standard">
              <InputLabel>שעת סיום</InputLabel>
              <Select
                className="select-left-arrow"
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
              >
                <MenuItem value="09:00">09:00</MenuItem>
                <MenuItem value="10:00">10:00</MenuItem>
                <MenuItem value="11:00">11:00</MenuItem>
                <MenuItem value="12:00">12:00</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={3}>
            <FormControl fullWidth variant="standard">
              <InputLabel>סמסטר</InputLabel>
              <Select
                className="select-left-arrow"
                name="semester"
                value={formData.semester}
                onChange={handleChange}
              >
                <MenuItem value="א">א</MenuItem>
                <MenuItem value="ב">ב</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={3}>
            <FormControl fullWidth variant="standard">
              <InputLabel>סטטוס</InputLabel>
              <Select
                className="select-left-arrow"
                name="recording"
                value={formData.recording}
                onChange={handleChange}
              >
                <MenuItem value="כן">כן</MenuItem>
                <MenuItem value="לא">לא</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={3}>
            <FormControl fullWidth variant="standard">
              <InputLabel>שיבוץ תקין</InputLabel>
              <Select
                className="select-left-arrow"
                name="correctAssignment"
                value={formData.correctAssignment}
                onChange={handleChange}
              >
                <MenuItem value="כן">כן</MenuItem>
                <MenuItem value="לא">לא</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <TextField
              className="reason"
              label="סיבה"
              name="reason"
              variant="standard"
              multiline
              rows={2}
              fullWidth
              value={formData.reason}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default MeetingForm;
