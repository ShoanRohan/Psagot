import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  TextField,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAvailableYears, fetchCourseStatuses, filterCourses } from '../features/course/courseActions';
import { fetchCoordinators } from '../features/user/userAction';

const sharedStyles = {
  width: '150px',
  height: '43px',
  textAlign: 'right',
  direction: 'rtl',
  '& .MuiInputLabel-root': {
    right: '0',
    transformOrigin: 'top right',
  },
  '& .MuiSelect-icon': {
    right: 'unset',
    left: '0px',
  },
};

const buttonStyles = {
  minWidth: '100px',
  height: '40px',
  borderRadius: '50px',
  fontFamily: 'Rubik',
  fontWeight: 400,
  fontSize: '16px',
  textTransform: 'none',
};

const defaultFilters = {
  courseId: '',
  name: '',
  coordinator: '',
  year: '',
  startDate: null,
  endDate: null,
  status: 1,
};

const getInitialFilters = () => {
  const saved = localStorage.getItem('courseFilters');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      return defaultFilters;
    }
  }
  return defaultFilters;
};

const CourseSearch = () => {
  const dispatch = useDispatch();
  const coordinators = useSelector((state) => state.user.coordinators);
  const years = useSelector((state) => state.course.availableYears || []);
  const statuses = useSelector((state) => state.course.courseStatuses || []);

  // אתחול ה-state מה-localStorage או ברירת מחדל
  const [filters, setFilters] = useState(getInitialFilters);
  const [lastSearchedFilters, setLastSearchedFilters] = useState(getInitialFilters);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    dispatch(fetchCoordinators());
    dispatch(fetchAvailableYears());
    dispatch(fetchCourseStatuses());
  }, [dispatch]);

  // בדיקה האם הפילטרים שונו ביחס לאחרון שחיפשנו
  const isFiltersChanged = JSON.stringify(filters) !== JSON.stringify(lastSearchedFilters);

  const handleChange = (field) => (event) => {
    setFilters({ ...filters, [field]: event.target.value });
  };

  const handleDateChange = (field) => (date) => {
    setFilters({ ...filters, [field]: date });
  };

  const handleSearch = () => {
    const filterDto = {
      courseId: filters.courseId ? parseInt(filters.courseId) : null,
      name: filters.name || null,
      year: filters.year ? parseInt(filters.year) : null,
      startDate: filters.startDate ? filters.startDate.toISOString() : null,
      endDate: filters.endDate ? filters.endDate.toISOString() : null,
      coordinator: filters.coordinator || null,
      statusId: filters.status || null,
    };

    // שמירת הפילטרים ב-localStorage
    localStorage.setItem('courseFilters', JSON.stringify(filters));

    setLastSearchedFilters(filters);
    dispatch(filterCourses(filterDto));
    setHasSearched(true);
  };

  const handleReset = () => {
    setFilters(defaultFilters);
    localStorage.removeItem('courseFilters'); // נקה את ה-localStorage
    dispatch(filterCourses({ statusId: 1 }));
    setLastSearchedFilters(defaultFilters);
    setHasSearched(false);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        dir="rtl"
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '30px 32px',
          backgroundColor: 'white',
          fontFamily: 'Rubik',
          borderRadius: '10px',
          boxShadow: '0px 0px 4px 0px rgba(220, 226, 236, 0.80)',
        }}
      >
        <Box sx={{ display: 'flex', gap: '20px' }}>
          <TextField
            variant="standard"
            type="number"
            label="קוד קורס"
            value={filters.courseId}
            onChange={handleChange('courseId')}
            sx={sharedStyles}
            InputProps={{
              inputProps: {
                style: { textAlign: 'right' },
              },
              disableUnderline: false,
              sx: {
                '& input[type=number]': {
                  MozAppearance: 'textfield',
                },
                '& input[type=number]::-webkit-outer-spin-button': {
                  WebkitAppearance: 'none',
                  margin: 0,
                },
                '& input[type=number]::-webkit-inner-spin-button': {
                  WebkitAppearance: 'none',
                  margin: 0,
                },
              },
            }}
          />

          <TextField
            variant="standard"
            label="שם קורס"
            value={filters.name}
            onChange={handleChange('name')}
            sx={sharedStyles}
            InputProps={{ inputProps: { style: { textAlign: 'right' } }, disableUnderline: false }}
          />

          <FormControl variant="standard" sx={sharedStyles}>
            <InputLabel>רכזת</InputLabel>
            <Select value={filters.coordinator} onChange={handleChange('coordinator')} sx={sharedStyles}>
              {coordinators?.map((c) => (
                <MenuItem key={c.userId} value={c.userId}>
                  {c.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl variant="standard" sx={sharedStyles}>
            <InputLabel>שנה</InputLabel>
            <Select value={filters.year} onChange={handleChange('year')} sx={sharedStyles}>
              {years?.map((year) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <DatePicker
            label="תאריך התחלה"
            value={filters.startDate}
            onChange={handleDateChange('startDate')}
            slotProps={{ textField: { variant: 'standard' } }}
            sx={sharedStyles}
          />

          <DatePicker
            label="תאריך סיום"
            value={filters.endDate}
            onChange={handleDateChange('endDate')}
            slotProps={{ textField: { variant: 'standard' } }}
            sx={sharedStyles}
          />

          <FormControl variant="standard" sx={sharedStyles}>
            <InputLabel>סטטוס</InputLabel>
            <Select value={filters.status} onChange={handleChange('status')} sx={sharedStyles}>
              {statuses?.map((status) => (
                <MenuItem key={status.statusCourseId} value={status.statusCourseId}>
                  {status.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ display: 'flex', gap: '10px' }}>
            <Button variant="outlined" onClick={handleReset} sx={buttonStyles}>
              ניקוי
            </Button>
          <Button
            variant="contained"
            onClick={handleSearch}
            disabled={!isFiltersChanged}
            sx={{ ...buttonStyles, backgroundColor: '#1976d2', color: 'white' }}
            startIcon={<SearchIcon sx={{ marginLeft: 1 }} />}
          >
            חיפוש
          </Button>
        </Box>
      </Box>
    </LocalizationProvider>
  );
};

export default CourseSearch;
