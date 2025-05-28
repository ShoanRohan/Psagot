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
    <Box
      sx={{
        backgroundColor: '#FAFCFF',
        mt: 1,
        width: '100%',
        borderRadius: '4px',
        overflow: 'hidden',
      }}
    >
      <TableContainer
        component={Paper}
        elevation={0}
        sx={{
          width: '100%',
          overflowX: 'auto',
          boxShadow: 'none',
          p: 0,
          mx: 'auto',
          borderRadius: 0,
        }}
      >
        <Table sx={{ width: '100%', tableLayout: 'auto' }} aria-label="courses table">
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
                    <IconButton sx={{ width: 32, height: 32, p: 0, bgcolor: '#F4F4F4', borderRadius: '5px' }}>
                      <Box
                        component="img"
                        src={editSvg}
                        alt="edit_icon"
                        sx={{ width: 20, height: 20, display: 'block', mt: "-4px" }}
                      />
                    </IconButton>
                  </Link>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination Section */}
      <Box
        sx={{
          px: 2,
          py: 2,
          width: '100%',
          bgcolor: 'white',
          direction: 'rtl',
        }}
      >
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item xs={6} display="flex" justifyContent="start" alignItems="center">
            <Typography
              display="inline"
              fontFamily="Rubik"
              fontSize="14px"
              sx={{ ml: 1 }}
            >
              מספר שורות:
            </Typography>
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
                pl: 0,
                pr: 0,
                fontSize: '12px',
                ml: '8px',
                textAlign: 'center',
                '& .MuiSelect-select': {
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                },
              }}
            >
              <MenuItem value={1} sx={{ justifyContent: 'center' }}>1</MenuItem>
              <MenuItem value={2} sx={{ justifyContent: 'center' }}>2</MenuItem>
              <MenuItem value={5} sx={{ justifyContent: 'center' }}>5</MenuItem>
            </Select>
          </Grid>

          <Grid item xs={6} display="flex" justifyContent="end">
            <Pagination
              onChange={handlePageChange}
              count={Math.ceil(totalCount / pageSize)}
              page={currentPage}
              sx={{
                direction: 'ltr',
                ml: 2, // ריווח משמאל
                '& .MuiPaginationItem-root': { fontSize: 12 },
              }}
            />
          </Grid>
        </Grid>
      </Box>
    </Box >
  );
};

export default CourseGrid;