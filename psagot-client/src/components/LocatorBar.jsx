import react, { useEffect } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { fetchAllCourses } from '../features/course/courseActions';
import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
 const LocatorBar = () => {
  const [course, setcourse] = React.useState('');
  
  const dispatch = useDispatch();
  const { courses, status, error } = useSelector((state) => state.course);

  useEffect(() => {
   
        dispatch(fetchAllCourses()) ; 
        }, [dispatch]);

  const handleChange = (event) => {
        setcourse(event.target.value);
      };
  console.log(courses);
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
       <InputLabel id="demo-simple-select-label">קורס</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={course}
          label="קורס"
          onChange={handleChange}
        >
        {courses.map((course,index) => (
  <MenuItem key={index} value={course.name}>
    {course.name}
  </MenuItem>
))}
        </Select>
      </FormControl>
    </Box>
    
  );
}

export default LocatorBar
