import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Paper, IconButton, Pagination, Typography, TableContainer, TableHead, TableRow, Table, TableBody, Select, MenuItem, Grid2 } from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import UnfoldMoreOutlinedIcon from '@mui/icons-material/UnfoldMoreOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { selectPaginatedCourses, selectCurrentPage, selectPageSize, setCurrentPage, selectTotalCount, setPageSize } from '../features/course/courseSlice';
import { fetchPaginatedCourses } from '../features/course/courseActions';
import editSvg from '../assets/icons/edit.svg'

const StyledTableCell = styled(TableCell)(() => ({
    [`&.${tableCellClasses.head}`]: {
        //backgroundColor: theme.palette.common.Neutral / 20,
        //color: theme.palette.common.Neutral / 80,
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

const CourseGrid = () => {
    const dispatch = useDispatch();
    const currentPage = useSelector(selectCurrentPage);
    const pageSize = useSelector(selectPageSize);
    const [selectSize, setSelectSize] = useState(pageSize)
    const totalCount = useSelector(selectTotalCount);
    const paginatedCourses = useSelector(selectPaginatedCourses)

    const setPage = async (page) => {
        await dispatch(setCurrentPage(page))
    };

    const handleSelectChange = (event) => {
        const newPageSize = event.target.value;
        setSelectSize(newPageSize);
        dispatch(setPageSize(newPageSize));
    };

    useEffect(() => {
        const getPaginatedCourses = async () => {
            await dispatch(fetchPaginatedCourses({ pageNumber: currentPage, pageSize: pageSize }))
        };
        getPaginatedCourses()
    }, [dispatch, currentPage, pageSize])

    return (
        <div style={{ backgroundColor: '#FAFCFF',marginTop: "8px", minWidth:"94vw" }}>
            <TableContainer component={Paper} sx={{ width: '100%', margin: 'auto', p: '8px' }}>
                <Table sx={{ p: '35px 24px 10px 24px', borderRadius: '100px' }} aria-label="courses table">
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
                        {paginatedCourses?.map(course => (
                            <StyledTableRow key={course?.courseId} sx={{ p: '20px 0px 20px 30px', borderTopLeftRadius: '4px', borderTopRightRadius: '4px', height: '79px' }}>
                                <StyledTableCell align="center" >{course?.courseId}</StyledTableCell>
                                <StyledTableCell align="center" >{course?.name}</StyledTableCell>
                                <StyledTableCell align="center" >{course?.coordinatorName}</StyledTableCell>
                                <StyledTableCell align="center" >{course?.year}</StyledTableCell>
                                <StyledTableCell align="center" >
                                    {new Date(course?.startDate).getDate() < 10 ?
                                        '0' + new Date(course?.startDate).getDate()
                                        : new Date(course?.startDate).getDate()}
                                    /
                                    {new Date(course?.startDate).getMonth() + 1 < 10 ?
                                        '0' + (new Date(course?.startDate).getMonth() + 1)
                                        : new Date(course?.startDate).getMonth() + 1}</StyledTableCell>
                                <StyledTableCell align="center" >
                                    {new Date(course?.endDate).getDate() < 10 ?
                                        '0' + new Date(course?.endDate).getDate()
                                        : new Date(course?.endDate).getDate()}
                                    /
                                    {new Date(course?.endDate).getMonth() + 1 < 10 ?
                                        '0' + (new Date(course?.endDate).getMonth() + 1)
                                        : new Date(course?.endDate).getMonth() + 1}</StyledTableCell>
                                <StyledTableCell align="center" >{course?.numberOfMeetings}</StyledTableCell>
                                <StyledTableCell align="center" >{course?.numberOfStudents}</StyledTableCell>
                                <StyledTableCell align="center" sx={{ width: '140px', height: '39px' }}>
                                    {course?.statusName == 'פעיל' &&
                                        <Box sx={{ borderRadius: '68.31px', p: '4.1px 20.49px', bgcolor: '#DAF8E6', width: '60px', height: '30px', margin: 'auto', alignContent: 'center' }} align="center">
                                            <Typography fontFamily={'Rubik'} width={'27px'} height={'17px'} fontWeight={'400'} fontSize={'14px'} color='#1A8245'>{course?.statusName}</Typography>
                                        </Box>
                                        || course?.statusName == 'ממתין' &&
                                        <Box sx={{ borderRadius: '68.31px', p: '4.1px 20.49px', bgcolor: '#FEEBEB', width: '60px', height: '30px', margin: 'auto', alignContent: 'center' }} align="center">
                                            <Typography fontFamily={'Rubik'} width={'34px'} height={'17px'} fontWeight={'400'} fontSize={'14px'} color='#E10E0E'>{course?.statusName}</Typography>
                                        </Box>
                                        || course?.statusName == 'הסתיים' &&
                                        <Box sx={{ borderRadius: '68.31px', p: '4.1px 20.49px', bgcolor: '#E5E7EB', width: '60px', height: '30px', margin: 'auto', alignContent: 'center' }} align="center">
                                            <Typography fontFamily={'Rubik'} width={'42px'} height={'17px'} fontWeight={'400'} fontSize={'14px'} color='#494747'>{course?.statusName}</Typography>
                                        </Box>
                                    }</StyledTableCell>
                                <StyledTableCell align="center" sx={{ width: '90px', height: '34px' }}>
                                    <IconButton sx={{ width: '32px', height: '32px', p: '5px 6px', bgcolor: '#F4F4F4', borderRadius: '5px', gap: '10px', marginX: '5px' }}>
                                        <img src={editSvg} />
                                    </IconButton>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>

            </TableContainer>
            <Box component={Paper} sx={{ p: '16px 24px', borderRadius: '8px', bgcolor: 'white', direction: 'ltr', width: '100%', margin: '10px auto', p: '10px' }}>
                <Grid2 container>
                    <Grid2 size={3}>
                        <Pagination onChange={(e, p) => setPage(p)} count={totalCount / pageSize} sx={{ '& .MuiPaginationItem-root': { fontSize: 12, } }} />
                    </Grid2>
                    <Grid2 size={9} textAlign={'right'} margin={'auto'}>
                        <Select IconComponent={(props) => (
                            <UnfoldMoreOutlinedIcon {...props} sx={{ fontSize: 'small' }} />)}
                            displayEmpty onChange={handleSelectChange} value={selectSize} sx={{ height: '26px', width: '49px', borderRadius: '4px', borderWidth: '0.5px', borderColor: '#F0F1F3', p: '6px 10px', fontSize: '12px', mr: '15px', verticalAlign: 'left' }}>
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={2}>2</MenuItem>
                            <MenuItem value={5}>5</MenuItem>
                        </Select>
                        <Typography display={'contents'} fontFamily={'Rubik'} fontSize={'14px'}>:מספר שורות</Typography>
                    </Grid2>
                </Grid2>
            </Box>
        </div >
    );
};

export default CourseGrid;