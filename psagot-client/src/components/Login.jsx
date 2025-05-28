import React, { useEffect, useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../features/user/userAction";

const Login = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { user, status, error } = useSelector((state) => state.user);

  useEffect(() => {
    // if (status === 'idle') {
    //   dispatch(loginAction());
    // }
    console.log(user);
  }, [status, dispatch]);


  const handleClickButton = () => {
    console.log("username:", username);
    console.log("password:", password);
    dispatch(loginAction(username, password));
  };

  if (status === 'loading') return <Typography>Loading...</Typography>;
  if (status === 'failed') return <Typography>Error: {error}</Typography>;
  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        flexDirection: 'row-reverse'
      }}
    >
        <Box
        sx={{
          width: '80vw', // 50% of the viewport width, so the image takes the left half
          height: '100vh', // Full height of the page
          backgroundImage: 'url(/assets/loginImage.png)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'contain', // Ensures the entire image is shown without cropping
          backgroundPosition: 'center', // Centers the image
          flexShrink: 0,
          backgroundColor: 'rgb(154,205,234)'
        }}
      />

      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 2,
          padding: 4,
        }}
      >
        <TextField
          label="שם משתמש"
          variant="standard"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="סיסמה"
          type="password"
          variant="standard"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="outlined" onClick={handleClickButton}>
          Login
        </Button>
      </Box>
    </Box>

  );
};
export default Login;