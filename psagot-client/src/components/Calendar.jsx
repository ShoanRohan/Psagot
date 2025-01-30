import FullCalendar from "@fullcalendar/react"
import { useState } from "react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

const Calendar=()=>{
    const [events]=useState([
        {
            title: "meeting",
            start:"2024-02-10",
            color:"#ff0000",
        },
        {
            title: "הגשת פרויקט",
            start: "2024-02-15",
            color: "#008000",
          },
    ]);

    return (
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={events}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,dayGridWeek,dayGridDay",
          }}
        />
      );
};

export default Calendar;