import React, { useState } from "react";
import {
  Dialog, DialogContent, DialogActions,
  TextField, Button, Select, MenuItem,
  FormControl, InputLabel, Box, Typography,
  Checkbox, IconButton, FormControlLabel
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CloseIcon from "@mui/icons-material/Close";

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
  padding: "0px 16",
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
    equipment: {
      computers: false,
      microphone: false,
      projector: false,
    },
    status: "",
  });

  const [startDateType, setStartDateType] = useState("text");
  const [endDateType, setEndDateType] = useState("text");
  const [courseDays, setCourseDays] = useState([
    { day: "", startHour: "", endHour: "" }
  ]);

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
  };

  const handleAddDay = () => {
    setCourseDays([...courseDays, { day: "", startHour: "", endHour: "" }]);
  };

  const handleDayChange = (index, field, value) => {
    const updatedDays = [...courseDays];
    updatedDays[index][field] = value;
    setCourseDays(updatedDays);
  };

  const handleSave = () => {
    onSubmit({ ...formData, courseDays });
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
              <Button onClick={onClose} variant="outlined" sx={buttonStyles}>ביטול</Button>
              <Button onClick={handleSave} variant="contained" sx={buttonStyles}>שמור</Button>
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
            <TextField label="שם מרצה" name="lecturerName" value={formData.lecturerName} onChange={handleChange} variant="standard"   sx={{ ...sharedStyles, mr: -17 }}/>
            <TextField label="מספר מפגשים" name="numberOfStudents" value={formData.numberOfStudents} onChange={handleChange} variant="standard" sx={{ ...sharedStyles }} />

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
              }}
            >
              <Box sx={{ display: "flex", columnGap: "24px", flexWrap: "wrap" }}>
                <FormControl variant="standard" sx={sharedStyles}>
                  <InputLabel>יום</InputLabel>
                  <Select
                    value={dayItem.day}
                    onChange={(e) => handleDayChange(index, "day", e.target.value)}
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
                  >
                    {Array.from({ length: 24 }, (_, i) => (
                      <MenuItem key={i} value={`${i.toString().padStart(2, '0')}:00`}>
                        {`${i.toString().padStart(2, '0')}:00`}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
              <Button variant="contained" sx={{ ...buttonStyles, height: "36px", fontSize: "14px", padding: "0px 16px", whiteSpace: "nowrap", ml: 1 }}>
                שמור
              </Button>
            </Box>
          ))}

          <Box sx={{ display: "flex", justifyContent: "flex-start", mt: 2 }}>
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
                color: "#393939",
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
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default AddTopicDialog;
