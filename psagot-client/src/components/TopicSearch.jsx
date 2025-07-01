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
import { filterTopics } from '../features/topic/topicActions';

const statuses = ['פעיל', 'לא פעיל'];
const years = Array.from({ length: 2050 - 2016 + 1 }, (_, i) => 2016 + i);

const defaultFilters = {
  name: '',
  coordinator: '',
  startDate: null,
  endDate: null,
  status: 'פעיל',
};

const TopicSearch = () => {
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
      TopicId: filters.TopicId || null,
      name: filters.name || null,
      year: filters.year ? parseInt(filters.year) : null,
      startDate: filters.startDate ? filters.startDate.toISOString() : null,
      endDate: filters.endDate ? filters.endDate.toISOString() : null,
      coordinator: filters.coordinator || null,
      statusId: filters.status === 'פעיל' ? 1 : 2,
    };

    dispatch(filterTopics(filterDto));
    setLastSearchedFilters(filters);
  };

  const handleReset = () => {
    setFilters(defaultFilters);
    dispatch(filterTopics({ statusId: 1 }));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        dir="rtl"
        sx={{
          position: "absolute",
          top: "19%",
          left: "43.25%",
          transform: "translateX(-50%)",
          width: "calc(100% - 300px)", // Full width minus padding (24px on each side)
          height: '90px',
          background: '#fff',
          boxShadow: '0px 0px 4px rgba(220, 226, 236, 0.8)',
          borderRadius: '10px',
          padding: '16px',
          display: 'flex',
          alignItems: 'end',
          gap: '16px',
          fontFamily: 'Rubik',
          border: '1px solid #E5E7EB',
          boxSizing: 'border-box', // Ensure padding is included in width
          zIndex: 2,
        }}
      >
        <TextField
          variant="standard"
          placeholder="נושא"
          value={filters.name}
          onChange={handleChange('name')}
          sx={{
            width: 120,
            borderBottom: '1px solid #C6C6C6',
            input: { fontFamily: 'Rubik', fontSize: '0.7vw' },
          }}
        />
        <TextField
          select
          variant="standard"
          placeholder="שם מרצה"
          value={filters.coordinator}
          onChange={handleChange('coordinator')}
          sx={{
            width: 120,
            borderBottom: '1px solid #C6C6C6',
            '.MuiSelect-select': { fontFamily: 'Rubik', fontSize: '0.7vw' },
          }}
        >
          {coordinators?.map((coordinator) => (
            <MenuItem key={coordinator} value={coordinator} sx={{ fontFamily: 'Rubik', fontSize: '0.7vw' }}>
              {coordinator}
            </MenuItem>
          ))}
        </TextField>
       
        <TextField
          variant="standard"
          select
          placeholder="סטטוס"
          value={filters.status}
          onChange={handleChange('status')}
          sx={{
            width: 120,
            borderBottom: '1px solid #C6C6C6',
            '.MuiSelect-select': { fontFamily: 'Rubik', fontSize: '0.7vw' },
          }}
        >
          {statuses.map((status) => (
            <MenuItem key={status} value={status} sx={{ fontFamily: 'Rubik', fontSize: '0.7vw' }}>
              {status}
            </MenuItem>
          ))}
        </TextField>

        <Box sx={{ display: 'flex', gap: '16px', marginRight: 'auto' }}>
          <Button
            variant="outlined"
            onClick={handleReset}
            sx={{
              borderRadius: '50px',
              width: '100px',
              height: '40px',
              fontFamily: 'Rubik',
              fontSize: '0.7vw',
              borderColor: '#326DEF',
              color: '#326DEF',
              '&:hover': {
                borderColor: '#2a5ed9',
                backgroundColor: 'rgba(50, 109, 239, 0.04)',
              },
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
              width: '100px',
              height: '40px',
              fontFamily: 'Rubik',
              fontSize: '0.7vw',
              backgroundColor: '#326DEF',
              color: 'white',
              '&:hover': {
                backgroundColor: '#2a5ed9',
              },
              '&:disabled': {
                backgroundColor: '#B0C4DE',
                color: 'white',
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

export default TopicSearch;