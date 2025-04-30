import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUserTypes } from "../features/userType/userTypeActions";
import { Typography, Button, Container } from "@mui/material";
import MeetingButton from './MeetingButton';
import { ExportIconButton } from "./ExcelButton";
import MeetingTable from '../components/MeetingTable';
const HomePage = () => {
    const dispatch = useDispatch();
    const { userTypes, status, error } = useSelector((state) => state.userType);

    useEffect(() => {
        if (status === 'idle') {
            // dispatch(fetchAllUserTypes());
            // dispatch(fetchAllUserTypes());
        }
    }, [status, dispatch]);

  
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
                data={MeetingTable}
                sheetName="פגישות"
            />

            {/* כפתור להוספת פגישה */}
            <MeetingButton />
            

        </Container>
    );
};

export default HomePage;