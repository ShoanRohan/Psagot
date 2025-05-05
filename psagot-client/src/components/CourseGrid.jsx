import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Paper, IconButton, Pagination, Typography, TableContainer, TableHead, TableRow, Table, TableBody, Select, MenuItem } from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import UnfoldMoreOutlinedIcon from '@mui/icons-material/UnfoldMoreOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { selectCourses } from '../features/course/courseSlice';
import { fetchCourseById } from '../features/course/courseActions';
import editSvg from '../assets/icons/edit.svg';
import { Link, useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';


const StyledTableCell = styled(TableCell)(() => ({
    [`&.${tableCellClasses.head}`]: {
        borderWidth: '2px',
        fontWeight: 'bold',
        fontFamily: 'Rubik'
    },
    [`&.${tableCellClasses.body}`]: {
        fontFamily: 'Rubik'
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
        <div style={{ backgroundColor: '#FAFCFF', marginTop: "8px", minWidth: "94vw" }}>
            <TableContainer component={Paper} sx={{ width: '100%', margin: 'auto', p: '8px' }}>
                <Table sx={{ p: '35px 24px 10px 24px', borderRadius: '10px' }} aria-label="courses table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">קוד קורס</StyledTableCell>
                            <StyledTableCell align="center">שם קורס</StyledTableCell>
                            <StyledTableCell align="center">שם רכזת</StyledTableCell>
                            <StyledTableCell align="center">שנה</StyledTableCell>
                            <StyledTableCell align="center">תאריך התחלה</StyledTableCell>
                            <StyledTableCell align="center">תאריך סיום</StyledTableCell>
                            <StyledTableCell align="center">מס' מפגשים</StyledTableCell>
                            <StyledTableCell align="center">מס' תלמידים</StyledTableCell>
                            <StyledTableCell align="center">
                                <Box>
                                    <>סטטוס</>
                                    <IconButton sx={{ width: '20px', height: '20px' }}>
                                        <UnfoldMoreOutlinedIcon sx={{ height: '11.67px' }} />
                                    </IconButton>
                                </Box>
                            </StyledTableCell>
                            <StyledTableCell></StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {courses?.map(course => (
                            <StyledTableRow key={course?.courseId} sx={{ height: '79px' }}>
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
                                <StyledTableCell align="center" sx={{ width: '140px', height: '39px' }}>
                                    {course?.statusName === 'פעיל' &&
                                        <Box sx={{ borderRadius: '68.31px', p: '4.1px 20.49px', bgcolor: '#DAF8E6', width: '60px', height: '30px', margin: 'auto' }}>
                                            <Typography fontFamily='Rubik' fontSize='14px' color='#1A8245'>{course?.statusName}</Typography>
                                        </Box>}
                                    {course?.statusName === 'ממתין' &&
                                        <Box sx={{ borderRadius: '68.31px', p: '4.1px 20.49px', bgcolor: '#FEEBEB', width: '60px', height: '30px', margin: 'auto' }}>
                                            <Typography fontFamily='Rubik' fontSize='14px' color='#E10E0E'>{course?.statusName}</Typography>
                                        </Box>}
                                    {course?.statusName === 'הסתיים' &&
                                        <Box sx={{ borderRadius: '68.31px', p: '4.1px 20.49px', bgcolor: '#E5E7EB', width: '60px', height: '30px', margin: 'auto' }}>
                                            <Typography fontFamily='Rubik' fontSize='14px' color='#494747'>{course?.statusName}</Typography>
                                        </Box>}
                                </StyledTableCell>
                                <StyledTableCell align="center" sx={{ width: '90px', height: '34px' }}>
                                    <Link onClick={() => selectCourse(course?.courseId)}>
                                        <IconButton sx={{ width: '32px', height: '32px', p: '5px 6px', bgcolor: '#F4F4F4', borderRadius: '5px', marginX: '5px' }}>
                                            <img src={editSvg} alt='edit_icon' />
                                        </IconButton>
                                    </Link>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>

                {/* ✅ Pagination directly under the table */}
                <Box sx={{ p: '16px 24px', borderRadius: '8px', bgcolor: 'white', direction: 'ltr', width: '100%', mt: 2 }}>
                    <Grid container>
                        <Grid xs={3}>
                            <Pagination
                                onChange={handlePageChange}
                                count={Math.ceil(totalCount / pageSize)}
                                page={currentPage}
                                sx={{
                                    '& .MuiPaginationItem-root': { fontSize: 12 },
                                  }}
                                />
                              </Grid>
                        <Grid xs={9} textAlign="right" margin="auto">
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
                            <Typography display="inline" fontFamily="Rubik" fontSize="14px">:מספר שורות</Typography>
                        </Grid>
                    </Grid>
                </Box>
            </TableContainer>
        </div>
    );
};

export default CourseGrid;