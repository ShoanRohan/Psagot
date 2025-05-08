<<<<<<< HEAD
import React, { useEffect } from 'react';
import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Typography,
  Chip,
=======
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CustomTable from './CustomTable';
import { fetchAllMeetings, updateMeetingAction } from '../features/meeting/meetingActions';
import { 
  Chip, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  TextField, 
  IconButton, 
  Tooltip,
>>>>>>> origin/YaffaBatelJ2TaskMeetingTable
  CircularProgress,
  Typography
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
<<<<<<< HEAD
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllMeetings } from '../features/meeting/meetingActions';

const MeetingTable = () => {
  const dispatch = useDispatch();
  const {meetings, status, error } = useSelector((state) => state.meeting);

    useEffect(() => {
        if (status === 'idle') {
          dispatch(fetchAllMeetings());

        }
    }, [status, dispatch]);
=======
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';

const MeetingTable = ({ onEdit, onDelete }) => {
  const dispatch = useDispatch();
  const { meetings, status, error } = useSelector((state) => state.meeting);
  
  const [localMeetings, setLocalMeetings] = useState([]);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [openDescriptionDialog, setOpenDescriptionDialog] = useState(false);
  const [currentMeeting, setCurrentMeeting] = useState(null);
  const [editedDescription, setEditedDescription] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchAllMeetings());
    } else if (status === 'succeeded') {
      setLocalMeetings(meetings); // שמירה לסטייט מקומי
      setIsInitialLoading(false);
    } else if (status === 'failed') {
      setIsInitialLoading(false);
    }
  }, [status, dispatch, meetings]);

  const handleOpenDescriptionDialog = (meeting) => {
    setCurrentMeeting(meeting);
    setEditedDescription(meeting.description || '');
    setIsEditing(false);
    setOpenDescriptionDialog(true);
  };

  const handleCloseDescriptionDialog = () => {
    if (!isSaving) {
      setOpenDescriptionDialog(false);
      setCurrentMeeting(null);
      setEditedDescription('');
      setIsEditing(false);
    }
  };

  const handleEditDescription = () => {
    setIsEditing(true);
  };

  const handleSaveDescription = () => {
    if (currentMeeting) {
      setIsSaving(true);
      const updatedMeeting = {
        ...currentMeeting,
        description: editedDescription
      };

      dispatch(updateMeetingAction(updatedMeeting))
        .then(() => {
          // עדכון מקומי במקום שליחת fetchAllMeetings
          const updatedMeetings = localMeetings.map((m) =>
            m.meetingId === updatedMeeting.meetingId ? updatedMeeting : m
          );
          setLocalMeetings(updatedMeetings);

          setIsSaving(false);
          handleCloseDescriptionDialog();
        })
        .catch((error) => {
          console.error('Error updating description:', error);
          setIsSaving(false);
        });
    }
  };
>>>>>>> origin/YaffaBatelJ2TaskMeetingTable

  const columns = [
    'שם קורס',
    'נושא',
    'מספר מפגש',
    'מרצה',
    'יום',
    'שעת התחלה',
    'שעת סיום',
    'תאריך',
    'תיאור',
    'חדר',
    'האם השיבוץ תקין?',
    'חלק מהמערכת?',
    'עריכה',
    'מחיקה'
  ];

