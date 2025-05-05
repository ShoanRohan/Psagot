import React, {useEffect} from "react";
import { Box, TextField ,Button, Typography} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../features/user/userAction";

const Login = () => {
    const dispatch = useDispatch();
    const { user, status, error } = useSelector((state) => state.user);
    useEffect(() => {
        if (status === 'idle') {
            // dispatch(fetchAllUserTypes());
        }
    }, [status, dispatch]);
const handleClickButton = () => {
        alert("handle click button - user" + JSON.stringify(user));
    };

    if (status === 'loading') return <Typography>Loading...</Typography>;
    if (status === 'failed') return <Typography>Error: {error}</Typography>;
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
<TextField id="standard-basic" label="שם משתמש" variant="standard" />
<TextField id="standard-basic" label="סיסמה" variant="standard" />
<Button variant="outlined">Login</Button>
<img src= "image 3.png" alt="books" class="books-image"/>

        </Box>
    );
}

export default Login;