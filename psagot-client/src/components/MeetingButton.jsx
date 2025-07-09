import React, { useState } from 'react';
import { Button, Box, snackbar } from '@mui/material';
import MeetingForm from './MeetingForm';
import { useDispatch, useSelector } from 'react-redux';
import { clearError, resetStatus } from '../features/meeting/meetingSlice';
import { useNavigate } from 'react-router-dom';

const MeetingButton = () => {

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [initialMeeting, setInitialMeeting] = useState(null);
  const { isLoading, error } = useSelector((state) => state.meeting);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const dispatch = useDispatch();

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };



  //נתוני הטפסים
  const exampleMeeting = {
    meetingId: '',
    scheduleForTopicId: null,
    meetingNumberForTopic: 1,
    year: '',
    roomId: '',
    isValid: true,
    startTime: '',
    endTime: '',
    meetingDate: '',
    dayId: null,
    courseId: '',
    courseName: '',
    topicId: '',
    topicName: '',
    teacherId: '',
    teacherName: '',
    reason: null,
    statusCourseId: 0,
    isPartOfSchedule: false
  };


  //שליפת המשתמשים
  const users = useSelector((state) => state.user.users);
  //const canEdit = true; // 👈 זמני! לבדיקת עיצוב בלבד

  const canEdit = [1, 2, 3, 4].includes(users?.userTypeId); //רק המתמשים שמורשים לערוך יראו את כפתור עריכה

  const navigate = useNavigate();



  //פונקציה להוספת מפגש
  const handleAddMeeting = () => {
    dispatch(clearError());
    dispatch(resetStatus());
    setIsEditMode(false);
    navigate('/add-meeting')
  };


  //כפתור ביטול
  const handleCancel = () => {
    setIsFormVisible(false);
    dispatch(clearError());
    dispatch(resetStatus());
  };

  //כפתור שמירת המפגש בפועל
  const handleSave = async (addedMeeting) => { // זה יהיה addedMeeting מהשרת
    try {
      console.log("Meeting saved successfully:", addedMeeting);
      showSnackbar('המפגש נשמר בהצלחה!');
      setIsFormVisible(false);
    } catch (error) {
      console.error('שגיאה בשמירת מפגש (מתוך MeetingButton):', error);
      showSnackbar('שגיאה בשמירת המפגש: אנא בדוק את הפרטים ונסה שוב.');
    }
  };

  return (
    //עיצוב כפתור הוספת מפגש
    <Box>
      <Button
        variant="contained"
        onClick={handleAddMeeting}
        disabled={isLoading}
        sx={{
          width: '156px',
          height: '40px',
          borderRadius: '50px',
          padding: '0 24px',
          backgroundColor: '#3366FF',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          direction: 'rtl',
          textTransform: 'none',
          boxShadow: 'none',
          '&:hover': {
            backgroundColor: '#2a59e0',
          },
        }}
      >
        {/* עיצוב האייקון - עיגול ובתוכו פלוס בתוך הוספת המפגש*/}
        <Box
          sx={{
            width: '18px',
            height: '18px',
            borderRadius: '50%',
            border: '1px solid white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'transparent',
            flexShrink: 0,
          }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 3V11"
              stroke="#FFFFFF"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
            <path
              d="M3 7H11"
              stroke="#FFFFFF"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </svg>
        </Box>


        הוספת מפגש
      </Button>

      {/*הצגת הטפסים- עריכה ושמירה של מפגש עם כל הנתונים שלהם, כפתור שמירה וכפתור ביטול, ואפשרות לחיצה לכפתור עריכה  */}
      {isFormVisible && (
        <MeetingForm
          meeting={initialMeeting}
          onSave={handleSave}
          onCancel={handleCancel}
          isEditMode={isEditMode}
        />
      )}
    </Box>
  );
};

export default MeetingButton;