<<<<<<< HEAD


  if (status=='loading') {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  if (error!=null) {
    return (
      <Typography color="error" align="center">
        {error}
      </Typography>
    );
  }

  return (
    <Box m={4}>
      <Typography variant="h5" align="center" gutterBottom>
        טבלת מפגשים
      </Typography>

     
      <TableContainer component={Paper} sx={{ maxHeight: 600 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((col, index) => (
                <TableCell key={index} align="center">
                  {col}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {meetings.map((row, i) => (
              <TableRow key={i}>
                <TableCell align="center">{row.course_name}</TableCell>
                <TableCell align="center">{row.topic_name}</TableCell>
                <TableCell align="center">{row.meeting_number}</TableCell>
                <TableCell align="center">{row.lecturer}</TableCell>
                <TableCell align="center">{row.day}</TableCell>
                <TableCell align="center">{row.startTime}</TableCell>
                <TableCell align="center">{row.endTime}</TableCell>
                <TableCell align="center">{row.date}</TableCell>
                <TableCell align="center">{row.description}</TableCell>
                <TableCell align="center">{row.room}</TableCell>
=======
  const keyMap = {
    'שם קורס': 'courseName',
    'נושא': 'topicName',
    'מספר מפגש': 'meetingNumberForTopic',
    'מרצה': 'lecturerName',
    'יום': 'dayId',
    'שעת התחלה': 'startTime',
    'שעת סיום': 'endTime',
    'תאריך': 'date',
    'חדר': 'roomId',
    'מזהה מפגש': 'meetingId',
    'מזהה נושא': 'scheduleForTopicId'
  };

  const columnConfig = {
    'חלק מהמערכת?': {
      render: (row) => (
        <Chip 
          label={row.isPartOfSchedule ? 'כן' : 'לא'} 
          color={row.isPartOfSchedule ? 'success' : 'default'} 
          variant="outlined" 
        />
      )
    },
    'האם השיבוץ תקין?': {
      render: (row) => (
        <Chip 
          label={row.isValid ? 'תקין' : 'שגוי'} 
          color={row.isValid ? 'success' : 'error'} 
          variant="outlined" 
        />
      )
    },
    'תיאור': {
      render: (row) => {
        if (row.description) {
          return (
            <div 
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: '200px', cursor: 'pointer' }}
              onClick={() => handleOpenDescriptionDialog(row)}
            >
              <Tooltip title="לחץ לצפייה/עריכה">
                <Typography 
                  variant="body2" 
                  sx={{ 
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    maxWidth: '180px',
                    textAlign: 'right',
                    direction: 'rtl'
                  }}
                >
                  {row.description}
                </Typography>
              </Tooltip>
              <IconButton size="small" color="primary" sx={{ ml: 1 }}>
                <EditIcon fontSize="small" />
              </IconButton>
            </div>
          );
        } else {
          return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Tooltip title="הוסף תיאור">
                <IconButton 
                  color="default" 
                  onClick={() => handleOpenDescriptionDialog(row)}
                  size="small"
                >
                  <EditIcon />
                </IconButton>
              </Tooltip>
            </div>
          );
        }
      }
    }
  };

  if (isInitialLoading) {
    return <div>טוען נתונים...</div>;
  }

  if (status === 'failed') {
    return <div>שגיאה: {error}</div>;
  }

  return (
    <div>
      <h2>טבלת מפגשים</h2>
      <CustomTable 
        columns={columns}
        data={localMeetings}
        onEdit={onEdit}
        onDelete={onDelete}
        columnConfig={columnConfig}
        keyMap={keyMap}
      />
>>>>>>> origin/YaffaBatelJ2TaskMeetingTable

      <Dialog 
        open={openDescriptionDialog} 
        onClose={handleCloseDescriptionDialog}
        maxWidth="md"
        fullWidth
        dir="rtl"
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>תיאור מפגש {currentMeeting?.meetingNumberForTopic}</div>
          <IconButton onClick={handleCloseDescriptionDialog} size="small" disabled={isSaving}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {isEditing ? (
            <TextField
              autoFocus
              margin="dense"
              label="תיאור"
              type="text"
              fullWidth
              multiline
              rows={4}
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              variant="outlined"
              dir="rtl"
              disabled={isSaving}
            />
          ) : (
            <div style={{ 
              padding: '16px', 
              minHeight: '100px', 
              border: '1px solid #ddd', 
              borderRadius: '4px',
              marginTop: '8px',
              whiteSpace: 'pre-wrap'
            }}>
              {currentMeeting?.description || 'אין תיאור למפגש זה.'}
            </div>
          )}
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'space-between', padding: '16px' }}>
          {isEditing ? (
            <>
              <Button 
                onClick={() => setIsEditing(false)} 
                color="inherit" 
                startIcon={<CloseIcon />}
                disabled={isSaving}
              >
                ביטול
              </Button>
              <Button 
                onClick={handleSaveDescription} 
                color="primary" 
                variant="contained" 
                startIcon={isSaving ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
                disabled={isSaving}
              >
                {isSaving ? 'שומר...' : 'שמור'}
              </Button>
            </>
          ) : (
            <>
              <Button onClick={handleCloseDescriptionDialog} color="inherit" disabled={isSaving}>
                סגור
              </Button>
              <Button 
                onClick={handleEditDescription} 
                color="primary" 
                variant="contained" 
                startIcon={<EditIcon />}
                disabled={isSaving}
              >
                ערוך תיאור
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MeetingTable;
