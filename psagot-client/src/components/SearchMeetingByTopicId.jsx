import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import '../styles/SearchMeetingByTopicId.css';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import SearchIcon from "@mui/icons-material/Search";

export default function SearchMeetingByTopicId() {
  const [topic, setTopic] = React.useState('');

  const handleChange = (event) => {
    setTopic(event.target.value);
  };

  return (
    <div className="father">
            <div className='son'>
            <div className="topic">
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="topic-label">נושא</InputLabel>
          <Select
            labelId="topic-label"
            id="topic-select"
            value={topic}
            onChange={handleChange}
            label="Topic"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="מתמטיקה">מתמטיקה</MenuItem>
            <MenuItem value="היסטוריה">היסטוריה</MenuItem>
            <MenuItem value="מדעים">מדעים</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className="lecturer">
        <Box
          component="form"
          noValidate
          autoComplete="off"
        >
          <TextField
            id="lecturer-input"
            placeholder="מרצה"
            variant="standard" 
            InputProps={{
              disableUnderline: true, 
            }}
            sx={{
              background: 'transparent', 
              borderBottom: '1px solid black',
            }}
          />
        </Box>
      </div>
      </div>

           <div className="search">

      <Stack direction="row" spacing={3}>
      <Button variant="contained" endIcon={<SearchIcon/>}>
        חיפוש
      </Button>
    </Stack>
      </div>

    </div>
  );
}