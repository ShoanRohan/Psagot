//שלנו לפני גימיני
// import FullCalendar from "@fullcalendar/react";
// import resourceTimeGridPlugin from "@fullcalendar/resource-timegrid";
// import interactionPlugin from "@fullcalendar/interaction";
// import { Box } from "@mui/material";
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchAllRooms, fetchRoomsScheduleByDate } from '../features/room/roomActions';
// import { useEffect, useRef } from 'react';
// import React from 'react';


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

//   const events = roomSchedule.map(({ courseName, topicName, startTime, endTime, lecturer, roomName, courseColor }) => ({
//     title: courseName,
//     secondTitle: topicName,
//     start: `${DATE}T${startTime?.trim()}`,
//     end: `${DATE}T${endTime?.trim()}`,
//     lecturer,
//     resourceId: roomName?.trim(),
//     color: courseColor,
//   }));

//   const renderEventContent = ({ event }) => (
//     <div style={{ textAlign: "center", fontFamily: "Rubik", fontSize: "12px", fontWeight: "bold", color: 'black' }}>
//       <div>{event.title}</div>
//       <div style={{ fontSize: "10px", opacity: 0.8 }}>
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
//           borderBottom: "1px solid #ddd",
//           fontFamily: "Rubik",
//           fontSize: '16px',
//           color: "var(--Neutral-80, #393939)",
//         },
//         "& .fc-col-header-cell": {
//           backgroundColor: "#F6F7F9",
//           borderBottom: "1px solid #ddd",
//           padding: "8px 0px",
//           fontWeight: "500",
//           whiteSpace: "nowrap",
//           color: "var(--Neutral-80, #393939)",
//         },

//         "& .fc-event": {
//           width: "100%",
//           borderRadius: "8px",
//           padding: "3px 8px",
//           fontSize: "12px",
//           fontWeight: "bold",
//           textAlign: "center",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           boxShadow: "0 2px 4px rgba(0, 0, 0, 0.08)",
//           color: "black",
//         },
//         "--fc-event-text-color": "black",

//         "& .fc-timegrid": {
//           backgroundColor: "white",
//         },
//         "& .fc-timegrid-slot": {
//           height: "auto",
//           borderBottom: "1px solid #ddd",
//         },
//         "& .fc-resource": { textAlign: "center", fontSize: '14px', fontFamily: "Rubik" },
//         "& .fc-daygrid-day": { display: "none" },
//         "--fc-today-bg-color": "white",
//         ".fc-direction-rtl .fc-timegrid-slot-label-frame": { textAlign: "center" },
//         "& .fc-timegrid-axis": {
//           overflow: 'hidden',
//         },
//         "& .fc-scroller": {
//           overflow: 'visible !important',
//         },
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
//         resources={allRooms}
//         events={events}
//         locale="he"
//         direction="rtl"
//       />
//     </Box>
//   );
// }
//---------------------------------------------------------------------------------------------------------------->
//גימיני
// import FullCalendar from "@fullcalendar/react";
// import resourceTimeGridPlugin from "@fullcalendar/resource-timegrid";
// import interactionPlugin from "@fullcalendar/interaction";
// import { Box } from "@mui/material";
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchAllRooms, fetchRoomsScheduleByDate } from '../features/room/roomActions';
// import { useEffect, useRef } from 'react';
// import React from 'react';

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

//   const events = roomSchedule.map(({ courseName, topicName, startTime, endTime, lecturer, roomName, courseColor }) => ({
//     title: courseName,
//     secondTitle: topicName,
//     start: `${DATE}T${startTime?.trim()}`,
//     end: `${DATE}T${endTime?.trim()}`,
//     lecturer,
//     resourceId: roomName?.trim(),
//     color: courseColor,
//   }));

//   const lightenColor = (hex, factor) => {
//     if (!hex) return '#ffffff';

//     let color = parseInt(hex.slice(1), 16);
//     let r = Math.min(255, Math.round(((color >> 16) & 0xFF) + (255 - ((color >> 16) & 0xFF)) * factor)).toString(16).padStart(2, '0');
//     let g = Math.min(255, Math.round(((color >> 8) & 0xFF) + (255 - ((color >> 8) & 0xFF)) * factor)).toString(16).padStart(2, '0');
//     let b = Math.min(255, Math.round((color & 0xFF) + (255 - (color & 0xFF)) * factor)).toString(16).padStart(2, '0');
//     return `#${r}${g}${b}`;
//   };

//   const handleEventDidMount = (info) => {
//     const eventElement = info.el;
//     const courseColor = info.event.backgroundColor;
//     const lightCourseColor = lightenColor(courseColor, 0.8);

//     eventElement.style.backgroundColor = lightCourseColor;
//     eventElement.style.borderRight = `5px solid ${courseColor}`;
//   };

