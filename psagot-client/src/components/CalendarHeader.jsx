import pdfIcon from "../assets/imgs/pdf.png";
import "dayjs/locale/he";
import NavigationBar from "./NavigationBar";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { HeaderContainer, Title, ButtonsWrapper, ExportButton, ViewButtonsContainer, ViewButton } from "./CalendarHeaderStyle";

const CalendarHeader = ({ currentDate, setCurrentDate, view, setView }) => {

    const handleExportToPDF = () => {
        const input = document.getElementById("rooms-container");/////מי שעושה את עיצוב הטבלה עצמה לשנות פה כדי שהייצוא לPDF יתפוס את כל הטבלה
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
            <Title component="h1">לוח שנה</Title>
            <NavigationBar currentDate={currentDate} setCurrentDate={setCurrentDate} view={view} />
            <ButtonsWrapper>
                <ExportButton onClick={handleExportToPDF}>
                    <img src={pdfIcon} alt="Export to PDF" style={{ width: "24px", height: "24px" }} />
                </ExportButton>

                <ViewButtonsContainer>
                    {[
                        { label: "תצוגת חודש", value: "dayGridMonth" },
                        { label: "תצוגת שבוע", value: "timeGridWeek" },
                        { label: "תצוגת יום", value: "timeGridDay" },
                    ].map(({ label, value }) => (
                        <ViewButton
                            key={value}
                            isActive={view === value}
                            onClick={() => setView(value)}
                            variant={view === value ? "contained" : "outlined"}
                        >
                            {label}
                        </ViewButton>
                    ))}
                </ViewButtonsContainer>
            </ButtonsWrapper>
        </HeaderContainer>
    );
};

export default CalendarHeader;
