import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUserTypes } from "../features/userType/userTypeActions";
import { Typography, Button, Container } from "@mui/material";
import TopicsSearch from "../components/TopicsSearch"

const HomePage = () => {
    const dispatch = useDispatch();
    const { userTypes, status, error } = useSelector((state) => state.userType);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchAllUserTypes());
        }
    }, [status, dispatch]);

    // Remark: all functions - start with **handle**
    const handleClickButton = () => {
        alert("handle click button - userTypes" + JSON.stringify(userTypes));
    };

    if (status === 'loading') return <Typography>Loading...</Typography>;
    if (status === 'failed') return <Typography>Error: {error}</Typography>;

    return (
        <Container item style={{ textAlign: 'center', padding: 10 }}>
            <Typography variant="h5">😀hello psagot project😀</Typography>
            <Button onClick={handleClickButton}>Example of a function structure</Button>
            {/* ofrat */}
            <TopicsSearch/>

        </Container>
    );
}

export default HomePage;