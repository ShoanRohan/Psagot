import FullCalendar from "@fullcalendar/react";
import resourceTimeGridPlugin from "@fullcalendar/resource-timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import { fetchRoomsScheduleByDate } from '../features/room/roomActions';
import { useEffect } from 'react';

export default function RoomSchedule() {
  
  function renderEventContent(eventInfo) {
    return (
      <div style={{ textAlign: "center", fontSize: "14px", fontWeight: "bold" }}>
        <div>{eventInfo.event.title}</div>
        <div style={{ fontSize: "12px", opacity: 0.8 }}>{eventInfo.event.extendedProps.secondTitle}</div>
      </div>
    );
  }
  const dispatch = useDispatch();
  const { roomSchedule, status, error } = useSelector((state) => state.room);

  useEffect(() => {
      if (status === 'idle') {
          dispatch(fetchRoomsScheduleByDate("2025-02-09"));
      }
  }, [status, dispatch]);
  return (
    <Box
      sx={{
        backgroundColor: "white",
        padding: "30px,30px",
        borderRadius: "10px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        overflowX: "auto",  
        height:"950px", 
        width:'1283px',
        "& .fc": {
          direction: "rtl",
        },

        "& .fc-view-harness": {
          minHeight: "600px",
        },
        "& .fc-timegrid": {
        backgroundColor: "white", // שינוי צבע רקע הטבלה ללבן
        },
        ".fc .fc-timegrid-axis-cushion, .fc .fc-timegrid-slot-label-cushion": {
          padding: "15px 5px",
          borderBottom: "3px solid #ddd",
      },
      "--fc-event-text-color":"black",
        "& .fc-col-header-cell": {
          backgroundColor: "#F6F7F9",
          borderBottom: "3px solid #ddd",
          boxSizing:'border-box',
          padding: "20px 0px",
          textAlign: "center",
          fontWeight: "500",
          whiteSpace: "nowrap", // כותרות בשורה אחת
          fontSize: "14px", 
         },
        "& .fc-timegrid-slot": {
          height: "40px", // מניעת שורה מיותרת
          borderBottom: "1px solid #ddd", // הסרת השורה המיותרת
          borderRight:"1px solid #ddd",
        },
        "& .fc-resource": {
          textAlign: "center",
        },
        "& .fc-event": { 
          borderRadius: "10px",
          padding: "5px",
          fontSize: "14px",
          fontWeight: "bold",
          textAlign: "center",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
       
        "& .fc-daygrid-day": {
          display: "none", // הסרת שורת allday
        },
         "--fc-today-bg-color":"white"  ,
         ".fc-direction-rtl .fc-timegrid-slot-label-frame" :{
          textAlign: "center"
      }     
       
      }}
    >
      <FullCalendar
        eventContent={renderEventContent}
        plugins={[resourceTimeGridPlugin, interactionPlugin]}
        initialView="resourceTimeGridDay"
        slotLabelFormat={{ hour: "numeric", minute: "2-digit", hour12: false }}
        headerToolbar={false}
        slotMinTime="08:00:00"
        slotMaxTime="22:00:00"
        slotEventOverlap={false}
        allDaySlot={false} // הסרת שורת allday
        slotDuration="01:00"
        resources={[
          { id: "room1", title: "חדר סימולציה" },
          { id: "room2", title: "חדר פגישות" },
          { id: "room3", title: "חדר עבודה" },
          { id: "room4", title: "אולם כנסים" },
          { id: "room5", title: "חדר חדשנות"  },
          { id: "room6", title: "מרכז מדיה" },
          { id: "room7", title: "חדר סימולציה" },
          { id: "room8", title: "פינת ישיבות" },
          { id: "room9", title: "חדר סימולציה" },
          { id: "room10", title: "אולם כניסה" },
          
        ]}
        events={[
          {
            title: "קורס תכנות",
            secondTitle:"HTML",
            start: "2025-02-20T09:00:00",
            end: "2025-02-20T10:00:00",
            resourceId: "room1",
            color: "#f17eb8",
          },
          {
            title: "קורס עיצוב",
            secondTitle:"טיפוגרפיה",
            start: "2025-02-20T10:00:00",
            end: "2025-02-20T11:00:00",
            resourceId: "room3",
            color: "#ffb3b3",
          },
          {
            title: "קורס אדריכלות",
            secondTitle:"תורת הבניה",
            start: "2025-02-20T11:00:00",
            end: "2025-02-20T13:00:00",
            resourceId: "room10",
            color: "#7fa3ff",
          },
        ]}
        
        locale="he"
        direction="rtl"
      />
    </Box>
  );
}

