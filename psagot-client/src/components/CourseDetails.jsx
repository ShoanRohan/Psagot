import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Dialog, IconButton, InputAdornment, MenuItem, TextField, Typography } from '@mui/material'
import { fetchCoordinators } from '../features/user/userAction';
import { updateCourseAction, fetchCourseById } from '../features/course/courseActions';
import { selectSelectedCourse } from '../features/course/courseSlice';
import { fetchAllStatuses } from '../features/statusCourse/statusCourseActions';
import { selectStatuses } from '../features/statusCourse/statusCourseSlice';
import selectSvg from '../assets/icons/chevron-down.svg'

const CourseDetails = () => {
    const dispatch = useDispatch();
    const user = { userTypeId: 3, userId: 3 }//useSelector(state => state.user.selectedUser);
    const coordinators = useSelector(state => state.user.coordinators);
    const statuses = useSelector(selectStatuses);

    const [isEditing, setIsEditing] = useState(false)

    const selectedCourse = useSelector(selectSelectedCourse)
    const [courseName, setCourseName] = useState(selectedCourse?.name || '');
    const [coordinatorId, setCoordinator] = useState(selectedCourse?.coordinatorId || '');
    const [year, setYear] = useState(selectedCourse?.year || '');
    const [startDate, setStartDate] = useState(selectedCourse?.startDate || '');
    const [endDate, setEndDate] = useState(selectedCourse?.endDate || '');
    const [endDateError, setEndDateError] = useState("");
    const [numberOfStudents, setNumberOfStudents] = useState(selectedCourse?.numberOfStudents || '');
    const [numberOfMeetings, setNumberOfMeetings] = useState(selectedCourse?.numberOfMeetings || '');
    const [notes, setNotes] = useState(selectedCourse?.notes || '');
    const [statusId, setStatus] = useState(selectedCourse?.statusId || '');
    const [color, setColor] = useState(selectedCourse?.color)

    const [showResultDialog, setShowResultDialog] = useState(false);
    const [resultMessage, setResultMessage] = useState("");
    const [isSuccess, setIsSuccess] = useState(false); // כדי לדעת אם ההודעה היא הצלחה או כישלון

    const [showConfirmDeleteDialog, setShowConfirmDeleteDialog] = useState(false);
    const [confirmDeleteMessage, setConfirmDeleteMessage] = useState("");

    const saveChanges = async (e, confirmDelete = false) => {
        e.preventDefault();
        if (startDate && endDate) {
            const startDateValue = new Date(startDate);
            const endDateValue = new Date(endDate);
            if (endDateValue <= startDateValue) {
                setEndDateError("תאריך הסיום חייב להיות אחרי תאריך ההתחלה!");
                setResultMessage("שגיאת תאריכים: תאריך הסיום חייב להיות אחרי תאריך ההתחלה.");
                setIsSuccess(false);
                setShowResultDialog(true);
                return;
            } else {
                setEndDateError("");
            }
        } else if (!startDate || !endDate) { // אם אחד מהם ריק
            setResultMessage("שגיאה: יש לבחור תאריך התחלה ותאריך סיום.");
            setIsSuccess(false);
            setShowResultDialog(true);
            return;
        }

        const courseData = {
            courseId: selectedCourse.courseId,
            name: courseName,
            coordinatorId: Number(coordinatorId),
            year: Number(year),
            startDate: startDate,
            endDate: endDate,
            numberOfStudents: Number(numberOfStudents),
            numberOfMeetings: Number(numberOfMeetings),
            notes: notes,
            statusId: Number(statusId),
            color: color
        };

        try {
            const actionResult = await dispatch(updateCourseAction({ courseData, confirmDeleteFutureMeetings: confirmDelete }));
            if (updateCourseAction.fulfilled.match(actionResult)) {
                setResultMessage('שמירת פרטי הקורס הסתיימה בהצלחה.');
                setIsSuccess(true);
                setShowResultDialog(true);
                setIsEditing(false);
                dispatch(fetchCourseById(selectedCourse.courseId));
            }
            else if (updateCourseAction.rejected.match(actionResult)) {
                if (actionResult.payload && typeof actionResult.payload === 'object' && actionResult.payload.isConflict) {
                    setConfirmDeleteMessage(actionResult.payload.message);
                    setShowConfirmDeleteDialog(true);
                } else {
                    setResultMessage('השמירה לא הצליחה. אנא נסה שוב.' || actionResult.payload?.message || actionResult.payload);
                    setIsSuccess(false);
                    setShowResultDialog(true);
                }
            }
        } catch (error) {
            console.error("שגיאה בלתי צפויה בעדכון הקורס:", error);
            setResultMessage('אירעה שגיאה בלתי צפויה בעת שמירת הקורס.');
            setIsSuccess(false);
            setShowResultDialog(true);
        }
    };

    const handleConfirmDelete = (e) => {
        setShowConfirmDeleteDialog(false);
        saveChanges(e, true);
    };

    const handleCancelDelete = () => {
        setShowConfirmDeleteDialog(false);
        setIsSuccess(false);
    };

    useEffect(() => {
        dispatch(fetchCoordinators());
        dispatch(fetchAllStatuses());
    }, [dispatch]);

    return (
        <Box>
            <Box bgcolor={'#FFFFFF'} p={'20px 30px 40px 30px'} borderRadius={'10px'} mb={'10px'}>
                <Box display={'flex'} justifyContent={'space-between'}>
                    <Typography fontFamily={'Rubik'} fontWeight={'500'} fontSize={'18px'} mb={'10px'}>פרטים טכניים</Typography>
                    {(user?.userTypeId <= 2 || selectedCourse?.coordinatorId == user?.userId) && <Box>
                        {isEditing ?
                            <><Button variant="outlined" backgroundColor="#326DEF" sx={{ borderRadius: '50px', px: '24px', fontFamily: 'Rubik' }}
                                onClick={() => {
                                    setIsEditing(false);
                                    setCourseName(selectedCourse?.name || '');
                                    setCoordinator(selectedCourse?.coordinatorId || '');
                                    setYear(selectedCourse?.year || '');
                                    setStartDate(selectedCourse?.startDate || '');
                                    setEndDate(selectedCourse?.endDate || '');
                                    setNumberOfMeetings(selectedCourse?.numberOfMeetings || '');
                                    setNumberOfStudents(selectedCourse?.numberOfStudents || '');
                                    setNotes(selectedCourse?.notes || '');
                                    setStatus(selectedCourse?.statusId || '');
                                    setColor(selectedCourse?.color);
                                    setEndDateError("");
                                }}
                            >ביטול</Button>
                                <Button onClick={(e) => saveChanges(e, false)} variant="contained" backgroundColor="#326DEF"
                                    sx={{ borderRadius: '50px', px: '24px', fontFamily: 'Rubik', mr: '15px' }}>שמירה</Button></>
                            : <Button variant="contained" backgroundColor="#326DEF"
                                sx={{ borderRadius: '50px', px: '24px', fontFamily: 'Rubik' }} onClick={() => setIsEditing(true)}>עריכה</Button>}
                    </Box>}
                </Box>
                <Box component={'form'}>
                    <TextField label="קוד קורס" variant="standard" value={selectedCourse?.courseId}
                        InputProps={{ sx: { fontFamily: 'Rubik' } }}
                        sx={{ width: '200px', height: '45px', ml: '20px', mb: '15px', fontSize: '16px', fontFamily: 'Rubik' }}
                        InputLabelProps={{ sx: { width: '150%', fontFamily: 'Rubik' } }} />
                    <TextField label="שם קורס" type='text' name='courseName' value={courseName} variant="standard"
                        onChange={e => setCourseName(e.target.value)} InputProps={{ readOnly: !isEditing, sx: { fontFamily: 'Rubik' } }}
                        sx={{ width: '200px', height: '45px', ml: '20px', fontSize: '16px', fontFamily: 'Rubik' }}
                        InputLabelProps={{ shrink: true, sx: { width: '150%', fontFamily: 'Rubik' } }} />
                    {!isEditing ? <TextField label="שם רכזת" name='coordinatorName' value={selectedCourse?.coordinatorName || ""} variant="standard"
                        InputProps={{ sx: { fontFamily: 'Rubik' } }}
                        sx={{ width: '200px', height: '45px', ml: '20px', fontSize: '16px', fontFamily: 'Rubik' }}
                        InputLabelProps={{ sx: { width: '150%', fontFamily: 'Rubik' } }} />
                        : <TextField label="שם רכזת" name="coordinatorName" value={coordinatorId || ''} variant="standard"
                            onChange={e => setCoordinator(e.target.value)} select SelectProps={{
                                IconComponent: () => null,
                                renderValue: (selectedId) => {
                                    const selectedCoordinator = coordinators?.find(coord => coord?.userId === selectedId);
                                    return selectedCoordinator ? selectedCoordinator?.name : "";
                                },
                            }}
                            InputProps={{
                                sx: { fontFamily: 'Rubik', direction: 'ltr', textAlign: 'right' },
                                startAdornment: (<InputAdornment position='start'><img src={selectSvg} alt='select_icon' /></InputAdornment>)
                            }}
                            sx={{ width: '200px', height: '45px', ml: '20px', fontSize: '16px', fontFamily: 'Rubik' }}
                            InputLabelProps={{ sx: { width: '150%', fontFamily: 'Rubik' } }} >
                            {coordinators?.map(coordinatorOption => (
                                <MenuItem key={coordinatorOption?.userId} value={coordinatorOption?.userId} sx={{ fontFamily: 'Rubik' }}>
                                    {coordinatorOption?.name}
                                </MenuItem>))}
                        </TextField>
                    }
                    <Box display={'block'}></Box>
                    <TextField label="שנה" type='number' name='year' value={year} variant="standard"
                        onChange={e => setYear(e.target.value)} InputProps={{ readOnly: !isEditing, sx: { fontFamily: 'Rubik' } }}
                        sx={{ width: '200px', height: '45px', ml: '20px', mb: '15px', fontSize: '16px' }}
                        InputLabelProps={{ sx: { width: '150%', fontFamily: 'Rubik' } }} />
                    <TextField label="תאריך התחלה" type='date' name='startDate' value={startDate} variant="standard"
                        onChange={e => setStartDate(e.target.value)} InputProps={{ readOnly: !isEditing, sx: { fontFamily: 'Rubik' } }}
                        sx={{ width: '200px', height: '45px', ml: '20px', fontSize: '16px' }}
                        InputLabelProps={{ sx: { width: '150%', fontFamily: 'Rubik', }, }} />
                    <TextField label="תאריך סיום" type='date' name='endDate' value={endDate} variant="standard"
                        onChange={e => {
                            const endDateValue = new Date(e.target.value);
                            const startDateValue = new Date(startDate);
                            if (endDateValue <= startDateValue) {
                                setEndDate(startDate);
                                setEndDateError("תאריך הסיום חייב להיות אחרי תאריך ההתחלה!")
                            }
                            else {
                                setEndDate(e.target.value);
                                setEndDateError("")
                            }
                        }} InputProps={{ readOnly: !isEditing, sx: { fontFamily: 'Rubik' } }}
                        sx={{ width: '200px', height: '45px', ml: '20px', fontSize: '16px' }}
                        InputLabelProps={{ sx: { width: '150%', fontFamily: 'Rubik', }, }}
                        error={!!endDateError} helperText={endDateError} />
                    <Box display={'block'}></Box>
                    <TextField label="מספר תלמידים" type='number' name='numberOfStudents' value={numberOfStudents} variant="standard"
                        onChange={e => setNumberOfStudents(e.target.value)} InputProps={{ readOnly: !isEditing, sx: { fontFamily: 'Rubik' } }}
                        sx={{ width: '200px', height: '45px', ml: '20px', mb: '15px', fontSize: '16px' }}
                        InputLabelProps={{ sx: { width: '150%', fontFamily: 'Rubik', }, }} />
                    <TextField label="מספר מפגשים" type='number' name='numberOfMeetings' value={numberOfMeetings} variant="standard"
                        onChange={e => setNumberOfMeetings(e.target.value)} InputProps={{ readOnly: !isEditing, sx: { fontFamily: 'Rubik' } }}
                        sx={{ width: '200px', height: '45px', ml: '20px', fontSize: '16px' }}
                        InputLabelProps={{ sx: { width: '150%', fontFamily: 'Rubik', }, }} />
                    <Box display={'block'}></Box>
                    <TextField label="הערות" type='text' name='notes' variant="standard" value={notes} multiline rows={2.5}
                        onChange={e => setNotes(e.target.value)} InputProps={{ readOnly: !isEditing, sx: { fontFamily: 'Rubik', alignContent: 'end !important' } }}
                        sx={{
                            width: '414px', height: '86px', ml: '20px', mb: '15px', fontSize: '16px',
                            '& textarea': { alignContent: 'end !important' }
                        }}
                        InputLabelProps={{ sx: { width: '150%', fontFamily: 'Rubik' } }} />
                    <Box display={'block'}></Box>
                    {!isEditing ? <TextField label="סטטוס" name='status' variant="standard" value={selectedCourse?.statusName || ""}
                        InputProps={{ sx: { fontFamily: 'Rubik' } }}
                        sx={{ width: '200px', height: '45px', ml: '20px', fontSize: '16px', fontFamily: 'Rubik' }}
                        InputLabelProps={{ sx: { width: '150%', fontFamily: 'Rubik' } }} />
                        : <TextField label="סטטוס" name='status' variant="standard" value={statusId || ''}
                            onChange={e => setStatus(e.target.value)} select SelectProps={{
                                IconComponent: () => null,
                                renderValue: (selectedId) => {
                                    const selectedStatus = statuses?.find(s => s?.statusCourseId === selectedId);
                                    return selectedStatus ? selectedStatus?.name : "";
                                },
                            }}
                            InputProps={{
                                sx: { fontFamily: 'Rubik', direction: 'ltr', textAlign: 'right' },
                                startAdornment: (<InputAdornment position='start'><img src={selectSvg} alt='select_icon' /></InputAdornment>)
                            }}
                            sx={{ width: '200px', height: '45px', ml: '20px', fontSize: '16px', fontFamily: 'Rubik' }}
                            InputLabelProps={{ sx: { width: '150%', fontFamily: 'Rubik' } }} >
                            {statuses?.map(status => (
                                <MenuItem key={status?.statusCourseId} value={status?.statusCourseId} sx={{ fontFamily: 'Rubik' }}>
                                    {status?.name}
                                </MenuItem>))}
                        </TextField>}
                    <Box display={'inline-flex'} sx={{ verticalAlign: 'bottom', alignItems: 'center' }}>
                        <Typography fontFamily={'Rubik'} color='#393939' fontSize={'16px'}>צבע לטבלה</Typography>
                        <TextField label='' type='color' name='color' value={color}
                            onChange={e => setColor(e.target.value)} InputProps={{ disabled: !isEditing, sx: { borderRadius: '4px' } }}
                            sx={{
                                width: '32px', height: '28.44px', mr: '10px', borderColor: '#6F6F6F',
                                '& input[type="color"]': { p: '0px !important', height: '32px', borderRadius: '4px', }
                            }} />
                    </Box>
                </Box>
                <Dialog open={showResultDialog} onClose={() => setShowResultDialog(false)}
                    sx={{ padding: '40px', gap: '24px', border: '1px #C6C6C6', borderRadius: '10px' }}>
                    <Box>
                        <Box display={'flex'} justifyContent={'flex-end'}>
                            <IconButton onClick={() => setShowResultDialog(false)}>X</IconButton>
                        </Box>
                        <Box gap={'32px'} p={'40px'}>
                            <Typography fontFamily={'Rubik'} fontWeight={'400'} color='#393939' fontSize={'22px'}>
                                {resultMessage}
                            </Typography>
                        </Box>
                    </Box>
                </Dialog>
                <Dialog open={showConfirmDeleteDialog} onClose={handleCancelDelete}
                    sx={{ padding: '40px', gap: '24px', border: '1px #C6C6C6', borderRadius: '10px' }}>
                    <Box>
                        <Box display={'flex'} justifyContent={'flex-end'}>
                            <IconButton onClick={handleCancelDelete}>X</IconButton>
                        </Box>
                        <Box gap={'32px'} p={'40px'} textAlign={'center'}>
                            <Typography fontFamily={'Rubik'} fontWeight={'400'} color='#393939' fontSize={'22px'}>
                                {confirmDeleteMessage || "לקורס קיימים מפגשים עתידיים. במקרה של שינוי הסטטוס מפגשים אלו ימחקו. האם להמשיך בשמירה?"}
                            </Typography>
                            <Box display={'flex'} justifyContent={'center'} mt={3}>
                                <Button variant="outlined" sx={{ borderRadius: '50px', px: '24px', fontFamily: 'Rubik', mr: '15px' }} onClick={handleCancelDelete}>ביטול</Button>
                                <Button variant="contained" sx={{ borderRadius: '50px', px: '24px', fontFamily: 'Rubik' }} onClick={(e) => handleConfirmDelete(e)}>אישור</Button>
                            </Box>
                        </Box>
                    </Box>
                </Dialog>
            </Box>
            <>שיבוץ במערכת</>
        </Box>
    )
}

export default CourseDetails