import React, { useEffect, useRef } from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import FullCalendar from "@fullcalendar/react";
import resourceTimeGridPlugin from "@fullcalendar/resource-timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllRooms, fetchRoomsScheduleByDate } from '../features/room/roomActions';

const DATE = '2025-04-17';

export default function RoomsScheduleGrid() {
  const dispatch = useDispatch();
  const calendarRef = useRef(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const { roomSchedule, status, rooms, roomsStatus } = useSelector((state) => state.room);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchRoomsScheduleByDate(DATE));
    }
    if (roomsStatus === 'idle') {
      dispatch(fetchAllRooms());
    }
  }, [status, roomsStatus, dispatch]);

  const allRooms = rooms.map(({ name }) => ({
    id: name?.trim(),
    title: name,
  }));

  const events = roomSchedule.map(({ courseName, topicName, startTime, endTime, lecturer, roomName, courseColor }) => ({
    title: courseName,
    secondTitle: topicName,
    start: `${DATE}T${startTime?.trim()}`,
    end: `${DATE}T${endTime?.trim()}`,
    lecturer,
    resourceId: roomName?.trim(),
    color: courseColor,
  }));

  const lightenColor = (hex, factor) => {
    if (!hex) return '#ffffff';
    let color = parseInt(hex.slice(1), 16);
    let r = Math.min(255, Math.round(((color >> 16) & 0xFF) + (255 - ((color >> 16) & 0xFF)) * factor)).toString(16).padStart(2, '0');
    let g = Math.min(255, Math.round(((color >> 8) & 0xFF) + (255 - ((color >> 8) & 0xFF)) * factor)).toString(16).padStart(2, '0');
    let b = Math.min(255, Math.round((color & 0xFF) + (255 - (color & 0xFF)) * factor)).toString(16).padStart(2, '0');
    return `#${r}${g}${b}`;
  };

  const handleEventDidMount = (info) => {
    const eventElement = info.el;
    const courseColor = info.event.backgroundColor;
    const lightCourseColor = lightenColor(courseColor, 0.8);

    eventElement.style.backgroundColor = lightCourseColor;
    eventElement.style.borderRight = `7px solid ${courseColor}`;
    eventElement.style.borderRadius = "8px";
  };

  const renderEventContent = ({ event }) => (
    <div style={{ fontFamily: "Rubik", fontSize: "12px", fontWeight: "bold", color: 'black' }}>
      <div>{event.title}</div>
      <div style={{ fontSize: "10px", opacity: 0.8 }}>
        {event.extendedProps.secondTitle}<br />
        {event.extendedProps.lecturer}
      </div>
    </div>
  );

  return (
    <Box
      sx={{
        overflowX: 'auto',
        width: '100%',
        maxWidth: '1480px',
        mx: 'auto',
        padding: "25px",
        borderRadius: "7px",
        boxShadow: [
          "2px 0 5px rgba(0.1, 0.1, 0.1, 0.1)",
          "-2px 0 5px rgba(0.1, 0.1, 0.1, 0.1)",
          "0 2px 5px rgba(0.1, 0.1, 0.1, 0.1)",
          "0 -2px 5px rgba(0.1, 0.1, 0.1, 0.1)",
        ],
        height: 'fit-content',
        "& .fc-timegrid-axis-cushion, & .fc-timegrid-slot-label-cushion": {
          padding: "10px 15px",
          borderBottom: "2px solid #ddd",
          fontFamily: "Rubik",
          fontSize: '16px',
          color: "var(--Neutral-80, #393939)",
        },
        "& .fc-col-header-cell": {
          backgroundColor: "#F6F7F9",
          borderBottom: "2px solid #ddd",
          padding: "20px 0px",
          fontWeight: "500",
          textAlign: "center",
          whiteSpace: "nowrap",
          height: "58px",
          color: "var(--Neutral-80, #393939)",
        },
        "& .fc-event": {
          width: "100%",
          borderRadius: "15px",
          padding: "3px 8px",
          fontSize: "12px",
          fontWeight: "bold",
          display: "flex",
          alignItems: "center",
          border: 'none',
          justifyContent: "right",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.08)",
          color: "black",
        },
        ".fc-theme-standard td, .fc-theme-standard th": {
          borderRight: "none",
        },
      }}
    >
      <FullCalendar
        ref={calendarRef}
        eventContent={renderEventContent}
        eventDidMount={handleEventDidMount}
        plugins={[resourceTimeGridPlugin, interactionPlugin]}
        initialView={isMobile ? 'timeGridDay' : 'resourceTimeGridDay'}
        initialDate={DATE}
        slotLabelFormat={{ hour: "numeric", minute: "2-digit", hour12: false }}
        headerToolbar={false}
        slotMinTime="08:00:00"
        slotMaxTime="22:00:00"
        contentHeight="auto"
        expandRows={true}
        slotEventOverlap={false}
        allDaySlot={false}
        slotDuration="01:00"
        resources={allRooms}
        events={events}
        locale="he"
        direction="rtl"
      />
    </Box>
  );
}
