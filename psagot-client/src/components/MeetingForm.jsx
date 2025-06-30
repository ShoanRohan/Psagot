import React, { useState, useEffect } from 'react';
import { Button, TextField, Grid, Box, Typography, Container, MenuItem, Select, InputLabel, FormControl, Switch, FormControlLabel, Autocomplete, Dialog, DialogTitle, DialogContent, DialogActions,
  DialogContentText, IconButton } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';
import InfoIcon from '@mui/icons-material/Info';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { fetchAllRooms } from '../features/room/roomActions';
import { fetchAllCourses } from '../features/course/courseActions';
import { fetchAllTopic } from '../features/topic/topicActions';
import { fetchAllUsers } from '../features/user/userAction';
import { fetchAllMeetings } from '../features/meeting/meetingActions';
import { useDispatch, useSelector } from 'react-redux';
import {useNavigate, useLocation, useParams} from 'react-router-dom';
import { addMeetingAction, updateMeetingAction } from '../features/meeting/meetingActions';
import { clearError } from '../features/meeting/meetingSlice';
import dayjs from 'dayjs';

const MeetingForm = ({ meeting: propMeeting, onSave, onCancel  }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();


const meetingFromState = location.state?.meeting;

const { meetingId } = useParams();
const isEditMode=meetingId?true:false;
//const { isLoading, error: reduxError } = useSelector(state => state.meeting);

  const { meetings, isLoading, error: reduxError } = useSelector(state => state.meeting);

  const initialFormData = {
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

  const [formData, setFormData] = useState(initialFormData);
  const rooms= useSelector(state => state.room.rooms || []);
  const courses = useSelector(state => state.course.courses|| []);
  const topics = useSelector(state => state.topic.topics|| []);
const users = useSelector(state => state.user.user || []);
  const [validationErrors, setValidationErrors] = useState({});
  const [invalidReasons, setInvalidReasons] = useState([]);
  const [statusOptions, setStatusOptions] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);


  // State for Dialog
  const [dialog, setDialog] = useState({ 
    open: false, 
    type: 'success', // 'success', 'error', 'warning', 'info'
    title: '', 
    message: '',
    showCancel: false,
    onConfirm: null,
    onCancel: null
  });

 useEffect(() => {
  const loadInitialData = async () => {
    try {
      // טען את כל הנתונים במקביל
      await Promise.all([
        dispatch(fetchAllRooms()),
        dispatch(fetchAllCourses()),
        dispatch(fetchAllTopic()),
        dispatch(fetchAllUsers()),
        dispatch(fetchAllMeetings())
      ]);
      
      setIsDataLoaded(true);
    } catch (error) {
      console.error('Failed to load initial data:', error);
      showDialog('error', 'שגיאה', 'שגיאה בטעינת נתונים בסיסיים', false, closeDialog);
    }
  };

  loadInitialData();
}, [dispatch]);


  //שדה חלק מהמערכת אם הנושא או הקורס חד פעמיים
  useEffect(() => {
  const isSingleMeeting = !formData.topicId && !formData.courseId;
  setFormData(prev => ({
    ...prev,
    isPartOfSchedule: isSingleMeeting
  }));
}, [formData.topicId, formData.courseId]);

 // חישוב מס' מפגש
  useEffect(() => {
    if (formData.topicId && formData.meetingDate) {
      const newMeetingNumber = calculateMeetingNumber(
        parseInt(formData.topicId),
        formData.meetingDate,
        meetings
      );
      setFormData(prev => ({
        ...prev,
        meetingNumberForTopic: newMeetingNumber
      }));
    }
  }, [formData.topicId, formData.meetingDate, meetings]);

useEffect(() => {
     if (isEditMode && isDataLoaded) {
      let meetingToEdit = null;

      // Try to get meeting from multiple sources
      if (propMeeting) {
        meetingToEdit = propMeeting;
      } else if (meetingFromState) {
        meetingToEdit = meetingFromState;
      } else if (meetings && meetings.length > 0 && meetingId) {
        meetingToEdit = meetings.find(meeting => 
          meeting.meetingId === Number(meetingId)
        );
      }
        if (meetingToEdit) {
            setFormData({
                ...meetingToEdit,
                courseId: Number(meetingToEdit.courseId),
                topicId: Number(meetingToEdit.topicId),
                teacherId: Number(meetingToEdit.teacherId),
                roomId: Number(meetingToEdit.roomId),
                startTime: meetingToEdit.startTime,
                endTime: meetingToEdit.endTime,
                meetingDate: dayjs(meetingToEdit.meetingDate).isValid()
                    ? dayjs(meetingToEdit.meetingDate).format("YYYY-MM-DD")
                    : "",
                meetingNumberForTopic: Number(meetingToEdit.meetingNumberForTopic),
                isValid: meetingToEdit.isValid !== undefined ? meetingToEdit.isValid : true,
                isPartOfSchedule: meetingToEdit.isPartOfSchedule || false,
                reason: meetingToEdit.reason || '',
                statusCourseId: Number(meetingToEdit.statusCourseId) || 0    
            });
        } else {
            setFormData(initialFormData);
        }
    } else {
        setFormData(initialFormData);
    }
  }, [isDataLoaded, meetingId, meetings, propMeeting, meetingFromState, isEditMode]);

  // Debug log to check what's happening
  useEffect(() => {
    console.log('MeetingForm Debug Info:', {
      isEditMode,
      meetingId,
      isDataLoaded,
      meetingsCount: meetings?.length || 0,
      propMeeting: !!propMeeting,
      meetingFromState: !!meetingFromState,
      formDataMeetingId: formData.meetingId
    });
  }, [isEditMode, meetingId, isDataLoaded, meetings, propMeeting, meetingFromState, formData.meetingId]);


    useEffect(() => {
        dispatch(clearError());
    }, [dispatch]);

     // Function to show dialog
  const showDialog = (type, title, message, showCancel = false, onConfirm = null, onCancelCallback = null) => {
    setDialog({
      open: true,
      type,
      title,
      message,
      showCancel,
      onConfirm,
      onCancel: onCancelCallback
    });
  };

  // Function to close dialog
  const closeDialog = () => {
    setDialog(prev => ({ ...prev, open: false }));
  };

  // Get dialog icon based on type
  const getDialogIcon = () => {
    switch (dialog.type) {
      case 'success':
        return <CheckCircleIcon sx={{ color: '#4caf50', fontSize: 48, mb: 2 }} />;
      case 'error':
        return <ErrorIcon sx={{ color: '#f44336', fontSize: 48, mb: 2 }} />;
      case 'warning':
        return <WarningIcon sx={{ color: '#ff9800', fontSize: 48, mb: 2 }} />;
      case 'info':
        return <InfoIcon sx={{ color: '#2196f3', fontSize: 48, mb: 2 }} />;
      default:
        return null;
    }
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedFormData = { ...formData, [name]: value };

    // Reset topic if course changes
    if (name === 'courseId') {
      updatedFormData.topicId = '';
      updatedFormData.meetingNumberForTopic = 1;
    }

    // Reset meeting number if topic changes
    if (name === 'topicId') {
      updatedFormData.meetingNumberForTopic = 1;
    }

    // Update isPartOfSchedule based on topic or course selection
    updatedFormData.isPartOfSchedule = !!(updatedFormData.topicId || updatedFormData.courseId);

    setFormData(updatedFormData);
  };



   // כפתור ביטול-חזרה לעמוד הקודם  
  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      navigate(-1);
    }
  };

  useEffect(() => {
    const fetchStatuses = async () => {
      try {                                   
        const response = await fetch('https://localhost:44333/api/Course/status-courses');
        const data = await response.json();
        setStatusOptions(data);
      } catch (error) {
        console.error('Failed to fetch status options:', error);
      }
    };
  
    fetchStatuses();
  }, []);
  

