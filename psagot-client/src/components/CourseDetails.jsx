import React from 'react';
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

const CourseDetails = ({ course, setCourse }) => {
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 25 }, (_, i) => currentYear - 20 + i);

    const handleChange = (field, value) => {
        setCourse((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    if (!course) return null; // למנוע קריסה לפני שהנתונים נטענו

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
                            value={course.name || ''}
                            onChange={(e) => handleChange('name', e.target.value)}
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
                            label="רכזת"
                            variant="standard"
                            value={course.coordinator?.name || ''}
                            InputProps={{ readOnly: true }}
                            inputProps={{
                                dir: 'rtl',
                                style: { textAlign: 'right', fontSize: '14px' },
                            }}
                            InputLabelProps={{
                                sx: { right: 0, left: 'unset', fontSize: '14px' },
                            }}
                        />
                    </Box>

                    {/* קבוצה 2 */}
                    <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                        <FormControl fullWidth variant="standard" sx={{ direction: 'rtl' }}>
                            <InputLabel sx={{ right: 0, left: 'unset', fontSize: '14px' }}>
                                שנה
                            </InputLabel>
                            <Select
                                value={course.year || ''}
                                onChange={(e) => handleChange('year', e.target.value)}
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
                        </FormControl>

                        <TextField
                            fullWidth
                            label="תאריך התחלה"
                            variant="standard"
                            type="date"
                            value={course.startDate || ''}
                            onChange={(e) => handleChange('startDate', e.target.value)}
                            InputLabelProps={{
                                shrink: true,
                                sx: { right: 0, left: 'unset', fontSize: '14px' },
                            }}
                            inputProps={{
                                dir: 'rtl',
                                style: { textAlign: 'right', fontSize: '14px' },
                            }}
                        />

                        <TextField
                            fullWidth
                            label="תאריך סיום"
                            variant="standard"
                            type="date"
                            value={course.endDate || ''}
                            onChange={(e) => handleChange('endDate', e.target.value)}
                            InputLabelProps={{
                                shrink: true,
                                sx: { right: 0, left: 'unset', fontSize: '14px' },
                            }}
                            inputProps={{
                                dir: 'rtl',
                                style: { textAlign: 'right', fontSize: '14px' },
                            }}
                        />
                    </Box>

                    {/* קבוצה 3 */}
                    <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                        <TextField
                            fullWidth
                            label="מספר תלמידים"
                            variant="standard"
                            type="number"
                            value={course.numberOfStudents || ''}
                            onChange={(e) => handleChange('numberOfStudents', e.target.value)}
                            sx={{ width: '30%' }}
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
                            label="מספר מפגשים"
                            variant="standard"
                            type="number"
                            value={course.numberOfMeetings || ''}
                            onChange={(e) => handleChange('numberOfMeetings', e.target.value)}
                            sx={{ width: '30%' }}
                            inputProps={{
                                dir: 'rtl',
                                style: { textAlign: 'right', fontSize: '14px' },
                            }}
                            InputLabelProps={{
                                sx: { right: 0, left: 'unset', fontSize: '14px' },
                            }}
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
                            value={course.notes || ''}
                            onChange={(e) => handleChange('notes', e.target.value)}
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
                        <FormControl fullWidth variant="standard" sx={{ direction: 'rtl', width: '30%' }}>
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
                                value={course.statusId || ''}
                                onChange={(e) => handleChange('statusId', e.target.value)}
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
                                value={course.color || '#000000'}
                                onChange={(e) => handleChange('color', e.target.value)}
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
