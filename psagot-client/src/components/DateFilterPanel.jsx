
import React, { useState } from 'react';
import DayFilter from './DayFilter';
import WeekFilter from './WeekFilter';
import MonthFilter from './MonthFilter';

const DateFilterPanel = ({ viewType, onDateRangeChange }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const handleChange = (range) => {
    onDateRangeChange(range);
  };

  return (
    <>
      {viewType === 'day' && <DayFilter date={currentDate} onChange={handleChange} />}
      {viewType === 'week' && <WeekFilter date={currentDate} onChange={handleChange} />}
      {viewType === 'month' && <MonthFilter date={currentDate} onChange={handleChange} />}
    </>
  );
};

export default DateFilterPanel;