const validateForm = () => {
        const errors = {};
        
        if (!formData.topicId && !formData.courseId) {
            errors.general = 'יש לבחור נושא או קורס';
        }

         if (formData.startTime && formData.endTime) {
        const start = formData.startTime + ":00";
        const end = formData.endTime + ":00";
        if (start >= end) {
            errors.endTime = 'שעת הסיום חייבת להיות אחרי שעת ההתחלה';
        }
      }

        if (!formData.topicId) errors.topicId = 'נושא הוא שדה חובה';
        if (!formData.courseId) errors.courseId = 'שם קורס הוא שדה חובה';
        if (!formData.teacherId) errors.teacherId = 'שם מרצה הוא שדה חובה';
        if (!formData.roomId) errors.roomId = 'מספר חדר הוא שדה חובה';
        if (!formData.meetingDate) errors.meetingDate = 'תאריך הוא שדה חובה';
        if (!formData.startTime) errors.startTime = 'שעת התחלה היא שדה חובה';
        if (!formData.endTime) errors.endTime = 'שעת סיום היא שדה חובה';
        if (!formData.year) errors.year = 'שנה היא שדה חובה';

        // Additional validation for edit mode
        if (isEditMode) {
            if (!formData.meetingId) errors.meetingId = 'מספר מפגש הוא שדה חובה';
            if (!formData.topicId) errors.topicId = 'נושא הוא שדה חובה';
            if (!formData.courseId) errors.courseId = 'קורס הוא שדה חובה';
            if (!formData.teacherId) errors.teacherId = 'מרצה הוא שדה חובה';
            if (!formData.roomId) errors.roomId = 'מספר חדר הוא שדה חובה';
            if (!formData.meetingDate) errors.meetingDate = 'תאריך הוא שדה חובה';
            if (!formData.startTime) errors.startTime = 'שעת התחלה היא שדה חובה';
            if (!formData.endTime) errors.endTime = 'שעת סיום היא שדה חובה';
            if (!formData.year) errors.year = 'שנה היא שדה חובה';      
            if (!formData.statusCourseId) errors.statusCourseId = 'סטטוס הוא שדה חובה';
        }

        return errors;
    };


    const isRoomAvailable = (roomId, meetingDate, startTime, endTime, existingMeetings, currentEditMode, currentMeetingId) => {
    if (!roomId || !meetingDate || !startTime || !endTime || !existingMeetings?.length) {
      return true; // If any required data is missing, assume it's available (client-side validation should catch this)
    }

    const roomIdNum = parseInt(roomId, 10);

    return !existingMeetings.some(meeting => {
      // If in edit mode, and this is the meeting being edited, skip it for the availability check
      if (currentEditMode && meeting.meetingId === currentMeetingId) {
        return false;
      }

      return (
        meeting.roomId === roomIdNum &&
        meeting.meetingDate === meetingDate &&
        (
          (startTime >= meeting.startTime && startTime < meeting.endTime) ||
          (endTime > meeting.startTime && endTime <= meeting.endTime) ||
          (startTime <= meeting.startTime && endTime >= meeting.endTime)
        )
      );
    });
  };

  // Helper function for calculating meeting number
  const calculateMeetingNumber = (topicId, meetingDate, allMeetings = []) => {
    const topicMeetings = allMeetings
      .filter(meeting => meeting.topicId === topicId)
      .sort((a, b) => new Date(a.meetingDate) - new Date(b.meetingDate));

    // Find index of current meetingDate in sorted list to get its number
    let count = 0;
    for (let i = 0; i < topicMeetings.length; i++) {
        if (new Date(topicMeetings[i].meetingDate).toDateString() === new Date(meetingDate).toDateString()) {
            count++;
            
        }
    }
    return count > 0 ? count : 1; // Return count or 1 if no prior meetings on this topic/date
  };

  // Helper function to check if meeting is part of system
  const checkIsPartOfSystem = () => {
    return !!(formData.topicId || formData.courseId);
  };

  useEffect(() => {
  // רק אם יש לנו את כל הנתונים הנדרשים
  if (formData.topicId || formData.courseId) {
    const selectedTopic = topics.find(t => t.topicId === parseInt(formData.topicId));
    const selectedCourse = courses.find(c => c.courseId === parseInt(formData.courseId));
    const selectedRoom = rooms.find(r => r.roomId === parseInt(formData.roomId));
    
    // בדיקת תקינות השיבוץ
    const validationResult = isShivutzInvalid(formData, selectedTopic, selectedCourse, selectedRoom);
    
    // עדכון הטופס עם התוצאות
    setFormData(prev => ({
      ...prev,
      isValid: !validationResult.isInvalid,
      reason: validationResult.isInvalid ? validationResult.reasons.join('; ') : null
    }));
    
    // עדכון רשימת הסיבות עבור התצוגה
    setInvalidReasons(validationResult.reasons);
  }
}, [formData.topicId, formData.courseId, formData.roomId, formData.meetingDate, formData.startTime, formData.endTime, topics, courses, rooms]);


