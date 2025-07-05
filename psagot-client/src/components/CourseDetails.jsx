import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Dialog, IconButton, MenuItem, TextField, Typography, CircularProgress } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { fetchCoordinators } from '../features/user/userAction';
import { updateCourseAction, fetchCourseById } from '../features/course/courseActions';
import { selectSelectedCourse, selectSelectedCourseStatus, resetSelectedCourseStatus } from '../features/course/courseSlice';
import { fetchAllStatuses } from '../features/status/statusActions';
import { selectStatuses } from '../features/status/statusSlice';
import CourseDaysManager from './CourseDaysManager';
import { Close } from '@mui/icons-material';

const CourseDetails = () => {
    const dispatch = useDispatch();
    const user = { userTypeId: 3, userId: 3 }//useSelector(state => state.user.selectedUser);
    const coordinators = useSelector(state => state.user.coordinators);
    const statuses = useSelector(selectStatuses);
    const selectedCourse = useSelector(selectSelectedCourse)
    const courseStatus = useSelector(selectSelectedCourseStatus);

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
    const [isValidForm, setIsValidForm] = useState(false);

    const [showResultDialog, setShowResultDialog] = useState(false);
    const [dialogTitle, setDialogTitle] = useState('');
    const [mainMessage, setMainMessage] = useState('');
    const [subMessage, setSubMessage] = useState('');
    const [showConfirmActionDialog, setShowConfirmActionDialog] = useState(false);
    const [confirmActionCallback, setConfirmActionCallback] = useState(null);

    const handleShowResultDialog = (title, message, subMessage = '') => {
        setDialogTitle(title);
        setMainMessage(message);
        setSubMessage(subMessage);
        setShowResultDialog(true);
    };

    const handleShowConfirmation = (title, message, subMessage = '', callback) => {
        setDialogTitle(title);
        setMainMessage(message);
        setSubMessage(subMessage);
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

    const validateForm = (data) => {
        let errors = {};
        let isValid = true;

        if (!data.name) {
            errors.name = 'חובה להזין שם קורס.';
            isValid = false;
        }
        if (!data.year || data.year <= 2000) {
            errors.year = 'חובה להזין שנה תקינה.';
            isValid = false;
        }
        if (!data.startDate) {
            errors.startDate = 'חובה להזין תאריך התחלה.';
            isValid = false;
        }
        if (!data.numberOfStudents || data.numberOfStudents <= 0) {
            errors.numberOfStudents = 'חובה להזין מספר תלמידים תקין.';
            isValid = false;
        }
        if (data.numberOfMeetings !== '' && data.numberOfMeetings < 0) {
            errors.numberOfMeetings = 'מספר מפגשים לא תקין.';
            isValid = false;
        }
        if (data.startDate && data.endDate) {
            const startDateValue = new Date(data.startDate);
            const endDateValue = new Date(data.endDate);
            if (endDateValue <= startDateValue) {
                errors.endDate = 'תאריך הסיום חייב להיות אחרי תאריך ההתחלה.';
                isValid = false;
            }
        }
        return { errors, isValid };
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        let updatedValue = value;

        if (['year', 'numberOfStudents', 'numberOfMeetings', 'coordinatorId', 'statusId'].includes(name)) {
            updatedValue = value === '' ? '' : Number(value);
        }

        setFormData(prev => {
            const updatedForm = { ...prev, [name]: updatedValue };
            const { errors, isValid } = validateForm(updatedForm);
            setFieldErrors(errors);
            setIsValidForm(isValid);
            return updatedForm;
        });
    };

    useEffect(() => {
        if (selectedCourse) {
            const newFormData = {
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
            };
            setFormData(newFormData);

            const { errors, isValid } = validateForm(newFormData);
            setFieldErrors(errors);
            setIsValidForm(isValid);
        } else {
            setFormData({});
            setFieldErrors({});
            setIsValidForm(false);
        }
    }, [selectedCourse]);

    useEffect(() => {
        dispatch(fetchCoordinators());
        dispatch(fetchAllStatuses());
        return () => {
            dispatch(resetSelectedCourseStatus());
        };
    }, [dispatch]);

    const saveChanges = async (e, confirmDelete = false) => {
        if (e && typeof e.preventDefault === 'function') { e.preventDefault(); }
        const { errors, isValid } = validateForm(formData);
        setFieldErrors(errors);
        if (!isValid) {
            handleShowResultDialog('שגיאה', 'יש לתקן את השדות המסומנים באדום לפני שמירה.');
            return;
        }

        const courseData = {
            courseId: selectedCourse?.courseId,
            name: formData.name,
            coordinatorId: formData.coordinatorId,
            year: formData.year,
            startDate: formData.startDate,
            endDate: formData.endDate === '' ? null : formData.endDate,
            numberOfStudents: formData.numberOfStudents,
            numberOfMeetings: formData.numberOfMeetings === '' ? null : formData.numberOfMeetings,
            notes: formData.notes,
            statusId: formData.statusId,
            color: formData.color
        };

        try {
            const actionResult = await dispatch(updateCourseAction({ courseData, confirmDeleteFutureMeetings: confirmDelete }));
            if (updateCourseAction.fulfilled.match(actionResult)) {
                handleShowResultDialog('שמירת פרטי קורס', 'שמירת פרטי הקורס הסתיימה בהצלחה.');
                setIsEditing(false);
                dispatch(fetchCourseById(selectedCourse?.courseId));
            } else if (updateCourseAction.rejected.match(actionResult)) {
                if (actionResult.payload?.isConflict) {
                    handleShowConfirmation('שמירת פרטי קורס', 'לקורס קיימים מפגשים עתידיים, במקרה של שינוי הסטטוס מפגשים אלו ימחקו.','האם להמשיך בשמירה?', () => saveChanges(null, true));
                } else {
                    handleShowResultDialog('שגיאה בשמירה', 'השמירה לא הצליחה. אנא נסה שוב.');
                }
            }
        } catch (error) {
            handleShowResultDialog('שגיאה בשמירה', 'אירעה שגיאה בלתי צפויה בעת שמירת הקורס.');
        }
    };

    const isSaveButtonDisabled = !isValidForm;

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
                ml: '20px', fontSize: '16px', fontFamily: 'Rubik',
                ...(name === 'notes' && { '& textarea': { alignContent: 'end !important' } }),
            },
            InputLabelProps: { sx: { width: '150%', fontFamily: 'Rubik' }, shrink: true },
            error: !!fieldErrors[name], helperText: fieldErrors[name]
        };
        if (isSelect) {
            return (<TextField {...commonProps} select SelectProps={{
                IconComponent: ExpandMoreIcon,
                sx: {
                    '.MuiSelect-icon': { right: 'unset', left: '0px' },
                    '& .MuiSelect-select': {
                        padding: '4.5px 2px !important', fontFamily: 'Rubik'
                    },
                }, renderValue: displayValue || undefined,
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
                        sx={{
                            width: '32px', height: '28.44px', mr: '10px', borderColor: '#6F6F6F',
                            '& input[type="color"]': { p: '0px !important', height: '32px', borderRadius: '4px', }
                        }}
                    />
                </Box>
            );
        }
        return (<TextField {...commonProps} type={type} multiline={multiline} rows={multiline ? rows : undefined} />);
    };

    if (courseStatus === 'loading') {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
                <CircularProgress />
                <Typography variant="h6" sx={{ ml: 2, fontFamily: 'Rubik' }}>טוען...</Typography>
            </Box>
        );
    }

    if (!isEditing && (!selectedCourse || courseStatus === 'failed')) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
                <Typography variant="h6" color="error" sx={{ fontFamily: 'Rubik' }}>
                    שגיאה בטעינת פרטי הקורס. אנא נסה שוב.
                </Typography>
            </Box>
        );
    }

    return (
        <Box>
            <Box boxShadow={'0px 0px 4px 0px #DCE2ECCC'} bgcolor={'#FFFFFF'} p={'20px 30px 40px 30px'} borderRadius={'10px'} mb={'15px'}>
                <Box display={'flex'} justifyContent={'space-between'}>
                    <Typography fontFamily={'Rubik'} fontWeight={'500'} fontSize={'18px'} mb={'10px'}>פרטים טכניים</Typography>
                    {(user?.userTypeId <= 2 || selectedCourse?.coordinatorId == user?.userId) && <Box>
                        {isEditing ? (
                            <><Button variant="outlined" sx={{ borderRadius: '50px', px: '24px', fontFamily: 'Rubik' }}
                                onClick={() => { setIsEditing(false);
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
                                        setIsValidForm(true);
                                    } setFieldErrors({});
                                    dispatch(resetSelectedCourseStatus());
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
                    <Box sx={{ display: 'block', mb: '20px' }}>
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
                    </Box>
                    <Box sx={{ display: 'block', mb: '20px' }}>
                        {renderTextField({ label: "שנה", name: "year", type: "number", value: formData.year, })}
                        {renderTextField({ label: "תאריך התחלה", name: "startDate", type: "date", value: formData.startDate, })}
                        {renderTextField({ label: "תאריך סיום", name: "endDate", type: "date", value: formData.endDate, })}
                    </Box>
                    <Box sx={{ display: 'block', mb: '20px' }}>
                        {renderTextField({ label: "מספר תלמידים", name: "numberOfStudents", type: "number", value: formData.numberOfStudents, })}
                        {renderTextField({ label: "מספר מפגשים", name: "numberOfMeetings", type: "number", value: formData.numberOfMeetings, })}
                    </Box>
                    <Box sx={{ display: 'block', mb: '20px' }}>
                        {renderTextField({ label: "הערות", name: "notes", value: formData.notes, multiline: true, rows: 2.5, })}
                    </Box>
                    <Box sx={{ display: 'block', mb: '20px' }}>
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
                </Box>
                <Dialog open={showResultDialog} onClose={() => setShowResultDialog(false)} sx={{ border: '1px #C6C6C6', borderRadius: '10px' }}>
                    <Box sx={{ pt: '40px',px:'40px', gap: '24px' }}>
                        <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                            <Typography fontFamily={'Rubik'} fontWeight={'500'} fontSize={'18px'} color='#393939'>{dialogTitle}</Typography>
                            <IconButton onClick={() => setShowResultDialog(false)}><Close fontSize='small' /></IconButton>
                        </Box>
                        <Box gap={'32px'} p={'40px'} textAlign={'center'}>
                            <Typography fontFamily={'Rubik'} fontWeight={'400'} color='#393939' fontSize={'22px'}>
                                {mainMessage}
                            </Typography>
                            {subMessage && (
                                <Typography fontFamily={'Rubik'} fontWeight={'400'} color='#393939' fontSize={'16px'} mt={1}>
                                    {subMessage}
                                </Typography>
                            )}
                        </Box>
                    </Box>
                </Dialog>
                <Dialog open={showConfirmActionDialog} onClose={handleCancelAction} sx={{ border: '1px #C6C6C6', borderRadius: '10px' }}>
                    <Box sx={{ pt: '40px', px: '40px', gap: '24px' }}>
                        <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                            <Typography fontFamily={'Rubik'} fontWeight={'500'} fontSize={'18px'} color='#393939'>{dialogTitle}</Typography>
                            <IconButton onClick={handleCancelAction}><Close fontSize='small' /></IconButton>
                        </Box>
                        <Box gap={'32px'} p={'40px'} textAlign={'center'}>
                            <Typography fontFamily={'Rubik'} fontWeight={'400'} color='#393939' fontSize={'22px'}>
                                {mainMessage}
                            </Typography>
                            {subMessage && (
                                <Typography fontFamily={'Rubik'} fontWeight={'400'} color='#393939' fontSize={'16px'} mt={1}>
                                    {subMessage}
                                </Typography>
                            )}
                            <Box display={'flex'} justifyContent={'center'} mt={3}>
                                <Button variant="outlined"  onClick={handleCancelAction}
                                sx={{ borderRadius: '50px', px: '24px', fontFamily: 'Rubik', ml: '10px', width: '83px', height: '44px' }}>ביטול</Button>
                                <Button variant="contained"  onClick={handleConfirmAction}
                                sx={{ borderRadius: '50px', px: '24px', fontFamily: 'Rubik', width: '83px', height: '44px' }}>אישור</Button>
                            </Box>
                        </Box>
                    </Box>
                </Dialog>
            </Box>
            <CourseDaysManager selectedCourse={selectedCourse} user={user} showResult={handleShowResultDialog} showConfirmation={handleShowConfirmation} />
        </Box>
    )
}

export default CourseDetails

