import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import {
  Box, Paper, IconButton, Pagination, Typography, TableContainer, TableHead, TableRow,
  Table, TableBody, Select, MenuItem, CircularProgress, Grid2
} from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { format } from 'date-fns';
import UnfoldMoreOutlinedIcon from '@mui/icons-material/UnfoldMoreOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { selectCourses, selectCourseStatus } from '../features/course/courseSlice';
import { fetchCourseById } from '../features/course/courseActions';
import editSvg from '../assets/icons/edit.svg';
import { useNavigate } from 'react-router-dom';

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    borderWidth: '2px',
    fontWeight: 'bold',
    fontFamily: 'Rubik',
  },
  [`&.${tableCellClasses.body}`]: {
    fontFamily: 'Rubik',
  },
}));
const StyledTableRow = styled(TableRow)(() => ({
  "&:nth-of-type(odd)": {
    backgroundColor: '#FAFCFF',
  },
}));
const getStatusColors = (statusName) => {
  if (statusName === 'פעיל') return { bgcolor: '#DAF8E6', color: '#1A8245' };
  if (statusName === 'ממתין') return { bgcolor: '#FEEBEB', color: '#E10E0E' };
  if (statusName === 'מושהה') return { bgcolor: '#E5E7EB', color: '#494747' };
  return { bgcolor: '#E5E7EB', color: '#494747' };
};

const CourseGrid = ({ totalCount, currentPage, pageSize, onPageChange, onPageSizeChange }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectSize, setSelectSize] = useState(pageSize);
  const courses = useSelector(selectCourses);
  //להעביר לעמוד ולמחוק יבוא
  const status = useSelector(selectCourseStatus);
  const selectCourse = async (courseId) => {
    await dispatch(fetchCourseById(courseId));
    navigate(`/course/${courseId}`);
  };

  const handlePageChange = (event, newPage) => {
    onPageChange(newPage);
  };
  const handleSelectChange = (event) => {
    const newPageSize = event.target.value;
    setSelectSize(newPageSize);
    onPageSizeChange(newPageSize);
  };
  //להעביר לעמוד קורסים
  if (status === 'loading') {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ ml: 2, fontFamily: 'Rubik' }}>טוען קורסים...</Typography>
      </Box>
    );
  }
  //כנל
  if (!courses || courses.length === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
        <Typography>לא נמצאו קורסים להצגה.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 2, width: '100%' }} >
      <TableContainer component={Paper}
        sx={{
          width: 'auto', mx: 'auto', p: '10px 20px', borderRadius: '10px',
          overflowX: 'auto', boxShadow: '0px 0px 4px 0px #DCE2EC'
        }} >
        <Table sx={{ width: '100%' }} aria-label="courses table">
          <TableHead>
            <TableRow>
              {['קוד קורס', 'שם קורס', 'שם רכזת', 'שנה', 'תאריך התחלה',
                'תאריך סיום', 'מס` מפגשים', 'מס` תלמידים', 'סטטוס', ''].map(
                  (header, i) => (
                    <StyledTableCell key={i} align="center" sx={{ px: 1 }} >
                      {header === 'סטטוס' ? (
                        <Box><>סטטוס</>
                          <IconButton sx={{ width: '20px', height: '20px' }}>
                            <UnfoldMoreOutlinedIcon sx={{ height: '11.67px' }} />
                          </IconButton>
                        </Box>
                      ) : (header)}
                    </StyledTableCell>
                  ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {courses?.map((course) => {
              const { bgcolor, color } = getStatusColors(course?.statusName);
              return (
                <StyledTableRow key={course?.courseId}>
                  <StyledTableCell align="center">{course?.courseId}</StyledTableCell>
                  <StyledTableCell align="center">{course?.name}</StyledTableCell>
                  <StyledTableCell align="center">{course?.coordinatorName}</StyledTableCell>
                  <StyledTableCell align="center">{course?.year}</StyledTableCell>
                  <StyledTableCell align="center">{course?.startDate ? format(new Date(course.startDate), 'dd/MM') : ''}</StyledTableCell>
                  <StyledTableCell align="center">{course?.endDate ? format(new Date(course.endDate), 'dd/MM') : ''}</StyledTableCell>
                  <StyledTableCell align="center">{course?.numberOfMeetings || 0}</StyledTableCell>
                  <StyledTableCell align="center">{course?.numberOfStudents}</StyledTableCell>
                  <StyledTableCell align="center" sx={{ width: '120px', height: '39px' }}>
                    <Box sx={{
                      color, bgcolor, borderRadius: '68.31px', p: '4.1px 20.49px', width: '60px', height: '30px',
                      margin: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center'
                    }}>
                      <Typography fontFamily='Rubik' fontSize="14px">{course?.statusName}</Typography>
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell align="center" sx={{ width: '70px', height: '34px' }}>
                    <IconButton aria-label="ערוך קורס" onClick={() => selectCourse(course?.courseId)}
                      sx={{ width: '32px', height: '32px', bgcolor: '#F4F4F4', borderRadius: '5px', display: 'flex' }}>
                      <Box component="img" src={editSvg} alt="edit_icon" sx={{ width: 20, height: 20, m: 0 }} />
                    </IconButton>
                  </StyledTableCell>
                </StyledTableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box component={Paper}
        sx={{
          p: '16px 24px', borderRadius: '8px', width: 'auto', bgcolor: 'white',
          margin: '10px auto', direction: 'ltr', boxShadow: '0px 0px 4px 0px #DCE2EC'
        }} >
        <Grid2 container justifyContent="space-between">
          <Grid2 item xs={6}>
            <Pagination onChange={handlePageChange} page={currentPage}
              count={Math.ceil(totalCount / pageSize)}
              sx={{ direction: 'ltr', '& .MuiPaginationItem-root': { fontSize: 12 }, }} />
          </Grid2>
          <Grid2 item xs={6} display="flex" alignItems="center">
            <Select displayEmpty onChange={handleSelectChange} value={selectSize}
              IconComponent={(props) => <UnfoldMoreOutlinedIcon {...props} sx={{ fontSize: 'small' }} />}
              sx={{
                height: '26px', width: '49px', borderRadius: '4px', borderWidth: '0.5px',
                borderColor: '#F0F1F3', p: '6px 10px', fontSize: '12px', ml: '8px',
                '& .MuiSelect-select': { display: 'flex', justifyContent: 'center', textAlign: 'center' }
              }} >
              <MenuItem value={1} sx={{ justifyContent: 'center' }}>10</MenuItem>
              <MenuItem value={2} sx={{ justifyContent: 'center' }}>20</MenuItem>
              <MenuItem value={5} sx={{ justifyContent: 'center' }}>50</MenuItem>
            </Select>
            <Typography fontFamily="Rubik" fontSize="14px" sx={{ ml: 1 }} >:מספר שורות</Typography>
          </Grid2>
        </Grid2>
      </Box>
    </Box >
  );
};

export default CourseGrid;