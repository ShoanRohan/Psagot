import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Box, Button, LinearProgress } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export default function SelectVariants() {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <div>
      <Box sx={{ width: "100%" }}>
        <LinearProgress />

        {/* שימוש ב-flexbox ליישור הרכיבים */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center", // מיישר את האלמנטים לאורך הציר האנכי
            marginTop: 2,
          }}
        >
          {/* רכיבים מצד ימין */}
          <Box sx={{ display: "flex", gap: 2 }}>
            <FormControl variant="standard" sx={{ minWidth: 120 }}>
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

            <FormControl variant="standard" sx={{ minWidth: 120 }}>
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
          </Box>

          {/* כפתור בצד שמאל */}
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
              marginTop: "8px", // הורדה קלה למטה
              "&:hover": {
                backgroundColor: "darkblue",
              },
            }}
          >
            חיפוש
          </Button>
        </Box>
      </Box>
    </div>
  );
}
