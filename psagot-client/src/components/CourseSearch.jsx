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
import { filterCourses, fetchAvailableYears } from '../features/course/courseActions';

const statuses = ['פעיל', 'לא פעיל'];

const defaultFilters = {
  courseId: '',
  name: '',
  coordinator: '',
  year: '',
  startDate: null,
  endDate: null,
  status: 'פעיל',
};

const CourseSearch = () => {
  const dispatch = useDispatch();
  const coordinators = useSelector((state) => state.user.coordinators);
  const years = useSelector((state) => state.course.availableYears || []);

  useEffect(() => {
    dispatch(fetchCoordinators());
    dispatch(fetchAvailableYears());

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
      courseId: filters.courseId || null,
      name: filters.name || null,
      year: filters.year ? parseInt(filters.year) : null,
      startDate: filters.startDate ? filters.startDate.toISOString() : null,
      endDate: filters.endDate ? filters.endDate.toISOString() : null,
      coordinator: filters.coordinator || null,
      statusId: filters.status === 'פעיל' ? 1 : 2,
    };

    dispatch(filterCourses(filterDto));
    setLastSearchedFilters(filters);
  };

  const handleReset = () => {
    setFilters(defaultFilters);
    dispatch(filterCourses({ statusId: 1 })); // Use filterCourses with default statusId: 1
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
          value={filters.courseId}
          onChange={handleChange('courseId')}
          sx={{
            width: 200,
            borderBottom: '1px solid #C6C6C6',
            input: { fontFamily: 'Rubik' },
          }}
        />
        <TextField
          variant="standard"
          placeholder="שם קורס"
          value={filters.name}
          onChange={handleChange('name')}
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
          SelectProps={{
            MenuProps: {
              PaperProps: {
                style: {
                  maxHeight: 200, // הצג עד 5 פריטים עם פס גלילה
                  overflowY: 'auto',
                },
              },
            },
            renderValue: (selected) => {
              const selectedCoordinator = coordinators.find((c) => c.userId === selected);
              return selectedCoordinator ? selectedCoordinator.name : '';
            },
          }}
        >
          {coordinators?.map((coordinator) => (
            <MenuItem key={coordinator.userId} value={coordinator.userId} sx={{ fontFamily: 'Rubik' }}>
              {coordinator.name}
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
            sx={{
              width: 200,
              borderBottom: '1px solid #C6C6C6',
              input: { fontFamily: 'Rubik' },
            }}
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