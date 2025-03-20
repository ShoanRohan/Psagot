import { useState } from "react";
import dayjs from "dayjs";
import NavigationBar from "./NavigationBar";
import { HeaderContainer, Title, ButtonsWrapper, ExportButton , AddRoomButton , ListViewButton} from "./RoomsHeaderStyle";
import pdfIcon from "../assets/imgs/pdf.png";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const RoomsHeader = () => {
    const [currentDate, setCurrentDate] = useState(dayjs()); // התאריך הנוכחי
    const [view, setView] = useState("timeGridDay"); // ברירת מחדל: תצוגת יום

    return (
        <HeaderContainer>
            <Title component="h1">חדרים</Title>
            <NavigationBar 
                currentDate={currentDate} 
                setCurrentDate={setCurrentDate} 
                view={view} 
            />
            <ButtonsWrapper>
                <ExportButton>
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
