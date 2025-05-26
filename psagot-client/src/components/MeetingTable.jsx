import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CustomTable from './CustomTable';
import { fetchAllMeetings, updateMeetingAction, deleteMeetingAction } from '../features/meeting/meetingActions';
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
  CircularProgress,
  Typography,
  Box,
  Paper
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import RefreshIcon from '@mui/icons-material/Refresh';

const MeetingTable = ({ onEdit }) => {
  const dispatch = useDispatch();
  const { meetings, status, error } = useSelector((state) => state.meeting);

  // ניהול רענון
  const [refreshKey, setRefreshKey] = useState(0);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  // דיאלוג תיאור
  const [openDescriptionDialog, setOpenDescriptionDialog] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [editedDescription, setEditedDescription] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // דיאלוג מחיקה
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [meetingToDelete, setMeetingToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // פונקציה לרענון כפוי
  const forceRefresh = useCallback(() => {
    setRefreshKey(prev => prev + 1);
  }, []);

  // רענון ידני
  const handleManualRefresh = () => {
    dispatch(fetchAllMeetings());
  };

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchAllMeetings());
    } else if (status === 'succeeded') {
      setIsInitialLoading(false);
    } else if (status === 'failed') {
      setIsInitialLoading(false);
    }
  }, [status, dispatch]);

  // פתיחת דיאלוג תיאור עם אפשרות עריכה
  const handleEditDescription = (row) => {
    setSelectedMeeting(row);
    setEditedDescription(row.description || '');
    setIsEditing(false);
    setOpenDescriptionDialog(true);
  };

  const handleCloseDescriptionDialog = () => {
    if (!isSaving) {
      setOpenDescriptionDialog(false);
      setSelectedMeeting(null);
      setEditedDescription('');
      setIsEditing(false);
    }
  };

  const handleStartEditing = () => {
    setIsEditing(true);
  };

  const handleSaveDescription = async () => {
    if (selectedMeeting) {
      setIsSaving(true);

      const updatedMeeting = {
        meetingId: selectedMeeting.meetingId,
        scheduleForTopicId: selectedMeeting.scheduleForTopicId,
        meetingNumberForTopic: selectedMeeting.meetingNumberForTopic,
        dayId: selectedMeeting.dayId,
        startTime: selectedMeeting.startTime,
        endTime: selectedMeeting.endTime,
        date: selectedMeeting.date,
        roomId: selectedMeeting.roomId,
        description: editedDescription,
        isPartOfSchedule: selectedMeeting.isPartOfSchedule,
        isValid: selectedMeeting.isValid,
        courseName: selectedMeeting.courseName,
        topicName: selectedMeeting.topicName,
        lecturerName: selectedMeeting.lecturerName
      };

      try {
        await dispatch(updateMeetingAction(updatedMeeting)).unwrap();

        setSelectedMeeting(prev => ({
          ...prev,
          description: editedDescription
        }));

        setIsSaving(false);
        setIsEditing(false);

        setTimeout(() => {
          dispatch(fetchAllMeetings());
        }, 100);
      } catch (error) {
        setIsSaving(false);
        const errorMessage = error?.message || error?.data?.message || 'שגיאה לא ידועה';
        alert(`שגיאה בשמירת התיאור: ${errorMessage}`);
      }
    }
  };

  // פונקציות מחיקה
  const handleDelete = (meeting) => {
    setMeetingToDelete(meeting);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    if (!isDeleting) {
      setOpenDeleteDialog(false);
      setMeetingToDelete(null);
    }
  };

  const handleConfirmDelete = async () => {
    if (meetingToDelete) {
      setIsDeleting(true);

      try {
        await dispatch(deleteMeetingAction(meetingToDelete.meetingId)).unwrap();
        forceRefresh();
        setIsDeleting(false);
        handleCloseDeleteDialog();
      } catch (error) {
        setIsDeleting(false);
        alert('שגיאה במחיקת המפגש. אנא נסה שוב.');
      }
    }
  };

  const columns = [
    'שם קורס',
    'נושא',
    'מספר מפגש',
    'מרצה',
    'יום',
    'שעת התחלה',
    'שעת סיום',
    'תאריך',
    'חדר',
    'האם השיבוץ תקין?',
    'חלק מהמערכת?',
    'תיאור',
    'עריכה',
    'מחיקה'
  ];

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
      render: (row) => (
        <Tooltip title={row.description || 'אין תיאור'}>
          <Typography
            variant="body2"
            sx={{
              maxWidth: 150,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              cursor: 'pointer',
              color: row.description ? 'primary.main' : 'text.disabled'
            }}
            onClick={() => handleEditDescription(row)}
          >
            {row.description || 'אין תיאור'}
          </Typography>
        </Tooltip>
      )
    },
    'עריכה': {
      render: (row) => (
        <Tooltip title="ערוך מפגש">
          <IconButton onClick={() => onEdit && onEdit(row)} size="small" color="primary">
            <EditIcon />
          </IconButton>
        </Tooltip>
      )
    },
    'מחיקה': {
      render: (row) => (
        <Tooltip title="מחק מפגש">
          <IconButton onClick={() => handleDelete(row)} size="small" color="error">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      )
    }
  };

  // מצבי טעינה ושגיאה
  if (isInitialLoading) {
    return (
      <Box 
        display="flex" 
        flexDirection="column" 
        justifyContent="center" 
        alignItems="center" 
        minHeight="400px"
        gap={2}
      >
        <CircularProgress size={60} />
        <Typography variant="h6" color="text.secondary">
          טוען מפגשים...
        </Typography>
      </Box>
    );
  }

  if (status === 'failed') {
    return (
      <Box 
        display="flex" 
        flexDirection="column" 
        justifyContent="center" 
        alignItems="center" 
        minHeight="400px"
        gap={2}
      >
        <Typography variant="h6" color="error" textAlign="center">
          שגיאה בטעינת המפגשים
        </Typography>
        <Typography variant="body2" color="text.secondary" textAlign="center">
          {error}
        </Typography>
        <Button 
          variant="contained" 
          onClick={handleManualRefresh}
          startIcon={<RefreshIcon />}
          size="large"
        >
          נסה שוב
        </Button>
      </Box>
    );
  }

  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5" component="h2">
          טבלת מפגשים
        </Typography>
        <Button
          variant="outlined"
          onClick={handleManualRefresh}
          startIcon={<RefreshIcon />}
          disabled={status === 'loading'}
        >
          רענן
        </Button>
      </Box>

      <CustomTable
        columns={columns}
        data={meetings}
        keyMap={keyMap}
        columnConfig={columnConfig}
      />

      {/* דיאלוג תיאור */}
      <Dialog open={openDescriptionDialog} onClose={handleCloseDescriptionDialog} maxWidth="sm" fullWidth>
        <DialogTitle>תיאור מפגש</DialogTitle>
        <DialogContent dividers>
          {isEditing ? (
            <TextField
              label="תיאור"
              multiline
              minRows={4}
              fullWidth
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              disabled={isSaving}
              autoFocus
            />
          ) : (
            <Typography
              sx={{ whiteSpace: 'pre-wrap' }}
              variant="body1"
            >
              {selectedMeeting?.description || 'אין תיאור'}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          {!isEditing ? (
            <>
              <Button onClick={handleCloseDescriptionDialog} color="inherit" startIcon={<CloseIcon />}>
                סגור
              </Button>
              <Button onClick={handleStartEditing} variant="contained" color="primary" startIcon={<EditIcon />}>
                ערוך
              </Button>
            </>
          ) : (
            <>
              <Button onClick={handleCloseDescriptionDialog} color="inherit" disabled={isSaving} startIcon={<CloseIcon />}>
                ביטול
              </Button>
              <Button
                onClick={handleSaveDescription}
                variant="contained"
                color="primary"
                disabled={isSaving}
                startIcon={isSaving ? <CircularProgress size={20} /> : <SaveIcon />}
              >
                שמור
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>

      {/* דיאלוג מחיקה */}
      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>מחיקת מפגש</DialogTitle>
        <DialogContent dividers>
          <Typography>
            האם אתה בטוח שברצונך למחוק את המפגש "{meetingToDelete?.topicName}" מהקורס "{meetingToDelete?.courseName}"?
          </Typography>
          {!meetingToDelete?.isValid && (
            <Box mt={2} display="flex" alignItems="center" color="error.main">
              <EventBusyIcon sx={{ mr: 1 }} />
              <Typography>המפגש מסומן כשגוי.</Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} disabled={isDeleting} color="inherit">
            ביטול
          </Button>
          <Button onClick={handleConfirmDelete} variant="contained" color="error" disabled={isDeleting}>
            {isDeleting ? <CircularProgress size={24} color="inherit" /> : 'מחק'}
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default MeetingTable;