//   const renderEventContent = ({ event }) => (
//     <div style={{ textAlign: "center", fontFamily: "Rubik", fontSize: "12px", fontWeight: "bold", color: 'black' }}>
//       <div>{event.title}</div>
//       <div style={{ fontSize: "10px", opacity: 0.8 }}>
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
//           borderBottom: "1px solid #ddd",
//           fontFamily: "Rubik",
//           fontSize: '16px',
//           color: "var(--Neutral-80, #393939)",
//         },
//         "& .fc-col-header-cell": {
//           backgroundColor: "#F6F7F9",
//           borderBottom: "1px solid #ddd",
//           padding: "8px 0px",
//           fontWeight: "500",
//           whiteSpace: "nowrap",
//           color: "var(--Neutral-80, #393939)",
//         },
//         "& .fc-event": {
//           width: "100%",
//           borderRadius: "8px",
//           padding: "3px 8px",
//           fontSize: "12px",
//           fontWeight: "bold",
//           textAlign: "center",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           boxShadow: "0 2px 4px rgba(0, 0, 0, 0.08)",
//           color: "black",
//           borderTop: "none !important",
//           borderBottom: "none !important",
//           borderLeft: "none !important",
//           // backgroundColor: "#e6e9f0", // הערה: אם אתה משתמש ב-eventDidMount לשינוי הרקע, ייתכן שתרצה להסיר או לשנות את זה
//         },
//         "--fc-event-text-color": "black",
//         "& .fc-timegrid": {
//           backgroundColor: "white",
//         },
//         "& .fc-timegrid-slot": {
//           height: "auto",
//           borderBottom: "1px solid #ddd",
//         },
//         "& .fc-resource": { textAlign: "center", fontSize: '14px', fontFamily: "Rubik" },
//         "& .fc-daygrid-day": { display: "none" },
//         "--fc-today-bg-color": "white",
//         ".fc-direction-rtl .fc-timegrid-slot-label-frame": { textAlign: "center" },
//         "& .fc-timegrid-axis": {
//           overflow: 'hidden',
//         },
//         "& .fc-scroller": {
//           overflow: 'visible !important',
//         },
//       }}
//     >
//       <FullCalendar
//         ref={calendarRef}
//         eventContent={renderEventContent}
//         eventDidMount={handleEventDidMount} // הוספת הפונקציה לטיפול בצבע
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
//         resources={allRooms}
//         events={events}
//         locale="he"
//         direction="rtl"
//       />
//     </Box>
//   );
// }
//צאט גיפיטי
import FullCalendar from "@fullcalendar/react";
import resourceTimeGridPlugin from "@fullcalendar/resource-timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllRooms, fetchRoomsScheduleByDate } from '../features/room/roomActions';
import { useEffect, useRef } from 'react';
import React from 'react';

const DATE = '2025-04-17';

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

  const handleEventDidMount = (info) => {
    const eventElement = info.el;
    const courseColor = info.event.backgroundColor;

    eventElement.style.backgroundColor = `${courseColor}33`;    
    eventElement.style.border = `none`;
    eventElement.style.borderRight = `15px solid ${courseColor}`;

  };

  const renderEventContent = ({ event }) => (
    <div style={{fontFamily: "Rubik", fontSize: "12px", fontWeight: "bold", color: 'black' }}>
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
        // backgroundColor: "white",
        position: 'absolute',
        top: 160,
        right: 350,
        width: '1480px',
        padding: "25px",
        borderRadius: "7px",
        // boxShadow: "5px 5px rgba(0.1, 0.1, 0.1, 0.1)",
         boxShadow: [
          "2px 0 5px rgba(0.1, 0.1, 0.1, 0.1)", // צל ימין
          "-2px 0 5px rgba(0.1, 0.1, 0.1, 0.1)", // צל שמאל
          "0 2px 5px rgba(0.1, 0.1, 0.1, 0.1)", // צל תחתון
          "0 -2px 5px rgba(0.1, 0.1, 0.1, 0.1)", // צל עליון
        ],
        height: 'fit-content',
        // "& .fc": {
        //   direction: "rtl",
        //   border: "none !important",
        // },
        // "& .fc-scrollgrid, & .fc-daygrid-body, & .fc-timegrid-body, & .fc-daygrid-body table, & .fc-timegrid-body table": {
        //   // border: "none !important", // מסיר גבולות מטבלאות שונות בתוך הפול קלנדר
        //   borderRadius: "0 !important",
        // },
        "& .fc-timegrid-axis-cushion, & .fc-timegrid-slot-label-cushion": {
          padding: "10px 15px",
          borderBottom: "2px solid #ddd", // מוסיף קו תחתון לאזור השעות בצד
          fontFamily: "Rubik",
          fontSize: '16px',
          color: "var(--Neutral-80, #393939)",
        },
        "& .fc-col-header-cell": {
          backgroundColor: "#F6F7F9",
          borderBottom: "2px solid #ddd",// מוסיף קו תחתון לכותרות העמודות (שמות החדרים
          padding: "20px 0px",
          fontWeight: "500",
          textAlign:"center",
          whiteSpace: "nowrap",
          height:"58px",
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
          justifyContent: "center",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.08)",
          color: "black",
         
        },
        // "& .fc-timegrid": {
        //   backgroundColor: "white",
        // },
        // "& .fc-timegrid-slot": {
        //   height: "auto",
        // },
        // "& .fc-resource": { textAlign: "center", fontSize: '14px', fontFamily: "Rubik" },
        // "& .fc-daygrid-day": { display: "none" },
        // "--fc-today-bg-color": "white",
        // ".fc-direction-rtl .fc-timegrid-slot-label-frame": { textAlign: "center" },
        // "& .fc-timegrid-axis": {
        //   overflow: 'hidden',
        // },
        // "& .fc-scroller": {
        //   overflow: 'visible !important',
        // },
        
      }}
    >
   

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
        resources={allRooms}
        events={events}
        locale="he"
        direction="rtl"
      />
    </Box>
   
  );
}
