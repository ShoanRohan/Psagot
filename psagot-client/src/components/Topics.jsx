import React from 'react'
import React, { useEffect } from 'react'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { useDispatch, useSelector } from 'react-redux';
import { fetchAllTopic, fetchAllTopicFotCourseByCourseId } from '../features/topic/topicActions';
 const Topics = () => {
  const [Topic,setTopic] = React.useState('');
  
  const dispatch = useDispatch();
  const { topics, status, error } = useSelector((state) => state.topic);

  useEffect(() => {
   
        dispatch(fetchAllTopic()) ; 
        }, [dispatch]);

  const handleChange = (event) => {
    setTopic (event.target.value);
      };
  console.log(topics);
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
       <InputLabel id="demo-simple-select-labe">topic</InputLabel>
        <Select
          labelId="demo-simple-select-labe"
          id="demo-simple-selec"
          value={Topic}
          label=""
          onChange={handleChange}
        >
        {topics.map((Topic,index) => (
  <MenuItem key={index} value={Topic.name}>
    {Topic.name}
  </MenuItem>
))}
        </Select>
      </FormControl>
    </Box>
    
  );
}

export default Topics;

