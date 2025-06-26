import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import '../styles/SearchMeetingByTopicId.css';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import SearchIcon from "@mui/icons-material/Search";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchAllTopics } from '../features/topic/topicActions';
import { fetchAllCourses } from '../features/course/courseActions';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { fetchAllMeetingsBySearch } from '../features/meeting/meetingActions';

export default function SearchMeetingByTopicId() {
  const dispatch = useDispatch();

  const [course, setCourse] = useState('');
  const [topic, setTopic] = useState('');
  const [lecturer, setLecturer] = useState('');
  const [date, setDate] = useState(new Date());

  const { pageNumber, pageSize } = useSelector((state) => state.meeting);
  const { topics } = useSelector((state) => state.topic);
  const { courses } = useSelector((state) => state.course);

  useEffect(() => {
    dispatch(fetchAllTopics());
    dispatch(fetchAllCourses());
  }, [dispatch]);

  const handleChangeTopic = (event) => {
    setTopic(event.target.value);
  };

  const handleChangeLecturer = (event) => {
    setLecturer(event.target.value);
  };

  const handleSearch = () => {
  //   const selectedDate = date ?? dayjs(); // אם לא נבחר תאריך, נשתמש בתאריך של היום

    dispatch(fetchAllMeetingsBySearch({
      courseId: course, // הכניסי כאן Course ID מתאים אם צריך
      topicId: topic,
      teacherName: lecturer,
      date: date.toString(),
      pageNumber,
      pageSize,
    }));

  }
  return (
    <div className="father">
      <div className='son'>

        <div className="topic">
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="course-label">קורס</InputLabel>
            <Select
              labelId="course-label"
              id="course-select"
              value={course}
              onChange={(e)=>{setCourse(e.target.value)}}
              label="Course"
            >
              {courses.map((course) =>
                <MenuItem key={course.courseId} value={course.courseId}>{course.name}</MenuItem>
              )}
            </Select>
          </FormControl>
        </div>

        <div className="topic">
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="topic-label">נושא</InputLabel>
            <Select
              labelId="topic-label"
              id="topic-select"
              value={topic}
              onChange={handleChangeTopic}
              label="Topic"
            >
              {topics.map((topic) =>
                <MenuItem key={topic.topicId} value={topic.topicId}>{topic.name}</MenuItem>
              )}
            </Select>
          </FormControl>
        </div>



        <div className="lecturer">
          <Box component="form" noValidate autoComplete="off">
            <TextField
              id="lecturer-input"
              placeholder="מרצה"
              variant="standard"
              value={lecturer}
              onChange={handleChangeLecturer}
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
{/* 
      <div className='date'>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="בחר תאריך"
            value={date}
            onChange={(newValue) => setDate(newValue)}
          />
        </LocalizationProvider>
      </div> */}

<LocalizationProvider dateAdapter={AdapterDateFns}>
  <DatePicker
    label="בחר תאריך"
    value={date}
    onChange={(newValue) => setDate(newValue)}
    slotProps={{
      textField: {
        variant: 'standard',
        sx: {
          width: 250,
        }
      }
    }}
  />
</LocalizationProvider>

      <div className="search">
        <Stack direction="row" spacing={3}>
          <Button variant="contained" endIcon={<SearchIcon />} onClick={handleSearch}>
            חיפוש
          </Button>
        </Stack>
      </div>
    </div>
  );
};