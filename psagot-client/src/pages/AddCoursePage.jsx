import React from 'react'
import NewCourse from '../components/NewCourse'
import {Typography} from "@mui/material";

const AddCoursePage = () => {
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
      <NewCourse/>  
    </div>
  )
}

export default AddCoursePage;