//פונקציה לבדיקת שיבוץ תקין
  const isShivutzInvalid = (meeting, topic, course, room) => {
  const reasons = [];
  
  if (!meeting.meetingDate || !meeting.startTime) {
    return { isInvalid: false, reasons: [] }; // אם אין תאריך או שעה, לא בודקים
  }

  const meetingDate = new Date(meeting.meetingDate);
  const dayId = meetingDate.getDay() + 1; // המרה ל-dayId כמו בשרת (1-7)
  const startTime = meeting.startTime.substring(0, 5); // "HH:mm"

  // 1. בדיקת התאמה לפי נושא (אם המפגש חלק מנושא)
  if (topic && meeting.topicId) {
    // בדיקת התאמת יום ושעה לנושא
    const topicSchedules = topic.scheduleForTopics || [];
    const matchedTime = topicSchedules.some(s =>
      s.dayId === dayId &&
      s.startTime <= startTime &&
      s.endTime > startTime
    );

    if (!matchedTime && topicSchedules.length > 0) {
      reasons.push("המפגש אינו מתקיים ביום או בשעה המוגדרים לנושא");
    }

    // בדיקת מאפייני חדר לנושא
    if (room) {
      const missingFeatures = [];
      
      if (topic.computers && !room.computers) {
        missingFeatures.push("מחשבים");
      }
      if (topic.projector && !room.projector) {
        missingFeatures.push("מקרן");
      }
      if (topic.microphone && !room.speakers) {
        missingFeatures.push("מערכת הגברה");
      }

      if (missingFeatures.length > 0) {
        reasons.push(`החדר אינו מתאים למאפייני הנושא הנדרשים: ${missingFeatures.join(", ")}`);
      }
    }
  }

  // 2. בדיקת התאמה לפי קורס (אם המפגש חד פעמי וחלק מקורס)
  if (!meeting.isPartOfSchedule && course && meeting.courseId) {
    const courseDays = course.daysForCourses || [];
    const matchedDay = courseDays.some(d =>
      d.dayId === dayId &&
      d.startTime <= startTime &&
      d.endTime > startTime
    );

    if (!matchedDay && courseDays.length > 0) {
      reasons.push("המפגש אינו מתקיים ביום או בשעה המוגדרים לקורס");
    }
  }

  // 3. בדיקת קיבולת חדר מול כמות תלמידים (אם המפגש משויך לקורס)
  if (course && room && meeting.courseId) {
    if (course.numberOfStudents > room.capacity) {
      reasons.push(`כמות התלמידים בקורס (${course.numberOfStudents}) גדולה מקיבולת החדר (${room.capacity})`);
    }
  }

  return {
    isInvalid: reasons.length > 0,
    reasons: reasons
  };
};

