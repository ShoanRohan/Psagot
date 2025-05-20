import React, { useState } from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, Grid, Select, MenuItem,
  FormControl, InputLabel, Box, Typography, Checkbox, IconButton
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CloseIcon from "@mui/icons-material/Close"; // ← חדש

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
          borderRadius: "10px",
          padding: "40px",
          marginRight: "210px",
          overflow: "hidden",
          position: "relative", // נדרש למיקום האיקס
        },
      }}
      dir="rtl"
    >
      {/* איקס לסגירה בצד שמאל למעלה */}
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

      <Typography sx={{ fontWeight: "bold", fontSize: "22px", mt: -3, mb: 0, mr: 1, textAlign: "right", color: "#494747" }}>
        עריכת נושא תורת הבניה
      </Typography>

      <DialogContent sx={{ p: 0 }}>
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
          <Typography fontWeight="bold" mb={1}>פרטים טכניים</Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(2, max-content)",
              columnGap: "24px",
              rowGap: "8px",
              justifyItems: "end",
            }}
          >
            <TextField label="נושא" name="topic" value={formData.topic} onChange={handleChange} variant="standard" sx={{ ...sharedStyles, width: "135px" }} />
            <TextField label="שם מרצה" name="lecturerName" value={formData.lecturerName} onChange={handleChange} variant="standard" sx={{ ...sharedStyles, width: "135px" }} />

            <TextField
              label="תאריך התחלה"
              name="startDate"
              type={startDateType}
              onFocus={() => setStartDateType("date")}
              onBlur={() => !formData.startDate && setStartDateType("text")}
              value={formData.startDate}
              onChange={handleChange}
              variant="standard"
              sx={{ ...sharedStyles, width: "135px" }}
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
              sx={{ ...sharedStyles, width: "135px" }}
            />

            <TextField label="מספר תלמידים" name="numberOfStudents" value={formData.numberOfStudents} onChange={handleChange} variant="standard" sx={{ ...sharedStyles, width: "135px" }} />

            <FormControl variant="standard" sx={{ ...sharedStyles, width: "135px" }}>
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

            <Box display="flex" alignItems="center" gap={1} justifyContent="flex-start">
              <Typography sx={{ fontSize: "16px", mt: "15px" }}>חדר פנוי</Typography>
              <Checkbox
                name="isRoomAvailable"
                checked={formData.isRoomAvailable}
                onChange={handleChange}
                sx={{
                  p: 0,
                  width: "18px",
                  height: "20px",
                  mt: "15px",
                  '& .MuiSvgIcon-root': {
                    fontSize: "20px",
                  },
                }}
              />
              <Box sx={{ width: 270 }} />
              <Button variant="contained" sx={buttonStyles}>שמור</Button>
            </Box>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
            <Button
              startIcon={
                <AddCircleOutlineIcon
                  sx={{ color: "#393939", fontSize: 18, ml: 1 }}
                />
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
                mr: -1,
                mt: 1,
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
