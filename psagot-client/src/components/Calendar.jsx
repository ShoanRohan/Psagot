import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid"; // נוסף עכשיו
import interactionPlugin from "@fullcalendar/interaction";
import heLocale from "@fullcalendar/core/locales/he";
import { Box, Typography } from "@mui/material";
import { HDate, gematriya } from "@hebcal/core";
import "@fontsource/rubik";
import { CalendarStyle } from './CalendarStyle';
import { useNavigate } from "react-router-dom";



const Calendar = ({ currentDate, view, events }) => {
  const navigate=useNavigate();
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


          slotLabelFormat={{
            hour: "numeric",
            minute: "2-digit",
            hour12: false,
          }}


          slotDuration="01:00:00" // שורה אחת לכל שעה
          slotMinTime="08:00:00" // השעה הראשונה בתצוגת שבוע ויום
          slotMaxTime="23:00:00" // השעה האחרונה בתצוגת שבוע ויום
          allDaySlot={false}//משמיט את השורה "כל היום" 

          dayHeaderContent={(args) => {
            const dayLetters = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"];
            return (
              <Box sx={{
                textAlign: "center",
                fontSize: "16px",
                fontWeight: "600",
                padding: "8px",
                backgroundColor: "#F8F9FC",
                width: "65px", // מגדיר רוחב קבוע לכל כותרת יום
              }}>
                {dayLetters[args.date.getDay()]}
              </Box>
            );
          }}


          dayCellContent={(args) => {
            // מציג את התאריך רק בתצוגת חודש
            if (view === "dayGridMonth") {
              const gregorianDate = args.date;
              const hebrewDate = new HDate(gregorianDate);
              const hebrewDay = gematriya(hebrewDate.getDate());

              return (
                <Box
                  sx={{
                    display: "flex !important",
                    flexDirection: "row !important", // שמים את התאריכים בשורה אחת
                    justifyContent: "space-between !important", // מוודאים שהתאריכים יהיו בקצוות
                    alignItems: "center !important", // מוודאים שהכל מיושר אנכית
                    flexWrap: "nowrap !important", // מונע מהמילים לעבור לשורה חדשה
                    width: "100% !important",
                    padding: "6px !important",
                    boxSizing: "border-box !important",
                  }}
                >
                  <Typography
                    sx={{
                      color: "#333 !important",
                      textAlign: "right !important",
                      fontFamily: "Rubik !important",
                      fontWeight: "500 !important",
                      fontSize: "16px !important",
                      direction: "rtl !important",
                      width: "auto !important", // לא קובעים רוחב קבוע
                      marginLeft: "60px",
                    }}
                  >
                    {hebrewDay}
                  </Typography>

                  <Typography
                    sx={{
                      color: "#555 !important",
                      textAlign: "left !important",
                      fontFamily: "Rubik !important",
                      fontWeight: "500 !important",
                      fontSize: "16px !important",
                      direction: "ltr !important",
                      width: "auto !important", // לא קובעים רוחב קבוע
                      marginRight: "60px",


                    }}
                  >
                    {gregorianDate.getDate()}
                  </Typography>
                </Box>
              );
            }
            return null; // לא מציג כלום בתצוגות שבוע ויום
          }}


          eventClick={(info) => {
            console.log("ID של האירוע:", info.event.id); // בדיקה
            navigate(`/meetings/${info.event.id}`); // לנווט עם מזהה תקין
        }}
        



          events={events}

          slotEventOverlap={false}
          eventDidMount={(info) => {
            const overlappingEvents = info.event._def.groupId
              ? info.view.calendar.getEvents().filter(e => e._def.groupId === info.event._def.groupId)
              : [];

            if (overlappingEvents.length > 1) {
              const width = 100 / overlappingEvents.length; // מחלק את הרוחב
              info.el.style.width = `${width}%`;
            }
          }}

          eventContent={(eventInfo) => {
            const viewType = eventInfo.view.type; // מזהה את סוג התצוגה
            const isMonthView = viewType === "dayGridMonth";
            const isWeekView = viewType === "timeGridWeek";
            const isDayView = viewType === "timeGridDay";

            // קביעת גודל הפונט לפי התצוגה
            const fontSize = isMonthView ? "6px" : isWeekView ? "12px" : "16px";

            return (
              <Box
                sx={{
                  backgroundColor: eventInfo.event.extendedProps.color || "#ffccf3",
                  color: "black",
                  padding: "6px",
                  borderRadius: "5px",
                  borderRight: `3px solid ${eventInfo.event.extendedProps.borderColor || "#ff00b4"}`,
                  textAlign: "center",
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                  whiteSpace: "normal",
                  wordBreak: "keep-all",
                  textOverflow: "ellipsis",
                  fontSize, // הוספתי את גודל הטקסט הדינמי
                  ...(isMonthView && {
                    maxHeight: "19.17px",
                    minHeight: "19.17px",
                    lineHeight: "19.17px",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    display: "flex",
                    alignItems: "center",
                  }),
                }}
              >
                <Typography sx={{ fontWeight: "bold", fontSize, textAlign: "center", whiteSpace: "normal" }}>
                  {eventInfo.event.title}
                </Typography>

                <Typography sx={{ fontSize: `calc(${fontSize} - 2px)` }}>
                  {eventInfo.event.extendedProps.location}
                </Typography>
              </Box>
            );
          }}

        />
      </Box>
    </CalendarStyle>


  );
};

export default Calendar;