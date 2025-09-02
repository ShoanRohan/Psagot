import React, { useEffect, useRef, useState } from 'react';
import { Box, Modal, Button, Typography, useTheme, IconButton } from '@mui/material';
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMeetingByDate } from '../features/meeting/meetingActions';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

export default function MeetingSchedule() {
    const calendarRef = useRef(null);
    const dispatch = useDispatch();
    const theme = useTheme();

    const { isLoadingSchedule, meetingsSchedule = [], scheduleError } = useSelector((state) => state.meeting);
    const navigate = useNavigate();
    const [openError, setOpenError] = useState(false);
    const [calendarTitle, setCalendarTitle] = useState('');
    const [lastFetchedRange, setLastFetchedRange] = useState({ viewType: '', from: '', to: '' });
    const [currentViewType, setCurrentViewType] = useState('dayGridMonth');

    const formatDateToString = (dateObj) => {
        if (!dateObj) return '';
        const year = dateObj.getFullYear();
        const month = String(dateObj.getMonth() + 1).padStart(2, '0');
        const day = String(dateObj.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    useEffect(() => {
        if (scheduleError) setOpenError(true);
    }, [scheduleError]);

    const handleDatesSet = (dateInfo) => {
        const newFromDate = dateInfo.start;
        const newToEndDate = dateInfo.end;
        const newViewType = dateInfo.view.type;
        const formattedFrom = formatDateToString(newFromDate);
        const formattedTo = formatDateToString(newToEndDate);

        if (
            lastFetchedRange.from !== formattedFrom ||
            lastFetchedRange.to !== formattedTo ||
            lastFetchedRange.viewType !== newViewType
        ) {
            setCurrentViewType(newViewType);
            setLastFetchedRange({ viewType: newViewType, from: formattedFrom, to: formattedTo });
            setCalendarTitle(dateInfo.view.title);
            dispatch(fetchMeetingByDate({ viewType: newViewType, from: formattedFrom, to: formattedTo }));
        }
    };

    const handleNavClick = (direction) => {
        const calendarApi = calendarRef.current.getApi();
        if (direction === 'prev') calendarApi.prev();
        else calendarApi.next();
    };

    const lightenColor = (hex, factor) => {
        if (!hex) return '#cccccc';
        let color = parseInt(hex.slice(1), 16);
        let r = Math.min(255, Math.round(((color >> 16) & 0xFF) + (255 - ((color >> 16) & 0xFF)) * factor)).toString(16).padStart(2, '0');
        let g = Math.min(255, Math.round(((color >> 8) & 0xFF) + (255 - ((color >> 8) & 0xFF)) * factor)).toString(16).padStart(2, '0');
        let b = Math.min(255, Math.round((color & 0xFF) + (255 - (color & 0xFF)) * factor)).toString(16).padStart(2, '0');
        return `#${r}${g}${b}`;
    };

    const handleEventDidMount = (info) => {
        const eventElement = info.el;
        const now = new Date();
        const eventEnd = new Date(info.event.end);
        if (eventEnd < now) eventElement.style.opacity = "0.6";

        let courseColor = info.event.backgroundColor || '#cccccc';
        const lightCourseColor = lightenColor(courseColor, 0.8);
        eventElement.style.backgroundColor = lightCourseColor;
        eventElement.style.borderRight = `6px solid ${courseColor}`;
        eventElement.style.borderRadius = "8px";
    };

    const renderEventContent = ({ event }) => (
        <div style={{ paddingRight: '7px', fontFamily: "Rubik", fontSize: "12px", fontWeight: "bold", color: 'black' }}>
            <div>{event.title}</div>
            <div style={{ fontSize: "10px", opacity: 0.8 }}>
                {event.extendedProps.secondTitle}<br />{event.extendedProps.room}
            </div>
        </div>
    );

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

    const handleEventClick = (info) => {
        const eventId = info.event.id;
        navigate(`/meeting/${eventId}`);
    };

    const renderSlotLabelContent = ({ date }) => {
        const pad = n => n.toString().padStart(2, '0');
        const end = new Date(date.getTime() + 3600000);
        return <div>{`${pad(date.getHours())}:${pad(date.getMinutes())}-${pad(end.getHours())}:${pad(end.getMinutes())}`}</div>;
    };

    const viewButtons = [
        { view: 'dayGridMonth', label: 'תצוגת חודש' },
        { view: 'timeGridWeek', label: 'תצוגת שבוע' },
        { view: 'timeGridDay', label: 'תצוגת יום' },
    ];

    return (
        <>
            <Modal open={openError} onClose={() => setOpenError(false)}>
                <Box sx={{ bgcolor: 'background.paper', p: 4, borderRadius: 2, width: 300, textAlign: 'center', m: 'auto' }}>
                    <Typography variant="h6">שגיאה</Typography>
                    <Typography sx={{ mb: 2 }}>המערכת לא הצליחה לטעון את הנתונים.<br />אנא נסה מאוחר יותר.</Typography>
                    <Button variant="contained" onClick={() => setOpenError(false)}>סגור</Button>
                </Box>
            </Modal>

            <Box sx={{ padding: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, gap: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: '700', fontSize: '36px', color: '#112B83', whiteSpace: 'nowrap' }}>
                        לוח שנה
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <IconButton sx={{ border: '1px solid #ccc', borderRadius: '4px', padding: '4px', bgcolor: '#f5f5f5' }} onClick={() => handleNavClick('next')}><ArrowForwardIosIcon fontSize="small" /></IconButton>
                        <Typography sx={{ fontWeight: '500', whiteSpace: 'nowrap' }}>{calendarTitle}</Typography>
                        <IconButton sx={{ border: '1px solid #ccc', borderRadius: '4px', padding: '4px', bgcolor: '#f5f5f5' }} onClick={() => handleNavClick('prev')}><ArrowBackIosNewIcon fontSize="small" /></IconButton>
                        <Button size="small" variant="outlined" sx={{ bgcolor: '#f5f5f5' }} onClick={() => calendarRef.current.getApi().today()}>היום</Button>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <IconButton sx={{ bgcolor: '#f1f1f1', borderRadius: '4px' }}><PictureAsPdfIcon /></IconButton>
                        {viewButtons.map(({ view, label }) => (
                            <Button
                                key={view}
                                onClick={() => calendarRef.current.getApi().changeView(view)}
                                variant={currentViewType === view ? 'contained' : 'outlined'}
                                sx={{ borderRadius: '20px', whiteSpace: 'nowrap' }}
                            >
                                {label}
                            </Button>
                        ))}
                    </Box>
                </Box>

                <FullCalendar
                    fixedWeekCount={false}
                    ref={calendarRef}
                    plugins={[timeGridPlugin, dayGridPlugin]}
                    eventContent={renderEventContent}
                    eventDidMount={handleEventDidMount}
                    initialView={currentViewType}
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
                    slotEventOverlap={false}
                    allDaySlot={false}
                    slotDuration="01:00"
                    hiddenDays={[6]}
                    datesSet={handleDatesSet}
                />
            </Box>
        </>
    );
}
