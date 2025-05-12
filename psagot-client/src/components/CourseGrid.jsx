import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import {
  Box, Paper, IconButton, Pagination, Typography,
  TableContainer, TableHead, TableRow, Table, TableBody,
  Select, MenuItem, Grid
} from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import UnfoldMoreOutlinedIcon from '@mui/icons-material/UnfoldMoreOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { selectCourses } from '../features/course/courseSlice';
import { fetchCourseById } from '../features/course/courseActions';
import editSvg from '../assets/icons/edit.svg';
import { Link, useNavigate } from 'react-router-dom';

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

const CourseGrid = ({ totalCount, currentPage, pageSize, onPageChange, onPageSizeChange }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectSize, setSelectSize] = useState(pageSize);
  const courses = useSelector(selectCourses);

  const handlePageChange = (event, newPage) => {
    onPageChange(newPage);
  };

  const selectCourse = async (courseId) => {
    await dispatch(fetchCourseById(courseId));
    navigate('/course/');
  };

  const handleSelectChange = (event) => {
    const newPageSize = event.target.value;
    setSelectSize(newPageSize);
    onPageSizeChange(newPageSize);
  };

  return (
    <Box sx={{ backgroundColor: '#FAFCFF', mt: 1, width: '100%' }}>
      <TableContainer
        component={Paper}
        elevation={0}
        sx={{
          width: '100%',
          overflowX: 'auto',
          boxShadow: 'none',
          p: 0,
          mx: 'auto',
          borderRadius: '8px',
        }}
      >
        <Table sx={{ width: '100%',borderRadius: '8px', tableLayout: 'auto' }} aria-label="courses table">
          <TableHead>
            <TableRow>
              {[
                'קוד קורס', 'שם קורס', 'רכזת', 'שנה',
                'תאריך התחלה', 'תאריך סיום', 'מפגשים', 'תלמידים',
                'סטטוס', ''
              ].map((header, i) => (
                <StyledTableCell
                  key={i}
                  align="center"
                  sx={{ whiteSpace: 'nowrap', px: 1 }}
                >
                  {header}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {courses?.map((course) => (
              <StyledTableRow key={course?.courseId}>
                <StyledTableCell align="center">{course?.courseId}</StyledTableCell>
                <StyledTableCell align="center">{course?.name}</StyledTableCell>
                <StyledTableCell align="center">{course?.coordinatorName}</StyledTableCell>
                <StyledTableCell align="center">{course?.year}</StyledTableCell>
                <StyledTableCell align="center">
                  {new Date(course?.startDate).toLocaleDateString('he-IL')}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {new Date(course?.endDate).toLocaleDateString('he-IL')}
                </StyledTableCell>
                <StyledTableCell align="center">{course?.numberOfMeetings}</StyledTableCell>
                <StyledTableCell align="center">{course?.numberOfStudents}</StyledTableCell>
                <StyledTableCell align="center">
                  <Box
                    sx={{
                      bgcolor:
                        course?.statusName === 'פעיל'
                          ? '#DAF8E6'
                          : course?.statusName === 'ממתין'
                          ? '#FEEBEB'
                          : '#E5E7EB',
                      color:
                        course?.statusName === 'פעיל'
                          ? '#1A8245'
                          : course?.statusName === 'ממתין'
                          ? '#E10E0E'
                          : '#494747',
                      borderRadius: '30px',
                      px: 2,
                      py: 0.5,
                      width: 'fit-content',
                      margin: 'auto',
                    }}
                  >
                    <Typography fontSize="14px">{course?.statusName}</Typography>
                  </Box>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Link onClick={() => selectCourse(course?.courseId)}>
                    <IconButton
                      sx={{
                        width: 32,
                        height: 32,
                        p: 0,
                        bgcolor: '#F4F4F4',
                        borderRadius: '5px',
                      }}
                    >
                      <img src={editSvg} alt="edit_icon" />
                    </IconButton>
                  </Link>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination */}
        <Box
          sx={{
            borderRadius: '8px',
            bgcolor: 'white',
            direction: 'ltr',
            width: '100%',
            mt: 2,
            pb: 3, // קצת ריווח מלמטה
          }}
        >
          <Grid container>
            <Grid item xs={3}>
              <Pagination
                onChange={handlePageChange}
                count={Math.ceil(totalCount / pageSize)}
                page={currentPage}
                sx={{
                  ml: 3,
                  '& .MuiPaginationItem-root': { fontSize: 12 },
                }}
              />
            </Grid>
            <Grid item xs={9} textAlign="right" margin="auto">
              <Select
                IconComponent={(props) => <UnfoldMoreOutlinedIcon {...props} sx={{ fontSize: 'small' }} />}
                displayEmpty
                onChange={handleSelectChange}
                value={selectSize}
                sx={{
                  height: '26px',
                  width: '49px',
                  borderRadius: '4px',
                  borderWidth: '0.5px',
                  borderColor: '#F0F1F3',
                  p: '6px 10px',
                  fontSize: '12px',
                  mr: '15px',
                }}
              >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={5}>5</MenuItem>
              </Select>
              <Typography
                display="inline"
                fontFamily="Rubik"
                fontSize="14px"
                sx={{ mr: 3 }}
              >
                :מספר שורות
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </TableContainer>
    </Box>
  );
};

export default CourseGrid;