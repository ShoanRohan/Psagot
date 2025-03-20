import { useState } from "react";
import dayjs from "dayjs";
import NavigationBar from "./NavigationBar";
import { HeaderContainer, Title, ButtonsWrapper, ExportButton , AddRoomButton , ListViewButton} from "./RoomsHeaderStyle";
import pdfIcon from "../assets/imgs/pdf.png";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const RoomsHeader = () => {
    const [currentDate, setCurrentDate] = useState(dayjs()); // התאריך הנוכחי
    const [view, setView] = useState("timeGridDay"); // ברירת מחדל: תצוגת יום

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
        <HeaderContainer>
            <Title component="h1">חדרים</Title>
            <NavigationBar 
                currentDate={currentDate} 
                setCurrentDate={setCurrentDate} 
                view={view} 
            />
            <ButtonsWrapper>
                <ExportButton onClick={handleExportToPDF}>
                    <img src={pdfIcon} alt="Export to PDF" style={{ width: "24px", height: "24px" }} />
                </ExportButton>

                <ListViewButton variant="outlined">
                <CalendarTodayIcon sx={{ fontSize: "1rem !important"}}/> תצוגת רשימה  
                </ListViewButton>

                <AddRoomButton variant="contained">
                <AddCircleOutlineIcon sx={{ fontSize: "1rem !important" }}/> הוספת חדר 
                </AddRoomButton>

                
            </ButtonsWrapper>
        </HeaderContainer>
    );
};

export default RoomsHeader;
