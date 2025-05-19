import React, { useState } from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, Grid, Select, MenuItem,
  FormControl, InputLabel, Box, Typography, Checkbox
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";


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
  height: "44px",
  padding: "0px 20px",
  borderRadius: "50px",
  fontFamily: "Rubik",
  fontWeight: 400,
  fontSize: "16px",
  lineHeight: "18.96px",
};

const AddTopicDialog = ({ open, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    topic: "",
    lecturerName: "",
    startDate: "",
    endDate: "",
    numberOfStudents: "",
    equipment: "",
    day: "",
    startHour: "",
    endHour: "",
    isRoomAvailable: false,
  });

  const [startDateType, setStartDateType] = useState("text");
  const [endDateType, setEndDateType] = useState("text");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = () => {
    onSubmit(formData);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={false}
      PaperProps={{
        sx: {
          width: "1043px",
          height: "522px",
          borderRadius: "10px",
          padding: "40px",
          marginRight: "210px",
          overflow: "hidden",
        },
      }}
      dir="rtl"
    >
      <DialogTitle sx={{ fontWeight: "bold", mt: -3, mb: 2, textAlign: "right" }}>
        עריכת נושא תורת הבניה
      </DialogTitle>

      <DialogContent sx={{ p: 0 }}>
      <Box
  sx={{
    backgroundColor: "rgba(220, 226, 236, 0.8)",
    //border: "1px solid #e0e0e0",
    borderRadius: "10px",
    boxShadow: "0 0 4px solid #e0e0e0(0, 0, 0, 0.1)",
    p: 2,
    mb: 2,
  }}
>
 <Typography fontWeight="bold" mb={1}>פרטים טכניים</Typography>
  <Box
    sx={{
      display: "grid",
      gridTemplateColumns: "repeat(2, auto)",
      gap: 1, // 👈 הקטנת רווח
      justifyItems: "start",
    }}
  >
    <TextField label="נושא" name="topic" value={formData.topic} onChange={handleChange} variant="standard" sx={sharedStyles} />
    <TextField label="שם מרצה" name="lecturerName" value={formData.lecturerName} onChange={handleChange} variant="standard" sx={sharedStyles} />

    <TextField
      label="תאריך התחלה"
      name="startDate"
      type={startDateType}
      onFocus={() => setStartDateType("date")}
      onBlur={() => !formData.startDate && setStartDateType("text")}
      value={formData.startDate}
      onChange={handleChange}
      variant="standard"
      sx={sharedStyles}
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
      sx={sharedStyles}
    />

    <TextField label="מספר תלמידים" name="numberOfStudents" value={formData.numberOfStudents} onChange={handleChange} variant="standard" sx={sharedStyles} />
    <FormControl variant="standard" sx={sharedStyles}>
      <InputLabel>ציוד נדרש</InputLabel>
      <Select name="equipment" value={formData.equipment} onChange={handleChange}>
        <MenuItem value=""><em>בחר</em></MenuItem>
        <MenuItem value="מקרן">מקרן</MenuItem>
        <MenuItem value="לוח">לוח</MenuItem>
        <MenuItem value="מחשב נייד">מחשב נייד</MenuItem>
      </Select>
    </FormControl>
  </Box>
</Box>

        <Box  sx={{
       backgroundColor: "rgba(220, 226, 236, 0.8)",
       //border: "1px solid #e0e0e0",
       borderRadius: "10px",
       boxShadow: "0 0 4px rgba(0, 0, 0, 0.1)",
       p: 2,
   
    mb: 2,
  }}
>
          <Typography fontWeight="bold" mb={2}>הוספת ימים לקורס</Typography>
          <Box sx={{ display: "flex", gap: 2, alignItems: "center", justifyContent: "flex-start", flexWrap: "wrap" }}>
            <FormControl variant="standard" sx={sharedStyles}>
              <InputLabel>יום</InputLabel>
              <Select name="day" value={formData.day} onChange={handleChange}>
                {["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי"].map(day => (
                  <MenuItem key={day} value={day}>{day}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl variant="standard" sx={sharedStyles}>
              <InputLabel>שעת התחלה</InputLabel>
              <Select name="startHour" value={formData.startHour} onChange={handleChange}>
                {Array.from({ length: 24 }, (_, i) => (
                  <MenuItem key={i} value={`${i.toString().padStart(2, '0')}:00`}>
                    {`${i.toString().padStart(2, '0')}:00`}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl variant="standard" sx={sharedStyles}>
              <InputLabel>שעת סיום</InputLabel>
              <Select name="endHour" value={formData.endHour} onChange={handleChange}>
                {Array.from({ length: 24 }, (_, i) => (
                  <MenuItem key={i} value={`${i.toString().padStart(2, '0')}:00`}>
                    {`${i.toString().padStart(2, '0')}:00`}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Box display="flex" alignItems="center" mt={1} gap={1}>
  <Typography sx={{ fontSize: "16px" }}>חדר פנוי</Typography>
  <Checkbox
    name="isRoomAvailable"
    checked={formData.isRoomAvailable}
    onChange={handleChange}
    sx={{ p: 0, mt: "-4px" }}
  />
  <Box sx={{ width: 200 }} /> {/* רווח בין הצ'קבוקס לכפתור */}
  <Button variant="contained" sx={buttonStyles}>שמור</Button>
</Box>
          </Box>

          <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-start" }}>
  <Button
    startIcon={
      <AddCircleOutlineIcon sx={{ color: "#393939", fontSize: 18, ml: 0 }} />
    }
    disableRipple
    disableElevation
    sx={{
      fontSize: "14px",
      textTransform: "none",
      fontFamily: "Rubik",
      fontWeight: 400,
      color: "#393939",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "flex-end",
      px: 0,
      minWidth: "auto",
      "&:hover": {
        backgroundColor: "transparent", // ביטול רקע ב-hover
      },
    }}
  >
    הוספת יום
  </Button>
</Box>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 1, pb: 0, justifyContent: "center", gap: 1 }}>
        <Button onClick={onClose} variant="outlined" sx={buttonStyles}>
          ביטול
        </Button>
        <Button onClick={handleSave} variant="contained" sx={buttonStyles}>
          שמור
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddTopicDialog;
