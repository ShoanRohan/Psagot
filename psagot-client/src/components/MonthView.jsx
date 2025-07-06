import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Calendar from "./Calendar";
import NavigationBar from "./NavigationBar";
import dayjs from "dayjs";

const MonthView = ({ events, fetchEvents }) => {
    const [searchDate, setSearchDate] = useState(dayjs());

    useEffect(() => {
        const startDate = searchDate.clone().startOf("month");
        const endDate = searchDate.clone().endOf("month");
        fetchEvents(startDate, endDate);
    }, [searchDate, fetchEvents]);

    return (
        <Box>
            <NavigationBar currentDate={searchDate} setCurrentDate={setSearchDate} view="dayGridMonth" />
            <Calendar currentDate={searchDate} view="dayGridMonth" events={events} />
        </Box>
    );
};

export default MonthView;
