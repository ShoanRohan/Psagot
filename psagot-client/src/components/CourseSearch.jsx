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
import dayjs from 'dayjs';

const sharedStyles = {
  width: '150px',
  height: '43px',
  textAlign: 'right',
  direction: 'rtl',
  '& .MuiInputLabel-root': {
    right: '0',
    transformOrigin: 'top right',
    fontFamily: 'Rubik'
  },
  '& .MuiSelect-icon': {
    right: 'unset',
    left: '0px',
  },
  fontFamily: 'Rubik',
  input: { fontFamily: 'Rubik', fontSize: '0.7vw' },

};

const buttonStyles = {
  minWidth: '100px',
  height: '40px',
  borderRadius: '50px',
  fontFamily: 'Rubik',
  fontWeight: 400,
  fontSize: '16px',
  textTransform: 'none',
  input: { fontFamily: 'Rubik', fontSize: '0.7vw' },

};
const scrollBar = {
  maxHeight: 48 * 4.5,
  '&::-webkit-scrollbar': {
    width: '8px',
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: '#f1f1f1',
    borderRadius: '10px',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '#888',
    borderRadius: '10px',
  },
  '&::-webkit-scrollbar-thumb:hover': {
    backgroundColor: '#555',
  },
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
      const parsed = JSON.parse(saved);
      return {
        ...defaultFilters,
        ...parsed,
        startDate: parsed.startDate ? dayjs(parsed.startDate) : null,
        endDate: parsed.endtDate ? dayjs(parsed.endDate) : null,
      };
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

    setLastSearchedFilters(filters);
    dispatch(filterCourses(filterDto));
    setHasSearched(true);
  };

  const handleReset = () => {
    setFilters(defaultFilters);
    setLastSearchedFilters(defaultFilters);
    setHasSearched(false);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        dir="rtl"
        sx={{
          position: "absolute",
          top: "18%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "calc(100% - 48px)",
          height: '72px',
          background: '#fff',
          boxShadow: '0px 0px 4px rgba(220, 226, 236, 0.8)',
          borderRadius: '10px',
          padding: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          fontFamily: 'Rubik',
          border: '1px solid #E5E7EB',
          boxSizing: 'border-box',
          zIndex: 2,
        }}
      >
        <Box sx={{ display: 'flex', gap: '20px' }}>
          <TextField
            variant="standard"
            type="number"
            label="קוד קורס"
            value={filters.courseId}
            onChange={handleChange('courseId')}
            sx={[sharedStyles, {
              '& .MuiInputBase-root': {
                marginTop: '21px',
              }
            }]}
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
            sx={[sharedStyles, {
              '& .MuiInputBase-root': {
                marginTop: '21px',
              }
            }]}
            InputProps={{ inputProps: { style: { textAlign: 'right' } }, disableUnderline: false }}
          />

          <FormControl variant="standard" sx={sharedStyles}>
            <InputLabel>רכזת</InputLabel>
            <Select
              value={filters.coordinator}
              onChange={handleChange('coordinator')}
              sx={sharedStyles}
              MenuProps={{
                PaperProps: {
                  sx: { ...scrollBar }
                },
              }}
            >
              {coordinators?.map((c) => (
                <MenuItem key={c.userId} value={c.userId}>
                  {c.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>


          <FormControl variant="standard" sx={sharedStyles}>
            <InputLabel>שנה</InputLabel>
            <Select
              value={filters.year}
              onChange={handleChange('year')}
              sx={sharedStyles}
              MenuProps={{
                PaperProps: {
                  sx: { ...scrollBar }
                },
              }}
            >
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
            slotProps={{
              textField: {
                placeholder: 'תאריך התחלה',
                variant: 'standard',
                sx: {
                  width: 125,
                  direction: 'rtl', 
                  input: {
                    fontFamily: 'Rubik',
                    fontSize: '14px',
                  },
                  '& .MuiInputAdornment-root': {
                    marginRight: 0, 
                    marginLeft: 'unset',
                    alignItems: 'center',
                    height: '100%',
                  },
                  '& .MuiSvgIcon-root': {
                    fontSize: '20px',
                    marginTop: '0px',
                  },
                  '& .MuiInputBase-root': {
                    marginTop: '16px',
                    height: '32px',
                  },
                  '& .MuiInputLabel-root': {
                    right: 0,
                    transformOrigin: 'top right',
                    fontFamily: 'Rubik',
                  },
                },
              },
            }}

          />

          <DatePicker
            label="תאריך סיום"
            value={filters.endDate}
            onChange={handleDateChange('endDate')}
            slotProps={{
              textField: {
                placeholder: 'תאריך סיום',
                variant: 'standard',
                sx: {
                  width: 125,
                  direction: 'rtl', 
                  input: {
                    fontFamily: 'Rubik',
                    fontSize: '14px',
                  },
                  '& .MuiInputAdornment-root': {
                    marginRight: 0, 
                    marginLeft: 'unset',
                    alignItems: 'center',
                    height: '100%',
                  },
                  '& .MuiSvgIcon-root': {
                    fontSize: '20px',
                    marginTop: '0px',
                  },
                  '& .MuiInputBase-root': {
                    marginTop: '16px',
                    height: '32px',
                  },
                  '& .MuiInputLabel-root': {
                    right: 0,
                    transformOrigin: 'top right',
                    fontFamily: 'Rubik',
                  },
                },
              },
            }}
            sx={{
              width: 120,
              borderBottom: '1px solid #C6C6C6',
              input: { fontFamily: 'Rubik', fontSize: '0.7vw' },
            }}
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

        <Box sx={{ display: 'flex', gap: '6px', marginRight: 'auto' }}>
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