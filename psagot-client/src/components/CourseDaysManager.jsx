import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, IconButton, MenuItem, TextField, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { selectDays } from '../features/day/daySlice';
import { fetchDaysForCourseByCourseId } from '../features/daysForCourse/daysForCourseActions';
import { fetchAllDays } from '../features/day/dayActions';
import { updateDaysForCourseAction, addDaysForCourseAction, deleteDaysForCourseAction, checkTopicsConflictAction } from '../features/daysForCourse/daysForCourseActions';
import { fetchAllTopicForCourseByCourseId } from '../features/topic/topicActions';
import addSvg from '../assets/icons/circle-plus.svg'
import deleteSvg from '../assets/icons/deleteIcon.svg'
import editSvg from '../assets/icons/editIcon.svg';

const CourseDaysManager = ({ selectedCourse, user, showResult, showConfirmation }) => {
    const dispatch = useDispatch();
    const daysForCourse = useSelector(state => state.daysForCourse.daysForCourseByCourseId);
    const allDays = useSelector(selectDays);
    const [addDay, setAddDay] = useState(false);
    const [editingDayId, setEditingDayId] = useState(null);
    const [tempDayData, setTempDayData] = useState({});
    const [newDayForm, setNewDayForm] = useState({ dayId: '', startTime: '', endTime: '' });
    const [fieldErrors, setFieldErrors] = useState({ dayId: '', startTime: '', endTime: '' });
    const [touchedFields, setTouchedFields] = useState({ dayId: false, startTime: false, endTime: false });
    const [dayToSaveAfterConflict, setDayToSaveAfterConflict] = useState(null);

    const commonTextFieldSx = { width: '200px', height: '45px', ml: '20px', mb: '15px', fontSize: '16px', fontFamily: 'Rubik' };
    const commonInputLabelPropsSx = { width: '150%', fontFamily: 'Rubik',
        sx: { fontFamily: 'Rubik', left: 'unset', transformOrigin: 'top right' } };
    const commonInputPropsSx = { fontFamily: 'Rubik' };

    const validateDayFields = (dataToValidate, isNew = false) => {
        let errors = { dayId: '', startTime: '', endTime: '' };
        let isValid = true;

        if (isNew && !dataToValidate.dayId) {
            errors.dayId = 'חובה לבחור יום.';
            isValid = false;
        }
        if (!dataToValidate.startTime) {
            errors.startTime = 'חובה להזין שעת התחלה.';
            isValid = false;
        }
        if (!dataToValidate.endTime) {
            errors.endTime = 'חובה להזין שעת סיום.';
            isValid = false;
        }
        if (dataToValidate.startTime && dataToValidate.endTime && dataToValidate.startTime >= dataToValidate.endTime) {
            errors.endTime = 'שעת הסיום חייבת להיות אחרי שעת ההתחלה.';
            isValid = false;
        }

        const currentDaysToCheckAgainst = daysForCourse.filter(d => d.daysForCourseId !== dataToValidate.daysForCourseId);
        currentDaysToCheckAgainst.forEach(existingDay => {
            if (dataToValidate.dayId === existingDay.dayId) {
                if (dataToValidate.startTime < existingDay.endTime && existingDay.startTime < dataToValidate.endTime) {
                    if (!errors.dayId.includes('יום זה חופף ליום קיים בשעות אלו.')) {
                        errors.dayId = errors.dayId ? errors.dayId + ' | ' + 'יום זה חופף ליום קיים בשעות אלו.' : 'יום זה חופף ליום קיים בשעות אלו.';
                    }
                    isValid = false;
                }
            }
        });
        return { errors, isValid };
    };

    const handleFieldBlur = (field) => {
        setTouchedFields(prev => ({
            ...prev,
            [field]: true
        }));
        if (addDay) {
            const { errors } = validateDayFields(newDayForm, true);
            setFieldErrors(errors);
        } 
    };

    const handleNewDayChange = (field, value) => {      
        setNewDayForm(prev => {
            const updatedForm = { ...prev, [field]: value };
            const { errors } = validateDayFields(updatedForm, true);
            setFieldErrors(errors);
            return updatedForm;
        });
        setTouchedFields(prev => ({ ...prev, [field]: true }));
    };

    const handleTempDayChange = (field, value) => {
        setTempDayData(prev => {
        const updatedData = { ...prev, [field]: value };
        const { errors } = validateDayFields(updatedData, false);
        setFieldErrors(errors); 

        setTouchedFields(prevTouched => {
            const newTouched = { ...prevTouched, [field]: true };
            if (errors.dayId) newTouched.dayId = true;
            if (errors.endTime) newTouched.endTime = true;
            return newTouched;
        });
        return updatedData;
    });
    };

    const formatTimeForServer = (timeString) => {
        if (!timeString) return '';
        if (timeString.split(':').length === 2) {
            return timeString + ':00';
        }
        return timeString;
    };

    const mapDayToRequestDTO = (day, currentCourseId) => {
        const formattedStartTime = formatTimeForServer(day.startTime);
        const formattedEndTime = formatTimeForServer(day.endTime);
        return {
            daysForCourseId: day.daysForCourseId,
            dayId: day.dayId,
            courseId: currentCourseId,
            startTime: formattedStartTime,
            endTime: formattedEndTime,
        };
    };

    const handleEditDay = (day) => {
        setEditingDayId(day.daysForCourseId);
        const initialTempData = {
            ...day,
            startTime: day.startTime,
            endTime: day.endTime
        };
        setTempDayData(initialTempData);
        setAddDay(false);
        const { errors } = validateDayFields(initialTempData);
        setFieldErrors(errors);
        setTouchedFields({ dayId: false, startTime: false, endTime: false });
    };

    const handleCancelDayEdit = () => {
        setEditingDayId(null);
        setTempDayData({});
        setFieldErrors({ dayId: '', startTime: '', endTime: '' });
        setTouchedFields({ dayId: false, startTime: false, endTime: false });
    };

    const handleAddNewDay = async () => {
        setTouchedFields({ dayId: true, startTime: true, endTime: true });
        await saveIndividualDay({
            dayId: newDayForm.dayId,
            startTime: newDayForm.startTime,
            endTime: newDayForm.endTime,
            courseId: selectedCourse.courseId,
        }, false, true);
        
    };

    const saveIndividualDay = async (dayToSave, confirmConflict = false, isNewDay = false) => {
        const formattedDayForConflictCheck = {
            ...dayToSave,
            startTime: formatTimeForServer(dayToSave.startTime),
            endTime: formatTimeForServer(dayToSave.endTime),
        };

        let daysForConflictCheck = [...daysForCourse];
        if (formattedDayForConflictCheck.daysForCourseId) {
            daysForConflictCheck = daysForConflictCheck.map(d =>
                d.daysForCourseId === formattedDayForConflictCheck.daysForCourseId ? formattedDayForConflictCheck : d
            );
        } else {
            daysForConflictCheck.push(formattedDayForConflictCheck);
        }

        const updatedDaysListForConflictCheck = daysForConflictCheck.map(day =>
            mapDayToRequestDTO(day, selectedCourse.courseId)
        );

        if (!confirmConflict) {
            try {
                const conflictCheckResult = await dispatch(checkTopicsConflictAction({
                    courseId: selectedCourse.courseId,
                    newDays: updatedDaysListForConflictCheck
                }));
                if (checkTopicsConflictAction.fulfilled.match(conflictCheckResult)) {
                    if (conflictCheckResult.payload.hasConflicts) {
                        setDayToSaveAfterConflict(formattedDayForConflictCheck);
                        showConfirmation('עדכון יום',
                            "בעקבות שינוי ביום זה יש נושאים שמשובצים בצורה לא תקינה.",
                            "האם לשמור בכל זאת?",
                            () => saveIndividualDay(dayToSaveAfterConflict || formattedDayForConflictCheck, true, isNewDay)
                        );
                        return;
                    }
                } else if (checkTopicsConflictAction.rejected.match(conflictCheckResult)) {
                    showResult('שגיאה', "אירעה שגיאה בבדיקת קונפליקט עם נושאים.");
                    return;
                }
            } catch (error) {
                showResult('שגיאה','אירעה שגיאה בלתי צפויה בעת בדיקת קונפליקט נושאים.');
                return;
            }
        }
        try {
            let actionResult;
            const dayToSend = mapDayToRequestDTO(formattedDayForConflictCheck, selectedCourse.courseId);

            if (formattedDayForConflictCheck.daysForCourseId) {
                actionResult = await dispatch(updateDaysForCourseAction({ daysForCourseId: dayToSave.daysForCourseId, ...dayToSend }));
            } else {
                actionResult = await dispatch(addDaysForCourseAction(dayToSend));
            }
            if (actionResult.meta.requestStatus === 'fulfilled') {
                showResult('שמירת יום', 'שמירת ימי הקורס הסתיימה בהצלחה.');
                setEditingDayId(null);
                setTempDayData({});
                setNewDayForm({ dayId: '', startTime: '', endTime: '' });
                setAddDay(false);
                setDayToSaveAfterConflict(null);
                setFieldErrors({ dayId: '', startTime: '', endTime: '' });
                setTouchedFields({ dayId: false, startTime: false, endTime: false });
                dispatch(fetchDaysForCourseByCourseId(selectedCourse.courseId));
            } else if (actionResult.meta.requestStatus === 'rejected') {
                showResult('שגיאה בשמירה', "השמירה לא הצליחה. אנא נסה שוב.");
            }
        } catch (error) {
            showResult('שגיאה', 'אירעה שגיאה בלתי צפויה בעת שמירת היום.');
        }
    };

    const handleDeleteDay = async (daysForCourseId) => {
        const updatedDaysListAfterDelete = daysForCourse
            .filter(d => d.daysForCourseId !== daysForCourseId)
            .map(day => mapDayToRequestDTO(day, selectedCourse.courseId));

        const performDelete = async (confirmConflict = false) => {
            try {
                if (!confirmConflict) {
                    const conflictCheckResult = await dispatch(checkTopicsConflictAction({
                        courseId: selectedCourse.courseId,
                        newDays: updatedDaysListAfterDelete
                    }));
                    if (checkTopicsConflictAction.fulfilled.match(conflictCheckResult)) {
                        if (conflictCheckResult.payload.hasConflicts) {
                            showConfirmation( 'מחיקת יום',
                                "בעקבות מחיקת יום זה, יש נושאים המשובצים בצורה לא תקינה.",
                                "האם למחוק בכל זאת?",
                                () => performDelete(true)
                            );
                            return;
                        }
                    } else if (checkTopicsConflictAction.rejected.match(conflictCheckResult)) {
                        showResult('שגיאה', "אירעה שגיאה בבדיקת קונפליקט עם נושאים לפני מחיקה.");
                        return;
                    }
                }

                const actionResult = await dispatch(deleteDaysForCourseAction(daysForCourseId));
                if (deleteDaysForCourseAction.fulfilled.match(actionResult)) {
                    showResult('מחיקת יום', 'היום נמחק בהצלחה.');
                    dispatch(fetchDaysForCourseByCourseId(selectedCourse.courseId));
                } else if (deleteDaysForCourseAction.rejected.match(actionResult)) {
                    showResult('שגיאה במחיקה', 'המחיקה לא הצליחה. אנא נסה שוב.');
                }
            } catch (error) {
                showResult('שגיאה', 'אירעה שגיאה בלתי צפויה בעת מחיקת היום.');
            }
        };
        performDelete();
    };

    useEffect(() => {
        dispatch(fetchAllDays());
        if (selectedCourse?.courseId) {
            dispatch(fetchDaysForCourseByCourseId(selectedCourse.courseId));
            dispatch(fetchAllTopicForCourseByCourseId(selectedCourse.courseId));
        }
    }, [dispatch, selectedCourse?.courseId]);

    const isSaveDisabled = (data, isNew) => {
        const { isValid } = validateDayFields(data, isNew);
        return !isValid;
    };

    const renderDayTextField = (data, isEditable, isNew = false) => {
        const valueForDayField = isEditable || isNew ? data.dayId || '' : data.dayName || '';
        const inputPropsDirection = isEditable || isNew ? { sx: { ...commonInputPropsSx, direction: 'ltr' } } : { readOnly: true, sx: commonInputPropsSx };
        const onChangeHandler = isEditable ? handleTempDayChange : (isNew ? handleNewDayChange : () => { });
        const errorText = fieldErrors.dayId;
        const showError = (isEditable || isNew) && (touchedFields.dayId && !!errorText);
        return (
            <TextField label="יום" name='day' value={valueForDayField} variant="standard"
                onChange={(e) => onChangeHandler('dayId', e.target.value)}
                onBlur={() => handleFieldBlur('dayId')}
                sx={commonTextFieldSx} select={isEditable || isNew}
                SelectProps={(isEditable || isNew) ? {
                    IconComponent: ExpandMoreIcon,
                    sx: { '.MuiSelect-icon': { right: 'unset', left: '0px' },
                        '.MuiSelect-select': { padding: '4.5px 2px !important', },
                    },
                } : undefined}
                InputProps={inputPropsDirection}
                InputLabelProps={{ ...commonInputLabelPropsSx, shrink: isEditable || isNew || !!valueForDayField }}
                error={showError} helperText={showError ? errorText : ''}>
                {(isEditable || isNew) && allDays?.map(d => (
                    <MenuItem key={d?.dayId} value={d?.dayId} sx={{ fontFamily: 'Rubik' }}>
                        {d?.descr}
                    </MenuItem>
                ))}
            </TextField>
        );
    };

    const renderTimeTextField = (label, name, value, onChangeHandler, isEditable, isNew = false) => {
        const errorText = isEditable ? fieldErrors[name] : (isNew ? fieldErrors[name] : '');
        const showError = (isEditable || isNew) && (touchedFields[name] && !!errorText);
        const currentInputProps = { readOnly: !isEditable && !isNew, sx: commonInputPropsSx };
        return (
            <TextField label={label} type='time' name={name} variant='standard' value={value || ''}
                onChange={(e) => onChangeHandler(name, e.target.value)}
                onBlur={() => handleFieldBlur(name)}
                InputProps={currentInputProps} sx={commonTextFieldSx}
                InputLabelProps={{
                    shrink: true,
                    ...commonInputLabelPropsSx
                }}
                error={showError} helperText={showError ? errorText : ''} />
        );
    };

    return (
        <Box boxShadow={'0px 0px 4px 0px #DCE2ECCC'} bgcolor={'#FFFFFF'} p={'20px 30px 25px 30px'} borderRadius={'10px'}>
            <Box display={'flex'} justifyContent={'space-between'}>
                <Typography fontFamily={'Rubik'} fontWeight={'500'} fontSize={'18px'} mb={'10px'}>שיבוץ במערכת</Typography>
            </Box>
            <Box component={'form'}>
                {daysForCourse.length === 0 && !addDay ? (
                    <Typography fontSize={'14px'} fontFamily={'Rubik'} pb={'10px'}>עדיין לא נקבעו ימים לקורס זה</Typography>
                ) : (
                    daysForCourse?.map(day => (
                        <Box key={day?.daysForCourseId} display="flex" alignItems="center" mb={'15px'}>
                            {editingDayId === day.daysForCourseId ? (
                                <>{renderDayTextField(tempDayData, true)}
                                    {renderTimeTextField('שעת התחלה', 'startTime', tempDayData.startTime, handleTempDayChange, true)}
                                    {renderTimeTextField('שעת סיום', 'endTime', tempDayData.endTime, handleTempDayChange, true)}
                                    <Button variant="outlined" sx={{ borderRadius: '50px', px: '24px', fontFamily: 'Rubik', ml: '10px' }} onClick={handleCancelDayEdit}>ביטול</Button>
                                    <Button variant="contained" sx={{ borderRadius: '50px', px: '24px', fontFamily: 'Rubik', mr: '15px' }}
                                        onClick={() => saveIndividualDay(tempDayData, false, false)}
                                        disabled={isSaveDisabled(tempDayData, false)} >שמירה</Button>
                                </>
                            ) : (
                                <>{renderDayTextField(day, false)}
                                    {renderTimeTextField('שעת התחלה', 'startTime', day.startTime, () => { }, false)}
                                    {renderTimeTextField('שעת סיום', 'endTime', day.endTime, () => { }, false)}
                                    {(user.userTypeId <= 2 || selectedCourse?.coordinatorId === user?.userId) && (
                                        <Box>
                                            <IconButton sx={{ bgcolor: '#F4F4F4', p:'3px' }} onClick={() => handleDeleteDay(day.daysForCourseId)}>
                                                <Box component="img" src={deleteSvg} alt="delete_icon" sx={{ width: 20, height: 20, display: 'block', m: "0px" }} />
                                            </IconButton>
                                            <IconButton sx={{ bgcolor: '#F4F4F4', mr: '5px', p:'3px' }} onClick={() => handleEditDay(day)}>
                                                <Box component="img" src={editSvg} alt="edit_icon" sx={{ width: 20, height: 20, display: 'block', m: "0px" }} />
                                            </IconButton>
                                        </Box>
                                    )}
                                </>
                            )}
                        </Box>
                    ))
                )}
                {addDay && (
                    <Box display={'flex'} alignItems="center" mb={'15px'}>
                        {renderDayTextField(newDayForm, false, true)}
                        {renderTimeTextField('שעת התחלה', 'startTime', newDayForm.startTime, handleNewDayChange, false, true)}
                        {renderTimeTextField('שעת סיום', 'endTime', newDayForm.endTime, handleNewDayChange, false, true)}
                        <Button variant="outlined" sx={{ borderRadius: '50px', px: '24px', fontFamily: 'Rubik', ml: '10px' }}
                            onClick={() => {
                                setAddDay(false); setNewDayForm({ dayId: '', startTime: '', endTime: '' });
                                setFieldErrors({ dayId: '', startTime: '', endTime: '' });
                            }} >ביטול</Button>
                        <Button variant="contained" onClick={handleAddNewDay}
                            sx={{ borderRadius: '50px', px: '24px', fontFamily: 'Rubik', mr: '15px' }}
                            disabled={isSaveDisabled(newDayForm, true)} >שמירה</Button>
                    </Box>
                )}
                {(user.userTypeId <= 2 || selectedCourse?.coordinatorId === user?.userId) && !addDay && !editingDayId &&
                    <Button sx={{ px: '4px', height: '20px' }} color='#393939'
                        onClick={() => { setAddDay(true); setEditingDayId(null); setFieldErrors({ dayId: '', startTime: '', endTime: '' }); setNewDayForm({ dayId: '', startTime: '', endTime: '' }); }}>
                        <Box component="img" src={addSvg} alt="add_icon" sx={{ height: '12px', width: '12px', display: 'block', m: "0px", verticalAlign: 'middle' }} />
                        <Typography fontSize={'14px'} fontFamily={'Rubik'} display={'inline'} mr={'10px'}>הוספת יום</Typography>
                    </Button>}
            </Box>
        </Box>
    );
}

export default CourseDaysManager