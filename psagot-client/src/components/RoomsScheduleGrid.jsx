import FullCalendar from "@fullcalendar/react";
import resourceTimeGridPlugin from "@fullcalendar/resource-timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Box, IconButton } from "@mui/material"; 
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'; 
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'; 
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllRooms, fetchRoomsScheduleByDate } from '../features/room/roomActions';
import { useEffect, useRef, useState } from 'react'; 
import React from 'react';

const DATE = '2025-04-17'; 

export default function RoomsScheduleGrid() {
    const calendarRef = useRef(null);
    const dispatch = useDispatch();

    const { roomSchedule, status, rooms, roomsStatus } = useSelector((state) => state.room);
    // const displayDate = useSelector((state) => state.room.displayDate);

    const [currentPage, setCurrentPage] = useState(0); 
    const roomsPerPage = 10; 

    useEffect(() => {
          // if (!displayDate) return null; // או Loader זמני

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

    const visibleRooms = allRooms.slice(
        currentPage * roomsPerPage,
        (currentPage + 1) * roomsPerPage
    );

    const events = roomSchedule
        .filter(event => visibleRooms.some(room => room.id === event.roomName?.trim()))
        .map(({ courseName, topicName, startTime, endTime, lecturer, roomName, courseColor }) => ({
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
        eventElement.style.borderRadius = "8px 8px 8px 8px";
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

    const handlePrevRooms = () => {
        if (currentPage > 0) {
            setCurrentPage(prevPage => prevPage - 1);
        }
    };

    const handleNextRooms = () => {
        const maxPage = Math.ceil(allRooms.length / roomsPerPage) - 1;
        if (currentPage < maxPage) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    useEffect(() => {
        const calendarApi = calendarRef.current?.getApi();
        if (calendarApi) {
            calendarApi.setOption('resources', visibleRooms);
            calendarApi.refetchEvents();
        }
    }, [currentPage, visibleRooms]); 

    const maxPage = Math.ceil(allRooms.length / roomsPerPage) - 1;
    return (
    <Box
        sx={{
            position: 'absolute',
            top: 130,
            right: 350,
            width: '1480px', 
            padding: "10px",
            borderRadius: "7px",
            boxShadow: [
                "2px 0 5px rgba(0.1, 0.1, 0.1, 0.1)",
                "-2px 0 5px rgba(0.1, 0.1, 0.1, 0.1)",
                "0 2px 5px rgba(0.1, 0.1, 0.1, 0.1)",
                "0 -2px 5px rgba(0.1, 0.1, 0.1, 0.1)",
            ],
            height: 'fit-content',
            display: 'flex', 
            flexDirection: 'row', 
            alignItems: 'center', 
            justifyContent: 'space-between', 

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

        <IconButton onClick={handlePrevRooms} disabled={currentPage === 0} sx={{ mr: 1, p: 2 }}>
            <ArrowForwardIosIcon />
        </IconButton>
        <Box sx={{ flexGrow: 1, overflowX: 'hidden' }}> 
            <FullCalendar
                ref={calendarRef}
                eventContent={renderEventContent}
                eventDidMount={handleEventDidMount}
                plugins={[resourceTimeGridPlugin, interactionPlugin]}
                initialView="resourceTimeGridDay"
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
                resources={visibleRooms}
                events={events}
                locale="he"
                direction="rtl"
            />
        </Box>
        <IconButton onClick={handleNextRooms} disabled={currentPage >= maxPage} sx={{ ml: 1, p: 2 }}>
            <ArrowBackIosIcon />
        </IconButton>
    </Box>
);
}
