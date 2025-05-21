import React, { useEffect, useState } from 'react'
import { Box, Button, Dialog, InputAdornment, MenuItem, Select, TextField, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import { fetchCoordinators } from '../features/user/userAction';
import { selectSelectedCourse } from '../features/course/courseSlice';
import { fetchAllStatuses } from '../features/status/statusActions';
import { selectStatuses } from '../features/status/statusSlice';
import { selectDays } from '../features/day/daySlice';
import { fetchDaysForCourseByCourseId } from '../features/daysForCourse/daysForCourseActions';
import { fetchAllDays } from '../features/day/dayActions';
import selectSvg from '../assets/icons/chevron-down.svg'
import addSvg from '../assets/icons/circle-plus.svg'
import { updateCourseAction } from '../features/course/courseActions';

const CourseDetails = () => {
    const dispatch = useDispatch();
    const coordinators = useSelector(state => state.user.coordinatorsCode);
    const daysForCourse = useSelector(state => state.daysForCourse.daysForCourseByCourseId);
    const user = { userTypeId: 3, userId: 3 }//useSelector(state => state.user.selectedUser);
    const statuses = useSelector(selectStatuses);
    const allDays = useSelector(selectDays);
    const [isEditing, setIsEditing] = useState(false)
    const [isEditingDays, setIsEditingDays] = useState(false)
    const [addDay, setAddDay] = useState(false)

    const selectedCourse = useSelector(selectSelectedCourse)
    const [courseName, setCourseName] = useState(selectedCourse?.name)
    const [coordinatorId, setCoordinator] = useState(selectedCourse?.coordinatorId)
    const [year, setYear] = useState(selectedCourse?.year)
    const [startDate, setStartDate] = useState(selectedCourse?.startDate)
    const [endDate, setEndDate] = useState(selectedCourse?.endDate)
    const [endDateError, setEndDateError] = useState("");
    const [numberOfStudents, setNumberOfStudents] = useState(selectedCourse?.numberOfStudents)
    const [numberOfMeetings, setNumberOfMeetings] = useState(selectedCourse?.numberOfMeetings)
    const [notes, setNotes] = useState(selectedCourse?.notes)
    const [statusId, setStatus] = useState(selectedCourse?.statusId)
    const [color, setColor] = useState(selectedCourse?.color)
    const [result, setResult] = useState(null)

    const [message, setMessage] = useState(false)

    const saveChanges = async (e) => {
        e.preventDefault();
        const course = {
            courseId: selectedCourse.courseId,
            name: courseName,
            coordinatorId: coordinatorId,
            year: year,
            startDate: startDate,
            endDate: endDate,
            numberOfStudents: Number(numberOfStudents),
            numberOfMeetings: Number(numberOfMeetings),
            notes: notes,
            statusId: statusId,
            color: color
        }
        try {
            const actionPromise = dispatch(updateCourseAction(course));
            actionPromise.then((resultAction) => {
                if (resultAction.type === 'course/updateCourseAction/fulfilled') {
                  setResult(true);
                } else if (resultAction.type === 'course/updateCourseAction/rejected') {
                  setResult(false);
                }
              })
              .catch((error) => {
                setResult(false);
              });        
          } catch (error) {
            setResult(false);
          }
        setMessage(true)
    };
    //console.log(coordinator)
    //const [daysForCourse, setDay] = useState(days)
    const saveDays = async (e) => {
        e.preventDefault();
    };

    useEffect(() => {
        dispatch(fetchCoordinators())
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchAllStatuses())
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchAllDays())
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchDaysForCourseByCourseId(selectedCourse?.courseId))
    }, [dispatch])
    //courseId?

    return (
        <div>
            <Box bgcolor={'#FFFFFF'} p={'20px 30px 40px 30px'} borderRadius={'10px'} mb={'10px'}>
                <Box display={'flex'} justifyContent={'space-between'}>
                    <Typography fontFamily={'Rubik'} fontWeight={'500'} fontSize={'18px'} mb={'10px'}>פרטים טכניים</Typography>
                    {user?.userTypeId <= 2 || selectedCourse?.coordinatorId == user?.userId && <Box>
                        {isEditing ?
                            <><Button variant="outlined" backgroundColor="#326DEF" sx={{ borderRadius: '50px', px: '24px', fontFamily: 'Rubik' }}>ביטול</Button>
                                <Button onClick={saveChanges} variant="contained" backgroundColor="#326DEF" sx={{ borderRadius: '50px', px: '24px', fontFamily: 'Rubik', mr: '15px' }}>שמירה</Button></>
                            : <Button variant="contained" backgroundColor="#326DEF" sx={{ borderRadius: '50px', px: '24px', fontFamily: 'Rubik' }} onClick={() => setIsEditing(true)}>עריכה</Button>}
                    </Box>}
                </Box>
                <Box component={'form'} onSubmit={saveChanges}>
                    <TextField label="קוד קורס" variant="standard" value={selectedCourse?.courseId}
                        InputProps={{ sx: { fontFamily: 'Rubik' } }}
                        sx={{ width: '200px', height: '45px', ml: '20px', mb: '15px', fontSize: '16px', fontFamily: 'Rubik' }}
                        InputLabelProps={{ sx: { width: '150%', fontFamily: 'Rubik' } }} />
                    <TextField label="שם קורס" type='text' name='courseName' defaultValue={courseName} variant="standard"
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
                                    return selectedCoordinator ? selectedCoordinator?.name : ""; }, }}
                            InputProps={{ sx: { fontFamily: 'Rubik', direction: 'ltr', textAlign: 'right' },
                                startAdornment: (<InputAdornment position='start'><img src={selectSvg} alt='select_icon' /></InputAdornment>) }}
                            sx={{ width: '200px', height: '45px', ml: '20px', fontSize: '16px', fontFamily: 'Rubik' }}
                            InputLabelProps={{ sx: { width: '150%', fontFamily: 'Rubik' } }} >
                            {coordinators?.map(coordinatorOption => (
                                <MenuItem key={coordinatorOption?.userId} value={coordinatorOption?.userId} sx={{ fontFamily: 'Rubik' }}>
                                    {coordinatorOption?.name}
                                </MenuItem> ))}
                        </TextField>
                      }
                    <Box display={'block'}></Box>
                    <TextField label="שנה" type='number' name='year' defaultValue={selectedCourse?.year} variant="standard"
                        onChange={e => setYear(e.target.value)} InputProps={{ readOnly: !isEditing, sx: { fontFamily: 'Rubik' } }}
                        sx={{ width: '200px', height: '45px', ml: '20px', mb: '15px', fontSize: '16px' }}
                        InputLabelProps={{ sx: { width: '150%', fontFamily: 'Rubik' } }} />
                    <TextField label="תאריך התחלה" type='date' name='startDate' defaultValue={selectedCourse?.startDate} variant="standard"
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
                    <TextField label="מספר מפגשים" type='number' name='numberOfStudents' defaultValue={selectedCourse?.numberOfStudents} variant="standard"
                        onChange={e => setNumberOfStudents(e.target.value)} InputProps={{ readOnly: !isEditing, sx: { fontFamily: 'Rubik' } }}
                        sx={{ width: '200px', height: '45px', ml: '20px', mb: '15px', fontSize: '16px' }}
                        InputLabelProps={{ sx: { width: '150%', fontFamily: 'Rubik', }, }} />
                    <TextField label="מספר תלמידים" type='number' name='numberOfMeetings' defaultValue={selectedCourse?.numberOfMeetings} variant="standard"
                        onChange={e => setNumberOfMeetings(e.target.value)} InputProps={{ readOnly: !isEditing, sx: { fontFamily: 'Rubik' } }}
                        sx={{ width: '200px', height: '45px', ml: '20px', fontSize: '16px' }}
                        InputLabelProps={{ sx: { width: '150%', fontFamily: 'Rubik', }, }} />
                    <Box display={'block'}></Box>
                    <TextField label="הערות" type='text' name='notes' variant="standard" defaultValue={selectedCourse?.notes} multiline rows={2.5}
                        onChange={e => setNotes(e.target.value)} InputProps={{ readOnly: !isEditing, sx: { fontFamily: 'Rubik', alignContent: 'end !important' } }}
                        sx={{ width: '414px', height: '86px', ml: '20px', mb: '15px', fontSize: '16px',
                            '& textarea': { alignContent: 'end !important' } }}
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
                                    return selectedStatus ? selectedStatus?.name : ""; }, }}
                            InputProps={{ sx: { fontFamily: 'Rubik', direction: 'ltr', textAlign: 'right' },
                                startAdornment: (<InputAdornment position='start'><img src={selectSvg} alt='select_icon' /></InputAdornment>) }}
                            sx={{ width: '200px', height: '45px', ml: '20px', fontSize: '16px', fontFamily: 'Rubik' }}
                            InputLabelProps={{ sx: { width: '150%', fontFamily: 'Rubik' } }} >
                            {statuses?.map(status => (
                                <MenuItem key={status?.statusCourseId} value={status?.statusCourseId} sx={{ fontFamily: 'Rubik' }}>
                                    {status?.name}
                                </MenuItem> ))}
                        </TextField>}
                    <Box display={'inline-flex'} sx={{ verticalAlign: 'bottom', alignItems: 'center' }}>
                        <Typography fontFamily={'Rubik'} color='#393939' fontSize={'16px'}>צבע לטבלה</Typography>
                        <TextField label='' type='color' name='color' defaultValue={selectedCourse?.color}
                            onChange={e => setColor(e.target.value)} InputProps={{ disabled: !isEditing, sx: { borderRadius: '4px' } }}
                            sx={{ width: '32px', height: '28.44px', mr: '10px', borderColor: '#6F6F6F',
                                '& input[type="color"]': { p: '0px !important', height: '32px', borderRadius: '4px', } }} />
                    </Box>
                </Box>
                <Dialog open={message} onClose={() => setMessage(false)}
                     sx={{padding:'40px', gap:'24px' ,border: '1px #C6C6C6', borderRadius: '10px' }}>
                        <Box>
                        <Box gap={'8px'}>
                            {/* <Typography fontFamily={'Rubik'} fontWeight={'500'} color='#393939' fontSize={'18px'}>כותרת</Typography> */}
                            <Button onClick={() => setMessage(false)}>X</Button>
                        </Box>
                        <Box gap={'32px'} p={'40px'}>
                            <Typography fontFamily={'Rubik'} fontWeight={'400'} color='#393939' fontSize={'22px'}>
                                {!result ?
                                'השמירה לא הצליחה'
                                :
                                'שמירת פרטי הקורס הסתיימה בהצלחה'}
                                </Typography>
                        </Box></Box>
                </Dialog>
            </Box>
            <Box bgcolor={'#FFFFFF'} p={'20px 30px 25px 30px'} borderRadius={'10px'}>
                <Box display={'flex'} justifyContent={'space-between'}>
                    <Typography fontFamily={'Rubik'} fontWeight={'500'} fontSize={'18px'} mb={'10px'}>שיבוץ במערכת</Typography>
                    {user.userTypeId <= 2 || selectedCourse?.coordinatorId == user?.userId && (isEditingDays ?
                        <Button variant="contained" backgroundColor="#326DEF" sx={{ borderRadius: '50px', px: '24px', fontFamily: 'Rubik', mr: '15px' }}>שמירה</Button>
                        : <Button variant="contained" backgroundColor="#326DEF" sx={{ borderRadius: '50px', px: '24px', fontFamily: 'Rubik' }} onClick={() => setIsEditingDays(true)}>{daysForCourse.length == 0 ? 'הוספה' : 'עריכה'}</Button>)}
                </Box>
                <Box component={'form'} onSubmit={saveDays}>
                    {daysForCourse.length == 0 ?
                        <Typography fontSize={'14px'} fontFamily={'Rubik'}>עדיין לא נקבעו ימים לקורס זה</Typography>
                        : daysForCourse?.map(day => (
                            <Box key={day?.daysForCourseId}>
                                {!isEditingDays ? <TextField label="יום" name='day' value={day?.dayName} variant="standard"
                                    InputProps={{ sx: { fontFamily: 'Rubik' } }}
                                    sx={{ width: '200px', height: '45px', ml: '20px', fontSize: '16px', fontFamily: 'Rubik' }}
                                    InputLabelProps={{ sx: { width: '150%', fontFamily: 'Rubik' } }} />
                                    : <TextField label="יום" name='day' value={day?.dayName} variant="standard"
                                        // onChange={e => setCoordinator(e.target.value)}
                                        select SelectProps={{ IconComponent: () => null }}
                                        InputProps={{
                                            sx: { fontFamily: 'Rubik', direction: 'ltr', textAlign: 'right' },
                                            startAdornment: (<InputAdornment position='start'><img src={selectSvg} alt='select_icon' /></InputAdornment>)
                                        }}
                                        sx={{ width: '200px', height: '45px', ml: '20px', fontSize: '16px', fontFamily: 'Rubik' }}
                                        InputLabelProps={{
                                            sx: {
                                                width: '150%', fontFamily: 'Rubik'
                                            }
                                        }} >
                                        {allDays?.map(d => (
                                            <MenuItem key={d?.dayId} value={d?.descr} sx={{ fontFamily: 'Rubik' }}>
                                                {d?.descr}
                                            </MenuItem>
                                        ))}
                                    </TextField>}
                                <TextField label='שעת התחלה' type='time' name='startTime' variant='standard' defaultValue={day?.startTime}
                                    // onChange={e => setCourseName(e.target.value)}
                                    InputProps={{ readOnly: !isEditingDays, sx: { fontFamily: 'Rubik' } }}
                                    sx={{ width: '200px', height: '45px', ml: '20px', mb: '15px', fontSize: '16px', fontFamily: 'Rubik' }}
                                    InputLabelProps={{ shrink: true, sx: { width: '150%', fontFamily: 'Rubik' } }} />
                                <TextField label='שעת סיום' type='time' name='endTime' variant='standard' defaultValue={day?.endTime}
                                    // onChange={e => setCourseName(e.target.value)}
                                    InputProps={{ readOnly: !isEditingDays, sx: { fontFamily: 'Rubik' } }}
                                    sx={{ width: '200px', height: '45px', ml: '20px', mb: '15px', fontSize: '16px', fontFamily: 'Rubik' }}
                                    InputLabelProps={{ shrink: true, sx: { width: '150%', fontFamily: 'Rubik' } }} />
                                <Box display={'block'}></Box>
                            </Box>
                        )
                        )}
                    {addDay &&
                        <Box display={'block'}>
                            <TextField label="יום" name='day' variant="standard"
                                // onChange={e => setCoordinator(e.target.value)}
                                select SelectProps={{ IconComponent: () => null }}
                                InputProps={{
                                    sx: { fontFamily: 'Rubik', direction: 'ltr', textAlign: 'right' },
                                    startAdornment: (<InputAdornment position='start'><img src={selectSvg} alt='select_icon' /></InputAdornment>)
                                }}
                                sx={{ width: '200px', height: '45px', ml: '20px', fontSize: '16px', fontFamily: 'Rubik' }}
                                InputLabelProps={{
                                    sx: {
                                        width: '150%', fontFamily: 'Rubik'
                                    }
                                }}
                                value=''>
                                {allDays?.map(d => (
                                    <MenuItem key={d?.dayId} value={d?.descr} sx={{ fontFamily: 'Rubik' }}>
                                        {d?.descr}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField label='שעת התחלה' type='time' name='startTime' variant='standard'
                                // onChange={e => setCourseName(e.target.value)}
                                InputProps={{ sx: { fontFamily: 'Rubik' } }}
                                sx={{ width: '200px', height: '45px', ml: '20px', mb: '15px', fontSize: '16px', fontFamily: 'Rubik' }}
                                InputLabelProps={{ shrink: true, sx: { width: '150%', fontFamily: 'Rubik' } }} />
                            <TextField label='שעת סיום' type='time' name='endTime' variant='standard'
                                // onChange={e => setCourseName(e.target.value)}
                                InputProps={{ sx: { fontFamily: 'Rubik' } }}
                                sx={{ width: '200px', height: '45px', ml: '20px', mb: '15px', fontSize: '16px', fontFamily: 'Rubik' }}
                                InputLabelProps={{ shrink: true, sx: { width: '150%', fontFamily: 'Rubik' } }} />
                            {/* {setAddDay(false)} */}
                        </Box>
                    }
                    {user.userTypeId <= 2 || selectedCourse?.coordinatorId == user?.userId && isEditingDays &&
                        <Button px={'4px'} color='#393939' onClick={() => setAddDay(true)}>
                            <img src={addSvg} alt='add' style={{ verticalAlign: 'middle' }} />
                            <Typography fontSize={'14px'} fontFamily={'Rubik'} display={'inline'} mr={'10px'}>הוספת יום</Typography>
                        </Button>}
                </Box>
            </Box>
        </div>
    )
}

export default CourseDetails