const handleSaveMeeting = async () => {
  const formatTime = (timeStr) => {
  return timeStr.length === 5 ? `${timeStr}:00` : timeStr;
};
    // Clear previous errors
    setValidationErrors({});
    setInvalidReasons([]);
    
    // Validate form
    const errors = validateForm();
    console.log("Validation Errors:", errors);
    setValidationErrors(errors);
    

    if (Object.keys(errors).length > 0) {
        // הכנס כאן את השינוי
        const errorMessages = Object.values(errors).join('\n'); // יחבר את כל הודעות השגיאה לשורה אחת עם מעברי שורה
        showDialog(
            'error', // סוג הדיאלוג יהיה "שגיאה"
            'שגיאות בטופס', // כותרת הדיאלוג
            `אנא מלא את כל שדות החובה ותקן את השגיאות הבאות:\n${errorMessages}`, // הודעה מפורטת
            false, // לא נציג כפתור ביטול בהודעת שגיאת ולידציה פשוטה
            closeDialog
        );
        return;
    }

    try {
      
         // בדיקת זמינות חדר
        if (!isRoomAvailable(
            parseInt(formData.roomId), 
            formData.meetingDate, 
            formData.startTime, 
            formData.endTime, 
            meetings, 
            isEditMode,
            formData.meetingId
        )) {
            setValidationErrors(prev => ({ 
                ...prev, 
                roomId: 'החדר אינו פנוי בתאריך ובשעות המבוקשות' 
            }));
            showDialog(
            'error', // סוג הדיאלוג
            'שגיאת זמינות חדר', // כותרת
            'החדר אינו פנוי בתאריך ובשעות המבוקשות', // הודעה
            false, // showCancel
            closeDialog // פונקציית onConfirm
        );
            return;
          }
      
      

        // חישוב מס' מפגש
        let meetingNumberForTopic = 1;
        if (formData.topicId && formData.courseId) {
            meetingNumberForTopic = calculateMeetingNumber(parseInt(formData.topicId), formData.meetingDate, meetings);
        }

        if (isEditMode && !formData.isValid && formData.reason){
         showDialog(
            'warning',
            'שיבוץ לא תקין',
            `האם לשמור את המפגש למרות שהשיבוץ לא תקין?\n${formData.reason}`,
            true,
            () => {
                closeDialog();
                proceedWithSave(meetingNumberForTopic);
            },
            () => {
                closeDialog();
            }
        );
        return;
    }
    
          await proceedWithSave(meetingNumberForTopic);

    } catch (error) {
      console.error('Failed to save meeting:', error);
      
      /*
      let errorMessage = isEditMode ? 'שגיאה בעדכון המפגש במערכת' : 'שגיאה בשמירת המפגש במערכת';
      
      if (typeof error === 'string') {
        errorMessage = error;
      } else if (error?.response?.data) {
        const apiError = error.response.data;
        if (typeof apiError === 'string') {
          errorMessage = `שגיאה מהשרת: ${apiError}`;
        } else if (apiError.errors) {
          const validationMessages = Object.entries(apiError.errors)
            .map(([field, messages]) => `${field}: ${messages.join(', ')}`)
            .join('\n');
          errorMessage = `שגיאות ולידציה:\n${validationMessages}`;
        } else if (apiError.title || apiError.detail) {
          errorMessage = `שגיאה: ${apiError.title || apiError.detail}`;
        }
      } else if (error.message) {
        errorMessage = `שגיאה: ${error.message}`;
      }

      showDialog('error', 'שגיאה בשמירה', errorMessage, false, closeDialog); 
    }
      */
     let errorMessage = 'עריכת מפגש נכשלה';
      
      if (typeof error === 'string') {
        errorMessage = `עריכת מפגש נכשלה - ${error}`;
      } else if (error?.response?.data) {
        const apiError = error.response.data;
        if (typeof apiError === 'string') {
          errorMessage = `עריכת מפגש נכשלה - ${apiError}`;
        } else if (apiError.errors) {
          const validationMessages = Object.entries(apiError.errors)
            .map(([field, messages]) => `${field}: ${messages.join(', ')}`)
            .join('\n');
          errorMessage = `עריכת מפגש נכשלה - שגיאות ולידציה:\n${validationMessages}`;
        } else if (apiError.title || apiError.detail) {
          errorMessage = `עריכת מפגש נכשלה - ${apiError.title || apiError.detail}`;
        }
      } else if (error.message) {
        errorMessage = `עריכת מפגש נכשלה - ${error.message}`;
      }

      showDialog('error', 'שגיאה', errorMessage, false, closeDialog); 
    }
  };



  // Separate function to handle the actual save logic
  //const proceedWithSave = async (validationResult, meetingNumberForTopic) => {
    const proceedWithSave = async (meetingNumberForTopic) => {
    const formatTime = (timeStr) => {
      return timeStr.length === 5 ? `${timeStr}:00` : timeStr;
    };

    // Calculate day ID from meeting date
    const meetingDateObj = new Date(formData.meetingDate);
    const dayId = meetingDateObj.getDay() + 1;

    // Prepare DTO - נתונים נקיים לשרת
    var meetingDTO = {
      topicId: formData.topicId ? Number(formData.topicId) : null,
      courseId: formData.courseId ? Number(formData.courseId) : null,
      teacherId: formData.teacherId ? Number(formData.teacherId) : null,
      roomId: Number(formData.roomId),
      startTime: formatTime(formData.startTime),
      endTime: formatTime(formData.endTime),
      meetingDate: dayjs(formData.meetingDate).format("YYYY-MM-DD"),
      meetingNumberForTopic: formData.meetingNumberForTopic || meetingNumberForTopic,
      //isValid: validationResult.reasons.length === 0,
      year: parseInt(formData.year, 10),
      dayId: dayId,
      isPartOfSchedule: formData.isPartOfSchedule ?? false,
      scheduleForTopicId: formData.scheduleForTopicId ? parseInt(formData.scheduleForTopicId, 10) : null,
      //reason: validationResult.reasons.join('\n') || formData.reason || '',
      statusCourseId: formData.statusCourseId && Number(formData.statusCourseId) > 0 ? Number(formData.statusCourseId) : undefined
    };

     // כלול את ה-reason רק אם isValid הוא false
    if (!formData.isValid && formData.reason) {
        meetingDTO.reason = formData.reason;
    } else {
        meetingDTO.reason = null; // או מחרוזת ריקה, תלוי בציפיית השרת
    }

    
    meetingDTO = isEditMode ? {...meetingDTO, meetingId: Number(formData.meetingId)} : meetingDTO;

    console.log("Sending meeting data:", meetingDTO);
    console.log("DTO being sent to server:", JSON.stringify(meetingDTO, null, 2));

    // Dispatch action
    const action = isEditMode ? updateMeetingAction : addMeetingAction;
    const resultAction = await dispatch(action(meetingDTO));
    
    // בדיקה מתוקנת - בהתבסס על מבנה Redux Toolkit
    if (addMeetingAction.fulfilled.match(resultAction) || updateMeetingAction.fulfilled.match(resultAction)) {
      console.log('Meeting saved successfully:', resultAction.payload);


      // קביעת הודעת הצלחה
      let successMessage = 'שמירת הנתונים הסתיימה בהצלחה';
      
      // אם השיבוץ לא תקין, הוסף פירוט
      if (!formData.isValid && formData.reason) {
        successMessage += `\nשיבוץ לא תקין: ${formData.reason}`;
      }
      
      // Show success dialog
      showDialog(
        'success', 
        'שמירת מפגש', 
        successMessage,
        //'שמירה בוצעה בהצלחה', 
        //isEditMode ? 'המפגש עודכן בהצלחה!' : 'המפגש נוסף בהצלחה למערכת!',
        false,
        () => {
          closeDialog();
          if (!isEditMode) {
            // איפוס הטופס כמו בדף המקורי
            setFormData({
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
            });
          }
          navigate(-1);
        }
      );
    } else {
      throw new Error(resultAction.payload || resultAction.error?.message || 'Unknown error');
    }
  };


  // Topic options filtered by selected course
  const filteredTopics = formData.courseId
    ? topics.filter(topic => topic.courseId === parseInt(formData.courseId, 10))
    : topics;

  // סגנון משותף לכל שדות הטקסט
  const textFieldStyle = {
    width: 200,
    height: 45,
    '& .MuiInputBase-root': {
      height: 45,
    },
    '& .MuiOutlinedInput-root': {
      height: 45,
      '& fieldset': {
        borderBottom: '1px solid #C6C6C6',
        borderTop: 'none',
        borderLeft: 'none',
        borderRight: 'none',
        borderRadius: 0,
      },
      '&:hover fieldset': {
        borderBottom: '1px solid #C6C6C6',
      },
      '&.Mui-focused fieldset': {
        borderBottom: '1px solid #C6C6C6',
      },
    },
    '& .MuiInput-underline:before': {
        borderBottom: '1px solid #C6C6C6',
      },
      '& .MuiInput-underline:after': {
        borderBottom: '1px solid #C6C6C6',
      },
    };

     // סגנון לכפתור ביטול
     const cancelButtonStyle = {
      width: '83px',
      height: '44px',
      position: 'relative',
      top: '84px',
      left: '130px',
      borderRadius: '50px',
      border: '1px solid #326DEF',
      paddingRight: '24px',
      paddingLeft: '24px',
      color: '#326DEF',
      backgroundColor: 'transparent',
      textTransform: 'none',
      fontWeight: 'normal'
};

