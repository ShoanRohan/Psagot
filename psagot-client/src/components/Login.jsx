import React, { useState, useEffect } from "react";
import {
    Box,
    TextField,
    Button,
    Typography,
    Snackbar,
    Alert,
    InputAdornment,
    IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { registerAction, loginAction } from "../features/user/userAction";
import { useDispatch } from "react-redux";

const getPasswordStrength = (password) => {
    let score = 0;
    if (!password) return { label: "", color: "" };

    if (password.length >= 6) score += 1;
    if (password.length >= 10) score += 1;
    if (/\d/.test(password)) score += 1;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score += 1;
    if (/[\W_]/.test(password)) score += 1;

    switch (score) {
        case 0:
        case 1:
            return { label: "חלשה מאוד", color: "red" };
        case 2:
            return { label: "חלשה", color: "orange" };
        case 3:
        case 4:
            return { label: "בינונית", color: "goldenrod" };
        case 5:
            return { label: "חזקה", color: "green" };
        default:
            return { label: "", color: "" };
    }
};

const LoginRegister = () => {
    const [mode, setMode] = useState("login"); // "login" או "register"
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        name: "",
        phone: "",
    });
    const [errors, setErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);
    const [alert, setAlert] = useState({ open: false, message: "", severity: "info" });
    const [loading, setLoading] = useState(false);

    // ניהול הצגת הסיסמאות בשדות השונים:
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        validateForm();
    }, [formData, mode]);

    const validateForm = () => {
        const newErrors = {};

        if (mode === "login") {
            if (!formData.email.trim()) newErrors.email = "יש להזין מייל";
            else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
                newErrors.email = "מייל לא תקין";

            if (!formData.password) newErrors.password = "יש להזין סיסמה";
        } else {
            if (!formData.name.trim()) newErrors.name = "יש להזין שם";
            if (!formData.email.trim()) newErrors.email = "יש להזין אימייל";
            else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "מייל לא תקין";

            if (!formData.phone.trim()) newErrors.phone = "יש להזין טלפון";
            else if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = "טלפון לא תקין";

            if (!formData.password) newErrors.password = "יש להזין סיסמה";
            else if (formData.password.length < 6) newErrors.password = "סיסמה חייבת לפחות 6 תווים";

            if (!formData.confirmPassword) newErrors.confirmPassword = "נא לאמת סיסמה";
            else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "הסיסמאות לא תואמות";
        }

        setErrors(newErrors);
        setIsFormValid(Object.keys(newErrors).length === 0);
    };

    const showAlert = (message, severity = "info") => {
        setAlert({ open: true, message, severity });
    };

    const handleCloseAlert = () => {
        setAlert({ ...alert, open: false });
    };

    const handleChange = (field) => (e) => {
        setFormData({ ...formData, [field]: e.target.value });
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const toggleShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const login = async () => {
        setLoading(true);

        try {
            const resultAction = await dispatch(loginAction({
                email: formData.email,
                password: formData.password
            }));

            if (loginAction.fulfilled.match(resultAction)) {
                navigate("/courses");
            } else {
                showAlert("התחברות נכשלה, אנא בדוק את הפרטים ונסה שוב.");
            }
        } catch (error) {
            showAlert("אירעה שגיאה, אנא נסה שוב מאוחר יותר.");
        } finally {
            setLoading(false);
        }
    };

    const register = async () => {
        if (!isFormValid) return;

        const newUser = {
            email: formData.email,
            password: formData.password,
            name: formData.name,
            phone: formData.phone,
            IsActive: true,
            UserTypeId: 5,
        };

        setLoading(true);

        try {
            const resultAction = await dispatch(registerAction(newUser));

            if (registerAction.fulfilled.match(resultAction)) {
                navigate("/courses");
            } else {
                showAlert("הרשמה נכשלה, אנא נסה שוב.");
            }
        } catch (error) {
            showAlert("אירעה שגיאה, אנא נסה שוב מאוחר יותר.");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = () => {
        if (mode === "login") {
            login();
        } else {
            register();
        }
    };

    const passwordStrength = getPasswordStrength(formData.password);

    return (
        <Box
            sx={{
                display: "flex",
                minHeight: "100vh",
                flexDirection: "row-reverse",
                direction: "rtl",
            }}
        >
            <Box
                sx={{
                    width: "70vw", // 70% רוחב לתמונה
                    height: "auto",
                    backgroundImage: 'url(/assets/loginImage.png)',
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                    backgroundColor: "rgb(154,205,234)",
                    flexShrink: 0,
                }}
            />

            <Box
                sx={{
                    width: "15vw", // 30% רוחב לשדות
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 2,
                    padding: 4,
                    maxWidth: 400,
                    mx: "auto",
                }}
            >
                <Box
                    sx={{
                        width: "20vw", // 10%  רוחב לוגו 
                        height: "10vh",
                        backgroundImage: 'url(/assets/logo.svg)',
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "contain",
                        backgroundPosition: "center",
                        // backgroundColor: "rgb(252, 252, 254)
                        flexShrink: 0,
                    }}
                />
                <Typography variant="h5" >
                    {mode === "login" ? " התחברות למערכת" : "הרשמה למערכת"}

                </Typography>


                {mode === "register" && (
                    <>

                        <TextField
                            label="שם מלא"
                            variant="standard"
                            value={formData.name}
                            onChange={handleChange("name")}
                            error={!!errors.name}
                            helperText={errors.name}
                            fullWidth
                            inputProps={{ dir: "rtl", sx: { color: "primary.main", textAlign: "right" } }}
                            InputLabelProps={{
                                style: {
                                    right: 0,
                                    left: "auto",
                                    direction: "rtl",
                                    textAlign: "right",
                                    color: "blue"
                                },
                            }}
                            FormHelperTextProps={{
                                sx: {
                                    color: errors.email ? "error.main" : "primary.main",
                                    textAlign: "right",
                                    pr: 0.5,
                                }
                            }}

                            sx={{

                                "& .MuiInput-underline:before": { borderBottomColor: "primary.main" },
                                "& .MuiInput-underline:hover:before": { borderBottomColor: "primary.dark" },
                                "& .MuiInput-underline:after": { borderBottomColor: "primary.main" },
                            }}

                        />
                        <TextField
                            label="טלפון"
                            variant="standard"
                            value={formData.phone}
                            onChange={handleChange("phone")}
                            error={!!errors.phone}
                            helperText={errors.phone}
                            fullWidth
                            inputProps={{ dir: "rtl" }}
                            FormHelperTextProps={{ sx: { color: "primary.main", textAlign: "right" } }}
                            InputLabelProps={{
                                style: {
                                    right: 0,
                                    left: "auto",
                                    direction: "rtl",
                                    textAlign: "right",
                                    color: "primary.main"

                                },
                            }}
                            sx={{

                                "& .MuiInput-underline:before": { borderBottomColor: "primary.main" },
                                "& .MuiInput-underline:hover:before": { borderBottomColor: "primary.dark" },
                                "& .MuiInput-underline:after": { borderBottomColor: "primary.main" },
                            }}

                        />
                    </>
                )}

                <TextField
                    label="אימייל"
                    variant="standard"
                    value={formData.email}
                    onChange={handleChange("email")}
                    error={!!errors.email}
                    helperText={errors.email}
                    fullWidth
                    inputProps={{ dir: "rtl" }}
                    FormHelperTextProps={{ sx: { color: "primary.main", textAlign: "right" } }}
                    InputLabelProps={{
                        style: {
                            right: 0,
                            left: "auto",
                            direction: "rtl",
                            textAlign: "right",
                        },
                    }}
                    sx={{

                        "& .MuiInput-underline:before": { borderBottomColor: "primary.main" },
                        "& .MuiInput-underline:hover:before": { borderBottomColor: "primary.dark" },
                        "& .MuiInput-underline:after": { borderBottomColor: "primary.main" },
                    }}

                />

                <TextField
                    label="סיסמה"
                    variant="standard"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange("password")}
                    error={!!errors.password}
                    helperText={errors.password}
                    fullWidth
                    inputProps={{ dir: "rtl" }}
                    InputLabelProps={{
                        style: {
                            right: 0,
                            left: "auto",
                            direction: "rtl",
                            textAlign: "right",
                        },
                    }}



                    FormHelperTextProps={{
                        sx: {
                            color: errors.password ? "error.main" : "primary.main",
                            textAlign: "right",
                            pr: 0.5,
                        }
                    }}
                    sx={{

                        "& .MuiInput-underline:before": {
                            borderBottomColor: "primary.main",
                        },
                        "& .MuiInput-underline:hover:before": {
                            borderBottomColor: "primary.dark",
                        },
                        "& .MuiInput-underline:after": {
                            borderBottomColor: "primary.main",
                        },

                    }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end" sx={{ ml: 1 }}>
                                <IconButton
                                    onClick={toggleShowPassword}
                                    edge="end"
                                    aria-label="toggle password visibility"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}


                />
                {mode === "register" && formData.password && (
                    <Typography
                        variant="subtitle2"
                        sx={{ color: passwordStrength.color, mb: 1, alignSelf: "flex-start" }}
                    >
                        חוזק סיסמה: {passwordStrength.label}
                    </Typography>
                )}

                {mode === "register" && (
                    <TextField
                        label="אימות סיסמה"
                        variant="standard"
                        type={showConfirmPassword ? "text" : "password"}
                        value={formData.confirmPassword}
                        onChange={handleChange("confirmPassword")}
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword}
                        fullWidth
                        inputProps={{ dir: "rtl" }}
                        InputLabelProps={{
                            style: {
                                right: 0,
                                left: "auto",
                                direction: "rtl",
                                textAlign: "right",
                            },
                        }}
                        FormHelperTextProps={{ sx: { color: "primary.main", textAlign: "right" } }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end" sx={{ ml: 1 }}>
                                    <IconButton
                                        onClick={toggleShowConfirmPassword}
                                        edge="end"
                                        aria-label="toggle confirm password visibility"
                                    >
                                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        sx={{
                            "& .MuiInput-underline:before": { borderBottomColor: "primary.main" },
                            "& .MuiInput-underline:hover:before": { borderBottomColor: "primary.dark" },
                            "& .MuiInput-underline:after": { borderBottomColor: "primary.main" },
                        }}

                    />
                )}

                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    disabled={!isFormValid || loading}
                    fullWidth
                    sx={{ mb: 1, borderRadius: 3, py: 1 }}
                >
                    {loading ? (mode === "login" ? "טוען..." : "שומר...") : mode === "login" ? "התחבר" : "הרשם"}
                </Button>

                <Typography
                    sx={{ cursor: "pointer", color: "primary.main" }}
                    onClick={() => {
                        setMode(mode === "login" ? "register" : "login");
                        setErrors({});
                        setFormData({
                            email: "",
                            password: "",
                            confirmPassword: "",
                            name: "",
                            phone: "",
                        });
                        setShowPassword(false);
                        setShowConfirmPassword(false);
                    }}
                >
                    {mode === "login"
                        ? "אין לך חשבון? הרשם"
                        : "כבר יש לך חשבון? התחבר"}
                </Typography>
            </Box>

            <Snackbar
                open={alert.open}
                autoHideDuration={3000}
                onClose={handleCloseAlert}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Alert severity={alert.severity} onClose={handleCloseAlert}>
                    {alert.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default LoginRegister;
