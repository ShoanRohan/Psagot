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
import { useDispatch, useSelector } from 'react-redux';
import { fetchTopicById } from '../features/topic/topicActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { selectFilteredTopics } from '../features/topic/topicSlice';
import { fetchAllTopicForCourseByCourseId } from '../features/topic/topicActions';
import { fetchAllTopic} from '../features/topic/topicActions';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        borderWidth: '2px',
        fontWeight: 'bold',
        fontFamily: 'Rubik'
    },
    
    [`&.${tableCellClasses.body}`]: {
        fontFamily: 'Rubik'
    },
}));

const statusColors = {
    1: { bgcolor: '#DAF8E6', color: '#1A8245', label: 'פעיל' },
    2: { bgcolor: '#FEEBEB', color: '#E10E0E', label: 'ממתין' },
    3: { bgcolor: '#E5E7EB', color: '#494747', label: 'מושהה' },
    4: { bgcolor: '#D1E0FF', color: '#1A3275', label: 'הסתיים' }
};


export default function CourseTopicGrid() {
    const dispatch = useDispatch();
    const topics = useSelector(selectFilteredTopics);
    //const courseId = useSelector(state => state.course.selectedCourse?.id); // קבלת ID מה-Redux
    const courseId = 1;

    useEffect(() => {
        if (courseId) {
            dispatch(fetchAllTopicForCourseByCourseId(courseId));
        }        
    }, [dispatch, courseId]);

    console.log("טופיקס:", topics)
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        return `${day}/${month}`;
    };

    return (
        <TableContainer component={Paper} sx={{ margin: 'auto', p: '8px', width: '90%' }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <StyledTableCell align='center'>קוד מפגש</StyledTableCell>
                        <StyledTableCell align='center'>נושא</StyledTableCell>
                        <StyledTableCell align='center'>שם מרצה</StyledTableCell>
                        <StyledTableCell align='center'>תאריך התחלה</StyledTableCell>
                        <StyledTableCell align='center'>תאריך סיום</StyledTableCell>
                        <StyledTableCell align='center'>מס' מפגשים</StyledTableCell>
                        <StyledTableCell align='center'>ציוד</StyledTableCell>
                        <StyledTableCell align="center">
                            <Box>
                                <>סטטוס</>
                                <IconButton sx={{ width: '20px', height: '20px' }}>
                                    <UnfoldMoreOutlinedIcon sx={{ height: '11.67px' }} />
                                </IconButton>
                            </Box>
                        </StyledTableCell>
                        <StyledTableCell></StyledTableCell>
                        <StyledTableCell></StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {topics?.map((topic, index) => (
                        <TableRow key={topic?.TopicId} sx={{ backgroundColor: index % 2 === 0 ? "#f5f5f5" : "white" }}>
                            <StyledTableCell align='center'>{topic?.topicId}</StyledTableCell>
                            <StyledTableCell align='center'>{topic?.name}</StyledTableCell>
                            <StyledTableCell align='center'>{topic?.teacherName || "לא ידוע"}</StyledTableCell>
                            <StyledTableCell align="center">{formatDate(topic?.startDate)}</StyledTableCell>
                            <StyledTableCell align="center">{formatDate(topic?.endDate)}</StyledTableCell>
                            <StyledTableCell align='center'>{topic?.numberOfMeetings}</StyledTableCell>
                            <StyledTableCell align='center'>
                                {topic?.computers ? 'מחשב,' : ''} {topic?.projector ? 'מקרן,' : ''} {topic?.microphone ? 'הגברה,' : ''}
                            </StyledTableCell>
                            <StyledTableCell align='center'>
                                <Box
                                    sx={{
                                        borderRadius: '68.31px',
                                        p: '4.1px 20.49px',
                                        width: '60px',
                                        height: '30px',
                                        margin: 'auto',
                                        alignContent: 'center',
                                        ...statusColors[topic?.statusId]
                                    }}
                                    align="center"
                                >
                                    <Typography fontWeight={'400'} fontSize={'14px'}>
                                    {statusColors[topic?.statusId]?.label || 'לא ידוע'}
                                    </Typography>
                                </Box>
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                <IconButton sx={{ bgcolor: '#F4F4F4' }}>
                                    <DeleteOutline sx={{ color: 'black' }} />
                                </IconButton>
                                <IconButton sx={{ bgcolor: '#F4F4F4' }}>
                                    <FontAwesomeIcon icon={faPenToSquare} color='#112B83' />
                                </IconButton>
                            </StyledTableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

