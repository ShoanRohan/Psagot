import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import dayjs from "dayjs";
import "dayjs/locale/he";
import CalendarHeader from "../components/CalendarHeader";
import Calendar from "../components/Calendar";
import { useNavigate } from "react-router-dom";


// הצגת לוח השנה, כותרות ושליפת האירועים
const CalendarPage = () => {
    const [currentDate, setCurrentDate] = useState(dayjs());
    const [view, setView] = useState("dayGridMonth");
    const [events, setEvents] = useState([]);
    const navigate=useNavigate();

    useEffect(() => {
        let startDate = dayjs(currentDate);
        let endDate = dayjs(currentDate);

        if (view === "timeGridDay") {
            endDate = startDate.endOf("day");
        } else if (view === "timeGridWeek") {
            startDate = startDate.startOf("week");
            endDate = startDate.add(6, "day").endOf("day");
        } else if (view === "dayGridMonth") {
            startDate = startDate.startOf("month");
            endDate = startDate.endOf("month");
        }

        fetchEvents(startDate, endDate);
    }, [currentDate, view]);

    const fetchEvents = async (startDate, endDate) => {
        const fetchedEvents = [
            { id: "1", title: "קורס תכנות - JAVA", start: "2025-03-09T12:00:00", end: "2025-03-09T14:00:00", extendedProps: { location: "חדר מחשבים", color: "#ffccf3", borderColor: "#ff00b4" } },
            { id: "2", title: "קורס יעוץ מס - חשבונאות", start: "2025-03-10T13:00:00", end: "2025-03-10T15:00:00", extendedProps: { location: "חדר חדשנות", color: "#ccffcc", borderColor: "#00b400" } },
            { id: "3", title: "קורס עיצוב - מיתוג", start: "2025-03-12T09:00:00", end: "2025-03-12T10:30:00", extendedProps: { location: "חדר חדשנות", color: "#FFE2E2", borderColor: "#FF7676" } }
        ];
        setEvents(fetchedEvents);
    };
    

    return (
        <Box id="calendar-container">
            <CalendarHeader currentDate={currentDate} setCurrentDate={setCurrentDate} view={view} setView={setView} />
            <Calendar currentDate={currentDate} view={view} events={events} />
        </Box>
    );
};

export default CalendarPage;
