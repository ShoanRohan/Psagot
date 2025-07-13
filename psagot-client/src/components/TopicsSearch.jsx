
import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  MenuItem,
  Stack,
  ThemeProvider,
  createTheme
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';
import { useDispatch, useSelector } from 'react-redux';
import { setTopicsWithFilters } from '../features/topic/topicSlice';
import { fetchAllTopic, fetchAllTopicForCourseByCourseId } from '../features/topic/topicActions';

const theme = createTheme({
  direction: 'rtl'
});

const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer]
});

const TopicsSearch = ({id}) => {
  const [filters, setFilters] = useState({
    subject: '',
    lecture: '',
    status: ''
  });
  const [initialFilters, setInitialFilters] = useState({ subject: '', lecture: '', status: '' });
  const [isValid, setIsValid] = useState(false);
  const {topics}=useSelector(state=>state.topic)
  const {lectures}=useSelector(state=>state.user)
  const {statuses}=useSelector(state=>state.status)
  
const dispatch= useDispatch()
  useEffect(() => {
    const hasChanges = JSON.stringify(filters) !== JSON.stringify(initialFilters);
    const allValid = Object.values(filters).every(val => typeof val === 'string');
    setIsValid(hasChanges && allValid);
  }, [filters, initialFilters]);

  useEffect(() => {
   dispatch(fetchAllTopicForCourseByCourseId(id))
  }, [dispatch]);

  const handleChange = (field) => (event) => {
    setFilters((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSearch = () => {
    if (isValid) {
dispatch(setTopicsWithFilters(filters))
    }
  };

  const handleClear = () => {
    const cleared = { subject: '', lecture: '', status: '' };
    setFilters(cleared);
    setInitialFilters(cleared);
    dispatch(setTopicsWithFilters(cleared))
  };

  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <Box p={2} borderRadius={2} bgcolor="#fff" boxShadow={1} dir="rtl">
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center">
            <TextField
              select
              label="נושא"
              value={filters.subject}
              onChange={handleChange('subject')}
              variant="standard"
              fullWidth
            >
              {topics.map((option) => (
                <MenuItem key={option.topicId} value={option.name}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              select
              label="שם מרצה"
              value={filters.lecture}
              onChange={handleChange('lecture')}
              variant="standard"
              fullWidth
            >
              {lectures.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              select
              label="סטטוס"
              value={filters.status}
              onChange={handleChange('status')}
              variant="standard"
              fullWidth
            >
              {statuses.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>

            <Button
              variant="contained"
              color="primary"
              onClick={handleSearch}
              disabled={!isValid}
              startIcon={<SearchIcon />}
            >
              חיפוש
            </Button>

            <Button variant="text" onClick={handleClear}>
              ניקוי
            </Button>
          </Stack>
        </Box>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default TopicsSearch;
