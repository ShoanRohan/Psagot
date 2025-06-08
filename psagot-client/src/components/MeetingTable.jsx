import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CustomTable from './CustomTable';
import {
  fetchAllMeetings,
  deleteMeetingAction
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
  Alert
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import RefreshIcon from '@mui/icons-material/Refresh';

const MeetingTable = React.memo(({ onEdit }) => {
  const dispatch = useDispatch();
  const { meetings, status, error } = useSelector((state) => state.meeting);

  const [refreshKey, setRefreshKey] = useState(0);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [meetingToDelete, setMeetingToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const forceRefresh = useCallback(() => {
    setRefreshKey(prev => prev + 1);
  }, []);

  const handleManualRefresh = useCallback(() => {
    dispatch(fetchAllMeetings());
  }, [dispatch]);

  const showSnackbar = useCallback((message, severity = 'success') => {
    setSnackbar({
      open: true,
      message,
      severity
    });
  }, []);

  const handleCloseSnackbar = useCallback(() => {
    setSnackbar(prev => ({ ...prev, open: false }));
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

  // Memoized static data
  const columns = useMemo(() => [
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
    'עריכה',
    'מחיקה'
  ], []);

  const keyMap = useMemo(() => ({
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
  }), []);

  // Memoized column renderers
  const renderScheduleChip = useCallback((row) => (
    <Chip
      label={row.isPartOfSchedule ? 'כן' : 'לא'}
      color={row.isPartOfSchedule ? 'success' : 'default'}
      variant="outlined"
    />
  ), []);

  const renderValidChip = useCallback((row) => (
    <Chip
      label={row.isValid ? 'תקין' : 'שגוי'}
      color={row.isValid ? 'success' : 'error'}
      variant="outlined"
    />
  ), []);

  const renderEditButton = useCallback((row) => (
    <Tooltip title="ערוך מפגש">
      <IconButton onClick={() => onEdit && onEdit(row)} size="small" color="primary">
        <EditIcon />
      </IconButton>
    </Tooltip>
  ), [onEdit]);

  const renderDeleteButton = useCallback((row) => (
    <Tooltip title="מחק מפגש">
      <IconButton onClick={() => handleDelete(row)} size="small" color="error">
        <DeleteIcon />
      </IconButton>
    </Tooltip>
  ), [handleDelete]);

  const columnConfig = useMemo(() => ({
    'חלק מהמערכת?': { render: renderScheduleChip },
    'האם השיבוץ תקין?': { render: renderValidChip },
    'עריכה': { render: renderEditButton },
    'מחיקה': { render: renderDeleteButton }
  }), [renderScheduleChip, renderValidChip, renderEditButton, renderDeleteButton]);

  // Memoized loading component
  const loadingComponent = useMemo(() => (
    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" minHeight="400px" gap={2}>
      <CircularProgress size={60} />
      <Typography variant="h6" color="text.secondary">טוען מפגשים...</Typography>
    </Box>
  ), []);

  // Memoized error component
  const errorComponent = useMemo(() => (
    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" minHeight="400px" gap={2}>
      <Typography variant="h6" color="error" textAlign="center">שגיאה בטעינת המפגשים</Typography>
      <Typography variant="body2" color="text.secondary" textAlign="center">{error}</Typography>
      <Button variant="contained" onClick={handleManualRefresh} startIcon={<RefreshIcon />} size="large">נסה שוב</Button>
    </Box>
  ), [error, handleManualRefresh]);

  if (isInitialLoading) {
    return loadingComponent;
  }

  if (status === 'failed') {
    return errorComponent;
  }

  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5" component="h2">טבלת מפגשים</Typography>
        <Button variant="outlined" onClick={handleManualRefresh} startIcon={<RefreshIcon />} disabled={status === 'loading'}>
          רענן
        </Button>
      </Box>

      <CustomTable columns={columns} data={meetings} keyMap={keyMap} columnConfig={columnConfig} />

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
          <Button onClick={handleCloseDeleteDialog} disabled={isDeleting} color="inherit">ביטול</Button>
          <Button onClick={handleConfirmDelete} variant="contained" color="error" disabled={isDeleting}>
            {isDeleting ? <CircularProgress size={24} color="inherit" /> : 'מחק'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* הודעות Snackbar */}
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
