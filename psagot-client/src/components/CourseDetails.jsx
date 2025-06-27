import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Dialog, IconButton, MenuItem, TextField, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { fetchCoordinators } from '../features/user/userAction';
import { updateCourseAction, fetchCourseById } from '../features/course/courseActions';
import { selectSelectedCourse } from '../features/course/courseSlice';
import { fetchAllStatuses } from '../features/status/statusActions';
import { selectStatuses } from '../features/status/statusSlice';
import CourseDaysManager from './CourseDaysManager';

const CourseDetails = () => {
    const dispatch = useDispatch();
    const user = { userTypeId: 3, userId: 3 }//useSelector(state => state.user.selectedUser);
    const coordinators = useSelector(state => state.user.coordinators);
    const statuses = useSelector(selectStatuses);
    const selectedCourse = useSelector(selectSelectedCourse)

    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        coordinatorId: '',
        year: '',
        startDate: '',
        endDate: '',
        numberOfStudents: '',
        numberOfMeetings: '',
        notes: '',
        statusId: '',
        color: ''
    });
    const [fieldErrors, setFieldErrors] = useState({});

    const [showResultDialog, setShowResultDialog] = useState(false);
    const [resultMessage, setResultMessage] = useState('');
    const [showConfirmActionDialog, setShowConfirmActionDialog] = useState(false);
    const [confirmActionMessage, setConfirmActionMessage] = useState('');
    const [confirmActionCallback, setConfirmActionCallback] = useState(null);

    // const [courseName, setCourseName] = useState(selectedCourse?.name || '');
    // const [coordinatorId, setCoordinator] = useState(selectedCourse?.coordinatorId || '');
    // const [year, setYear] = useState(selectedCourse?.year || '');
    // const [startDate, setStartDate] = useState(selectedCourse?.startDate || '');
    // const [endDate, setEndDate] = useState(selectedCourse?.endDate || '');
    // const [endDateError, setEndDateError] = useState("");
    // const [numberOfStudents, setNumberOfStudents] = useState(selectedCourse?.numberOfStudents || '');
    // const [numberOfMeetings, setNumberOfMeetings] = useState(selectedCourse?.numberOfMeetings || '');
    // const [notes, setNotes] = useState(selectedCourse?.notes || '');
    // const [statusId, setStatus] = useState(selectedCourse?.statusId || '');
    // const [color, setColor] = useState(selectedCourse?.color)
    const handleShowResultDialog = (message) => {
        setResultMessage(message);
        setShowResultDialog(true);
    };

    const handleShowConfirmation = (message, callback) => {
        setConfirmActionMessage(message);
        setConfirmActionCallback(() => callback);
        setShowConfirmActionDialog(true);
    };

    const handleConfirmAction = () => {
        setShowConfirmActionDialog(false);
        if (confirmActionCallback) {
            confirmActionCallback();
            setConfirmActionCallback(null);
        }
    };

    const handleCancelAction = () => {
        setShowConfirmActionDialog(false);
        setConfirmActionCallback(null);
    };

    // פונקציית ולידציה מרוכזת
    const validateForm = (data) => {
        let errors = {};
        let isValid = true;

        if (!data.name) {
            errors.name = 'חובה להזין שם קורס.';
            isValid = false;
        }
        if (!data.year || data.year <= 0) { // הוספתי בדיקה ששנה תהיה גדולה מ-0
            errors.year = 'חובה להזין שנה תקינה.';
            isValid = false;
        }
        if (!data.startDate) {
            errors.startDate = 'חובה להזין תאריך התחלה.';
            isValid = false;
        }
        if (!data.numberOfStudents || data.numberOfStudents <= 0) { // בדיקה שמספר סטודנטים יהיה גדול מ-0
            errors.numberOfStudents = 'חובה להזין מספר תלמידים תקין.';
            isValid = false;
        }
        if (data.numberOfMeetings !== '' && data.numberOfMeetings < 0) {
            errors.numberOfMeetings = 'מספר מפגשים לא תקין.';
            isValid = false;
        }

        // ולידציה על תאריכים
        if (data.startDate && data.endDate) {
            const startDateValue = new Date(data.startDate);
            const endDateValue = new Date(data.endDate);
            if (endDateValue <= startDateValue) {
                errors.endDate = 'תאריך הסיום חייב להיות אחרי תאריך ההתחלה.';
                isValid = false;
            }
        }
        // צבע, רכזת וסטטוס: מניחים שהם תמיד יקבלו ערך ברירת מחדל או בחירה תקפה.
        // אם רכזת או סטטוס הם חובה, יש להוסיף כאן בדיקה ל-formData.coordinatorId ו-formData.statusId

        return { errors, isValid };
    };

    // פונקציה גנרית לטיפול בשינויים בשדות הטופס
    const handleChange = (e) => {
        const { name, value } = e.target;
        let updatedValue = value;

        // המרה למספר עבור שדות מספריים
        if (['year', 'numberOfStudents', 'numberOfMeetings', 'coordinatorId', 'statusId'].includes(name)) {
            updatedValue = value === '' ? '' : Number(value);
        }

        setFormData(prev => {
            const updatedForm = { ...prev, [name]: updatedValue };
            const { errors } = validateForm(updatedForm); // ולידציה בזמן אמת
            setFieldErrors(errors); // עדכון השגיאות
            return updatedForm;
        });
    };

    // אתחול נתוני הטופס כאשר selectedCourse משתנה או בהתחלה
    useEffect(() => {
        if (selectedCourse) {
            setFormData({
                name: selectedCourse.name || '',
                coordinatorId: selectedCourse.coordinatorId || '',
                year: selectedCourse.year || '',
                startDate: selectedCourse.startDate || '',
                endDate: selectedCourse.endDate || '',
                numberOfStudents: selectedCourse.numberOfStudents || '',
                numberOfMeetings: selectedCourse.numberOfMeetings || '',
                notes: selectedCourse.notes || '',
                statusId: selectedCourse.statusId || '',
                color: selectedCourse.color || ''
            });
        }
        setFieldErrors({}); // איפוס שגיאות באתחול
    }, [selectedCourse]);

    useEffect(() => {
        dispatch(fetchCoordinators());
        dispatch(fetchAllStatuses());
    }, [dispatch]);

    const saveChanges = async (e, confirmDelete = false) => {
        e.preventDefault();
        const { errors, isValid } = validateForm(formData);
        setFieldErrors(errors); // עדכון סופי של השגיאות לפני שמירה

        if (!isValid) {
            handleShowResultDialog('יש לתקן את השדות המסומנים באדום לפני שמירה.');
            return;
        }

        const courseData = {
            courseId: selectedCourse.courseId,
            name: formData.name,
            coordinatorId: formData.coordinatorId,
            year: formData.year,
            startDate: formData.startDate,
            endDate: formData.endDate,
            numberOfStudents: formData.numberOfStudents,
            numberOfMeetings: formData.numberOfMeetings,
            notes: formData.notes,
            statusId: formData.statusId,
            color: formData.color
        };

        try {
            const actionResult = await dispatch(updateCourseAction({ courseData, confirmDeleteFutureMeetings: confirmDelete }));
            if (updateCourseAction.fulfilled.match(actionResult)) {
                handleShowResultDialog('שמירת פרטי הקורס הסתיימה בהצלחה.');
                setIsEditing(false);
                dispatch(fetchCourseById(selectedCourse.courseId));
            } else if (updateCourseAction.rejected.match(actionResult)) {
                if (actionResult.payload && typeof actionResult.payload === 'object' && actionResult.payload.isConflict) {
                    handleShowConfirmation(actionResult.payload.message, () => saveChanges(e, true));
                } else {
                    handleShowResultDialog('השמירה לא הצליחה. אנא נסה שוב.');
                }
            }
        } catch (error) {
            console.error("שגיאה בלתי צפויה בעדכון הקורס:", error);
            handleShowResultDialog('אירעה שגיאה בלתי צפויה בעת שמירת הקורס.');
        }
    };

    const isSaveButtonDisabled = !isEditing || !validateForm(formData).isValid;

    const renderTextField = ({ label, name, type = 'text', value, multiline = false, rows = 1, readOnly = false,
        isSelect = false, options = [], displayValue = null }) => {
        const commonProps = {
            onChange: handleChange,
            label: label, name: name, value: value, variant: "standard",
            InputProps: {
                readOnly: !isEditing || readOnly,
                sx: { fontFamily: 'Rubik', }
            },
            sx: {
                width: name === 'notes' ? '414px' : '200px',
                height: name === 'notes' ? '86px' : '45px',
                mb: ['notes', 'year', 'numberOfStudents', 'courseId'].includes(name) ? '15px' : '0px',
                ml: '20px', fontSize: '16px', fontFamily: 'Rubik',
                ...(name === 'notes' && { '& textarea': { alignContent: 'end !important' } }),
            },
            InputLabelProps: { sx: { width: '150%', fontFamily: 'Rubik', } },
            error: !!fieldErrors[name], helperText: fieldErrors[name]
        };
        if (isSelect) {
            return (<TextField {...commonProps} select SelectProps={{
                IconComponent: ExpandMoreIcon,
                sx: { '.MuiSelect-icon': { right: 'unset', left: '0px' } }, renderValue: displayValue || undefined,
            }} >
                {options.map(option => (
                    <MenuItem key={option.value} value={option.value} sx={{ fontFamily: 'Rubik' }}>
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>
            );
        }
        if (type === 'color') {
            return (
                <Box display={'inline-flex'} sx={{ verticalAlign: 'bottom', alignItems: 'center' }}>
                    <Typography fontFamily={'Rubik'} color='#393939' fontSize={'16px'}>צבע לטבלה</Typography>
                    <TextField label='' type='color' name='color' value={formData.color} onChange={handleChange} 
                            InputProps={{ disabled: !isEditing, sx: { borderRadius: '4px' } }}
                            sx={{ width: '32px', height: '28.44px', mr: '10px', borderColor: '#6F6F6F',
                                '& input[type="color"]': { p: '0px !important', height: '32px', borderRadius: '4px', } }}
                        />
                </Box>
                );
        }
        return (<TextField {...commonProps} type={type} multiline={multiline} rows={multiline ? rows : undefined} />);
    };

    return (
        <Box>
            <Box boxShadow={'0px 0px 4px 0px #DCE2ECCC'} bgcolor={'#FFFFFF'} p={'20px 30px 40px 30px'} borderRadius={'10px'} mb={'15px'}>
                <Box display={'flex'} justifyContent={'space-between'}>
                    <Typography fontFamily={'Rubik'} fontWeight={'500'} fontSize={'18px'} mb={'10px'}>פרטים טכניים</Typography>
                    {(user?.userTypeId <= 2 || selectedCourse?.coordinatorId == user?.userId) && <Box>
                        {isEditing ? (
                            <><Button variant="outlined" sx={{ borderRadius: '50px', px: '24px', fontFamily: 'Rubik' }}
                                onClick={() => {
                                    setIsEditing(false);
                                    if (selectedCourse) {
                                        setFormData({
                                            name: selectedCourse.name || '',
                                            coordinatorId: selectedCourse.coordinatorId || '',
                                            year: selectedCourse.year || '',
                                            startDate: selectedCourse.startDate || '',
                                            endDate: selectedCourse.endDate || '',
                                            numberOfStudents: selectedCourse.numberOfStudents || '',
                                            numberOfMeetings: selectedCourse.numberOfMeetings || '',
                                            notes: selectedCourse.notes || '',
                                            statusId: selectedCourse.statusId || '',
                                            color: selectedCourse.color || ''
                                        });
                                    } setFieldErrors({});
                                }}>ביטול</Button>
                                <Button variant="contained" sx={{ borderRadius: '50px', px: '24px', fontFamily: 'Rubik', mr: '15px' }}
                                    onClick={(e) => saveChanges(e, false)} disabled={isSaveButtonDisabled}> שמירה</Button>
                            </>
                        ) : (<Button sx={{ borderRadius: '50px', px: '24px', fontFamily: 'Rubik' }}
                            variant="contained" onClick={() => setIsEditing(true)}>עריכה</Button>
                        )}
                    </Box>}
                </Box>
                <Box component={'form'}>
                    {renderTextField({ label: "קוד קורס", name: "courseId", value: selectedCourse?.courseId || '', readOnly: true, })}
                    {renderTextField({ label: "שם קורס", name: "name", value: formData.name, })}
                    {!isEditing ? (
                        renderTextField({ label: "שם רכזת", name: "coordinatorName", value: selectedCourse?.coordinatorName || "", readOnly: true, })
                    ) : (
                        renderTextField({
                            label: "שם רכזת", name: "coordinatorId", value: formData.coordinatorId, isSelect: true,
                            options: coordinators?.map(coord => ({ value: coord?.userId, label: coord?.name })) || [],
                            displayValue: (selectedId) => {
                                const selectedCoordinator = coordinators?.find(coord => coord?.userId === selectedId);
                                return selectedCoordinator ? selectedCoordinator?.name : "";
                            }
                        })
                    )}
                    <Box display={'block'}></Box>
                    {renderTextField({ label: "שנה", name: "year", type: "number", value: formData.year, })}
                    {renderTextField({ label: "תאריך התחלה", name: "startDate", type: "date", value: formData.startDate, })}
                    {renderTextField({ label: "תאריך סיום", name: "endDate", type: "date", value: formData.endDate, })}
                    <Box display={'block'}></Box>
                    {renderTextField({ label: "מספר תלמידים", name: "numberOfStudents", type: "number", value: formData.numberOfStudents, })}
                    {renderTextField({ label: "מספר מפגשים", name: "numberOfMeetings", type: "number", value: formData.numberOfMeetings, })}
                    <Box display={'block'}></Box>
                    {renderTextField({ label: "הערות", name: "notes", value: formData.notes, multiline: true, rows: 2.5, })}
                    <Box display={'block'}></Box>
                    {!isEditing ? (
                        renderTextField({ label: "סטטוס", name: "status", value: selectedCourse?.statusName || "", readOnly: true, })
                    ) : (
                        renderTextField({
                            label: "סטטוס", name: "statusId", value: formData.statusId, isSelect: true,
                            options: statuses?.map(s => ({ value: s?.statusCourseId, label: s?.name })) || [],
                            displayValue: (selectedId) => {
                                const selectedStatus = statuses?.find(s => s?.statusCourseId === selectedId);
                                return selectedStatus ? selectedStatus?.name : "";
                            }
                        })
                    )}
                    {renderTextField({ label: "צבע לטבלה", name: "color", type: "color", value: formData.color, })}
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
                <Dialog open={showConfirmActionDialog} onClose={handleCancelAction}
                    sx={{ padding: '40px', gap: '24px', border: '1px #C6C6C6', borderRadius: '10px' }}>
                    <Box>
                        <Box display={'flex'} justifyContent={'flex-end'}>
                            <IconButton onClick={handleCancelAction}>X</IconButton>
                        </Box>
                        <Box gap={'32px'} p={'40px'} textAlign={'center'}>
                            <Typography fontFamily={'Rubik'} fontWeight={'400'} color='#393939' fontSize={'22px'}>
                                {confirmActionMessage}
                            </Typography>
                            <Box display={'flex'} justifyContent={'center'} mt={3}>
                                <Button variant="outlined" sx={{ borderRadius: '50px', px: '24px', fontFamily: 'Rubik', ml: '15px' }} onClick={handleCancelAction}>ביטול</Button>
                                <Button variant="contained" sx={{ borderRadius: '50px', px: '24px', fontFamily: 'Rubik' }} onClick={handleConfirmAction}>אישור</Button>
                            </Box>
                        </Box>
                    </Box>
                </Dialog>
            </Box>
            <CourseDaysManager
                selectedCourse={selectedCourse}
                user={user}
                showResult={handleShowResultDialog}
                showConfirmation={handleShowConfirmation}
            />
        </Box>
    )
}

export default CourseDetails

