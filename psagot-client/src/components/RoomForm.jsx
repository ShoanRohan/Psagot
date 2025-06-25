import React, { useEffect, useState } from 'react';
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    TextField, Button, Box, FormControl, InputLabel,
    Select, MenuItem, IconButton, Typography
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRoomById } from '../features/room/roomActions';
import { setSelectedRoom } from '../features/room/roomSlice';

const equipmentOptions = [
    { value: 'projector', label: 'מקרן' },
    { value: 'computers', label: 'מחשבים' },
    { value: 'speakers', label: 'רמקולים' },
];

const RoomForm = ({ isEdit, initialData, onSave, open, onClose, userRole }) => {
    const dispatch = useDispatch();
    const room = useSelector(state => state.room.selectedRoom);
    const loading = useSelector(state => state.room?.loading || false);
    const canEdit = ['manager', 'secretary'].includes(userRole);

    const initialFormData = {
        name: '',
        capacity: '',
        equipment: [],
    };

    const [formData, setFormData] = useState(() => ({
        name: initialData?.name || '',
        capacity: initialData?.capacity || '',
        equipment: Array.isArray(initialData?.equipment) ? initialData.equipment : [],
    }));

    const [errors, setErrors] = useState({});
    const [changed, setChanged] = useState(false);

    useEffect(() => {
        if (open && isEdit && initialData?.roomId) {
            dispatch(fetchRoomById(initialData.roomId));
        }
    }, [open, isEdit, initialData?.roomId, dispatch]);

    useEffect(() => {
        if (room && open && isEdit) {
            setFormData({
                name: room.name ?? '',
                capacity: room.capacity ? String(room.capacity) : '',
                equipment: [
                    room.projector ? 'projector' : null,
                    room.computers ? 'computers' : null,
                    room.speakers ? 'speakers' : null,
                ].filter(Boolean),
            });
            setErrors({});
            setChanged(false);
        } else if (!isEdit && open) {
            setFormData(initialFormData);
            setErrors({});
            setChanged(false);
        }
    }, [room, open, isEdit]);

    const handleClose = () => {
        setFormData(initialFormData);
        setErrors({});
        setChanged(false);
        setSelectedRoom();
        onClose();
    };

    const validate = () => {
        const errs = {};
        if (!formData.name.trim()) errs.name = 'שדה חובה';
        if (!formData.capacity || isNaN(Number(formData.capacity))) errs.capacity = 'יש להזין מספר תקין';
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handleChange = (field) => (e) => {
        const value = e.target.value;
        setFormData(prev => ({ ...prev, [field]: value }));
        setChanged(true);
    };

    const handleEquipmentChange = (e) => {
        const { value } = e.target;
        setFormData(prev => ({
            ...prev,
            equipment: typeof value === 'string' ? value.split(',') : value,
        }));
        setChanged(true);
    };

    const handleSubmit = async () => {
        if (!validate()) return;

        const isUpdating = isEdit && initialData;
        const dataToSend = {
            RoomId: isUpdating ? Number(initialData.roomId) : 0,
            Name: formData.name.trim(),
            Capacity: Number(formData.capacity),
            Projector: formData.equipment.includes('projector'),
            Computers: formData.equipment.includes('computers'),
            Speakers: formData.equipment.includes('speakers'),
        };

        const url = isUpdating
            ? 'https://localhost:44333/api/Room/UpdatrRoom'
            : 'https://localhost:44333/api/Room/AddRoom';

        const method = isUpdating ? 'PUT' : 'POST';

        try {
            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dataToSend),
            });
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || 'שגיאה לא ידועה');
            }
            alert('שמירה הושלמה בהצלחה');
            onSave(dataToSend);
            setChanged(false);
            handleClose();
        } catch (err) {
            alert('שמירה נכשלה: ' + err.message);
        }
    };

    if (loading) {
        return (
            <Dialog open={open} onClose={handleClose} maxWidth={false} dir="rtl"
                PaperProps={{
                    sx: {
                        width: 504,
                        height: 339,
                        p: 3,
                        borderRadius: 2,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        boxSizing: 'border-box',
                    }
                }} />);
    }

    return (
        <Dialog open={open} onClose={handleClose} maxWidth={false} dir="rtl"
            PaperProps={{
                sx: {
                    width: 504,
                    height: 339,
                    p: 3,
                    borderRadius: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxSizing: 'border-box',
                    position: 'relative',
                }
            }}
        >
            <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                    position: 'absolute',
                    left: 8,
                    top: 8,
                    color: 'grey.500',
                }}
            />


            <DialogContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 1, pt: 0 }}>
                <Typography variant="h6" sx={{ textAlign: 'right', fontWeight: 'bold', mb: 1 }}>
                    {isEdit ? 'עריכת חדר' : 'הוספת חדר'}
                </Typography>

                <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>

                    <TextField
                        label="שם חדר"
                        value={formData.name}
                        onChange={handleChange('name')}
                        error={!!errors.name}
                        helperText={errors.name}
                        variant="standard"
                        size="small"
                        inputProps={{ style: { textAlign: 'right', fontSize: '1rem', color: '#222' } }}
                        InputLabelProps={{ sx: { right: 0, left: 'unset', fontSize: '1rem' } }}
                        disabled={!canEdit}
                        sx={{ width: 200, height: 45 }}
                    />
                    <TextField
                        label="מספר חדר"
                        value={isEdit ? initialData?.roomId : ''}
                        placeholder={!isEdit ? 'מספר חדר' : ''}
                        disabled
                        variant="standard"
                        size="small"
                        inputProps={{ style: { textAlign: 'right', fontSize: '1rem', color: '#222' } }}
                        InputLabelProps={{ sx: { right: 0, left: 'unset', fontSize: '1rem' } }}
                        sx={{ width: 200, height: 45 }}
                    />
                </Box>

                <Box sx={{ display: 'flex', gap: 2 }}>
                    <TextField
                        label="מספר מקומות"
                        value={formData.capacity}
                        onChange={handleChange('capacity')}
                        error={!!errors.capacity}
                        helperText={errors.capacity}
                        variant="standard"
                        size="small"
                        inputProps={{ style: { textAlign: 'right', fontSize: '1rem', color: '#222' } }}
                        InputLabelProps={{ sx: { right: 0, left: 'unset', fontSize: '1rem' } }}
                        disabled={!canEdit}
                        sx={{ width: 200, height: 45 }}
                    />
                    <FormControl variant="standard" size="small" sx={{ width: 200, height: 45 }}>
                        <InputLabel sx={{ right: 0, left: 'unset', fontSize: '1rem' }}>ציוד</InputLabel>
                        <Select
                            multiple
                            value={Array.isArray(formData.equipment) ? formData.equipment : []}
                            onChange={handleEquipmentChange}
                            IconComponent={KeyboardArrowDownIcon}
                            sx={{
                                textAlign: 'right',
                                fontSize: '1rem',
                                '& .MuiSelect-icon': {
                                    left: 8,
                                    right: 'unset',
                                },
                            }}
                            renderValue={(selected) =>
                                selected.map(val => equipmentOptions.find(opt => opt.value === val)?.label).join(', ')
                            }
                            disabled={!canEdit}
                        >
                            {equipmentOptions.map(option => (
                                <MenuItem key={option.value} value={option.value} sx={{ textAlign: 'right', fontSize: '1rem' }}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
            </DialogContent>

            <DialogActions sx={{ justifyContent: 'center', gap: 2, mt: 3 }}>
                <Button variant="outlined" onClick={handleClose} sx={{ minWidth: 80, height: 40, fontSize: '0.875rem', borderRadius: '30px', paddingX: 2 }}>
                    ביטול
                </Button>
                {canEdit && (
                    <Button variant="contained" onClick={handleSubmit} sx={{ minWidth: 80, height: 40, fontSize: '0.875rem', borderRadius: '30px', paddingX: 2 }}>
                        שמור
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    );
};

export default RoomForm;