import { Button, ButtonGroup, Typography, Box, IconButton, useMediaQuery } from "@mui/material";
import pdfIcon from "../assets/imgs/pdf.png";
import dayjs from "dayjs";
import "dayjs/locale/he";
import NavigationBar from "./NavigationBar";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const CalendarHeader = ({ currentDate, setCurrentDate, view, setView }) => {
    const isSmallScreen = useMediaQuery("(max-width:600px)");

    const handleExportToPDF = () => {
        const input = document.getElementById("calendar-container");

        html2canvas(input, {
            scale: 3,
            useCORS: true,
            scrollY: -window.scrollY,
        }).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");
            const pdfWidth = canvas.width * 0.264583;
            const pdfHeight = canvas.height * 0.264583;
            const pdf = new jsPDF("l", "mm", [pdfWidth, pdfHeight]);

            pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
            pdf.save("calendar.pdf");
        });
    };

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "16px",
                gap: "8px",
                flexWrap: "nowrap", // מונע ירידת שורה
                overflow: "hidden",
                minWidth: 0,
            }}
        >
            <Typography
                component="h1"
                sx={{
                    fontFamily: "Rubik",
                    fontWeight: 700,
                    fontSize: isSmallScreen ? "24px" : "40px",
                    color: "#112B83",
                    whiteSpace: "nowrap", // מונע שבירה
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    minWidth: 0,
                }}
            >
                לוח שנה
            </Typography>

            <NavigationBar currentDate={currentDate} setCurrentDate={setCurrentDate} view={view} />

            <Box sx={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
                <IconButton
                    onClick={handleExportToPDF}
                    sx={{
                        width: "40px", height: "40px",
                        minWidth: "40px",
                        padding: "5px",
                        background: "#F0F1F3",
                        borderRadius: "6.88px",
                        flexShrink: 0,
                    }}
                >
                    <img src={pdfIcon} alt="Export to PDF" style={{ width: "24px", height: "24px" }} />
                </IconButton>

                <ButtonGroup
                    sx={{
                        display: "flex",
                        flexWrap: "nowrap",
                        gap: "4px", // מרווח קטן יותר
                        minWidth: 0,
                        overflow: "hidden", // הסרת גלילה
                        // marginLeft: "0 !important",
                      }}
                >
                    {[{ label: "תצוגת חודש", value: "dayGridMonth" },
                      { label: "תצוגת שבוע", value: "timeGridWeek" },
                      { label: "תצוגת יום", value: "timeGridDay" }].map(({ label, value }) => (
                        <Button
                            key={value}
                            variant={view === value ? "contained" : "outlined"}
                            onClick={() => setView(value)}
                            sx={{
                                fontFamily: "Rubik",
                                fontSize: isSmallScreen ? "14px" : "16px",
                                fontWeight: 400,
                                borderRadius: "50px !important",
                                padding: isSmallScreen ? "6px 12px" : "10px 24px",
                                borderColor: "#326DEF !important",
                                color: view === value ? "#FFFFFF" : "#326DEF",
                                background: view === value ? "#1E53CB" : "#FFFFFF",
                                minWidth: "auto", 
                                whiteSpace: "nowrap",
                                flexShrink: 0,
                                marginLeft: "0 !important",

                            }}
                        >
                            {label}
                        </Button>
                    ))}
                </ButtonGroup>
            </Box>
        </Box>
    );
};

export default CalendarHeader;
