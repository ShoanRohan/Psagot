import React, { useState, useEffect } from "react";
import Calendar from "./Calendar";
import { TextField, Box } from "@mui/material";
import moment from "moment";
import NavigationBar from "./NavigationBar"; // ייבוא פס הניווט

const WeekView = ({ events, fetchEvents }) => {
    const [searchDate, setSearchDate] = useState(moment());

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
