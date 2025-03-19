import React, { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, IconButton, Typography } from '@mui/material';
import UnfoldMoreOutlinedIcon from '@mui/icons-material/UnfoldMoreOutlined';
import { DeleteOutline } from '@mui/icons-material';
import { MdEditSquare } from 'react-icons/md';
import { selectFiltersCourses } from '../features/course/courseSlice';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllCourses } from '../features/course/courseActions';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
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
    const dispatch = useDispatch()
    const fetchCourses = useSelector(selectFiltersCourses)
    const courses = fetchCourses.map(course => {
        const today = new Date();
        const startDate = new Date(course?.startDate);
        const endDate = new Date(course?.endDate);
        const status = startDate > today ? "ממתין" : (today > endDate ? "הסתיים" : "פעיל");
        return { ...course, status };
    });

    useEffect(() => {
        const fetchFiltersCourses = async () => {
            await dispatch(fetchAllCourses())
        };
        fetchFiltersCourses()
    }, [])

    return (
        <div style={{ backgroundColor: '#FAFCFF',marginTop: "100px" }}>
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
                        {courses?.map(course => (
                            //The display: table-row property prevents justify-content and padding from having an effect.
                            <StyledTableRow key={course?.courseId} sx={{ p: '20px 0px 20px 30px', borderTopLeftRadius: '4px', borderTopRightRadius: '4px', justifyContent: 'space-between', height: '79px' }}>
                                <StyledTableCell align="center" >{course?.courseId}</StyledTableCell>
                                <StyledTableCell align="center" >{course?.name}</StyledTableCell>
                                <StyledTableCell align="center" >{course?.coordinator}</StyledTableCell>
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
                                    {course?.status == 'פעיל' &&
                                        <Box sx={{ borderRadius: '68.31px', p: '4.1px 20.49px', bgcolor: '#DAF8E6', width: '60px', height: '30px', margin: 'auto', alignContent: 'center' }} align="center">
                                            <Typography width={'27px'} height={'17px'} fontWeight={'400'} fontSize={'14px'} color='#1A8245'>{course?.status}</Typography>
                                        </Box>
                                        || course?.status == 'ממתין' &&
                                        <Box sx={{ borderRadius: '68.31px', p: '4.1px 20.49px', bgcolor: '#FEEBEB', width: '60px', height: '30px', margin: 'auto', alignContent: 'center' }} align="center">
                                            <Typography width={'34px'} height={'17px'} fontWeight={'400'} fontSize={'14px'} color='#E10E0E'>{course?.status}</Typography>
                                        </Box>
                                        || course?.status == 'הסתיים' &&
                                        <Box sx={{ borderRadius: '68.31px', p: '4.1px 20.49px', bgcolor: '#E5E7EB', width: '60px', height: '30px', margin: 'auto', alignContent: 'center' }} align="center">
                                            <Typography width={'42px'} height={'17px'} fontWeight={'400'} fontSize={'14px'} color='#494747'>{course?.status}</Typography>
                                        </Box>
                                    }</StyledTableCell>
                                <StyledTableCell align="center" sx={{ width: '90px', height: '34px' }}>
                                    <IconButton sx={{ width: '30px', height: '32px', p: '5px 6px', bgcolor: '#F4F4F4', borderRadius: '5px', gap: '10px', marginX: '5px' }}>
                                        <DeleteOutline sx={{ height: '20px', width: '18px', color: 'black' }} />
                                    </IconButton>
                                    <IconButton sx={{ width: '30px', height: '32px', p: '5px 6px', bgcolor: '#F4F4F4', borderRadius: '5px', gap: '10px', marginX: '5px' }}>
                                        {/* <MdEditSquare fontWeight={100} sx={{ height: '20px', width: '20px', color: 'black' }} /> */}
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M224.62-160q-27.62 0-46.12-18.5Q160-197 160-224.62v-510.76q0-27.62 18.5-46.12Q197-800 224.62-800h335.46l-40 40H224.62q-9.24 0-16.93 7.69-7.69 7.69-7.69 16.93v510.76q0 9.24 7.69 16.93 7.69 7.69 16.93 7.69h510.76q9.24 0 16.93-7.69 7.69-7.69 7.69-16.93v-299.53l40-40v339.53q0 27.62-18.5 46.12Q763-160 735.38-160H224.62ZM480-480Zm-80 80v-104.62l357.77-357.76q6.61-6.62 13.92-9.16t15.39-2.54q7.54 0 14.73 2.54t13.04 8.39L859.31-820q6.38 6.62 9.69 14.58 3.31 7.96 3.31 16.04 0 8.07-2.43 15.26-2.42 7.2-9.03 13.81L500.77-400H400Zm432.54-388.62-44.46-46.76 44.46 46.76ZM440-440h43.69l266.62-266.62-21.85-21.84-24.38-23.39L440-487.77V-440Zm288.46-288.46-24.38-23.39 24.38 23.39 21.85 21.84-21.85-21.84Z" /></svg>
                                    </IconButton>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer></div>
    );
};

export default CourseGrid;