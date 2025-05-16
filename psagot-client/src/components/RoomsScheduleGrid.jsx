
//קלוד
// import FullCalendar from "@fullcalendar/react";
// import resourceTimeGridPlugin from "@fullcalendar/resource-timegrid";
// import interactionPlugin from "@fullcalendar/interaction";
// import { Box } from "@mui/material";
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchAllRooms, fetchRoomsScheduleByDate } from '../features/room/roomActions';
// import { useEffect, useRef } from 'react';

// const DATE = '2025-02-02';

// export default function RoomsScheduleGrid() {
//   const calendarRef = useRef(null);
//   const dispatch = useDispatch();

//   const { roomSchedule, status, rooms, roomsStatus } = useSelector((state) => state.room);

//   useEffect(() => {
//     if (status === 'idle') {
//       dispatch(fetchRoomsScheduleByDate(DATE));
//     }
//     if (roomsStatus === 'idle') {
//       dispatch(fetchAllRooms());
//     }
//   }, [status, roomsStatus, dispatch]);

//   const allRooms = rooms.map(({ name }) => ({
//     id: name?.trim(),
//     title: name,
//   }));

//   // הגדרת פונקציה לבחירת צבע רקע בהיר לפי סוג הקורס
//   const getEventColor = (courseName) => {
//     // צבעים יותר בהירים עם רקע לבן יותר
//     if (courseName.includes('JAVA')) return '#faf0f3'; // ורוד בהיר יותר
//     if (courseName.includes('HTML')) return '#faf0f3'; // ורוד בהיר יותר
//     if (courseName.includes('אלגוריתמיקה')) return '#f0f5fa'; // כחול בהיר יותר
//     // לנושאים שקשורים להנדסת תוכנה
//     if (courseName.includes('הנדסת')) return '#f0f5fa'; // כחול בהיר יותר
//     // כברירת מחדל
//     return '#f8f9fa'; // אפור בהיר מאוד, כמעט לבן
//   };

//   const events = roomSchedule.map(({ courseName, topicName, startTime, endTime, lecturer, roomName }) => ({
//     title: courseName,
//     secondTitle: topicName,
//     start: `${DATE}T${startTime?.trim()}`,
//     end: `${DATE}T${endTime?.trim()}`,
//     lecturer,
//     resourceId: roomName?.trim(),
//     color: getEventColor(courseName),
//     borderColor: 'transparent',
//     textColor: '#393939',
//   }));

//   const renderEventContent = ({ event }) => (
//     <div style={{ 
//       textAlign: "center", 
//       fontFamily: "Rubik", 
//       fontSize: "12px", 
//       fontWeight: "400", 
//       color: '#666666',
//       width: '100%', 
//       height: '100%',
//       padding: "4px 2px"
//     }}>
//       <div style={{ marginBottom: "2px" }}>{event.title}</div>
//       <div style={{ fontSize: "10px", color: "#777777", lineHeight: "1.2" }}>
//         {event.extendedProps.secondTitle}<br />
//         {event.extendedProps.lecturer}
//       </div>
//     </div>
//   );

//   return (
//     <Box
//       sx={{
//         backgroundColor: "white",
//         position: 'absolute',
//         top: 150,
//         right: 350,
//         width: '1480px',
//         padding: "25px",
//         borderRadius: "15px",
//         boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
//         height: 'fit-content',
//         "& .fc": {
//           direction: "rtl",
//           border: "none !important",
//         },
        
//         "& .fc-scrollgrid, & .fc-daygrid-body, & .fc-timegrid-body, & .fc-daygrid-body table, & .fc-timegrid-body table": {
//           border: "none !important",
//           borderRadius: "0 !important",
//         },
//         "& .fc-timegrid-axis-cushion, & .fc-timegrid-slot-label-cushion": {
//           padding: "10px 15px",
//           borderBottom: "1px solid #eaeaea",
//           fontFamily: "Rubik",
//           fontSize: '16px',
//           color: "var(--Neutral-80, #393939)",
//         },
//         "& .fc-col-header-cell": {
//           backgroundColor: "#F6F7F9",
//           borderBottom: "1px solid #eaeaea",
//           padding: "8px 0px",
//           fontWeight: "500",
//           whiteSpace: "nowrap",
//           color: "var(--Neutral-80, #393939)",
//         },

//         "& .fc-event": {
//           width: "90%",
//           margin: "0 5px",
//           borderRadius: "4px",
//           padding: "2px 4px",
//           fontSize: "12px",
//           fontWeight: "400",
//           textAlign: "center",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           boxShadow: "none",
//           border: "none !important",
//           color: "#666666",
//           backgroundColor: "#ffffff",
//           borderLeft: "1px solid #eaeaea",
//           borderRight: "1px solid #eaeaea",
//           borderTop: "1px solid #eaeaea",
//           borderBottom: "1px solid #eaeaea",
//           minHeight: "50px",
//         },
//         "--fc-event-text-color": "#393939",

