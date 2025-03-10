//בכל תצוגה יש פס ניווט לתאריך:
import { Box, IconButton, Typography, Button, Popover } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/he";
import { useState } from "react";

const NavigationBar = ({ currentDate, setCurrentDate, view }) => {
    const [anchorEl, setAnchorEl] = useState(null);

    // חישוב התאריך לתצוגה בהתאם לסוג התצוגה
    const getFormattedDate = () => {
        const localizedDate = currentDate.locale("he"); // הגדרת עברית כברירת מחדל
    
        if (view === "dayGridMonth") {
            return localizedDate.format("MMMM YYYY"); // פברואר 2025
        } else if (view === "timeGridDay") {
            return localizedDate.format("D [ב]MMMM"); // 27 בפברואר
        } else if (view === "timeGridWeek") {
            const startOfWeek = localizedDate.startOf("week");
            const endOfWeek = localizedDate.endOf("week");
            return `${startOfWeek.locale("he").format("D [ב]MMMM")} - ${endOfWeek.locale("he").format("D [ב]MMMM")}`; // 23 בפברואר - 1 במרץ
        }
        return "";
    };
    

    const handlePrev = () =>
        setCurrentDate(currentDate.subtract(1, view === "dayGridMonth" ? "month" : view === "timeGridDay" ? "day" : "week"));
    const handleNext = () =>
        setCurrentDate(currentDate.add(1, view === "dayGridMonth" ? "month" : view === "timeGridDay" ? "day" : "week"));
    const handleToday = () => setCurrentDate(dayjs());

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="he">
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "12px", padding: "10px" }}>
                {/* חץ אחורה */}
                <IconButton onClick={handlePrev} sx={{ width: "35px", height: "35px", borderRadius: "5px", border: "0.61px solid #C6C6C6" }}>
                    <ArrowForwardIosIcon sx={{ fontSize: "16px", color: "#393939" }} />
                </IconButton>

                {/* תאריך מוצג במילים (כפתור לבחירת תאריך) */}
                <Typography
                    // variant="h6"
                    onClick={(event) => setAnchorEl(event.currentTarget)} // פותח את ה-Popover
                    sx={{
                        fontFamily: "Rubik",
                        fontWeight: 400,
                        fontSize: "21.85px",
                        lineHeight: "25.89px",
                        letterSpacing: "0%",
                        textAlign: "center",
                        color: "#393939",
                        padding: "5px 10px", // ריווח פנימי למראה נעים יותר
                        borderRadius: "5px", // קצוות מעוגלים
                        cursor: "pointer",
                    }}                >
                    {getFormattedDate()}
                </Typography>

                {/* חלונית בחירת תאריך */}
                <Popover
                    open={Boolean(anchorEl)}
                    anchorEl={anchorEl}
                    onClose={() => setAnchorEl(null)}
                    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                    transformOrigin={{ vertical: "top", horizontal: "center" }}
                >
                    <DateCalendar
                        value={currentDate}
                        onChange={(newDate) => {
                            setCurrentDate(newDate);
                            setAnchorEl(null); // סוגר את ה-Popover לאחר בחירת תאריך
                        }}
                    />
                </Popover>

                {/* חץ קדימה */}
                <IconButton onClick={handleNext} sx={{ width: "35px", height: "35px", borderRadius: "5px", border: "0.61px solid #C6C6C6" }}>
                    <ArrowBackIosNewIcon sx={{ fontSize: "16px", color: "#393939" }} />
                </IconButton>

                {/* כפתור היום */}
                <Button variant="outlined" onClick={handleToday} sx={{ fontSize: "16px", fontWeight: 400, color: "#393939", borderRadius: "3.64px", border: "0.61px solid #C6C6C6" }}>
                    היום
                </Button>
            </Box>
        </LocalizationProvider>
    );
};

export default NavigationBar;
