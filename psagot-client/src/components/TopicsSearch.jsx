import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Box, Button, LinearProgress } from '@mui/material';
import { FavoriteBorder } from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';


export default function SelectVariants() {
  const [age, setAge] = React.useState('');

  const handleChange = (event ) => {
    setAge(event.target.value);
  };

  return (
    <div>
       <Box sx={{ width: "100%" }}>
      <LinearProgress />
  
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">נושא</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={age}
          onChange={handleChange}
          label="נושא"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>מתמטיקה</MenuItem>
          <MenuItem value={20}>ריאקט</MenuItem>
          <MenuItem value={30}>FE</MenuItem>
          
        </Select>
        </FormControl>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>

        <InputLabel id="demo-simple-select-standard-label">שם מרצה</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={age}
          onChange={handleChange}
          label="שם מרצה"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>מירי ויכלדר</MenuItem>
          <MenuItem value={20}>בלי רצקר</MenuItem>
          <MenuItem value={30}>שני דונט</MenuItem>
        </Select>
      </FormControl>
      {/* <Button
  startDecorator={<FavoriteBorder />}
></Button> */}
     <Button
      variant="contained"
      startIcon={<SearchIcon sx={{ marginLeft: "12px" }} />} // ריווח בצד שמאל של האייקון
      sx={{
        backgroundColor: "blue",
        color: "white",
        borderRadius: "50px",
        padding: "10px 20px",
        textTransform: "none",
        direction: "rtl", // יישור עברית
        "&:hover": {
          backgroundColor: "darkblue",
        },
      }}
    >
      חיפוש
    </Button>
    </Box>
    </div>
  );
}
