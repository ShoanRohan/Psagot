import React, { useState, useEffect } from 'react';
import {
  Button, TextField, Grid, Box, Typography, Container,
  Autocomplete, Dialog, DialogActions, IconButton, InputAdornment,
  FormControlLabel, Switch
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import dayjs from 'dayjs';

// ייבוא הפונקציות לשליפת נתונים מהבאקנד
import { fetchAllRooms } from '../features/room/roomActions';
import { fetchAllCourses } from '../features/course/courseActions';
import { fetchAllTopic } from '../features/topic/topicActions';
import { fetchAllUsers } from '../features/user/userAction';
import { fetchAllMeetings, addMeetingAction, updateMeetingAction } from '../features/meeting/meetingActions';
import { clearError } from '../features/meeting/meetingSlice';

// ייבוא תמונת החץ של שדות ה OPTIONS
import ChevronDownIcon from '../assets/icons/chevron-down.png';

const MeetingForm = ({ meeting: propMeeting, onSave, onCancel }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();


  const meetingFromState = location.state?.meeting;

  const { meetingId } = useParams();
  const isEditMode = meetingId ? true : false;

  const { meetings, isLoading, error: reduxError } = useSelector(state => state.meeting);
  const rooms = useSelector(state => state.room.rooms || []);
  const courses = useSelector(state => state.course.courses || []);
  const topics = useSelector(state => state.topic.topics || []);
  const users = useSelector(state => state.user.user || []);

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
  const [validationErrors, setValidationErrors] = useState({});
  const [invalidReasons, setInvalidReasons] = useState([]);
  const [statusOptions, setStatusOptions] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);



  const [dialog, setDialog] = useState({
    open: false,
    type: 'success', // 'success', 'error', 'warning', 'info'
    title: '',
    message: '',
    showCancel: false, // האם להראות כפתור ביטול
    onConfirm: null, // מה לעשות בלחיצה על אישור
    onCancel: null  // מה לעשות בלחיצה על ביטול
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


  //עדכון פרטי השדות ב CONSOLE
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


  //פוקציה שמראה את תוכן ה POP UP
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

  // פונקציה סגירת הודעת ה POP UP
  const closeDialog = () => {
    setDialog(prev => ({ ...prev, open: false }));
  };


  //פונקציה לעדכון שדות מכמה סיבות
  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedFormData = { ...formData, [name]: value };

    // אתחול נושא אם בחירת הקורס משתנה
    if (name === 'courseId') {
      updatedFormData.topicId = '';
      updatedFormData.meetingNumberForTopic = 1;
    }

    // אתחול מספר המפגש אם הנושא משתנה
    if (name === 'topicId') {
      updatedFormData.meetingNumberForTopic = 1;
    }

    // עדכון חלק מהמערכת לפי בחירת הנושא או הקורס
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

  //שליפת שדות הסטטוס מהבקאנד
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


  //בדיקת תקינות הטפסים
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

    //שדות חובה בהוספת מפגש
    if (!formData.topicId) errors.topicId = ' שדה חובה';
    if (!formData.courseId) errors.courseId = ' שדה חובה';
    if (!formData.teacherId) errors.teacherId = ' שדה חובה';
    if (!formData.roomId) errors.roomId = ' שדה חובה';
    if (!formData.meetingDate) errors.meetingDate = ' שדה חובה';
    if (!formData.startTime) errors.startTime = ' שדה חובה';
    if (!formData.endTime) errors.endTime = ' שדה חובה';
    if (!formData.year) errors.year = ' שדה חובה';

    //שדות חובה נוספים בעריכת מפגש
    if (isEditMode) {
      if (!formData.meetingId) errors.meetingId = ' שדה חובה';
      if (!formData.statusCourseId) errors.statusCourseId = ' שדה חובה';
    }

    return errors;
  };


  const isRoomAvailable = (roomId, meetingDate, startTime, endTime, existingMeetings, currentEditMode, currentMeetingId) => {
    if (!roomId || !meetingDate || !startTime || !endTime || !existingMeetings?.length) {
      return true; // אם חסר איזשהו שדה חובה, תניח שהחדר פנוי
    }

    const roomIdNum = parseInt(roomId, 10);

    return !existingMeetings.some(meeting => {
      // אם המפגש נמצא במצב עריכה ואתה עורך אותו, הוא בודק לך ישר את מצב הזמינות
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

  // פונקציה לחישוב מספר מפגש
  const calculateMeetingNumber = (topicId, meetingDate, allMeetings = []) => {
    const topicMeetings = allMeetings
      .filter(meeting => meeting.topicId === topicId)
      .sort((a, b) => new Date(a.meetingDate) - new Date(b.meetingDate));

    // מצא את האינדקס של תאריך הפגישה הנוכחי ברשימה, כדי לקבל את המספר של המפגש
    let count = 0;
    for (let i = 0; i < topicMeetings.length; i++) {
      if (new Date(topicMeetings[i].meetingDate).toDateString() === new Date(meetingDate).toDateString()) {
        count++;

      }
    }
    return count > 0 ? count : 1; //תחזיר COUNT או 1 אם לא היו פגישות קודמות בנושא/ בתאריך הנוכחי
  };

  // בדיקת אם מפגש הוא חלק מהמערכת
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

    // הסרת שגיאות קודמות/ סיבות לאי תקינות
    setValidationErrors({});
    setInvalidReasons([]);

    // בדיקת תקינות הטופס והחזרת שגיאה במקרה הצורך
    const errors = validateForm();
    console.log("Validation Errors:", errors);


    if (Object.keys(errors).length > 0) {
      // הצגת שגיאות אם לא מילאו שדות חובה
      setValidationErrors(errors);
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

      if (isEditMode && !formData.isValid && formData.reason) {
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



  // פונקציה לשמירת  השינויים
  const proceedWithSave = async (meetingNumberForTopic) => {
    //אם השעה היא 5 ספרות כולל : נוסף לשניות 00, כי TIMEONLY שמגדיר את שעת ההתחלה ושעת הסיום מכיל גם שניות
    const formatTime = (timeStr) => {
      return timeStr.length === 5 ? `${timeStr}:00` : timeStr;
    };

    // חישוב היום לפי התאריך
    const meetingDateObj = new Date(formData.meetingDate);
    const dayId = meetingDateObj.getDay() + 1;

    //  נתונים נקיים לשרת
    var meetingDTO = {
      topicId: formData.topicId ? Number(formData.topicId) : null,
      courseId: formData.courseId ? Number(formData.courseId) : null,
      teacherId: formData.teacherId ? Number(formData.teacherId) : null,
      roomId: Number(formData.roomId),
      startTime: formatTime(formData.startTime),
      endTime: formatTime(formData.endTime),
      meetingDate: dayjs(formData.meetingDate).format("YYYY-MM-DD"),
      meetingNumberForTopic: formData.meetingNumberForTopic || meetingNumberForTopic,
      year: parseInt(formData.year, 10),
      dayId: dayId,
      isPartOfSchedule: formData.isPartOfSchedule ?? false,
      scheduleForTopicId: formData.scheduleForTopicId ? parseInt(formData.scheduleForTopicId, 10) : null,
      statusCourseId: formData.statusCourseId && Number(formData.statusCourseId) > 0 ? Number(formData.statusCourseId) : undefined
    };

    // כלול את ה-reason רק אם isValid הוא false
    if (!formData.isValid && formData.reason) {
      meetingDTO.reason = formData.reason;
    } else {
      meetingDTO.reason = null; // או מחרוזת ריקה, תלוי בציפיית השרת
    }


    meetingDTO = isEditMode ? { ...meetingDTO, meetingId: Number(formData.meetingId) } : meetingDTO;

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

      // הצגת הודעה בעת שמירת המפגש
      showDialog(
        'success',
        'שמירת מפגש',
        successMessage,
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


  // מיון הנושאים לפי הקוס שבחרנו
  const filteredTopics = formData.courseId
    ? topics.filter(topic => topic.courseId === parseInt(formData.courseId, 10))
    : topics;

  // סגנון משותף לכל שדות הטקסט
  const textFieldStyle = {
    width: 250,
    height: 45,
    '& .MuiInputBase-root': {
      height: 45,
      display: 'flex', // חשוב כדי לאפשר שליטה ביישור
      alignItems: 'center', // ממורכז אנכית
    },
    '& .MuiInputBase-input': {
      flexGrow: 1, // מאפשר לטקסט לתפוס כמה שיותר מקום
      textAlign: 'right', // דוחף את הטקסט לימין
      paddingRight: '10px !important', // פדינג ימני קטן, לדחוף את הטקסט קצת ימינה
      paddingLeft: '8px !important', // פדינג שמאלי גדול, כדי לפנות מקום לאייקון
      // חשוב להשתמש ב-!important כדי לוודא שזה גובר על סגנונות ברירת מחדל של Material-UI
    },
    '& .MuiOutlinedInput-root': {
      height: 45,
      '& fieldset': {
        borderBottom: '1px solid rgba(198,198,198,1)',
        borderTop: 'none',
        borderLeft: 'none',
        borderRight: 'none',
        borderRadius: 0,
      },
      '&:hover fieldset': {
        borderBottom: '1px solid rgba(198,198,198,1)',
      },
      '&.Mui-focused fieldset': {
        borderBottom: '1px solid rgba(198,198,198,1)',
      },
    },
  }

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

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: '0px', mb: 15 }}>
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
        maxWidth={false}
        sx={{
          maxWidth: '1200px',
          width: '100%',
          minHeight: '434px',
          backgroundColor: '#FFFFFF',
          borderRadius: '10px',
          paddingTop: '20px',
          paddingRight: '30px',
          paddingBottom: '40px',
          paddingLeft: '30px',
          boxShadow: '0px 0px 4px rgba(220,226,236,0.8)',
          display: 'flex',
          flexDirection: 'column',
          gap: '32px',
          mt: '20px',
          mx: 'auto', // מרכז את הקונטיינר
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
                    placeholder="שם קורס"
                    error={!!validationErrors.courseId}
                    helperText={validationErrors.courseId}
                    sx={textFieldStyle}
                    required
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <InputAdornment position="end">
                          <Box
                            component="img"
                            src={ChevronDownIcon}
                            alt="Chevron"
                            sx={{
                              width: '26px',
                              height: '25px',
                            }}
                          />
                        </InputAdornment>

                      )
                    }}
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
                    placeholder="שם נושא"
                    error={!!validationErrors.topicId}
                    helperText={validationErrors.topicId}
                    sx={textFieldStyle}
                    required
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <InputAdornment position="end">
                          <Box
                            component="img"
                            src={ChevronDownIcon}
                            alt="Chevron"
                            sx={{
                              width: '26px',
                              height: '25px',
                            }}
                          />
                        </InputAdornment>
                      )
                    }}
                  />
                )}
              />
            </Grid>

            {/* שדה מרצה עם Autocomplete וסינון */}
            <Grid item xs={3}>
              <Autocomplete
                options={users.filter(user => user.userTypeId === 4)}
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
                    placeholder="שם מרצה"
                    error={!!validationErrors.teacherId}
                    helperText={validationErrors.teacherId}
                    sx={textFieldStyle}
                    required
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <InputAdornment position="end">
                          <Box
                            component="img"
                            src={ChevronDownIcon}
                            alt="Chevron"
                            sx={{
                              width: '26px',
                              height: '25px',
                            }}
                          />
                        </InputAdornment>
                      )
                    }}
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
                    placeholder="מספר חדר"
                    error={!!validationErrors.roomId}
                    helperText={validationErrors.roomId}
                    sx={textFieldStyle}
                    required
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <InputAdornment position="end">
                          <Box
                            component="img"
                            src={ChevronDownIcon}
                            alt="Chevron"
                            sx={{
                              width: '26px',
                              height: '25px',
                            }}
                          />
                        </InputAdornment>
                      )
                    }}
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
                InputLabelProps={{ shrink: true }}
                required
                variant="outlined"
                sx={{
                  ...textFieldStyle,
                  '& .MuiInputAdornment-root': {
                    marginLeft: '8px',
                  },
                }}
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
                  <Autocomplete
                    options={statusOptions}
                    getOptionLabel={(option) => option.name}
                    value={
                      statusOptions.find((status) => status.statusCourseId === formData.statusCourseId) || null
                    }
                    onChange={(e, newValue) => {
                      setFormData((prev) => ({
                        ...prev,
                        statusCourseId: newValue?.statusCourseId || ''
                      }));
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        placeholder="סטטוס"
                        error={!!validationErrors.statusCourseId}
                        helperText={validationErrors.statusCourseId}
                        required
                        sx={{
                          ...textFieldStyle,
                          '& .MuiAutocomplete-input': {
                            paddingRight: '40px !important',
                          },
                        }}
                        InputProps={{
                          ...params.InputProps,
                          endAdornment: (
                            <InputAdornment position="end">
                              <Box
                                component="img"
                                src={ChevronDownIcon}
                                alt="Chevron"
                                sx={{
                                  width: '26px',
                                  height: '25px',
                                }}
                              />
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                  />
                </Grid>

                <Grid item>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      flexDirection: 'row-reverse',
                      gap: '6px',
                    }}
                  >
                    <Box
                      sx={{
                        width: '18px',
                        height: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '1px solid #ccc',
                        fontSize: '16px',
                      }}
                    >
                      <FontAwesomeIcon icon={faXmark} />
                    </Box>
                    <Typography
                      sx={{
                        fontSize: '16px',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      שיבוץ תקין
                    </Typography>
                  </Box>
                </Grid>



                <Grid item xs={12} sm={6}>
                  <TextField
                    label="סיבה"
                    name="reason"
                    value={formData.reason || ''}
                    margin="none"
                    variant="standard"
                    fullWidth
                    multiline
                    rows={2}
                    InputProps={{
                      disableUnderline: false,
                    }}
                    sx={{
                      width: '424px',
                      height: '90px',
                      '& .MuiInputBase-root': {
                        borderBottom: '1px solid #C6C6C6',
                      },
                      '& .MuiInputBase-input': {
                        padding: '8px 0',
                      },
                    }}
                    disabled
                    helperText="הסיבה מחושבת אוטומטית על פי כללי תקינות השיבוץ"
                  />
                </Grid>




                <Grid item xs={12} md={2} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
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


      {/* הודעת ה POP UP בעת שמירת מפגש שנערך/ הוסף, עם עיצוב ההודעה*/}
      <Dialog
        open={dialog.open}
        onClose={closeDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        dir="rtl"
        PaperProps={{
          sx: {
            width: '564px',
            minHeight: '261px',
            borderRadius: '10px',
            padding: '40px',
            backgroundColor: '#fff',
            border: '1px solid rgba(198,198,198,1)',
            boxShadow: '0px 0px 4px rgba(220,226,236,0.8)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            boxSizing: 'border-box',
            overflowX: 'hidden' // << הוספנו
          }
        }}
      >
        {/* כותרת שורה עליונה */}
        <Box
          sx={{
            width: '100%', // << חשוב לשים 100%
            maxWidth: '484px',
            height: '21px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 3,
            overflowX: 'hidden' // << ביטול גלילה אופקית
          }}
        >
          {/* טקסט כותרת בצד ימין */}
          <Typography
            id="alert-dialog-title"
            sx={{
              fontSize: '16px',
              fontWeight: 500
            }}
          >
            שמירת מפגש
          </Typography>
          <IconButton
            aria-label="close"
            onClick={closeDialog}
            sx={{
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <FontAwesomeIcon icon={faXmark} />
          </IconButton>
        </Box>

        {/* תוכן הודעה */}
        <Box
          sx={{
            width: '100%',
            maxWidth: '484px',
            minHeight: '136px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '32px',
            textAlign: 'center',
            overflowX: 'hidden'
          }}
        >
          <Typography
            variant="body1"
            sx={{
              fontSize: '16px',
              fontWeight: 400,
              whiteSpace: 'pre-line'
            }}
          >
            {dialog.message}
          </Typography>

          {dialog.reasons && dialog.reasons.length > 0 && (
            <Box
              sx={{
                width: '100%',
                maxWidth: '100%',
                border: '1px solid #ff9800',
                borderRadius: '4px',
                backgroundColor: '#fff3e0',
                padding: '8px',
                overflowX: 'hidden'
              }}
            >
              <Typography variant="subtitle1" color="text.secondary">
                פירוט:
              </Typography>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                textAlign: 'right',
                overflowX: 'hidden'
              }}>
                {dialog.reasons.map((reason, index) => (
                  <li key={index} style={{ marginBottom: '4px' }}>
                    - {reason}
                  </li>
                ))}
              </ul>
            </Box>
          )}
        </Box>

        {/* כפתורים */}
        <DialogActions
          sx={{
            width: '100%',
            maxWidth: '484px',
            justifyContent: 'center',
            gap: '16px',
            marginTop: '32px',
            overflowX: 'hidden'
          }}
        >
          <Button
            onClick={() => {
              if (dialog.onCancel) dialog.onCancel();
              closeDialog();
            }}
            variant="outlined"
            sx={{
              width: '83px',
              height: '44px',
              borderRadius: '50px',
              border: '1px solid rgba(50,109,239,1)',
              paddingLeft: '24px',
              paddingRight: '24px',
              color: 'rgba(50,109,239,1)',
              fontWeight: 500,
              textTransform: 'none'
            }}
          >
            ביטול
          </Button>
          <Button
            onClick={dialog.onConfirm}
            variant="contained"
            sx={{
              width: '82px',
              height: '44px',
              borderRadius: '50px',
              backgroundColor: 'rgba(50,109,239,1)',
              paddingLeft: '24px',
              paddingRight: '24px',
              fontWeight: 500,
              textTransform: 'none',
              '&:hover': {
                backgroundColor: 'rgba(50,109,239,0.9)'
              }
            }}
            autoFocus
          >
            שמור
          </Button>
        </DialogActions>
      </Dialog>

    </>

  )
};


export default MeetingForm;

