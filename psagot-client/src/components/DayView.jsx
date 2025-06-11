import React, { useState, useEffect } from "react";
import Calendar from "./Calendar";
import Box from "@mui/material/Box";
import NavigationBar from "./NavigationBar";
import dayjs from "dayjs";

const DayView = ({ events, fetchEvents }) => {
    const [searchDate, setSearchDate] = useState(dayjs());

    useEffect(() => {
        const startDate = searchDate.clone().startOf("day");
        const endDate = searchDate.clone().endOf("day");
        fetchEvents(startDate, endDate);
    }, [searchDate, fetchEvents]);

    return (
        <Box>
            {/* פס ניווט */}
            <NavigationBar currentDate={searchDate} setCurrentDate={setSearchDate} view="timeGridDay" />

            {/* לוח שנה */}
            <Calendar currentDate={searchDate} view="timeGridDay" events={events} />
        </Box>
    );
};

export default DayView;
