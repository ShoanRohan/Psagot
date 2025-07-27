import React, { useState } from 'react';
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Checkbox,
    ListItemText,
    Typography,
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { addRoomAction } from '../features/room/roomActions';

const buttonStyles = {
    height: "44px",
    padding: "0px 20px",
    gap: "8px",
    borderRadius: "50px",
    boxShadow: "none",
    fontFamily: "Rubik",
    fontWeight: 400,
    fontSize: "16px",
    lineHeight: "18.96px",
    backgroundColor: "#326DEF",
    color: "white",
    "&:hover": {
        backgroundColor: "#2857C4",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
    },
    "&:active": {
        backgroundColor: "#234E9D",
        boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.3)",
    },
};

const popupButtonStyles = {
    minWidth: "100px",
    height: "40px",
    borderRadius: "50px",
    boxShadow: "none",
    fontFamily: "Rubik",
    fontWeight: 400,
    fontSize: "16px",
    textTransform: "none",
};

const sharedDialogFieldStyles = {
    textAlign: "right",
    direction: "rtl",
    "& .MuiInputLabel-root": {
        right: "0",
        transformOrigin: "top right",
        left: "unset",
        fontFamily: "Rubik",
    },
    "& .MuiInputBase-root": {
        height: "43px",
        fontFamily: "Rubik",
    },
    "& .MuiSelect-select": {
        paddingRight: "32px !important",
        paddingLeft: "14px",
    },
    "& .MuiSelect-icon": {
        left: "12px",
        right: "unset",
    },
};

const addRoomValidationSchema = yup.object({
    name: yup
        .string()
        .required('שם חדר הוא שדה חובה')
        .max(50, 'שם חדר ארוך מדי (מקסימום 50 תווים)'),
    // שדה roomId נשאר בטופס אך לא חובה כי לא נשלח
    capacity: yup
        .number()
        .required('מספר מקומות הוא שדה חובה')
        .min(1, 'מספר מקומות חייב להיות לפחות 1')
        .max(200, 'מספר מקומות מקסימלי הוא 200')
        .typeError('מספר מקומות חייב להיות מספר'),
    equipment: yup
        .array()
        .of(yup.string()),
});

