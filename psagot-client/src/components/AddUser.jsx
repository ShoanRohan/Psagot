// AddUser.jsx
import React, { useState } from "react";
import {
    Button, Dialog, DialogActions, DialogContent, DialogTitle,
    FormControl, FormHelperText, TextField, MenuItem,
    FormControlLabel, Checkbox
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useDispatch, useSelector } from "react-redux";
import { addUserAction } from "../features/user/userAction";

const buttonStyles = {
    height: "44px",
    padding: "0px 20px",
    gap: "8px",
    borderRadius: "50px",
    boxShadow: "none",
    fontFamily: "Rubik",
    fontWeight: 400,
    fontSize: "16px",
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

const sharedDialogFieldStyles = {
    textAlign: "right",
    direction: "rtl",
    "& .MuiInputLabel-root": {
        right: "0",
        transformOrigin: "top right",
        left: "unset",
    },
    "& .MuiInputBase-root": {
        height: "43px",
    },
    "& .MuiInputBase-root .MuiSelect-select": {
        paddingRight: "32px !important",
        paddingLeft: "14px",
    },
    "& .MuiInputBase-root .MuiSelect-icon": {
        left: "12px",
        right: "unset",
    },
};

const AddUser = () => {
    const dispatch = useDispatch();
    const { userTypes } = useSelector((state) => state.userType);

    const [dialogOpen, setDialogOpen] = useState(false);
    const [formValues, setFormValues] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        userTypeName: "",
        isActive: true,
    });
    const [formErrors, setFormErrors] = useState({});

    const handleOpen = () => {
        setFormValues({
            name: "",
            email: "",
            phone: "",
            password: "",
            userTypeName: "",
            isActive: true,
        });
        setFormErrors({});
        setDialogOpen(true);
    };

    const handleClose = () => setDialogOpen(false);

    const validateField = (name, value) => {
        let error = "";
        switch (name) {
            case "name":
                if (!value.trim()) error = "שדה חובה";
                else if (value.trim().length < 2) error = "לפחות 2 תווים";
                else if (!/^[א-תA-Za-z\s]+$/.test(value)) error = "אותיות ורווחים בלבד";
                break;
            case "email":
                const trimmedEmail = value.trim();
                if (!trimmedEmail) error = "שדה חובה";
                else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(trimmedEmail)) error = "מייל לא תקין";
                break;
            case "phone":
                const cleanPhone = value.replace(/\D/g, '');
                if (!value.trim()) {
                    error = "טלפון הוא שדה חובה";
                } else if (cleanPhone.length !== 10) {
                    error = "מספר טלפון לא תקין (10 ספרות בלבד)";
                }
                break;
            case "password":
                if (!value.trim()) error = "שדה חובה";
                else if (value.trim().length < 6) error = "לפחות 6 תווים";
                break;
            case "userTypeName":
                if (!value) error = "יש לבחור הרשאה";
                break;
            default:
                break;
        }
        return error;
    };

    const handleChange = (e) => {
        const { name, value, checked, type } = e.target;
        const newValue = type === 'checkbox' ? checked : value;

        setFormValues((prev) => ({ ...prev, [name]: newValue }));
        setFormErrors((prev) => ({ ...prev, [name]: validateField(name, newValue) }));
    };

    const validateAll = () => {
        const errors = {};
        let valid = true;
        for (const [name, value] of Object.entries(formValues)) {
            const error = validateField(name, value);
            if (error) {
                errors[name] = error;
                valid = false;
            }
        }
        setFormErrors(errors);
        return valid;
    };

    const handleSave = () => {
        if (!validateAll()) return;

        const userType = userTypes.find(u => u.name === formValues.userTypeName);
        const userTypeId = userType ? userType.userTypeId : null;

        const userToSend = { ...formValues, userTypeId };
        dispatch(addUserAction(userToSend));
        handleClose();
    };

    return (
        <>
            <Button onClick={handleOpen} variant="contained" sx={buttonStyles} startIcon={<AddCircleOutlineIcon />}>
                הוספת משתמש
            </Button>
            <Dialog open={dialogOpen} onClose={handleClose}>
                <DialogTitle sx={{ direction: 'rtl' }}>הוספת משתמש חדש</DialogTitle>
                <DialogContent
                    sx={{
                        direction: 'rtl',
                        padding: '20px 30px',
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: '24px 16px',
                    }}
                >
                    {[
                        { name: 'name', label: 'שם' },
                        { name: 'email', label: 'מייל' },
                        { name: 'phone', label: 'טלפון' },
                        { name: 'password', label: 'סיסמה', type: 'password' }
                    ].map(({ name, label, type }) => (
                        <FormControl key={name} variant="standard" sx={sharedDialogFieldStyles} error={!!formErrors[name]}>
                            <TextField
                                name={name}
                                label={label}
                                value={formValues[name]}
                                onChange={handleChange}
                                variant="standard"
                                type={type || 'text'}
                                fullWidth
                                error={!!formErrors[name]}
                            />
                            <FormHelperText>{formErrors[name]}</FormHelperText>
                        </FormControl>
                    ))}

                    <FormControl variant="standard" sx={sharedDialogFieldStyles} error={!!formErrors.userTypeName}>
                        <TextField
                            name="userTypeName"
                            select
                            label="הרשאה"
                            value={formValues.userTypeName}
                            onChange={handleChange}
                            variant="standard"
                            fullWidth
                        >
                            <MenuItem value=""><em>בחר הרשאה</em></MenuItem>
                            {userTypes.map((ut) => (
                                <MenuItem key={ut.userTypeId} value={ut.name}>{ut.name}</MenuItem>
                            ))}
                        </TextField>
                        <FormHelperText>{formErrors.userTypeName}</FormHelperText>
                    </FormControl>

                    <FormControl sx={{ ...sharedDialogFieldStyles, alignItems: 'flex-end', justifyContent: 'center' }}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={formValues.isActive}
                                    onChange={handleChange}
                                    name="isActive"
                                    color="primary"
                                />
                            }
                            label="פעיל"
                            labelPlacement="end"
                            sx={{
                                flexDirection: 'row-reverse',
                                marginLeft: 'auto',
                                '& .MuiTypography-root': {
                                    fontFamily: "Rubik",
                                    fontSize: "16px",
                                    color: "#344054",
                                },
                            }}
                        />
                    </FormControl>
                </DialogContent>
                <DialogActions sx={{ justifyContent: 'center', pb: 2 }}>
                    {/* כפתור שמור מצד ימין */}
                    <Button onClick={handleSave} variant="contained" sx={{ backgroundColor: '#326DEF', color: 'white' }}>שמור</Button>
                    <Button onClick={handleClose} variant="outlined">ביטול</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default AddUser;
