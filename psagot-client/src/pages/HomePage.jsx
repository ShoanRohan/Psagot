import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUserTypes } from "../features/userType/userTypeActions";
import { Typography, Button, Container } from "@mui/material";
import MeetingButton from './MeetingButton';
import { ExportIconButton } from "./ExcelButton";

const HomePage = () => {
    const dispatch = useDispatch();
    const { userTypes, status, error } = useSelector((state) => state.userType);

    useEffect(() => {
        if (status === 'idle') {
            // dispatch(fetchAllUserTypes());
            // dispatch(fetchAllUserTypes());
        }
    }, [status, dispatch]);

    const fakeMeetings = [
        {
            meetingId: 1,
            title: "פגישת צוות",
            date: "2025-04-22",
            location: "Zoom",
        },
        {
            meetingId: 2,
            title: "פגישה עם לקוח",
            date: "2025-04-23",
            location: "משרד תל אביב",
        },
    ];

    const handleClickButton = () => {
        alert("handle click button - userTypes" + JSON.stringify(userTypes));
    };

    if (status === 'loading') return <Typography>Loading...</Typography>;
    if (status === 'failed') return <Typography>Error: {error}</Typography>;

    return (
        <Container style={{ textAlign: 'center', padding: 10 }}>
            <Typography variant="h5">😀 hello psagot project 😀</Typography>
            <Button onClick={handleClickButton}>Example of a function structure</Button>


            {/* כפתור ייצוא לפגישות לדוגמה */}
            <ExportIconButton
                data={fakeMeetings}
                fileName="demo-meetings"
                sheetName="פגישות"
            />

            {/* כפתור להוספת פגישה */}
            <MeetingButton />
        </Container>
    );
};

export default HomePage;