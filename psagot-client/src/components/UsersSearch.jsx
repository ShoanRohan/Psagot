import * as React from "react";
import {
    Box,
    MenuItem,
    FormControl,
    Button,
    FormHelperText,
    TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";

import { fetchAllUserTypes } from "../features/userType/userTypeActions"; // ודא שהנתיב נכון

const sharedStyles = {
    width: "150px", // רוחב סטנדרטי לשדות החיפוש
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
    // הוספת סגנון עבור אייקון הסלקט ב-TextField
    "& .MuiInputBase-root .MuiSelect-select": {
        paddingRight: "32px !important", // מגדיל את הריפוד מימין כדי לפנות מקום לאייקון
        paddingLeft: "14px", // שומר על ריפוד רגיל משמאל
    },
    "& .MuiInputBase-root .MuiSelect-icon": {
        left: "12px", // ממקם את האייקון 12px מהשמאל
        right: "unset", // מבטל את המיקום הימני המוגדר כברירת מחדל
    },
};

const buttonStyles = {
    minWidth: "100px",
    height: "40px",
    borderRadius: "50px",
    boxShadow: "none",
    fontFamily: "Rubik",
    fontWeight: 400,
    fontSize: "16px",
    textTransform: "none",
};

const UsersSearch = ({ onFilterChange, onClearFilters }) => {
    const dispatch = useDispatch();
    const { userTypes, status: userTypeStatus } = useSelector((state) => state.userType);

    const [roles, setRoles] = useState([]);

    // מצב התחלתי של הפילטרים
    const initialState = {
        username: "",
        phone: "",
        role: "",
        isActive: true,
    };

    const [filters, setFilters] = useState(initialState);
    const [errors, setErrors] = useState({
        username: "",
        phone: "",
        role: "",
    });

    // טעינת סוגי משתמשים (הרשאות) כאשר הקומפוננטה נטענת
    useEffect(() => {
        if (userTypeStatus === "idle") {
            dispatch(fetchAllUserTypes());
        }
    }, [userTypeStatus, dispatch]);

    // עדכון רשימת התפקידים כאשר userTypes משתנה
    useEffect(() => {
        if (userTypes && userTypes.length > 0) {
            setRoles(userTypes);
        }
    }, [userTypes]);

    // פונקציה לבדיקת תקינות כל הפילטרים הנוכחיים
    const validateAllFilters = () => {
        let isValid = true;
        const newErrors = { username: "", phone: "", role: "" }; // איפוס שגיאות

        // ולידציה לשם משתמש
        if (filters.username) { // רק אם השדה לא ריק
            if (filters.username.trim().length < 2) {
                newErrors.username = "שם משתמש חייב להיות באורך 2 תווים לפחות";
                isValid = false;
            } else if (!/^[a-zA-Z\u0590-\u05FF\s]+$/.test(filters.username)) {
                newErrors.username = "שם משתמש יכול להכיל אותיות ורווחים בלבד";
                isValid = false;
            }
        }

        // ולידציה לטלפון
        if (filters.phone) { // רק אם השדה לא ריק
            const phoneRegex = /^\d{10}$/;
            if (!phoneRegex.test(filters.phone)) {
                newErrors.phone = "מספר טלפון לא תקין (10 ספרות בלבד)";
                isValid = false;
            }
        }

        setErrors(newErrors); // עדכן את השגיאות ב-state
        return isValid;
    };

    // מטפל בשינוי של שדות הפילטר
    const handleFilterChange = (e) => {
        const { name, value, checked, type } = e.target;
        const newValue = type === "checkbox" ? checked : value;

        setFilters((prevFilters) => {
            const updatedFilters = { ...prevFilters, [name]: newValue };

            // עדכון שגיאות ספציפי לשדה ששונה באופן מיידי
            const tempErrors = { ...errors };
            if (name === "username") {
                tempErrors.username = "";
                if (newValue && newValue.trim().length < 2) {
                    tempErrors.username = "שם משתמש חייב להיות באורך 2 תווים לפחות";
                } else if (newValue && !/^[a-zA-Z\u0590-\u05FF\s]+$/.test(newValue)) {
                    tempErrors.username = "שם משתמש יכול להכיל אותיות ורווחים בלבד";
                }
            } else if (name === "phone") {
                tempErrors.phone = "";
                if (newValue) {
                    const phoneRegex = /^\d{10}$/;
                    if (!phoneRegex.test(newValue)) {
                        tempErrors.phone = "מספר טלפון לא תקין (10 ספרות בלבד)";
                    }
                }
            }

            setErrors(tempErrors); // עדכן את שגיאות ה-state
            // console.log("Updated Filters:", updatedFilters); // לצורך דיבוג - ניתן להפעיל להבנת מצב הפילטרים
            // console.log("Updated Errors:", tempErrors);  // לצורך דיבוג - ניתן להפעיל להבנת מצב השגיאות
            return updatedFilters;
        });
    };

    // מטפל בלחיצה על כפתור "חיפוש"
    const handleSearchClick = () => {
        const isValid = validateAllFilters(); // בצע ולידציה לכל השדות לפני השליחה
        if (isValid) {
            // אם הולידציה עברה, שלח את הפילטרים לקומפוננטת האב
            if (onFilterChange) {
                onFilterChange(filters);
            }
        }
    };

    // מטפל בלחיצה על כפתור "ניקוי"
    const handleClearFiltersClick = () => {
        setFilters(initialState); // איפוס כל הפילטרים למצב ההתחלתי
        setErrors({ username: "", phone: "", role: "" }); // איפוס כל השגיאות
        if (onClearFilters) {
            onClearFilters(initialState); // שלח את המצב ההתחלתי לקומפוננטת האב
        }
    };

    // חישוב מצב הכפתור 'חיפוש' (disabled)
    const isSearchButtonDisabled = (() => {
        const isChanged =
            filters.username !== initialState.username ||
            filters.phone !== initialState.phone ||
            filters.role !== initialState.role ||
            filters.isActive !== initialState.isActive;

        // בדוק אם יש שגיאות כלשהן
        const hasErrors = Object.values(errors).some((error) => error !== "");

        // הכפתור יהיה מושבת אם:
        // 1. אין שינוי בשדות (כלומר, הם זהים ל-initialState)
        // או
        // 2. יש שגיאות ולידציה כלשהן
        return !isChanged || hasErrors;
    })();


    return (
        <Box sx={{ width: "100%" }}>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "10px 20px",
                    backgroundColor: "white",
                    fontFamily: "Rubik",
                    direction: "rtl",
                    borderRadius: "10px",
                    background: "#FFF",
                    padding: "30px 32px",
                    boxShadow: "0px 0px 4px 0px rgba(220, 226, 236, 0.80)",
                }}
            >
                {/* שדות בחירה */}
                <Box sx={{ display: "flex", gap: "20px" }}>
                    {/* שדה: שם משתמש (TextField) */}
                    <FormControl variant="standard" sx={sharedStyles} error={!!errors.username}>
                        <TextField
                            id="username-input"
                            name="username"
                            label="שם משתמש"
                            value={filters.username}
                            onChange={handleFilterChange}
                            variant="standard"
                            fullWidth
                            error={!!errors.username} // קובע אם יוצג קו תחתון אדום
                        />
                        <FormHelperText sx={{ textAlign: "right" }}>
                            {errors.username}
                        </FormHelperText>
                    </FormControl>

                    {/* שדה: טלפון (TextField) */}
                    <FormControl variant="standard" sx={sharedStyles} error={!!errors.phone}>
                        <TextField
                            id="phone-input"
                            name="phone"
                            label="טלפון"
                            value={filters.phone}
                            onChange={handleFilterChange}
                            variant="standard"
                            fullWidth
                            error={!!errors.phone} // קובע אם יוצג קו תחתון אדום
                        />
                        <FormHelperText sx={{ textAlign: "right" }}>
                            {errors.phone}
                        </FormHelperText>
                    </FormControl>

                    {/* שדה: הרשאה (TextField עם select) */}
                    <FormControl variant="standard" sx={sharedStyles} error={!!errors.role}>
                        <TextField
                            id="role-select"
                            name="role"
                            select
                            label="הרשאה"
                            value={filters.role}
                            onChange={handleFilterChange}
                            variant="standard"
                            fullWidth
                            error={!!errors.role} // קובע אם יוצג קו תחתון אדום
                        >
                            <MenuItem value="">
                            </MenuItem>
                            {roles?.map((r) => (
                                <MenuItem key={r.id} value={r.name}>
                                    {r.name}
                                </MenuItem>
                            ))}
                        </TextField>
                        <FormHelperText sx={{ textAlign: "right" }}>
                            {errors.role}
                        </FormHelperText>
                    </FormControl>

                    {/* שדה: סטטוס פעיל */}
                    <FormControl variant="standard" sx={{ minWidth: 120, mt: 2, alignItems: "center", direction: "rtl" }}>
                        <label style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
                            <input
                                type="checkbox"
                                name="isActive"
                                checked={filters.isActive}
                                onChange={handleFilterChange}
                                style={{ marginRight: "8px", accentColor: "#1976d2" }} // שינוי ל-marginRight עבור RTL
                            />
                            פעיל
                        </label>
                    </FormControl>
                </Box>
                {/* כפתורים */}
                <Box sx={{ display: "flex", gap: "10px" }}>
                    <Button
                        variant="outlined"
                        sx={{ ...buttonStyles, borderColor: "#D0D5DD", color: "#344054", "&:hover": { borderColor: "#D0D5DD", backgroundColor: "#F9FAFB" } }}
                        onClick={handleClearFiltersClick}
                    >
                        ניקוי
                    </Button>

                    <Button
                        variant="contained"
                        sx={{
                            ...buttonStyles,
                            backgroundColor: isSearchButtonDisabled ? "#B0BEC5" : "#326DEF",
                            color: isSearchButtonDisabled ? "#ECEFF1" : "white",
                            cursor: isSearchButtonDisabled ? "not-allowed" : "pointer",
                            boxShadow: isSearchButtonDisabled ? "none" : undefined,
                            "&:hover": {
                                backgroundColor: isSearchButtonDisabled ? "#B0BEC5" : "#2857C4",
                            },
                            "&:active": {
                                backgroundColor: isSearchButtonDisabled ? "#B0BEC5" : "#234E9D",
                            },
                        }}
                        startIcon={<SearchIcon sx={{ marginLeft: 1 }} />}
                        onClick={() => {
                            if (!isSearchButtonDisabled) {
                                handleSearchClick();
                            }
                        }}
                    >
                        חיפוש
                    </Button>


                </Box>
            </Box>
        </Box>
    );
};

export default UsersSearch;