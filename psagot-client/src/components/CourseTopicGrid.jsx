import React, { useEffect } from 'react';
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
import { fetchAllTopicForCourseByCourseId } from '../features/topic/topicActions';
import { fetchAllTopic} from '../features/topic/topicActions';
import editSvg from '../assets/icons/editIcon.svg'
import deleteSvg from '../assets/icons/deleteIcon.svg'
import Pagination from '@mui/material/Pagination';
import Select from '@mui/material/Select';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TopicDialog from './TopicDialog';

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
    //const courseId = useSelector(state => state.course.selectedCourse?.id); // קבלת ID מה-Redux
    const courseId = 1;
    const topicId = 1;

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

    const [currentPage, setCurrentPage] = React.useState(1); // עמוד נוכחי
    const [pageSize, setPageSize] = React.useState(10); // מספר שורות להצגה בכל עמוד
    const [showWarning, setShowWarning] = React.useState(false);
    const [topicToDelete, setTopicToDelete] = React.useState(null);

    const handleDeleteClick = async (topicId) => {
        try {
            const response = await fetch(`http://localhost:33444/api/Topic/DeleteTopic/${topicId}`);
            const data = await response.json();
            if (data.Warning) {
                setTopicToDelete(topicId);
                setShowWarning(true);
            } else {
                dispatch(fetchAllTopicForCourseByCourseId(courseId)); // רענון
            }
        } catch (error) {
            console.error("שגיאה במחיקת נושא:", error);
        }
    };

    const handleConfirmDelete = async () => {
        try {
            await fetch(`http://localhost:33444/api/Topic/DeleteTopic/${topicToDelete}?forceDelete=true`, { method: 'DELETE' });
            setShowWarning(false);
            setTopicToDelete(null);
            dispatch(fetchAllTopicForCourseByCourseId(courseId)); // רענון
        } catch (error) {
            console.error("שגיאה במחיקה הסופית:", error);
        }
    };

    const handleCancelDelete = () => {
        setShowWarning(false);
        setTopicToDelete(null);
    };

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

    return (
        <Box sx={{ width: '100%', marginTop: '8px', }}>
            <TableContainer component={Paper} sx={{ width: 'unset', borderRadius: '10px',
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
                                    <IconButton sx={{ bgcolor: '#F4F4F4'}} onClick={() => handleDeleteClick(topic?.topicId)}>
                                        <img src={deleteSvg} alt='delete_icon' style={{marginTop: '0px'}} />
                                    </IconButton>
                                </StyledTableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box component={Paper} sx={{ p: "30px 20px 10px 20px", borderRadius: '10px', bgcolor: 'white', direction: 'ltr', width: '100%', margin: '10px 0px  10px 0px', marginBottom: '40px' }}>
                <Grid2 container>
                    {/* עמודים */}
                    <Grid2 xs={3}>
                        <Pagination
                            count={Math.ceil(topics.length / pageSize)} // מספר עמודים כולל
                            page={currentPage} // עמוד נוכחי
                            onChange={(event, value) => setCurrentPage(value)} // שינוי עמוד
                            sx={{ '& .MuiPaginationItem-root': { fontSize: 12 } }}
                        />
                    </Grid2>

                    {/* בחירת מספר שורות */}
                    <Grid2 xs={9} textAlign="right" margin="auto">
                        <Select
                            value={pageSize} // הערך שנבחר (10/20/50)
                            onChange={(e) => {
                                setPageSize(e.target.value); // עדכון מספר שורות
                                setCurrentPage(1); // חזרה לעמוד ראשון
                            }}
                            IconComponent={(props) => (
                                <UnfoldMoreOutlinedIcon {...props} sx={{ fontSize: 'small' }} />
                            )}
                            sx={{
                                height: '26px',
                                width: '60px',
                                fontSize: '12px',
                                borderRadius: '4px',
                                borderColor: '#F0F1F3',
                                mr: '15px',
                                verticalAlign: 'middle'
                            }}
                        >
                            <MenuItem value={10}>10</MenuItem>
                            <MenuItem value={2}>20</MenuItem>
                            <MenuItem value={50}>50</MenuItem>
                        </Select>

                        {/* טקסט שמסביר מה בחרת */}
                        <Typography display="inline" fontFamily="Rubik" fontSize="14px">:שורות לעמוד</Typography>
                    </Grid2>
                </Grid2>
            </Box>
            <Dialog open={showWarning} onClose={handleCancelDelete}>
                <DialogTitle>אזהרה</DialogTitle>
                <DialogContent>
                    <Typography>נושא זה משויך למפגשים קיימים. האם את/ה בטוח/ה שברצונך למחוק אותו?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancelDelete}>ביטול</Button>
                    <Button onClick={handleConfirmDelete} variant="contained" color="error">מחק</Button>
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