// סגנון לכפתור שמירה
const saveButtonStyle = {
  width: '82px',
  height: '44px',
  position: 'relative',
  top: '84px',
  left: '80px',
  borderRadius: '50px',
  paddingRight: '24px',
  paddingLeft: '24px',
  backgroundColor: '#326DEF',
  textTransform: 'none',
  '&:hover': {
    backgroundColor: '#326DEF',
  }
};




  return (
   <>
      <h2>{isEditMode ? 'עריכת מפגש' : 'הוספת מפגש'}</h2>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: '0px', mb: 15}}>
        <Button
          variant="outlined"
          onClick={handleCancel}
          sx={cancelButtonStyle}
        >
          ביטול
        </Button>
        <Button
            variant="contained"
            onClick={handleSaveMeeting}
            sx={saveButtonStyle}
        >
          שמור
        </Button>
      </Box>

        <Container
        maxWidth="lg"
        sx={{
          maxWidth: '1476px',
          backgroundColor: '#FFFFFF',
          borderRadius: '10px',
          padding: '30px',
          boxShadow: '0px 0px 4px 0px #DCE2ECCC',
          marginTop: '20px'
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" component="h2">
            פרטים טכניים
          </Typography>
        </Box>

        <form>
          <Grid container spacing={6} sx={{ flexWrap: 'wrap' }}>
          
            {/* שדה קורס עם Autocomplete */}
            <Grid item xs={3}>
              <Autocomplete
                options={courses}
                getOptionLabel={(option) => option.name}
                value={courses.find(c => c.courseId === formData.courseId) || null}
                onChange={(e, newValue) => {
                  setFormData((prev) => ({
                    ...prev,
                    courseName: newValue?.name || '',
                    courseId: newValue?.courseId || ''
                  }));
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="שם קורס"
                    error={!!validationErrors.courseId}
                    helperText={validationErrors.courseId}
                    sx={textFieldStyle}
                    required
                  />
                )}
              />
            </Grid>
               {/* שדה נושא עם Autocomplete כמו בדף המקורי */}
            <Grid item xs={3}>
              <Autocomplete
                options={filteredTopics}
                getOptionLabel={(option) => option.name}
                value={filteredTopics.find(t => t.topicId === formData.topicId) || null}
                onChange={(e, newValue) => {
                  setFormData((prev) => ({
                    ...prev,
                    topicName: newValue?.name || '',
                    topicId: newValue?.topicId || '',
                    meetingNumberForTopic: newValue?.numberOfMeetings || '',
                  }));
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="שם נושא"
                    error={!!validationErrors.topicId}
                    helperText={validationErrors.topicId}
                    sx={textFieldStyle}
                    required
                  />
                )}
              />
            </Grid>

           {/* שדה מרצה עם Autocomplete וסינון */}
<Grid item xs={3}>
  <Autocomplete
    options={users.filter(user => user.userTypeId === 4)} // תיקון: user במקום users
    getOptionLabel={(option) => option.name}
    value={users.find(u => u.userId === formData.teacherId) || null}
    onChange={(e, newValue) => {
      setFormData((prev) => ({
        ...prev,
        teacherName: newValue?.name || '',
        teacherId: newValue?.userId || ''
      }));
    }}
    renderInput={(params) => (
      <TextField
        {...params}
        label="שם מרצה"
        error={!!validationErrors.teacherId}
        helperText={validationErrors.teacherId}
        sx={textFieldStyle}
        required
      />
    )}
  />
</Grid>
            {/* שדה חדר עם Autocomplete */}
            <Grid item xs={3}>
              <Autocomplete
                options={rooms}
                getOptionLabel={(option) => option.name}
                value={rooms.find(r => r.roomId === formData.roomId) || null}
                onChange={(e, newValue) => {
                  setFormData((prev) => ({
                    ...prev,
                    roomId: newValue?.roomId || ''
                  }));
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="מספר חדר"
                    error={!!validationErrors.roomId}
                    helperText={validationErrors.roomId}
                    sx={textFieldStyle}
                    required
                  />
                )}
              />
            </Grid>

             <Grid item xs={3}>
              <TextField
                label="תאריך"
                name="meetingDate"
                type="date"
                value={formData.meetingDate || ''}
                onChange={handleChange}
                error={!!validationErrors.meetingDate}
                helperText={validationErrors.meetingDate}
                margin="none"
                required
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                sx={textFieldStyle}
              />
            </Grid>
          

            <Grid item xs={3}>
              <TextField
                label="שנה"
                name="year"
                value={formData.year || ''}
                onChange={handleChange}
                error={!!validationErrors.year}
                helperText={validationErrors.year}
                margin="none"
                required
                variant="outlined"
                sx={textFieldStyle}
              />
            </Grid>

          

            <Grid item xs={3}>
              <TextField
                label="שעת התחלה"
                name="startTime"
                type="time"
                value={formData.startTime || ''}
                onChange={handleChange}
                error={!!validationErrors.startTime}
                helperText={validationErrors.startTime}
                margin="none"
                required
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                sx={textFieldStyle}
              />
            </Grid>

            <Grid item xs={3}>
              <TextField
  label="שעת סיום"
  name="endTime"
  type="time"
  value={formData.endTime || ''}
  onChange={handleChange}
  error={!!validationErrors.endTime}
  helperText={validationErrors.endTime}
  margin="none"
  required
  InputLabelProps={{ shrink: true }}
  variant="outlined"
  sx={textFieldStyle}
/>
</Grid>


        {/* שדות רק לעורכים */}
        {isEditMode && (
          <>
            <Grid item xs={3}>
              <TextField
                label="מספר מפגש"
                name="meetingId"
                value={formData.meetingId || ''}
                onChange={handleChange}
                margin="none"
                variant="outlined"
                fullWidth
                disabled={isEditMode}
                sx={textFieldStyle}
              />
            </Grid>

            <Grid item xs={3}>
              <FormControl fullWidth error={!!validationErrors.statusId}>
                <InputLabel>סטטוס</InputLabel>
               <Select
               name="statusCourseId"
               value={formData.statusCourseId || ''}
               onChange={handleChange}
               label="סטטוס"
               >
                {statusOptions.map((status) => (
                  <MenuItem key={status.statusCourseId} value={status.statusCourseId}>
                    {status.name}
                    </MenuItem>
                  ))}
                  </Select>
                {validationErrors.statusCourseId && (
                  <Typography variant="caption" color="error">{validationErrors.statusCourseId}</Typography>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={3}>
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      height: '56px', // התאמה לגובה TextField
      direction: 'ltr',
      gap: 1,
    }}
  >
    <Box
      sx={{
        width: '18px',
        height: '20px',
        border: '1px solid #ccc',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '20px',
        fontWeight: 300,
        fontFamily: 'Font Awesome 6 Pro',
        lineHeight: '100%',
      }}
    >
      <FontAwesomeIcon icon={faXmark} />
    </Box>
    <Typography
      variant="body1"
      sx={{
        fontSize: '16px',
        fontWeight: 400,
      }}
      disabled={isEditMode}
    >
      שיבוץ תקין
    </Typography>
  </Box>
</Grid>

<Grid item xs={10} sm={6}>
    <TextField
        label="סיבה"
        name="reason"
        value={formData.reason || ''}
        margin="none"
        variant="outlined"
        fullWidth
        multiline
        rows={2}
        sx={{
            ...textFieldStyle,
            // עיצוב מיוחד כשהשדה לא תקין
            ...(formData.reason && !formData.isValid && {
                '& .MuiOutlinedInput-root': {
                    backgroundColor: '#fff3cd',
                    '& fieldset': {
                        borderColor: '#ffc107',
                    }
                }
            })
        }}
        // השדה תמיד disabled - רק השרת קובע את הסיבה
        disabled={true}
        // הצגת הודעת עזרה
        helperText={
            formData.reason 
                ? "הסיבה מחושבת אוטומטית על פי כללי תקינות השיבוץ" 
                : formData.isValid 
                    ? "השיבוץ תקין" 
                    : "לא נמצאו בעיות בשיבוץ"
        }
        // צבע הודעת העזרה
        FormHelperTextProps={{
            sx: {
                color: formData.reason ? '#856404' : formData.isValid ? '#155724' : '#6c757d'
            }
        }}
    />
</Grid>



            <Grid  item xs={12} md={2} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <FormControlLabel
      control={
        <Switch
          checked={checkIsPartOfSystem()}
          disabled
          color="primary"
        />
      }
      label="חלק מהמערכת"
      labelPlacement="start"
    />
    </Grid>
          </>

          
        )}

</Grid>
</form>
</Container>

 <Dialog
        open={dialog.open}
        onClose={dialog.showCancel ? closeDialog : dialog.onConfirm}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        dir="rtl" // Set direction for RTL
      >
        <DialogTitle id="alert-dialog-title" sx={{ textAlign: 'center', pt: 4, pb: 0 }}>
          {getDialogIcon()}
          <Typography variant="h5" component="div" sx={{ mb: 1 }}>
            {dialog.title}
          </Typography>
          <IconButton
            aria-label="close"
            onClick={dialog.showCancel ? closeDialog : dialog.onConfirm}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <FontAwesomeIcon icon={faXmark} />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ textAlign: 'center' }}>
          <DialogContentText id="alert-dialog-description" sx={{ whiteSpace: 'pre-line' }}>
            {dialog.message}
          </DialogContentText>
          {invalidReasons.length > 0 && (
            <Box sx={{ mt: 2, p: 2, border: '1px solid #ff9800', borderRadius: '4px', backgroundColor: '#fff3e0' }}>
              <Typography variant="subtitle1" color="text.secondary">
                סיבות לאי-תקינות:
              </Typography>
              <ul style={{ listStyleType: 'none', padding: 0, margin: 0, textAlign: 'right' }}>
                {invalidReasons.map((reason, index) => (
                  <li key={index} style={{ marginBottom: '4px' }}>
                    - {reason}
                  </li>
                ))}
              </ul>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ justifyContent: dialog.showCancel ? 'space-between' : 'center', px: 3, pb: 3 }}>
          {dialog.showCancel && (
            <Button onClick={dialog.onCancel} variant="outlined" color="primary">
              ביטול
            </Button>
          )}
          <Button onClick={dialog.onConfirm} variant="contained" color="primary" autoFocus>
            אישור
          </Button>
        </DialogActions>
      </Dialog>
</>

  )};


export default MeetingForm;