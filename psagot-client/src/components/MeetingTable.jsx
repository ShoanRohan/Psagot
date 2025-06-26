import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAllMeetings,
  deleteMeetingAction,
} from '../features/meeting/meetingActions';
import {
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Tooltip,
  CircularProgress,
  Typography,
  Box,
  Paper,
  Snackbar,
  Alert,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useNavigate } from 'react-router-dom';
import { clearError, resetStatus } from '../features/meeting/meetingSlice';
import CustomTable from './CustomTable';
import trash from '../assets/icons/trash.png';
import penToSquare from '../assets/icons/penToSquare.png';

const MeetingTable = React.memo(({ onEdit }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { meetings, status, error } = useSelector((state) => state.meeting);
  const [refreshKey, setRefreshKey] = useState(0);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [meetingToDelete, setMeetingToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const forceRefresh = useCallback(() => {
    setRefreshKey((prev) => prev + 1);
  }, []);

  const handleManualRefresh = useCallback(() => {
    dispatch(fetchAllMeetings());
  }, [dispatch]);

  const showSnackbar = useCallback((message, severity = 'success') => {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  }, []);

  const handleCloseSnackbar = useCallback(() => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  }, []);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchAllMeetings());
    } else if (status === 'succeeded' || status === 'failed') {
      setIsInitialLoading(false);
    }
  }, [status, dispatch]);

  const handleDelete = useCallback((meeting) => {
    setMeetingToDelete(meeting);
    setOpenDeleteDialog(true);
  }, []);

  const handleCloseDeleteDialog = useCallback(() => {
    if (!isDeleting) {
      setOpenDeleteDialog(false);
      setMeetingToDelete(null);
    }
  }, [isDeleting]);

  const handleConfirmDelete = useCallback(async () => {
    if (meetingToDelete) {
      setIsDeleting(true);
      try {
        await dispatch(deleteMeetingAction(meetingToDelete.meetingId)).unwrap();
        showSnackbar('מפגש נמחק בהצלחה', 'success');
        await dispatch(fetchAllMeetings());
        setIsDeleting(false);
        handleCloseDeleteDialog();
      } catch (error) {
        setIsDeleting(false);
        showSnackbar('מחיקת מפגש נכשלה', 'error');
      }
    }
  }, [meetingToDelete, dispatch, showSnackbar, handleCloseDeleteDialog]);

  // עמודות בהתאמה לתמונה
  const columns = useMemo(() => [
    'מספר מפגש',
    'שם קורס',
    'נושא',
    'שם מרצה',
    'תאריך',
    'יום',
    'שעת התחלה',
    'שעת סיום',
    'מספר חדר',
    'שיבוץ',
    'סטטוס',
    'עריכה',
    'מחיקה',
  ], []);


//  {
//     "meetingId": 44,
//     "scheduleForTopicId": 5,
//     "meetingNumberForTopic": 4,
//     "roomId": 5,
//     "isValid": false,
//     "dayId": 1,
//     "startTime": "10:00:00",
  //   "endTime": "12:00:00",
  //   "isPartOfSchedule": true,
  //   "courseId": 1,
  //   "topicId": 5,
  //   "teacherId": 5,
  //   "meetingDate": "2025-01-26",
  //   "reason": "כמות התלמידים בקורס (25) גדולה מקיבולת החדר (20)",
  //   "year": 0,
  //   "statusCourseId": 0
  // },

  const keyMap = useMemo(() => ({
    'מספר מפגש': 'meetingId',
    'שם קורס': 'courseName',
    'נושא': 'topicName',
    'שם מרצה': 'teacherName',
    'תאריך': 'meetingDate',
    'יום': 'dayId',
    'שעת התחלה': 'startTime',
    'שעת סיום': 'endTime',
    'מספר חדר': 'roomId',
    'שיבוץ': 'isValid',
    'סטטוס': 'isPartOfSchedule',
  }), []);

  const renderStatusChip = useCallback((row) => (
    <Chip
      label={row.isPartOfSchedule ? 'פעיל' : 'חסרים'}
      color={row.isPartOfSchedule ? 'success' : 'default'}
      sx={{ fontWeight: 'bold', width: '60px', justifyContent: 'center' }}
    />
  ), []);

  const renderValidChip = useCallback((row) => (
    <Typography>{row.isValid  ?  'V' : 'X'} </Typography>
  ), []);

  const renderEditButton = useCallback((row) => (
    <Tooltip title="ערוך מפגש">
      <IconButton onClick={() => onEdit?.(row)} size="small" color="primary">
        {/* <EditIcon /> */}
          <img src={penToSquare} alt="Delete" style={{ width: '20px', height: '20px' }} />
      </IconButton>
    </Tooltip>
  ), [onEdit]);

  const renderDeleteButton = useCallback((row) => (
    <Tooltip title="מחק מפגש">
      <IconButton onClick={() => handleDelete(row)} size="small" color="error">
        {/* <DeleteIcon /> */}
        <img src={trash} alt="Delete" style={{ width: '20px', height: '20px' }} />
      </IconButton>
    </Tooltip>
  ), [handleDelete]);

  const columnConfig = useMemo(() => ({
    'סטטוס': { render: renderStatusChip },
    'שיבוץ': { render: renderValidChip },
    'עריכה': { render: renderEditButton },
    'מחיקה': { render: renderDeleteButton },
  }), [renderStatusChip, renderValidChip, renderEditButton, renderDeleteButton]);

  if (isInitialLoading) {
    return (
      <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" minHeight="400px" gap={2}>
        <CircularProgress size={60} />
        <Typography variant="h6" color="text.secondary">טוען מפגשים...</Typography>
      </Box>
    );
  }

  if (status === 'failed') {
    return (
      <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" minHeight="400px" gap={2}>
        <Typography variant="h6" color="error" textAlign="center">שגיאה בטעינת המפגשים</Typography>
        <Typography variant="body2" color="text.secondary" textAlign="center">{error}</Typography>
        <Button variant="contained" onClick={handleManualRefresh} startIcon={<RefreshIcon />} size="large">
          נסה שוב
        </Button>
      </Box>
    );
  }

  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5">טבלת מפגשים</Typography>
        <Button variant="outlined" onClick={handleManualRefresh} startIcon={<RefreshIcon />}>
          רענן
        </Button>
      </Box>

      <CustomTable
        columns={columns}
        data={meetings || []}
        keyMap={keyMap}
        columnConfig={columnConfig}
        onEdit={onEdit}
        onDelete={handleDelete}
      />

      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>מחיקת מפגש</DialogTitle>
        <DialogContent dividers>
          <Typography>
            האם אתה בטוח שברצונך למחוק את המפגש "{meetingToDelete?.topicName}" מהקורס "{meetingToDelete?.courseName}"?
          </Typography>
          {meetingToDelete && !meetingToDelete.isValid && (
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

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Paper>
  );
});

MeetingTable.displayName = 'MeetingTable';

export default MeetingTable;