//         "& .fc-timegrid": {
//           backgroundColor: "white",
//         },
//         "& .fc-timegrid-slot": {
//           height: "auto",
//           borderBottom: "1px solid #eaeaea",
//         },
//         "& .fc-resource": { 
//           textAlign: "center", 
//           fontSize: '14px', 
//           fontFamily: "Rubik",
//           fontWeight: "500"
//         },
//         "& .fc-daygrid-day": { display: "none" },
//         "--fc-today-bg-color": "white",
//         ".fc-direction-rtl .fc-timegrid-slot-label-frame": { textAlign: "center" },
//         "& .fc-timegrid-axis": {
//           overflow: 'hidden',
//         },
//         "& .fc-scroller": {
//           overflow: 'visible !important',
//         },
//         "& table": {
//           borderCollapse: "separate",
//           // borderSpacing: "3px", // מרווח קטן בין התאים
//         },
//         "& .fc-timegrid-cols table": {
//           borderCollapse: "separate",
//           // borderSpacing: "3px", // מרווח קטן בין התאים
//         },
//         "& .fc-timegrid-col": {
//           borderRight: "none !important",
//           padding: "0 1px",
//         },
//         "& .fc-timegrid-col-frame": {
//           background: "transparent",
//         },
//         "& .fc-timegrid-now-indicator-line": {
//           borderColor: "#dde2e7",
//         },
//         "& .fc-col-header-cell-cushion": {
//           fontWeight: "500",
//           fontSize: "14px",
//         }
//       }}
//     >
//       <FullCalendar
//         ref={calendarRef}
//         eventContent={renderEventContent}
//         plugins={[resourceTimeGridPlugin, interactionPlugin]}
//         initialView="resourceTimeGridDay"
//         initialDate={DATE}
//         slotLabelFormat={{ hour: "numeric", minute: "2-digit", hour12: false }}
//         headerToolbar={false}
//         slotMinTime="08:00:00"
//         slotMaxTime="22:00:00"
//         contentHeight="auto"
//         expandRows={true}
//         slotEventOverlap={false}
//         allDaySlot={false}
//         slotDuration="01:00"
//         slotHeight={60}
//         resources={allRooms}
//         events={events}
//         locale="he"
//         direction="rtl"
//       />
//     </Box>
//   );
// }
import FullCalendar from "@fullcalendar/react";
import resourceTimeGridPlugin from "@fullcalendar/resource-timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllRooms, fetchRoomsScheduleByDate } from '../features/room/roomActions';
import { useEffect, useRef } from 'react';
import React from 'react';



const DATE = '2025-02-02';

export default function RoomsScheduleGrid() {
  const calendarRef = useRef(null);
  const dispatch = useDispatch();

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

  const renderEventContent = ({ event }) => (
    <div style={{ textAlign: "center", fontFamily: "Rubik", fontSize: "12px", fontWeight: "bold", color: 'black' }}>
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
        backgroundColor: "white",
        position: 'absolute',
        top: 150,
        right: 350,
        width: '1480px',
        padding: "25px",
        borderRadius: "15px",

        boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
        //שניתי כדי שלא תהיה גלילה
        height: 'fit-content',
        "& .fc": {
          direction: "rtl",
          border: "none !important",
        },

        "& .fc-scrollgrid, & .fc-daygrid-body, & .fc-timegrid-body, & .fc-daygrid-body table, & .fc-timegrid-body table": {
          border: "none !important",
          borderRadius: "0 !important",
        },
        "& .fc-timegrid-axis-cushion, & .fc-timegrid-slot-label-cushion": {
          padding: "10px 15px",
          borderBottom: "1px solid #ddd",
          fontFamily: "Rubik",
          fontSize: '16px',
          color: "var(--Neutral-80, #393939)",
        },
        "& .fc-col-header-cell": {
          backgroundColor: "#F6F7F9",
          borderBottom: "1px solid #ddd",
          padding: "8px 0px",
          fontWeight: "500",
          whiteSpace: "nowrap",
          color: "var(--Neutral-80, #393939)",
        },

        "& .fc-event": {
          width: "100%",
          borderRadius: "8px",
          padding: "3px 8px",
          fontSize: "12px",
          fontWeight: "bold",
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.08)",
          // border: "none !important",
          color: "black",
          // backgroundColor: "#e6e9f0",
        },
        "--fc-event-text-color": "black",

        "& .fc-timegrid": {
          backgroundColor: "white",
        },
        "& .fc-timegrid-slot": {
          height: "auto",
          borderBottom: "1px solid #ddd",
        },
        "& .fc-resource": { textAlign: "center", fontSize: '14px', fontFamily: "Rubik" },
        "& .fc-daygrid-day": { display: "none" },
        "--fc-today-bg-color": "white",
        ".fc-direction-rtl .fc-timegrid-slot-label-frame": { textAlign: "center" },
        "& .fc-timegrid-axis": {
          overflow: 'hidden',
        },
        "& .fc-scroller": {
          overflow: 'visible !important',
        },
      }}
    >
      <FullCalendar
        ref={calendarRef}
        eventContent={renderEventContent}
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
        resources={allRooms}
        events={events}
        locale="he"
        direction="rtl"
      />
    </Box>
  );
}
