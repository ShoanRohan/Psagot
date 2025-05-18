import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Paper
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllCourses } from '../features/course/courseActions';
import { fetchAllTopic } from '../features/topic/topicActions';
import { fetchAllUsers } from '../features/user/userAction';
import { format } from 'date-fns';
import { fetchMeetings } from '../features/meeting/meetingActions';


const LocatorBar = () => {
  const [course, setCourse] = useState('');
  const [topic, setTopic] = useState('');
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(format(today, 'yyyy-MM-dd'));
  const [lecturer, setLecturer] = useState('');
  const dispatch = useDispatch();
  const { topics } = useSelector((state) => state.topic);
  const { courses } = useSelector((state) => state.course);
  const {pageNumber, pageSize} =useSelector((state) => state.meeting);
  const users = useSelector((state) => state.user.user || []);

  useEffect(() => {
    dispatch(fetchAllCourses());
    dispatch(fetchAllTopic());
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const handleClear = () => {
    setCourse('');
    setTopic('');
    setLecturer('');
    setSelectedDate(format(today, 'yyyy-MM-dd'));
  };
  const handleSubmit = () => {
    debugger;
    dispatch(fetchMeetings({
      courseName: course,
      subjectName: topic,
      userName: lecturer,
      date: selectedDate,
      page : pageNumber,
      rows: pageSize
    }));
   
      
       
      
  };

  return (
    <Paper
      elevation={3}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 2,
        borderRadius: '16px',
        border: '1px solid ',
        minHeight: 80,
        backgroundColor: '#ffffff',
        flexDirection: 'row',
      }}
    >
      {/* כפתור חיפוש בצד שמאל */}
      
      {/* כל השדות בצד ימין */}
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
        {/* Course */}
        <FormControl variant="standard" sx={{ minWidth: 150 }}>
          <InputLabel>קורס</InputLabel>
          <Select
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            IconComponent={ExpandMoreIcon}
          >
{courses.map((course) => (
  <MenuItem key={course.id || course.name} value={course.name}>
    {course.name}
  </MenuItem>
))}
          </Select>
        </FormControl>

        {/* Topic */}
        <FormControl variant="standard" sx={{ minWidth: 150 }}>
          <InputLabel>נושא</InputLabel>
          <Select
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            IconComponent={ExpandMoreIcon}
          >
{topics.map((topic) => (
  <MenuItem key={topic.id || topic.name} value={topic.name}>
    {topic.name}
  </MenuItem>
))}
          </Select>
        </FormControl>

        {/* Lecturer */}
        <FormControl variant="standard" sx={{ minWidth: 150 }}>
          <InputLabel>מרצה</InputLabel>
          <Select
            value={lecturer}
            onChange={(e) => setLecturer(e.target.value)}
            IconComponent={ExpandMoreIcon}
          >
           
{users
  .filter((user) => user.userTypeId === 4)
  .map((lecturer) => (
    <MenuItem key={lecturer.id || lecturer.name} value={lecturer.name}>
      {lecturer.name}
    </MenuItem>
))}
          </Select>
        </FormControl>

        {/* Date */}
        <TextField
          variant="standard"
          label="תאריך"
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          
        />
         </Box>
       <Box sx={{ display: 'flex', gap: 2 }}>
        {/* Clear Button */}
        <Button
          variant="outlined"
          onClick={handleClear}
          sx={{
            borderRadius: '25px',
            minWidth: 90,
            fontWeight: 'bold',
            color: '#1976d2',
            borderColor: '#1976d2',
            '&:hover': {
              borderColor: '#1565c0',
            },
          }}
        >
          ניקוי
        </Button>
        <Button
        onClick={handleSubmit}
          variant="contained"
          sx={{
            borderRadius: '25px',
            minWidth: 100,
            backgroundColor: '#2196f3',
            color: '#fff',
            fontWeight: 'bold',
            '&:hover': {
              backgroundColor: '#1976d2',
            },
          }}
        >
          <SearchIcon sx={{ mr:1 }} />
          חיפוש
        </Button>
      </Box>
    </Paper>
  );
};

export default LocatorBar;