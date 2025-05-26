import React, { useEffect, useState } from 'react';
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
  DialogContentText
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';

const MeetingTable = ({ onEdit }) => {
  const dispatch = useDispatch();
  const { meetings, status, error } = useSelector((state) => state.meeting);
  
  // הסרנו את localMeetings - נשתמש רק ב-meetings מה-Redux
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [openDescriptionDialog, setOpenDescriptionDialog] = useState(false);
  const [currentMeeting, setCurrentMeeting] = useState(null);
  const [editedDescription, setEditedDescription] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // סטייטים לדיאלוג מחיקה
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [meetingToDelete, setMeetingToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchAllMeetings());
    } else if (status === 'succeeded') {
      setIsInitialLoading(false);
    } else if (status === 'failed') {
      setIsInitialLoading(false);
    }
  }, [status, dispatch]);

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

  const handleSaveDescription = async () => {
    if (currentMeeting) {
      setIsSaving(true);
      const updatedMeeting = {
        ...currentMeeting,
        description: editedDescription
      };
      
      try {
        await dispatch(updateMeetingAction(updatedMeeting)).unwrap();
        setIsSaving(false);
        handleCloseDescriptionDialog();
      } catch (error) {
        console.error('Error updating description:', error);
        setIsSaving(false);
      }
    }
  };

  // פונקציות לטיפול במחיקה
  const handleDeleteClick = (meeting) => {
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
        // מוחק מהשרת ומקבל את כל המפגשים המעודכנים
        await dispatch(deleteMeetingAction(meetingToDelete.meetingId)).unwrap();
        
        setIsDeleting(false);
        handleCloseDeleteDialog();
        
      } catch (error) {
        console.error('Error deleting meeting:', error);
        setIsDeleting(false);
        
        // הצגת הודעת שגיאה למשתמש
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
    'תיאור',
    'חדר',
    'האם השיבוץ תקין?',
    'חלק מהמערכת?',
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
      render: (row) => {
        if (row.description && row.description.trim() !== '') {
          return (
            <div
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between', 
                maxWidth: '200px', 
                cursor: 'pointer' 
              }}
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
    },
    'מחיקה': {
      render: (row) => (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Tooltip title="מחק מפגש">
            <IconButton
              color="error"
              onClick={() => handleDeleteClick(row)}
              size="small"
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </div>
      )
    }
  };

  if (isInitialLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>טוען נתונים...</Typography>
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <Typography color="error">שגיאה בטעינת הנתונים: {error}</Typography>
        <Button 
          variant="contained" 
          onClick={() => dispatch(fetchAllMeetings())}
          sx={{ mt: 2 }}
        >
          נסה שוב
        </Button>
      </div>
    );
  }

  return (
    <div>
      <Typography variant="h4" component="h2" sx={{ mb: 3, textAlign: 'center' }}>
        טבלת מפגשים
      </Typography>
      
      <CustomTable
        columns={columns}
        data={meetings} // שימוש ישיר ב-meetings מה-Redux
        onEdit={onEdit}
        columnConfig={columnConfig}
        keyMap={keyMap}
      />
      
      {/* דיאלוג תיאור */}
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
              whiteSpace: 'pre-wrap',
              direction: 'rtl'
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

      {/* דיאלוג אישור מחיקה */}
      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        dir="rtl"
      >
        <DialogTitle id="alert-dialog-title">
          אישור מחיקת מפגש
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            האם אתה בטוח שברצונך למחוק את המפגש הזה?
            <br />
            <strong>קורס:</strong> {meetingToDelete?.courseName}
            <br />
            <strong>נושא:</strong> {meetingToDelete?.topicName}
            <br />
            <strong>מספר מפגש:</strong> {meetingToDelete?.meetingNumberForTopic}
            <br />
            <strong>מרצה:</strong> {meetingToDelete?.lecturerName}
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'space-between', padding: '16px' }}>
          <Button 
            onClick={handleCloseDeleteDialog} 
            color="inherit"
            disabled={isDeleting}
          >
            ביטול
          </Button>
          <Button 
            onClick={handleConfirmDelete} 
            color="error" 
            variant="contained"
            disabled={isDeleting}
            startIcon={isDeleting ? <CircularProgress size={20} color="inherit" /> : <DeleteIcon />}
          >
            {isDeleting ? 'מוחק...' : 'מחק'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MeetingTable;
