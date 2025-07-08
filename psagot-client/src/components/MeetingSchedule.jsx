import React, { useEffect, useRef, useState } from 'react';
import { Box, Modal, Button, Typography, useTheme } from '@mui/material';
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMeetingByDate } from '../features/meeting/meetingActions';

export default function MeetingSchedule() {
    const calendarRef = useRef(null);
    const dispatch = useDispatch();
    const theme = useTheme();

    // קבל את סטטוס הטעינה, נתוני המפגשים והשגיאות מהסטייט של Redux
    const { isLoadingSchedule, meetingsSchedule, scheduleError } = useSelector((state) => state.meeting);
    const navigate = useNavigate();
    const [openError, setOpenError] = useState(false);
    const [calendarTitle, setCalendarTitle] = useState('');


    // סטייט מקומי לעקוב אחרי טווח התאריכים וה-viewType האחרון שנשלח ל-API
    const [lastFetchedRange, setLastFetchedRange] = useState({
        viewType: '',
        from: '',
        to: ''
    });
    // הגדרת viewType. שם ברירת המחדל מותאם ל-FullCalendar (dayGridMonth)
    const [currentViewType, setCurrentViewType] = useState('dayGridMonth');

    // פונקציית עזר להמרת אובייקט Date למחרוזת בפורמט YYYY-MM-DD
    const formatDateToString = (dateObj) => {
        if (!dateObj) {
            return '';
        }
        const year = dateObj.getFullYear();
        const month = String(dateObj.getMonth() + 1).padStart(2, '0');
        const day = String(dateObj.getDate()).padStart(2, '0');
        const formatted = `${year}-${month}-${day}`;
        return formatted;
    };

    // useEffect לטיפול בשגיאות טעינה בלבד.
    useEffect(() => {
        if (scheduleError) {
            setOpenError(true);
        }
    }, [scheduleError]);

    // פונקציה לטיפול בשינוי טווח התאריכים של FullCalendar
    // זו הפונקציה העיקרית שתפעיל את טעינת הנתונים, כולל בטעינה ראשונית
    const handleDatesSet = (dateInfo) => {
        const newFromDate = dateInfo.start;
        const newToEndDate = dateInfo.end;
        const newViewType = dateInfo.view.type;
        const formattedFrom = formatDateToString(newFromDate);
        const formattedTo = formatDateToString(newToEndDate);

        // בדוק אם טווח התאריכים או ה-viewType השתנו מאז הבקשה האחרונה שנשלחה בהצלחה
        if (lastFetchedRange.from !== formattedFrom ||
            lastFetchedRange.to !== formattedTo ||
            lastFetchedRange.viewType !== newViewType
        ) {
            setCurrentViewType(newViewType);
            setLastFetchedRange({
                viewType: newViewType,
                from: formattedFrom,
                to: formattedTo
            });
            setCalendarTitle(dateInfo.view.title);

            dispatch(fetchMeetingByDate({ viewType: newViewType, from: formattedFrom, to: formattedTo }));
        }
    };

    // פונקציה להבהרת צבע
    const lightenColor = (hex, factor) => {
        if (!hex) return '#cccccc';
        let color = parseInt(hex.slice(1), 16);
        let r = Math.min(255, Math.round(((color >> 16) & 0xFF) + (255 - ((color >> 16) & 0xFF)) * factor)).toString(16).padStart(2, '0');
        let g = Math.min(255, Math.round(((color >> 8) & 0xFF) + (255 - ((color >> 8) & 0xFF)) * factor)).toString(16).padStart(2, '0');
        let b = Math.min(255, Math.round((color & 0xFF) + (255 - (color & 0xFF)) * factor)).toString(16).padStart(2, '0');
        return `#${r}${g}${b}`;
    };

    // מטפלת בעיצוב האירועים 
    const handleEventDidMount = (info) => {
        const eventElement = info.el;
        const now = new Date();
        const eventEnd = new Date(info.event.end);

        if (eventEnd < now) {
            eventElement.style.opacity = "0.6";
        }

        let courseColor = info.event.backgroundColor;
        if (!courseColor || courseColor === '') {
            courseColor = '#cccccc';
        }

        const lightCourseColor = lightenColor(courseColor, 0.8);
        eventElement.style.backgroundColor = lightCourseColor;
        eventElement.style.borderRight = `6px solid ${courseColor}`;
        eventElement.style.borderRadius = "8px";
    };

    // מטפלת בתצוגת האירועים (מבחינת תוכן)
    const renderEventContent = ({ event }) => (
        <div style={{ paddingRight: '7px', fontFamily: "Rubik", fontSize: "12px", fontWeight: "bold", color: 'black' }}>
            <div>{event.title}</div>
            <div style={{ fontSize: "10px", opacity: 0.8 }}>
                {event.extendedProps.secondTitle}<br />
                {event.extendedProps.room}
            </div>
        </div>
    );

    // ממיר את נתוני ה-`meetingsSchedule` לאובייקטי אירועים של FullCalendar.
    const events = meetingsSchedule.map(m => ({
        id: m.meetingId,
        title: m.course.name || 'שם קורס לא ידוע',
        color: m.course.color || '#cccccc',
        start: m.startTime ? `${m.meetingDate}T${m.startTime}` : null,
        end: m.endTime ? `${m.meetingDate}T${m.endTime}` : null,
        extendedProps: {
            secondTitle: m.topic.name || 'נושא לא ידוע',
            room: m.room.name || 'חדר לא ידוע'
        }

    }));

    // מטפלת בלחיצה על אירועים
    const handleEventClick = (info) => {
        const eventId = info.event.id;
        navigate(`/meeting/${eventId}`);
    };

    // אחראית על תצוגת עמודת השעות בתצוגת שבוע ויום
    const renderSlotLabelContent = ({ date }) => {
        const pad = n => n.toString().padStart(2, '0');
        const end = new Date(date.getTime() + 3600000);
        return (
            <div>
                {`${pad(date.getHours())}:${pad(date.getMinutes())}-${pad(end.getHours())}:${pad(end.getMinutes())}`}
            </div>
        );
    };


    const viewButtons = [
        { view: 'dayGridMonth', label: 'תצוגת חודש' },
        { view: 'timeGridWeek', label: 'תצוגת שבוע' },
        { view: 'timeGridDay', label: 'תצוגת יום' },
    ];

    return (
        <>
            {/* הודעת שגיאה באי קבלת נתונים */}
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
                position: 'absolute',
                top: 10,
                right: 280,
                width: '1555px',
                padding: "10px",
                borderRadius: "7px",
                boxShadow: "0 0 5px rgba(0,0,0,0.1)",
                flexDirection: 'row',
                justifyContent: 'start',
                display: 'grid',
                gridTemplateColumns: 'auto 1fr auto',
                alignItems: 'center',
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
                    backgroundColor: 'transparent !important',
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
                {/* הצגת הודעה בהעדר אירועים */}
                <Box sx={{ flexGrow: 1, overflowX: 'hidden' }}>
                    {/* הצג הודעה רק אם אין טעינה פעילה ואין אירועים */}
                    {!isLoadingSchedule && events.length === 0 && (
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
                    {/* סרגל עליון*/}
                    <Typography variant="h6" sx={{ fontWeight: '700', fontSize: '30px', color: '#112B83' }}>
                        לוח שנה
                    </Typography>

                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1 }}>
                        <Button onClick={() => calendarRef.current.getApi().prev()} size="small" variant="outlined">▶</Button>
                        <Typography sx={{ fontWeight: 'bold', mx: 1 }}>{calendarTitle}</Typography>
                        <Button onClick={() => calendarRef.current.getApi().next()} size="small" variant="outlined">◀</Button>
                        <Button onClick={() => calendarRef.current.getApi().today()} size="small" variant="outlined">היום</Button>
                    </Box>

                    <Box sx={{ display: 'flex',marginTop:'-10px',marginBottom:'10px', justifyContent: 'flex-end', alignItems: 'center', gap: 1 }}>
                        {viewButtons.map(({ view, label }) => (
                            <Button
                                key={view}
                                onClick={() => calendarRef.current.getApi().changeView(view)}
                                size="small"
                                variant="contained"
                                sx={{
                                    borderRadius: '20px',
                                    backgroundColor: '#1976d2',
                                    color: '#fff',
                                    fontWeight: 'bold',
                                    px: 2,
                                    '&:hover': {
                                        backgroundColor: '#115293',
                                    },
                                }}
                            >
                                {label}
                            </Button>
                        ))}
                    </Box>
                    <FullCalendar
                      //הורדת שורה מיותרת בתצוגת חודש
                        fixedWeekCount={false}
                        ref={calendarRef}
                        plugins={[timeGridPlugin, dayGridPlugin]}
                        eventContent={renderEventContent}
                        eventDidMount={handleEventDidMount}
                        initialView={
                            currentViewType === 'timeGridDay' ? 'timeGridDay' :
                                currentViewType === 'timeGridWeek' ? 'timeGridWeek' :
                                    'dayGridMonth'
                        }
                        slotMinTime="08:00:00"
                        slotMaxTime="22:00:00"
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
                        datesSet={handleDatesSet}
                    />
                </Box>
            </Box>
        </>
    );
}