const AddRoomButton = ({ onShowSnackbar }) => {
    const dispatch = useDispatch();
    const [openAddRoomPopup, setOpenAddRoomPopup] = useState(false);

    const formik = useFormik({
        initialValues: {
            name: "",
            roomId: "", // נשאר כאן רק כדי להציג אותו אבל לא נשתמש בו
            capacity: "",
            equipment: [],
        },
        validationSchema: addRoomValidationSchema,
        validateOnChange: true,
        onSubmit: async (values) => {
            try {
                // יוצרים את האובייקט לשרת בלי roomId
                const roomToSend = {
                    name: values.name,
                    capacity: parseInt(values.capacity),
                    projector: values.equipment.includes("מקרן"),
                    speakers: values.equipment.includes("רמקולים"),
                    computers: values.equipment.includes("מחשבים"),
                };

                await dispatch(addRoomAction(roomToSend)).unwrap();

                handleCloseAddRoomPopup();
                if (onShowSnackbar) {
                    onShowSnackbar("חדר נוסף בהצלחה!", "success");
                }
            } catch (error) {
                console.error("Error adding room:", error);
                if (onShowSnackbar) {
                    onShowSnackbar(
                        "שגיאה בהוספת חדר: " +
                        (error.message || "אנא נסה שוב מאוחר יותר."),
                        "error"
                    );
                }
            }
        },
    });

    const handleOpenAddRoomPopup = () => {
        formik.resetForm();
        setOpenAddRoomPopup(true);
    };

    const handleCloseAddRoomPopup = () => {
        setOpenAddRoomPopup(false);
        formik.resetForm();
    };

    return (
        <>
            <Button
                variant="contained"
                sx={buttonStyles}
                startIcon={<AddCircleOutlineIcon />}
                onClick={handleOpenAddRoomPopup}
            >
                הוספת חדר
            </Button>

            <Dialog
                open={openAddRoomPopup}
                onClose={handleCloseAddRoomPopup}
                PaperProps={{
                    sx: {
                        maxWidth: '450px',
                        width: 'calc(100% - 64px)',
                        height: 'auto',
                        borderRadius: '10px',
                        margin: 'auto',
                        fontFamily: "Rubik",
                        direction: "rtl",
                        textAlign: "right",
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                    }
                }}
            >
                <DialogTitle sx={{
                    textAlign: "right",
                    direction: "rtl",
                    fontFamily: "Rubik, sans-serif",
                    fontWeight: 700,
                    fontSize: "24px",
                    color: "#0D1783",
                    padding: "20px 30px 0px 30px",
                }}>
                    הוספת חדר
                </DialogTitle>
                <DialogContent sx={{
                    direction: "rtl",
                    padding: "20px 30px 20px 30px",
                    overflowY: 'unset',
                }}>
                    <form
                        onSubmit={formik.handleSubmit}
                        style={{ display: "flex", flexDirection: "column", gap: 20 }}
                        noValidate
                        autoComplete="off"
                    >
                        <div style={{ display: "flex", gap: 16, flexDirection: "row", flexWrap: "wrap" }}>
                            <FormControl variant="standard" sx={sharedDialogFieldStyles} style={{ flex: 1, minWidth: 150 }}>
                                <TextField
                                    id="name"
                                    name="name"
                                    label="שם חדר"
                                    type="text"
                                    variant="standard"
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    fullWidth
                                    InputLabelProps={{ shrink: true }}
                                    error={formik.touched.name && Boolean(formik.errors.name)}
                                    helperText={formik.touched.name && formik.errors.name}
                                />
                            </FormControl>

                            <FormControl variant="standard" sx={sharedDialogFieldStyles} style={{ flex: 1, minWidth: 150 }}>
                                <TextField
                                    id="roomId"
                                    name="roomId"
                                    label="מספר חדר"
                                    type="text"
                                    variant="standard"
                                    value={formik.values.roomId}
                                    disabled // שדה לא ניתן לעריכה
                                    fullWidth
                                    InputLabelProps={{ shrink: true }}
                                />
                            </FormControl>
                        </div>

                        <div style={{ display: "flex", gap: 16, flexDirection: "row", flexWrap: "wrap" }}>
                            <FormControl variant="standard" sx={sharedDialogFieldStyles} style={{ flex: 1, minWidth: 150 }}>
                                <TextField
                                    id="capacity"
                                    name="capacity"
                                    label="מספר מקומות"
                                    type="number"
                                    variant="standard"
                                    value={formik.values.capacity}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    fullWidth
                                    InputLabelProps={{ shrink: true }}
                                    error={formik.touched.capacity && Boolean(formik.errors.capacity)}
                                    helperText={formik.touched.capacity && formik.errors.capacity}
                                />
                            </FormControl>

                            <FormControl
                                variant="standard"
                                sx={sharedDialogFieldStyles}
                                style={{ flex: 1, minWidth: 150 }}
                                error={formik.touched.equipment && Boolean(formik.errors.equipment)}
                            >
                                <InputLabel id="equipment-label" shrink>
                                    ציוד
                                </InputLabel>
                                <Select
                                    labelId="equipment-label"
                                    id="equipment"
                                    name="equipment"
                                    multiple
                                    value={formik.values.equipment}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    label="ציוד"
                                    variant="standard"
                                    renderValue={(selected) => selected.join(', ')}
                                    MenuProps={{
                                        PaperProps: {
                                            sx: {
                                                fontFamily: "Rubik",
                                                direction: "rtl",
                                                textAlign: "right",
                                            },
                                        },
                                    }}
                                >
                                    {['מקרן', 'רמקולים', 'מחשבים'].map((option) => (
                                        <MenuItem key={option} value={option} sx={{ fontFamily: "Rubik", textAlign: "right" }}>
                                            <Checkbox checked={formik.values.equipment.includes(option)} />
                                            <ListItemText primary={option} sx={{ textAlign: "right" }} />
                                        </MenuItem>
                                    ))}
                                </Select>
                                {formik.touched.equipment && formik.errors.equipment && (
                                    <Typography variant="caption" color="error" sx={{ textAlign: "right", direction: "rtl", mt: 0.5 }}>
                                        {formik.errors.equipment}
                                    </Typography>
                                )}
                            </FormControl>
                        </div>
                    </form>
                </DialogContent>
                <DialogActions sx={{ justifyContent: "center", paddingBottom: "20px", paddingTop: "0px" }}>
                    <Button
                        onClick={handleCloseAddRoomPopup}
                        variant="outlined"
                        sx={{
                            ...popupButtonStyles,
                            borderColor: "#D0D5DD",
                            color: "#344054",
                            "&:hover": {
                                borderColor: "#D0D5DD",
                                backgroundColor: "#F9FAFB",
                            },
                            "&:active": {
                                backgroundColor: "#EDEFF3",
                                boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.3)",
                            },
                        }}
                    >
                        ביטול
                    </Button>
                    <Button
                        type="submit"
                        onClick={formik.handleSubmit}
                        variant="contained"
                        sx={{
                            ...popupButtonStyles,
                            backgroundColor: "#326DEF",
                            color: "white",
                            "&:hover": {
                                backgroundColor: "#2857C4",
                                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                            },
                            "&:active": {
                                backgroundColor: "#234E9D",
                                boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.3)",
                            },
                        }}
                    >
                        הוסף
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default AddRoomButton;
