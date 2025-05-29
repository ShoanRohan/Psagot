import React, { useState } from 'react';
import {
  Box,
  TextField,
  MenuItem,
  Button,
  Grid,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchCoordinators } from '../features/user/userAction';
import { filterCourses } from '../features/course/courseActions';
import { fetchAllCourses } from "../features/course/courseActions";





const statuses = ['פעיל', 'לא פעיל'];
const years = Array.from({ length: 2050 - 2016 + 1 }, (_, i) => 2016 + i);

const defaultFilters = {
  courseCode: '',
  courseName: '',
  coordinator: '',
  year: '',
  startDate: null,
  endDate: null,
  status: 'פעיל',
};

const CourseSearch = () => {
const dispatch = useDispatch();
const coordinators = useSelector((state) => state.user.coordinators);

useEffect(() => {
  dispatch(fetchCoordinators());
}, [dispatch]);


  const [filters, setFilters] = useState(defaultFilters);
  const [lastSearchedFilters, setLastSearchedFilters] = useState(defaultFilters);

  const isFiltersChanged = JSON.stringify(filters) !== JSON.stringify(lastSearchedFilters);

  const handleChange = (field) => (event) => {
    setFilters({ ...filters, [field]: event.target.value });
  };
    const handleDateChange = (field) => (date) => {
    setFilters({ ...filters, [field]: date });
  };

 const handleSearch = () => {
  const filterDto = {
    name: filters.courseName || null,
    year: filters.year ? parseInt(filters.year) : null,
    startDate: filters.startDate ? filters.startDate.toISOString() : null,
    endDate: filters.endDate ? filters.endDate.toISOString() : null,
    coordinatorId: filters.coordinator ? parseInt(filters.coordinator) : null,
    statusId: filters.status === 'פעיל' ? 1 : filters.status === 'לא פעיל' ? 2 : null,
  };

  console.log('Sending Filter DTO:', filterDto);

  dispatch(filterCourses(filterDto));
  setLastSearchedFilters(filters);
};


  const handleReset = () => {
    setFilters(defaultFilters);
    dispatch(fetchAllCourses());
  };

  return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
    <Box
      dir="rtl"
      sx={{
        width: '90%',
        margin: '0 auto', 
        background: '#fff',
        boxShadow: '0px 0px 4px rgba(220, 226, 236, 0.8)',
        borderRadius: '10px',
        padding: 3,
        display: 'flex',
        alignItems: 'center',
        gap: 3,
        flexWrap: 'wrap', 
        fontFamily: 'Rubik',
      }}
    >
      <TextField
        variant="standard"
        placeholder="קוד קורס"
        value={filters.courseCode}
        onChange={handleChange('courseCode')}
        sx={{
          width: 200,
          borderBottom: '1px solid #C6C6C6',
          input: { fontFamily: 'Rubik' },
        }}
      />
      <TextField
        variant="standard"
        placeholder="שם קורס"
        value={filters.courseName}
        onChange={handleChange('courseName')}
        sx={{
          width: 200,
          borderBottom: '1px solid #C6C6C6',
          input: { fontFamily: 'Rubik' },
        }}
      />
     <TextField
        select
        variant="standard"
        placeholder="רכזת"
        value={filters.coordinator}
        onChange={handleChange('coordinator')}
        sx={{
          width: 200,
          borderBottom: '1px solid #C6C6C6',
          '.MuiSelect-select': { fontFamily: 'Rubik' },
        }}
      >
        {coordinators.map((coordinator) => (
          <MenuItem key={coordinator} value={coordinator} sx={{ fontFamily: 'Rubik' }}>
            {coordinator}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        variant="standard"
        select
        placeholder="שנה"
        value={filters.year}
        onChange={handleChange('year')}
        sx={{
          width: 200,
          borderBottom: '1px solid #C6C6C6',
          '.MuiSelect-select': { fontFamily: 'Rubik' },
        }}
      >
        {years.map((year) => (
          <MenuItem key={year} value={year} sx={{ fontFamily: 'Rubik' }}>
            {year}
          </MenuItem>
        ))}
      </TextField>
        <Grid item xs={12} md={1.6}>
        <DatePicker
                  variant="standard"
                  label="תאריך התחלה"
                  value={filters.startDate}
                  onChange={handleDateChange('startDate')}
                  sx={{
                    width: 200,
                    borderBottom: '1px solid #C6C6C6',
                    input: { fontFamily: 'Rubik' },
                  }}
                />
        </Grid>
              <Grid item xs={12} md={1.6}>
                <DatePicker
                  label="תאריך סיום"
                  value={filters.endDate}
                  onChange={handleDateChange('endDate')}
                />
       </Grid>
      <TextField
        variant="standard"
        select
        placeholder="סטטוס"
        value={filters.status}
        onChange={handleChange('status')}
        sx={{
          width: 200,
          borderBottom: '1px solid #C6C6C6',
          '.MuiSelect-select': { fontFamily: 'Rubik' },
        }}
      >
        {statuses.map((status) => (
          <MenuItem key={status} value={status} sx={{ fontFamily: 'Rubik' }}>
            {status}
          </MenuItem>
        ))}
      </TextField>

      <Box sx={{ display: 'flex', gap: 2, marginRight: 'auto' }}>
        <Button
          variant="outlined"
          onClick={handleReset}
          sx={{
            borderRadius: '50px',
            minWidth: 100,
            fontFamily: 'Rubik',
          }}
        >
          ניקוי
        </Button>
        <Button
          variant="contained"
          onClick={handleSearch}
          disabled={!isFiltersChanged}
          sx={{
            borderRadius: '50px',
            minWidth: 100,
            fontFamily: 'Rubik',
            backgroundColor: '#326DEF',
            color: 'white',
            '&:hover': {
              backgroundColor: '#2a5ed9',
            },
          }}
          startIcon={<SearchIcon />}
        >
          חיפוש
        </Button>
      </Box>
    </Box>
    </LocalizationProvider>
  );

  
};

export default CourseSearch;
