import React from 'react'

// const LocatorBar = () => {
//     <FormControl fullWidth>
//   <InputLabel id="select-user-labelr-">user</InputLabel>
//   <Select
//     labelId="select-user-labelr"
//     id="select-user"
//     value={}
//     label="user"
//     onChange={handleChange}
//     users
//   >
//     <MenuItem value={10}>Ten</MenuItem>

//   </Select>
// </FormControl>
// import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
 const LocatorBar = () => {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
    </Box>
    
  );
}

export default LocatorBar