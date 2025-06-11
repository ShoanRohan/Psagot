import React, { useState } from 'react'
import RoomsHeader from '../components/RoomsHeader';
import RoomTable from '../components/RoomTable';
import { Box } from '@mui/system';
import dayjs from 'dayjs';

const RoomsViewPage = () => {
const [currentDate, setCurrentDate] = useState(dayjs()); 

  return (
    <Box>
    <RoomsHeader  currentDate={currentDate} setCurrentDate={setCurrentDate}/>
    <RoomTable date={currentDate.format('YYYY-MM-DD')} />
    </Box>
  )
}

export default RoomsViewPage