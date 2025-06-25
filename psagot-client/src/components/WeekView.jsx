import React, { useState, useEffect } from "react";
import Calendar from "./Calendar";
import Box from "@mui/material/Box";
import NavigationBar from "./NavigationBar";
import dayjs from "dayjs";

const WeekView = ({ events, fetchEvents }) => {
    const [searchDate, setSearchDate] = useState(dayjs());

    useEffect(() => {
        const startDate = searchDate.clone().startOf("week");
        const endDate = searchDate.clone().endOf("week");
        fetchEvents(startDate, endDate);
    }, [searchDate, fetchEvents]);

    return (
        <Box>
            {/* פס ניווט */}
            <NavigationBar currentDate={searchDate} setCurrentDate={setSearchDate} view="timeGridWeek" />

            {/* לוח שנה */}
            <Calendar currentDate={searchDate} view="timeGridWeek" events={events} />
        </Box>
    );
};

export default WeekView;
