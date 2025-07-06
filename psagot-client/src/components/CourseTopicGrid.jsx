import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, IconButton, Typography, Grid2, MenuItem } from '@mui/material';
import UnfoldMoreOutlinedIcon from '@mui/icons-material/UnfoldMoreOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilteredTopics } from '../features/topic/topicSlice';
import { deleteTopicAction, fetchAllTopicForCourseByCourseId } from '../features/topic/topicActions';
import { fetchAllTopic } from '../features/topic/topicActions';
import editSvg from '../assets/icons/editIcon.svg'
import deleteSvg from '../assets/icons/deleteIcon.svg'
import Pagination from '@mui/material/Pagination';
import Select from '@mui/material/Select';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TopicDialog from './TopicDialog';
import { useParams } from 'react-router-dom';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        borderWidth: '2px',
        fontWeight: 'bold',
        fontFamily: 'Rubik',
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
    const courseId = useSelector(state => state.course.selectedCourse?.courseId); // קבלת ID מה-Redux
    const error = useSelector(state => state.topic.error)

    useEffect(() => {
        if (courseId) {
            dispatch(fetchAllTopicForCourseByCourseId(courseId));
        }
    }, [dispatch, courseId]);

    useEffect(() => {
        if (error) {
            setShowWarning(true)
        }
    }, [error])


    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        return `${day}/${month}`;
    };

    const [currentPage, setCurrentPage] = React.useState(1); // עמוד נוכחי
    const [pageSize, setPageSize] = React.useState(10); // מספר שורות להצגה בכל עמוד
    const [selectedTopic, setSelectedTopic] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [showWarning, setShowWarning] = React.useState(false);
    const [topicToDelete, setTopicToDelete] = React.useState(null);


    const paginatedTopics = topics.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    const handleEditClick = (topic) => {
        setSelectedTopic(topic); // שומרים את נושא הקורס שנבחר לעריכה
        setDialogOpen(true);     // פותחים את הדיאלוג
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
        setSelectedTopic(null);
    };

    const handleDialogSubmit = (formData) => {
        console.log("נתוני עריכה:", formData);
        setDialogOpen(false);
        setSelectedTopic(null);
    };


    const handleDeleteClick = async (topicId) => {

        setTopicToDelete(topicId);
        await dispatch(deleteTopicAction({ topicId: topicId }));
    };

    const handleConfirmDelete = async () => {
        if (topicToDelete !== null) {
            // מחיקה דרך ה-slice
            await dispatch(deleteTopicAction({ topicId: topicToDelete, forceDelete: true }));

            // רענון הנושאים אחרי מחיקה
            dispatch(fetchAllTopicForCourseByCourseId(courseId));
        }
        // סגירת האזהרה
        setShowWarning(false);
        setTopicToDelete(null);
    };

    const handleCancelDelete = () => {
        setShowWarning(false);
        setTopicToDelete(null);
    };

    return (
        <Box sx={{ width: '100%', marginTop: '8px', }}>
            <TableContainer component={Paper} sx={{
                width: 'unset', borderRadius: '10px',
                p: "30px 20px 10px 20px"
            }}>
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
                                    סטטוס
                                    <IconButton sx={{ width: '20px', height: '20px' }}>
                                        <UnfoldMoreOutlinedIcon sx={{ height: '20px' }} />
                                    </IconButton>
                                </Box>
                            </StyledTableCell>
                            <StyledTableCell></StyledTableCell>
                            <StyledTableCell></StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedTopics?.map((topic, index) => (
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
                                    <IconButton sx={{ bgcolor: '#F4F4F4' }} onClick={() => handleEditClick(topic)}>
                                        <img src={editSvg} alt='edit_icon' style={{ marginTop: '0px' }} />
                                    </IconButton>
                                </StyledTableCell>
                                <StyledTableCell>
                                    <IconButton sx={{ bgcolor: '#F4F4F4' }} onClick={() => handleDeleteClick(topic?.topicId)}>
                                        <img src={deleteSvg} alt='delete_icon' style={{ marginTop: '0px' }} />
                                    </IconButton>
                                </StyledTableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box
                component={Paper}
                sx={{
                    p: "30px 20px 10px 20px",
                    borderRadius: "10px",
                    bgcolor: "white",
                    width: "unset",
                    margin: "10px 0px",
                    marginBottom: "40px",
                }}
            >
                <Grid2 container alignItems="center" justifyContent="space-between">
                    <Grid2 item xs={6} display="flex" justifyContent="start" alignItems="center">
                        <Typography
                            display="inline"
                            fontFamily="Rubik"
                            fontSize="14px"
                            sx={{ ml: 1 }}
                        >
                            שורות לעמוד:
                        </Typography>
                        <Select
                            value={pageSize}
                            onChange={(e) => {
                                setPageSize(e.target.value);
                                setCurrentPage(1);
                            }}
                            IconComponent={(props) => (
                                <UnfoldMoreOutlinedIcon {...props} sx={{ fontSize: "small" }} />
                            )}
                            sx={{
                                height: "26px",
                                width: "60px",
                                borderRadius: "10px",
                                borderWidth: "0.5px",
                                borderColor: "#F0F1F3",
                                fontSize: "12px",
                                ml: "8px",
                                textAlign: "center",
                                '& .MuiSelect-select': {
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                },
                            }}
                            MenuProps={{
                                PaperProps: {
                                    sx: {
                                        textAlign: "center",
                                        direction: "ltr",
                                    },
                                },
                            }}
                        >
                            <MenuItem value={10} sx={{ justifyContent: "center" }}>10</MenuItem>
                            <MenuItem value={20} sx={{ justifyContent: "center" }}>20</MenuItem>
                            <MenuItem value={50} sx={{ justifyContent: "center" }}>50</MenuItem>
                        </Select>
                    </Grid2>

                    
                    <Grid2 item xs={6} display="flex" justifyContent="end">
                        <Pagination
                            count={Math.ceil(topics.length / pageSize)}
                            page={currentPage}
                            onChange={(event, value) => setCurrentPage(value)}
                            sx={{
                                direction: "ltr",
                                ml: 2,
                                "& .MuiPaginationItem-root": { fontSize: 12 },
                            }}
                        />
                    </Grid2>
                </Grid2>
            </Box>

            <Dialog open={showWarning} onClose={handleCancelDelete}>
                <DialogContent>
                    <Typography>{error}</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancelDelete}>ביטול</Button>
                    <Button onClick={handleConfirmDelete} variant="contained" >אישור</Button>
                </DialogActions>
            </Dialog>
            <TopicDialog
                open={dialogOpen}
                onClose={handleDialogClose}
                onSubmit={handleDialogSubmit}
                initialData={selectedTopic}
            />
        </Box>
    );
}

