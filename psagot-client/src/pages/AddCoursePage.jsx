import React, { useState } from 'react'
import NewCourse from '../components/NewCourse';
import {Tab, Tabs, Typography} from "@mui/material";
import { Box } from '@mui/system';

const AddCoursePage = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const handelChange = (evant, newValue) => {
    setTabIndex(newValue);
  };
  return (
    <div>
       <Typography variant='body1' fontWeight='bold'
      sx={{
        textAlign: "right",
        fontFamily: 'Rubik',
         fontSize: {xs: '1.5rem', sm: '1.75rem', md: '2rem'},
        fontStyle: 'normal',
        fontWeight:700,
        lineHeight: 'normal',
        textTransform: 'capitalize',
        width: '100%',
        color: '#0D1783',
         mt: {xs: 1, sm: 2, md: 1},
         mb: {xs: 1, sm: 2, md: 1},
      }}>
        הוספת קורס
      </Typography>
      <Box
      sx={{
        bordeBottom: 1,
        borderColor: 'divider',
        mb: 2
      }}
      >
        <Tabs value={tabIndex} onChange={handelChange} textColor='primary'indicatorColor='primary'>
          <Tab label= 'פרטי קורס' sx={{ fontFamily: 'Rubik'}}/>
          <Tab label= 'נושאי הקורס' sx={{ fontFamily: 'Rubik'}}/>
        </Tabs>
      </Box>
      {tabIndex === 0 && <NewCourse/> }
      {tabIndex === 1 && (
        <Box sx={{textAlign: 'center', mt: 4}}>
          <Typography variant='body1' sx={{fontFamily: 'Rubik', color: 'gray'}}>
        
          </Typography>
        </Box>
      )}
       
    </div>
  )
}

export default AddCoursePage;