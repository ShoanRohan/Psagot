import {
    Box,
    TextField,
    MenuItem,
    Typography,
    Select,
    FormControl,
    InputLabel,
    Paper,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCoordinators } from '../features/user/userAction';

const CourseDetails = ({ course, setCourse }) => {
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 25 }, (_, i) => currentYear - 20 + i);

    // סטייט לשמירת שגיאות
    const [errors, setErrors] = useState({});

    // פונקציית ולידציה לשדה ספציפי
    const validateField = (name, value) => {
        if (!value) return 'שדה חובה';
        if ((name === 'numberOfStudents' || name === 'numberOfMeetings') && Number(value) > 100) {
            return 'מקסימום 100';
        }
        return '';
    };

    // עדכון ערכים ושגיאות בשינוי שדה
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCourse((prev) => ({
            ...prev,
            [name]: name === 'coordinatorId' && value ? Number(value) : value,
        }));
        setErrors((prev) => ({
            ...prev,
            [name]: validateField(name, value),
        }));
    };

    const dispatch = useDispatch();
    const coordinators = useSelector((state) => state.user.coordinators || []);

    useEffect(() => {
        dispatch(fetchCoordinators());
    }, [dispatch]);

    if (!course) return null;

    return (
        <Paper
            elevation={0}
            sx={{
                backgroundColor: 'white',
                borderRadius: '10px',
                p: 2,
                width: '95%',
                height: '350px',
                mx: 'auto',
            }}
        >
            <Box sx={{ width: '100%' }}>
                <Box sx={{ maxWidth: '500px', ml: 'auto' }}>
                    <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: 'bold', mb: 1, fontSize: '18px' }}
                    >
                        פרטים טכניים
                    </Typography>

                    {/* קבוצה 1 */}
                    <Box sx={{ display: 'flex', mb: 1, gap: 1 }}>
                        <TextField
                            fullWidth
                            label="קוד קורס"
                            variant="standard"
                            value={course.courseId || ''}
                            InputProps={{ readOnly: true }}
                            inputProps={{
                                dir: 'rtl',
                                style: { textAlign: 'right', fontSize: '14px' },
                            }}
                            InputLabelProps={{
                                sx: { right: 0, left: 'unset', fontSize: '14px' },
                            }}
                        />
                        <TextField
                            fullWidth
                            label="שם קורס"
                            variant="standard"
                            name="name"
                            value={course.name || ''}
                            onChange={handleChange}
                            error={!!errors.name}
                            helperText={errors.name || ''}
                            inputProps={{
                                dir: 'rtl',
                                style: { textAlign: 'right', fontSize: '14px' },
                            }}
                            InputLabelProps={{
                                sx: { right: 0, left: 'unset', fontSize: '14px' },
                            }}
                        />
                        <FormControl
                            fullWidth
                            variant="standard"
                            sx={{ direction: 'rtl' }}
                            error={!!errors.coordinatorId}
                        >
                            <InputLabel sx={{ right: 0, left: 'unset', fontSize: '14px' }}>
                                רכזת
                            </InputLabel>
                            <Select
                                name="coordinatorId"
                                value={course.coordinatorId || ''}
                                onChange={handleChange}
                                inputProps={{ dir: 'rtl', style: { fontSize: '14px' } }}
                                sx={{
                                    textAlign: 'right',
                                    '& .MuiSelect-icon': { left: 7, right: 'unset' },
                                }}
                            >
                                {coordinators.map((coordinator) => (
                                    <MenuItem
                                        key={coordinator.userId}
                                        value={coordinator.userId}
                                        sx={{ fontSize: '13px' }}
                                    >
                                        {coordinator.name}
                                    </MenuItem>
                                ))}
                            </Select>
                            {errors.coordinatorId && (
                                <Typography variant="caption" color="error" sx={{ mt: 0.5 }}>
                                    {errors.coordinatorId}
                                </Typography>
                            )}
                        </FormControl>
                    </Box>

                    {/* קבוצה 2 */}
                    <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                        <FormControl fullWidth variant="standard" sx={{ direction: 'rtl' }} error={!!errors.year}>
                            <InputLabel sx={{ right: 0, left: 'unset', fontSize: '14px' }}>
                                שנה
                            </InputLabel>
                            <Select
                                name="year"
                                value={course.year || ''}
                                onChange={handleChange}
                                inputProps={{ dir: 'rtl', style: { fontSize: '14px' } }}
                                sx={{
                                    textAlign: 'right',
                                    '& .MuiSelect-icon': { left: 7, right: 'unset' },
                                }}
                            >
                                {years.map((year) => (
                                    <MenuItem key={year} value={year} sx={{ fontSize: '13px' }}>
                                        {year}
                                    </MenuItem>
                                ))}
                            </Select>
                            {errors.year && (
                                <Typography variant="caption" color="error" sx={{ mt: 0.5 }}>
                                    {errors.year}
                                </Typography>
                            )}
                        </FormControl>

                        <TextField
                            fullWidth
                            label="תאריך התחלה"
                            variant="standard"
                            type="date"
                            name="startDate"
                            value={course.startDate || ''}
                            onChange={handleChange}
                            InputLabelProps={{
                                shrink: true,
                                sx: { right: 0, left: 'unset', fontSize: '14px' },
                            }}
                            inputProps={{
                                dir: 'rtl',
                                style: { textAlign: 'right', fontSize: '14px' },
                            }}
                            error={!!errors.startDate}
                            helperText={errors.startDate || ''}
                        />

                        <TextField
                            fullWidth
                            label="תאריך סיום"
                            variant="standard"
                            type="date"
                            name="endDate"
                            value={course.endDate || ''}
                            onChange={handleChange}
                            InputLabelProps={{
                                shrink: true,
                                sx: { right: 0, left: 'unset', fontSize: '14px' },
                            }}
                            inputProps={{
                                dir: 'rtl',
                                style: { textAlign: 'right', fontSize: '14px' },
                            }}
                            error={!!errors.endDate}
                            helperText={errors.endDate || ''}
                        />
                    </Box>

                    {/* קבוצה 3 */}
                    <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                        <TextField
                            fullWidth
                            label="מספר תלמידים"
                            variant="standard"
                            type="number"
                            name="numberOfStudents"
                            value={course.numberOfStudents || ''}
                            onChange={handleChange}
                            sx={{ width: '30%' }}
                            inputProps={{
                                dir: 'rtl',
                                style: { textAlign: 'right', fontSize: '14px' },
                                min: 0,
                                max: 100,
                            }}
                            InputLabelProps={{
                                sx: { right: 0, left: 'unset', fontSize: '14px' },
                            }}
                            error={!!errors.numberOfStudents}
                            helperText={errors.numberOfStudents || ''}
                        />
                        <TextField
                            fullWidth
                            label="מספר מפגשים"
                            variant="standard"
                            type="number"
                            name="numberOfMeetings"
                            value={course.numberOfMeetings || ''}
                            onChange={handleChange}
                            sx={{ width: '30%' }}
                            inputProps={{
                                dir: 'rtl',
                                style: { textAlign: 'right', fontSize: '14px' },
                                min: 0,
                                max: 100,
                            }}
                            InputLabelProps={{
                                sx: { right: 0, left: 'unset', fontSize: '14px' },
                            }}
                            error={!!errors.numberOfMeetings}
                            helperText={errors.numberOfMeetings || ''}
                        />
                    </Box>

                    {/* קבוצה 4 */}
                    <Box sx={{ mb: 1, display: 'flex', gap: 1 }}>
                        <TextField
                            fullWidth
                            multiline
                            minRows={2}
                            label="הערות"
                            variant="standard"
                            name="notes"
                            value={course.notes || ''}
                            onChange={handleChange}
                            sx={{ width: '60%' }}
                            inputProps={{
                                dir: 'rtl',
                                style: { textAlign: 'right', fontSize: '14px' },
                            }}
                            InputLabelProps={{
                                sx: { right: 0, left: 'unset', fontSize: '14px' },
                            }}
                        />
                    </Box>

                    {/* קבוצה 5 */}
                    <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                        <FormControl
                            fullWidth
                            variant="standard"
                            sx={{ direction: 'rtl', width: '30%' }}
                            error={!!errors.statusId}
                        >
                            <InputLabel
                                sx={{
                                    display: 'flex',
                                    right: 0,
                                    left: 'unset',
                                    fontSize: '14px',
                                }}
                            >
                                סטטוס
                            </InputLabel>
                            <Select
                                name="statusId"
                                value={course.statusId || ''}
                                onChange={handleChange}
                                inputProps={{ dir: 'rtl', style: { fontSize: '14px' } }}
                                sx={{
                                    textAlign: 'right',
                                    '& .MuiSelect-icon': {
                                        left: 7,
                                        right: 'unset',
                                    },
                                }}
                            >
                                <MenuItem value={1}>פעיל</MenuItem>
                                <MenuItem value={2}>לא פעיל</MenuItem>
                            </Select>
                            {errors.statusId && (
                                <Typography variant="caption" color="error" sx={{ mt: 0.5 }}>
                                    {errors.statusId}
                                </Typography>
                            )}
                        </FormControl>

                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                                width: '30%',
                            }}
                        >
                            <Typography sx={{ fontSize: '14px' }}>צבע לטבלה</Typography>
                            <input
                                type="color"
                                name="color"
                                value={course.color || '#000000'}
                                onChange={handleChange}
                                style={{
                                    border: 'none',
                                    width: '30px',
                                    height: '30px',
                                    cursor: 'pointer',
                                    background: 'none',
                                }}
                            />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Paper>
    );
};

export default CourseDetails;
