import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import dayjs from "dayjs";
import "dayjs/locale/he";
import CalendarHeader from "../components/CalendarHeader";
import Calendar from "../components/Calendar";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchMeetingsByRange } from "../features/meeting/meetingActions"


// הצגת לוח השנה, כותרות ושליפת האירועים
const CalendarPage = () => {
    const [currentDate, setCurrentDate] = useState(dayjs());
    const [view, setView] = useState("dayGridMonth");
    const { meetingsByRange } = useSelector(state => (state.meeting));
    const navigate = useNavigate();
    const dispatch = useDispatch();

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

        fetchEvents(startDate.format('YYYY-MM-DD'), endDate.format('YYYY-MM-DD'));
    }, [dispatch, currentDate, view]);

    const fetchEvents = async (startDate, endDate) => {
        dispatch(fetchMeetingsByRange({ startDate, endDate }))
    };

    return (
        <Box id="calendar-container">
            <CalendarHeader currentDate={currentDate} setCurrentDate={setCurrentDate} view={view} setView={setView} />
            {/* <Box sx={{ overflow: 'auto' }}> */}
            <Box>
                    <Calendar
                        currentDate={currentDate}
                        view={view}
                        events={meetingsByRange}
                    />
                </Box>
            </Box>
            );
};

            export default CalendarPage;
