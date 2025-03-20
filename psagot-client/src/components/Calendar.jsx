import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import heLocale from "@fullcalendar/core/locales/he";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { HDate, gematriya } from "@hebcal/core";
import "@fontsource/rubik";
import { CalendarStyle , dayInWeekHeaderStyle , dayCellStyle , hebrewDateStyle , gregorianDateStyle , StyledEventBox} from './CalendarStyle';
import { useNavigate } from "react-router-dom";


const handleDayHeaderContent =(args) => {
  const dayNames = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"];
  return (
    <Box sx={dayInWeekHeaderStyle}>
      {dayNames[args.date.getDay()]}
    </Box>
  );
}

const handleDayCellContent = (args, view) => {
  // יציג את התאריך רק בתצוגת חודש
  if (view === "dayGridMonth") {
    const gregorianDate = args.date;
    const hebrewDate = new HDate(gregorianDate);
    const hebrewDay = gematriya(hebrewDate.getDate());

    return (
      <Box sx={dayCellStyle}>
        <Typography sx={hebrewDateStyle}> {hebrewDay} </Typography>
        <Typography sx={gregorianDateStyle}> {gregorianDate.getDate()} </Typography>
      </Box>
    );
  }
  return null; // לא מציג כלום בתצוגות שבוע ויום
}

const handleEventClick = (info, navigate) => {
  const eventId = info.event.id;
  console.log("ID של האירוע:", eventId); // בדיקה
  navigate(`/meetings/${eventId}`);
};

//פונקציה שמטפלת באירועים לאחר שהם נטענו ללוח השנה- אם יש כמה אירועים חופפים הרוחב ישתנה
const handleEventDidMount = (info) => {
  const overlappingEvents = info.event._def.groupId
    ? info.view.calendar.getEvents().filter(
        (e) => e._def.groupId === info.event._def.groupId
      )
    : [];
  if (overlappingEvents.length > 1) {
    const width = 100 / overlappingEvents.length;
    info.el.style.width = `${width}%`;
  }
};

const handleEventContent = (eventInfo) => {
  const viewType = eventInfo.view.type;
  const isMonthView = viewType === "dayGridMonth";
  const isWeekView = viewType === "timeGridWeek";
  const isDayView = viewType === "timeGridDay";
  const fontSize = isMonthView ? "6px" : isWeekView ? "12px" : "16px";

  return (
    <StyledEventBox
      color={eventInfo.event.extendedProps.color}
      borderColor={eventInfo.event.extendedProps.borderColor}
      isMonthView={isMonthView}
    >
      <Typography sx={{fontWeight: "bold", fontSize}}>
        {eventInfo.event.title}
      </Typography>

      {eventInfo.event.extendedProps.location && (
      <Typography sx={{ fontSize: `calc(${fontSize} - 2px)`}}>
        {eventInfo.event.extendedProps.location}
      </Typography>
    )}
    </StyledEventBox>
  );
}


const Calendar = ({ currentDate, view, events }) => {
  const navigate = useNavigate();
  return (
    <CalendarStyle>
      <Box sx={{ display: "grid", placeItems: "center", width: "100%" }}>
        <FullCalendar
          key={`${currentDate.toString()}-${view}`}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView={view}
          locale={heLocale}
          direction="rtl"
          headerToolbar={false}
          initialDate={currentDate.format("YYYY-MM-DD")}
          height="auto"
          contentHeight="auto"
          aspectRatio={1.2}
          hiddenDays={["dayGridMonth", "timeGridWeek"].includes(view) ? [6] : []}//להסתיר את שבת בתצוגה שבועית וחודשית
          slotLabelFormat={{hour: "numeric", minute: "2-digit", hour12: false}}
          slotDuration="01:00:00" // שורה אחת לכל שעה
          slotMinTime="08:00:00" // השעה הראשונה בתצוגת שבוע ויום
          slotMaxTime="23:00:00" // השעה האחרונה בתצוגת שבוע ויום
          allDaySlot={false}//משמיט את השורה "כל היום" 
          dayHeaderContent={handleDayHeaderContent}
          dayCellContent={(args) => handleDayCellContent(args, view)}//תאריכים עברי ולועזי
          eventClick={(info) => handleEventClick(info, navigate)}
          events={events}
          slotEventOverlap={false}
          eventDidMount={handleEventDidMount}
          eventContent={handleEventContent}
        />
      </Box>
    </CalendarStyle>
  );
};

export default Calendar;