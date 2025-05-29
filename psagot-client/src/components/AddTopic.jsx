import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Grid
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { saveTopic, fetchUsers, fetchStatuses, fetchDays } from '@/store/topicSlice';

const initialForm = {
  code: '',
  name: '',
  courseName: '',
  lecturer: '',
  startDate: '',
  endDate: '',
  status: '',
  sessions: '',
  equipment: {
    computers: false,
    projector: false,
    microphone: false
  },
  schedule: [
    {
      day: '',
      startHour: '',
      endHour: '',
      roomFree: false
    }
  ]
};

export default function EditTopicPopup({ open, onClose, topic }) {
  const dispatch = useDispatch();
  const [form, setForm] = useState(initialForm);
  const users = useSelector(state => state.user);
  const statuses = useSelector(state => state.topic.statuses);
  const days = useSelector(state => state.topic.days);

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchStatuses());
    dispatch(fetchDays());
    if (topic) setForm(topic);
  }, [dispatch, topic]);

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleEquipmentChange = (field) => {
    setForm(prev => ({
      ...prev,
      equipment: { ...prev.equipment, [field]: !prev.equipment[field] }
    }));
  };

  const handleScheduleChange = (index, field, value) => {
    const updatedSchedule = [...form.schedule];
    updatedSchedule[index][field] = value;
    setForm(prev => ({ ...prev, schedule: updatedSchedule }));
  };

  const addScheduleRow = () => {
    setForm(prev => ({
      ...prev,
      schedule: [...prev.schedule, { day: '', startHour: '', endHour: '', roomFree: false }]
    }));
  };

  const onSave = () => {
    dispatch(saveTopic(form));
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>
        עריכת נושא {form.name && `- ${form.name}`}
        <Box display="flex" justifyContent="flex-start" gap={2} mt={1}>
          <Button variant="contained" onClick={onSave}>שמור</Button>
          <Button onClick={onClose}>ביטול</Button>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Typography variant="h6">פרטים טכניים</Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}><TextField label="קוד נושא" value={form.code} disabled fullWidth /></Grid>
          <Grid item xs={6}><TextField label="שם נושא" value={form.name} onChange={(e) => handleChange('name', e.target.value)} fullWidth /></Grid>
          <Grid item xs={6}><TextField label="שם קורס" value={form.courseName} onChange={(e) => handleChange('courseName', e.target.value)} fullWidth /></Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>מרצה</InputLabel>
              <Select
                value={form.lecturer}
                onChange={(e) => handleChange('lecturer', e.target.value)}>
                {users.map(user => (
                  <MenuItem key={user.id} value={user.id}>{user.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}><TextField label="תאריך התחלה" type="date" InputLabelProps={{ shrink: true }} value={form.startDate} onChange={(e) => handleChange('startDate', e.target.value)} fullWidth /></Grid>
          <Grid item xs={6}><TextField label="תאריך סיום" type="date" InputLabelProps={{ shrink: true }} value={form.endDate} onChange={(e) => handleChange('endDate', e.target.value)} fullWidth /></Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>סטטוס</InputLabel>
              <Select value={form.status} onChange={(e) => handleChange('status', e.target.value)}>
                {statuses.map(s => <MenuItem key={s.id} value={s.id}>{s.name}</MenuItem>)}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}><TextField label="מספר מפגשים" type="number" value={form.sessions} onChange={(e) => handleChange('sessions', e.target.value)} fullWidth /></Grid>
          <Grid item xs={12}>
            <FormControl>
              <Typography>ציוד נדרש:</Typography>
              <Box display="flex" gap={2}>
                <Checkbox checked={form.equipment.computers} onChange={() => handleEquipmentChange('computers')} /> מחשבים
                <Checkbox checked={form.equipment.projector} onChange={() => handleEquipmentChange('projector')} /> מקרן
                <Checkbox checked={form.equipment.microphone} onChange={() => handleEquipmentChange('microphone')} /> מקרופון
              </Box>
            </FormControl>
          </Grid>
        </Grid>

        <Box mt={4}>
          <Typography variant="h6">שיבוץ במערכת</Typography>
          {form.schedule.map((entry, i) => (
            <Grid container spacing={2} alignItems="center" key={i}>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <InputLabel>יום</InputLabel>
                  <Select value={entry.day} onChange={(e) => handleScheduleChange(i, 'day', e.target.value)}>
                    {days.map(d => <MenuItem key={d.id} value={d.id}>{d.name}</MenuItem>)}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={2}><TextField label="שעת התחלה" type="time" InputLabelProps={{ shrink: true }} value={entry.startHour} onChange={(e) => handleScheduleChange(i, 'startHour', e.target.value)} fullWidth /></Grid>
              <Grid item xs={2}><TextField label="שעת סיום" type="time" InputLabelProps={{ shrink: true }} value={entry.endHour} onChange={(e) => handleScheduleChange(i, 'endHour', e.target.value)} fullWidth /></Grid>
              <Grid item xs={2}>
                <Checkbox checked={entry.roomFree} onChange={() => handleScheduleChange(i, 'roomFree', !entry.roomFree)} /> חדר פנוי
              </Grid>
            </Grid>
          ))}
          <Box mt={2}><Button onClick={addScheduleRow}>הוספת יום</Button></Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
