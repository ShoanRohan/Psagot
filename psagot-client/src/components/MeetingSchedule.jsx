import React, { useEffect, useRef, useState } from 'react';
import { Box, Modal, Button, Typography, useTheme } from '@mui/material';
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { fetchMeetingByDate } from '../features/meeting/meetingActions';


// export default function MeetingSchedule({ viewType,meetingsSchedule}) {
export default function MeetingSchedule() {
  // ריפרנס לרכיב FullCalendar לגישה ל-API שלו.
  const calendarRef = useRef(null);
  const theme = useTheme();
  const { status } = useSelector((state) => state.meeting); 
  // Hook של React Router לניווט ה events.
  const navigate = useNavigate();  
  const [openError, setOpenError] = useState(false);

  //ניווט קשיח  לצורך בדיקה עד לקבלת הפונקציה
  // const viewType='day';
  // const viewType = 'week';
  const viewType='month';

  //מערך מפגשים קשיח לצורך בדיקה עד לקבלת הפונקציה
  const meetingsSchedule = [
    {
      id: 1,
      courseName: 'JS',
      topicName: 'style',
      date: '2025-07-03',
      startTime: '10:00',
      endTime: '12:00',
      roomName: 'חדר 1',
      courseColor: '#FF0000'
    },
    {
      id: 2,
      courseName: 'react',
      topicName: 'components',
      date: '2025-07-03',
      startTime: '10:00',
      endTime: '11:00',
      roomName: 'חדר 2',
      courseColor: '#0000FF'
    },
    {
      id: 3,
      courseName: 'phyton',
      topicName: 'שיעור פתיחה',
      date: '2025-07-03',
      startTime: '09:00',
      endTime: '11:00',
      roomName: 'חדר 3',
      courseColor: '#008000'
    },
    {
      id: 4,
      courseName: 'ישיבת צוות',
      topicName: 'הנהלה',
      date: '2025-07-06',
      startTime: '18:00',
      endTime: '19:00',
      roomName: 'חדר 4',
    },
    {
      id: 5,
      courseName: 'מתמטיקה',
      topicName: 'פונקציות',
      date: '2025-07-13',
      startTime: '10:00',
      endTime: '11:00',
      roomName: 'חדר 5',
      courseColor: '#FFFF00'
    },
    {
      id: 6,
      courseName: 'היסטוריה',
      topicName: 'ימי הביניים',
      date: '2025-07-23',
      startTime: '17:00',
      endTime: '18:00',
      roomName: 'חדר 6',
      courseColor: '#800080'
    },
    {
      id: 7,
      courseName: 'היסטוריה',
      topicName: 'העת החדשה',
      date: '2025-07-03',
      startTime: '18:20',
      endTime: '20:00',
      roomName: 'חדר 7',
      courseColor: '#800080'
    },
    {
      id: 8,
      courseName: 'מתמטיקה',
      topicName: 'סטטיסטיקה ',
      date: '2025-06-24',
      startTime: '10:00',
      endTime: '11:00',
      roomName: 'חדר 8',
      courseColor: '#FFFF00'
    },
  ];

  //דואג שהטבלה תקבל נתונים עדכניים בכל עת
  useEffect(() => {
    const calendarApi = calendarRef.current?.getApi();

    // if (status === 'idle') {
    //   dispatch(fetchMeetingByDate());
    // }
    if (status === 'failed') {
      setOpenError(true);
    }
    if (calendarApi && meetingsSchedule.length > 0) {
      calendarApi.refetchEvents();
    }
  }, [status,meetingsSchedule]);

 
  const lightenColor = (hex, factor) => {
    //ברירת מחדל לאפור
    if (!hex) return '#cccccc'; 
    let color = parseInt(hex.slice(1), 16);
    let r = Math.min(255, Math.round(((color >> 16) & 0xFF) + (255 - ((color >> 16) & 0xFF)) * factor)).toString(16).padStart(2, '0');
    let g = Math.min(255, Math.round(((color >> 8) & 0xFF) + (255 - ((color >> 8) & 0xFF)) * factor)).toString(16).padStart(2, '0');
    let b = Math.min(255, Math.round((color & 0xFF) + (255 - (color & 0xFF)) * factor)).toString(16).padStart(2, '0');
    return `#${r}${g}${b}`;
  };

  //מטפלת בעיצוב האירועים
  const handleEventDidMount = (info) => {
    const eventElement = info.el;
    const now = new Date();
    const eventEnd = new Date(info.event.end);
    // מבהיר אירועים שכבר הסתיימו.
    if (eventEnd < now) {
      eventElement.style.opacity = "0.6";
    }
    // קובע את צבע הקורס, ברירת מחדל לאפור אם לא צוין.
    let courseColor = info.event.backgroundColor;
    if (!courseColor || courseColor === '') {
      courseColor = '#cccccc';
    }
    // מיישם עיצוב מותאם אישית על אלמנט האירוע.
    const lightCourseColor = lightenColor(courseColor, 0.8);
    eventElement.style.backgroundColor = lightCourseColor;
    eventElement.style.borderRight = `6px solid ${courseColor}`; 
    eventElement.style.borderRadius = "8px";
  };

  //מטפלת בתצוגת האירועים (מבחינת תוכן)
  const renderEventContent = ({ event }) => (
    <div style={{ paddingRight: '7px', fontFamily: "Rubik", fontSize: "12px", fontWeight: "bold", color: 'black' }}>
      <div>{event.title}</div> 
      <div style={{ fontSize: "10px", opacity: 0.8 }}>
        {event.extendedProps.secondTitle}<br /> 
        {event.extendedProps.room} 
      </div>
    </div>
  );

  // ממיר את נתוני `meetingsSchedule` לאובייקטי אירועים של FullCalendar.
  const events = meetingsSchedule
    .map(m => ({
      id: m.id, 
      title: m.courseName,
      color: m.courseColor, 
      start: `${m.date}T${m.startTime}`,
      end: `${m.date}T${m.endTime}`,
      extendedProps: {
        secondTitle: m.topicName,
        room: m.roomName
      }
    }));

 //מטפלת בלחיצה על אירועים
  const handleEventClick = (info) => {
    const eventId = info.event.id;
    navigate(`/meeting/${eventId}`);
  };

  //אחראית על תצוגת עמודת השעות בתצוגת שבוע ויום
  const renderSlotLabelContent = ({ date }) => {
    //מבנה השעה 08:00
    const pad = n => n.toString().padStart(2, '0');
    //טווח של שעה
    const end = new Date(date.getTime() + 3600000);
    return (
      <div>
        {`${pad(date.getHours())}:${pad(date.getMinutes())}-${pad(end.getHours())}:${pad(end.getMinutes())}`}
      </div>
    );
  };

  return (
    <>
      {/* הודעת שגיאה באי קבלת נתונים*/}
      <Modal
        open={openError}
        onClose={() => setOpenError(false)}
        aria-labelledby="modal-error-title"
        aria-describedby="modal-error-description"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            outline: 'none',
            borderRadius: 2,
            width: 300,
            textAlign: 'center',
          }}
        >
          <Typography id="modal-error-title" variant="h6" component="h2" gutterBottom>
            שגיאה
          </Typography>
          <Typography id="modal-error-description" sx={{ mb: 2 }}>
            המערכת לא הצליחה לטעון את הנתונים.<br />
            אנא נסה מאוחר יותר.
          </Typography>
          <Button variant="contained" onClick={() => setOpenError(false)} sx={{ borderRadius: 14 }}>
            סגור
          </Button>
        </Box>
      </Modal>

      <Box sx={{
        //עיצוב כללי לטבלה
        position: 'absolute',
        top: 130,
        right: 280,
        width: '1555px',
        padding: "10px",
        borderRadius: "7px",
        boxShadow: "0 0 5px rgba(0,0,0,0.1)",
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        fontFamily: 'rubik',
        color: '#393939',
        fontSize: '14px',
        
        //עיצוב לאירועים בתצוגת שבוע ויום
        "& .fc-timegrid-event": {
          borderTop: 'none !important',
          borderBottom: 'none !important',
          borderLeft: 'none !important',
          outline: 'none !important',
          padding: '1px 3px !important',
          margin: '0px !important',
        },

        // עיצוב לאירועים
        "& .fc-event": {
          width: "100%",
          overflow: "hidden",
          borderRadius: "15px",
          padding: "3px 8px",
          display: "flex",
          alignItems: "center",
          border: 'none',
          justifyContent: "right",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.08)",
          color: "black",
        },

        //מטפל בגלישת תוכן באירועים
        "& .fc-event-main-frame": {
          whiteSpace: 'normal',
        },

        // מוריד את הדגשת ברירת מחדל של יום נוכחי כולל הכותרת
        "& .fc-daygrid-day.fc-day-today,& .fc-timegrid-col.fc-day-today": {
          backgroundColor: 'transparent ',
        },
        
        //עיצוב ריבועי הימים בתצוגת חודש
        "& .fc-daygrid-day-frame": {
          borderRadius: "12px",
          border: "1px solid #ddd",
          backgroundColor: "#fff",
          padding: "4px",
          margin: '3px',
        },

        //עיצוב רקע ריבועי הימים בתצוגת חודש
        "& .fc-daygrid-day": {
          backgroundColor: "#fdfdfd",
          borderRadius: "8px",
        },

        //עיצוב התאריך בתצוגת חודש
        "& .fc-daygrid-day-number": {
          padding: "6px",
          color: "#444",
        },

        //עיצוב הכותרות
        "& .fc-col-header-cell": {
          backgroundColor: '#F6F7F9',
          height: '65px',
        },

        // עיצוב הטקסט בכותרות
        "& .fc-col-header-cell-cushion": {
          paddingTop: '20px',
          fontSize: '14px',
        },

        //גובה השורות בתצוגת יום / שבוע
        "& .fc-timegrid-slot": {
          height: '40px'
        },

        //הדגשת היום הנוכחי בתצוגת חודש
        "& .fc-day.fc-day-today .fc-daygrid-day-frame": {
          border: 'solid #0D1783 1px',
        },

        //הורדת כותרת בתצוגת יום
        "& .fc-timeGridDay-view .fc-col-header": {
          display: "none",
        },
      }}>
 
        {/* //הצגת הודעה בהעדר אירועים */}
        <Box sx={{ flexGrow: 1, overflowX: 'hidden' }}>
          {status === 'succeeded' && events.length === 0 && (
            <Box
              sx={{
                marginTop: 0,
                padding: 0,
                backgroundColor: 'rgba(133, 179, 248, 0.52)',
                color: '#2172EB',
                fontWeight: 'bold',
                textAlign: 'center',
                borderRadius: 1,
              }}
            >
              אין מפגשים בתאריך הנבחר.
            </Box>
          )}

          <FullCalendar
            //הורדת שורה מיותרת בתצוגת חודש
            fixedWeekCount={false} 
            ref={calendarRef} 
            plugins={[timeGridPlugin, dayGridPlugin]} 
            eventContent={renderEventContent} 
            eventDidMount={handleEventDidMount} 
            initialView={ 
              viewType === 'day' ? 'timeGridDay' :
                viewType === 'week' ? 'timeGridWeek' :
                  'dayGridMonth'
            }
            slotMinTime="08:00:00" 
            slotMaxTime="23:00:00"
            headerToolbar={false} 
            contentHeight="auto" 
            events={events}
            eventClick={handleEventClick}
            locale="he" 
            direction="rtl" 
            dayHeaderFormat={{ weekday: 'long' }} 
            slotLabelContent={renderSlotLabelContent} 
            //מונע חפיפת אירועים
            slotEventOverlap={false} 
            allDaySlot={false} 
            slotDuration="01:00" 
            hiddenDays={[6]}
          />
        </Box>
      </Box>
    </>
  );
}