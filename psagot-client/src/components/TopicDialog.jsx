import React, { useState, useEffect } from "react";
import {
  Dialog, DialogContent,
  TextField, Button, Select, MenuItem,
  FormControl, InputLabel, Box, Typography,
  Checkbox, IconButton, FormControlLabel
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CloseIcon from "@mui/icons-material/Close";
import editSvg from '../assets/icons/editIcon.svg';
import deleteSvg from '../assets/icons/deleteIcon.svg';
//import CheckIcon from "@mui/icons-material/Check";
//import ClearIcon from "@mui/icons-material/Clear";
import { addScheduleForTopic } from '../utils/scheduleForTopicUtil';
import AddDayErrorDialog from './AddDayErrorDialog';

const sharedStyles = {
  width: "150px",
  textAlign: "right",
  direction: "rtl",
  "& .MuiInputLabel-root": {
    right: "0",
    transformOrigin: "top right",
  },
  "& .MuiSelect-icon": {
    right: "unset",
    left: "0px",
  },
};

const buttonStyles = {
  height: "36px",
  padding: "0px 16px",
  borderRadius: "50px",
  fontFamily: "Rubik",
  fontWeight: 400,
  fontSize: "16px",
  lineHeight: "18.96px",
};

const cancelButtonStyle = {
  ...buttonStyles,
  color: "#1976d2",
  border: "1px solid #1976d2",
  backgroundColor: "transparent",
  textTransform: "none",
  "&:hover": {
    backgroundColor: "rgba(25, 118, 210, 0.1)",
    borderColor: "#115293",
  },
};

const saveButtonStyle = {
  ...buttonStyles,
  backgroundColor: "#1976d2",
  color: "#fff",
  textTransform: "none",
  "&:hover": {
    backgroundColor: "#115293",
  },
};

const disabledSaveButtonStyle = {
  ...buttonStyles,
  backgroundColor: "#C6C6C6",
  color: "#fff", 
  textTransform: "none",
  cursor: "default",
  pointerEvents: "none",
  //"&.Mui-disabled": {
  //  color: "#fff",  // חובה כאן לכתוב במפורש את הצבע הלבן במצב disabled
  //  opacity: 1,     // לבטל את השקיפות שה-MUI מוסיף כברירת מחדל
  //},
};

const addDayButtonStyle = {
  fontSize: "16px",
  fontWeight: "500",
  lineHeight: "18.96px",
  color: "#fff", 
  backgroundColor: "transparent",
  textTransform: "none",
  display: "flex",
  alignItems: "center",
  mt: 1,
  mb: 1,
  padding: 0,
  minWidth: "auto",
};

const TopicDialog = ({ open, onClose, onSubmit,initialData }) => {
  const [formData, setFormData] = useState({
    topic: initialData?.topicId||"",
    lecturerName: initialData?.teacherName||"",
    startDate: initialData?.startDate||"",
    endDate: initialData?.endDate||"",
    numberOfMeetings: initialData?.numberOfMeetings||"",
    equipment: {
      computers: initialData?.computers||false,
      microphone: initialData?.microphone||false,
      projector: initialData?.projector||false,
    },
    status: "",
  });

  const [startDateType, setStartDateType] = useState("text");
  const [endDateType, setEndDateType] = useState("text");
  const [courseDays, setCourseDays] = useState([
    { day: "", startHour: "", endHour: "", saved: false },
  ]);

  const [mainSaved, setMainSaved] = useState(false);
  const [editingDayIndex, setEditingDayIndex] = useState(null); 
  // אם משתנה כלשהו בטופס הראשי - מבטל את מצב השמירה (אפשר לערוך)
  useEffect(() => {
    if (mainSaved) {
      setMainSaved(false);
    }
  }, [formData]);

  const [isAddDayErrorOpen, setIsAddDayErrorOpen] = useState(false);

  // אם משתנה כלשהו באחד מהימים - מבטל את מצב השמירה של אותו יום
  useEffect(() => {
    // רק נבדוק אם יש ימים שלא שמורים
    if (courseDays.some(day => day.saved)) {
      // אם יש לפחות אחד עם saved=true, נשאיר
      // אך אם השתנה משהו מחוץ לשמירה צריך להגדיר מה לעשות - כאן אנחנו לא עושים שינוי כי saved מתעדכן בלולאה למטה
    }
  }, [courseDays]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (["computers", "microphone", "projector"].includes(name)) {
      setFormData((prev) => ({
        ...prev,
        equipment: {
          ...prev.equipment,
          [name]: checked,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
    // ביטול מצב שמור ראשי כשיש שינוי
    if (mainSaved) {
      setMainSaved(false);
    }
  };

  const handleAddDay = () => {
    setCourseDays([...courseDays, { day: "", startHour: "", endHour: "", saved: false }]);
  };

  const handleDayChange = (index, field, value) => {
    const updatedDays = [...courseDays];
    updatedDays[index][field] = value;
    // ביטול מצב שמור לאותו יום כשמשנים אותו
    updatedDays[index].saved = false;
    setCourseDays(updatedDays);
  };

  const handleDeleteDay = (index) => {
    if (courseDays.length > 1) {
      const updatedDays = [...courseDays];
      updatedDays.splice(index, 1);
      setCourseDays(updatedDays);
    }
  };

  const handleSave = () => {
    onSubmit({ ...formData, courseDays });
    setMainSaved(true);
  };
  const handleEditDay = (index) => {
    setEditingDayIndex(index);
  };
  
  const handleCancelEditDay = () => {
    setEditingDayIndex(null);
  };

  const handleSaveDay = async (index) => {
    const updatedDays = [...courseDays];
    const dayItem = updatedDays[index];
  
    try {
      await addScheduleForTopic({
        topicId: formData.topic, // נניח שזה מזהה הנושא
        dayId: dayItem.day,      // כאן צריך לשים מזהה יום, לא השם בעברית
        startTime: dayItem.startHour,
        endTime: dayItem.endHour,
      });
  
      updatedDays[index].saved = true;
      setCourseDays(updatedDays);
      setEditingDayIndex(null);
    } catch (error) {
      console.error("שגיאה בשמירת יום לנושא:", error);
      setIsAddDayErrorOpen(true);

    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={false}
      PaperProps={{
        sx: {
          width: "1043px",
          borderRadius: "10px",
          padding: "40px",
          marginRight: "210px",
          overflow: "hidden",
          position: "relative",
        },
      }}
      dir="rtl"
    >
      <IconButton
        onClick={onClose}
        sx={{
          position: "absolute",
          top: 16,
          left: 16,
          color: "#494747",
        }}
      >
        <CloseIcon />
      </IconButton>

      <DialogContent sx={{ p: 0 }}>
        <Typography
          variant="h6"
          sx={{
            fontSize: "22px",
            fontWeight: "bold",
            textAlign: "right",
            color: "#494747",
            mb: 2,
            pr: 2.5,
          }}
        >
          עריכת נושא {formData.topic}
        </Typography>

        <Box
          sx={{
            backgroundColor: "#FFFFFF",
            borderRadius: "10px",
            boxShadow: "0px 4px 8px #DCE2ECCC",
            p: 3,
            m: 2.5,
            color: "#494747",
            pr: 3,
          }}
        >
          <Box display="flex" justifyContent="space-between" alignItems="center" mt={-1} mb={1}>
            <Typography fontWeight="bold">פרטים טכניים</Typography>
            <Box display="flex" gap={1}>
              <Button onClick={onClose} variant="outlined" sx={cancelButtonStyle}>ביטול</Button>
              <Button
                onClick={handleSave}
                variant="contained"
                sx={mainSaved ? disabledSaveButtonStyle : saveButtonStyle}
                disabled={mainSaved}
              >
                שמור
              </Button>
            </Box>
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(3, max-content)",
              columnGap: "24px",
            }}
          >
            <TextField label="נושא" name="topic" value={formData.topic} onChange={handleChange} variant="standard" sx={{ ...sharedStyles }} />
            <TextField label="שם מרצה" name="lecturerName" value={formData.lecturerName} onChange={handleChange} variant="standard" sx={{ ...sharedStyles, mr: -17 }} />
            <TextField label="מספר מפגשים" name="numberOfMeetings" value={formData.numberOfMeetings} onChange={handleChange} variant="standard" sx={{ ...sharedStyles }} />

            <TextField
              label="תאריך התחלה"
              name="startDate"
              type={startDateType}
              onFocus={() => setStartDateType("date")}
              onBlur={() => !formData.startDate && setStartDateType("text")}
              value={formData.startDate}
              onChange={handleChange}
              variant="standard"
              sx={{ ...sharedStyles }}
            />

            <TextField
              label="תאריך סיום"
              name="endDate"
              type={endDateType}
              onFocus={() => setEndDateType("date")}
              onBlur={() => !formData.endDate && setEndDateType("text")}
              value={formData.endDate}
              onChange={handleChange}
              variant="standard"
              sx={{ ...sharedStyles, mr: -17 }}
            />

            <FormControl variant="standard" sx={{ ...sharedStyles }}>
              <InputLabel>סטטוס</InputLabel>
              <Select name="status" value={formData.status} onChange={handleChange}>
                <MenuItem value=""><em>בחר</em></MenuItem>
                <MenuItem value="פעיל">פעיל</MenuItem>
                <MenuItem value="לא פעיל">לא פעיל</MenuItem>
              </Select>
            </FormControl>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                columnGap: "24px",
                rowGap: "8px",
                justifyItems: "end",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  gap: "14px",
                  alignItems: "center",
                  gridColumn: "1 / -1",
                  justifySelf: "start",
                  mt: 1,
                }}
              >
                <FormControlLabel
                  control={<Checkbox name="computers" checked={formData.equipment.computers} onChange={handleChange} />}
                  label="מחשבים"
                  sx={{ m: 0, mr: -1 }}
                />
                <FormControlLabel
                  control={<Checkbox name="microphone" checked={formData.equipment.microphone} onChange={handleChange} />}
                  label="מיקרופון"
                  sx={{ m: 0 }}
                />
                <FormControlLabel
                  control={<Checkbox name="projector" checked={formData.equipment.projector} onChange={handleChange} />}
                  label="מקרן"
                  sx={{ m: 0 }}
                />
              </Box>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            backgroundColor: "#FFFFFF",
            borderRadius: "10px",
            boxShadow: "0px 4px 8px #DCE2ECCC",
            p: 2,
            m: 2.5,
            color: "#494747",
            pr: 3,
          }}
        >
          <Typography fontWeight="bold" mb={2}>הוספת ימים לקורס</Typography>

          {courseDays.map((dayItem, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 2,
                mb: 2,
                ml: 1,
              }}
            >
              <Box sx={{ display: "flex", columnGap: "24px", flexWrap: "wrap" }}>
                <FormControl variant="standard" sx={sharedStyles}>
                  <InputLabel>יום</InputLabel>
                  <Select
                    value={dayItem.day}
                    onChange={(e) => handleDayChange(index, "day", e.target.value)}
                    disabled={editingDayIndex !== index}
                  >
                    {["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי"].map(day => (
                      <MenuItem key={day} value={day}>{day}</MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl variant="standard" sx={sharedStyles}>
                  <InputLabel>שעת התחלה</InputLabel>
                  <Select
                    value={dayItem.startHour}
                    onChange={(e) => handleDayChange(index, "startHour", e.target.value)}
                    disabled={editingDayIndex !== index}
                  >
                    {Array.from({ length: 24 }, (_, i) => (
                      <MenuItem key={i} value={`${i.toString().padStart(2, '0')}:00`}>
                        {`${i.toString().padStart(2, '0')}:00`}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl variant="standard" sx={sharedStyles}>
                  <InputLabel>שעת סיום</InputLabel>
                  <Select
                    value={dayItem.endHour}
                    onChange={(e) => handleDayChange(index, "endHour", e.target.value)}
                    disabled={editingDayIndex !== index}
                  >
                    {Array.from({ length: 24 }, (_, i) => (
                      <MenuItem key={i} value={`${i.toString().padStart(2, '0')}:00`}>
                        {`${i.toString().padStart(2, '0')}:00`}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>

   <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
  {editingDayIndex === index ? (
    <>
    <Button
        onClick={handleCancelEditDay}
        sx={{
          ...cancelButtonStyle,
          height: "36px",
          padding: "6px 16px",
          borderRadius: "20px",
          minWidth: "auto",
        }}>
        ביטול
      </Button>
      <Button
        onClick={() => handleSaveDay(index)}
        sx={{
          ...saveButtonStyle,
          height: "36px",
          padding: "6px 16px",
          borderRadius: "20px",
          minWidth: "auto",
        }}
      >
        שמור
      </Button>
      
    </>
  ) : (
    <>
      <IconButton
        onClick={() => handleDeleteDay(index)}
        sx={{
          bgcolor: "#F4F4F4",
          p: "6px",
          width: "36px",
          height: "36px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img src={deleteSvg} alt="delete_icon" style={{ marginTop: "-1px" }} />
      </IconButton>

      <IconButton
        onClick={() => handleEditDay(index)}
        sx={{
          bgcolor: "#F4F4F4",
          p: "6px",
          width: "36px",
          height: "36px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img src={editSvg} alt="edit_icon" style={{ marginTop: "-1px" }} />
      </IconButton>
    </>
  )}
</Box>

            </Box>
          ))}

          <Button
            onClick={handleAddDay}
            startIcon={<AddCircleOutlineIcon sx={{ color: "#393939", fontSize: 18, ml: 1 }} />}
            disableRipple
            disableElevation
            sx={{
              fontSize: "14px",
              textTransform: "none",
              fontFamily: "Rubik",
              fontWeight: 400,
              color: "#393939", // אפור כהה, כמו הטקסט בשדות
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "flex-start",
              px: 0,
              minWidth: "auto",
              mr: -1,
            }}
          >
            הוספת יום
          </Button>
        </Box>
      </DialogContent>

      <AddDayErrorDialog
      open={isAddDayErrorOpen}
      onClose={() => setIsAddDayErrorOpen(false)}
    />
    </Dialog>
  );
};

export default TopicDialog;
