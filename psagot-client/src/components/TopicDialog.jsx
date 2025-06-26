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
import { useDispatch, useSelector } from "react-redux";
import { fetchTeachers } from "../features/user/userAction";
import { fetchAllStatuses } from "../features/status/statusActions";
import { updateTopic } from "../utils/topicUtil";
// import AddDayErrorDialog from './AddDayErrorDialog';

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
  const [startDateType, setStartDateType] = useState("text");
  const [endDateType, setEndDateType] = useState("text");
  const [courseDays, setCourseDays] = useState([
    { day: "", startHour: "", endHour: "", saved: false },
  ]);
  const [isAddDayErrorOpen, setIsAddDayErrorOpen] = useState(false);

  const [mainSaved, setMainSaved] = useState(false);
  const [editingDayIndex, setEditingDayIndex] = useState(null); 
  const dispatch = useDispatch();
  const { teachers} = useSelector(state => state.user)
  const [isEditingMain, setIsEditingMain] = useState(false);
  const statuses = useSelector((state) => state.status.coursesStatuses);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
const [pendingUpdateData, setPendingUpdateData] = useState(null);
  // console.log("statuses", statuses);


  // // שלוף את כל המשתמשים (רכזות ומרצים) מהסטייט של Redux.
  // // *** וודא שהנתיב 'state.user.allLecturersAndCoordinators' הוא הנתיב הנכון בסטייט של Redux עבורך ***
  // const allUsers = useSelector(state => state.user.allLecturersAndCoordinators); 

  // const formatDate = (dateString) => {
  //   if (!dateString) return "";
  //   const d = new Date(dateString);
  //   if (isNaN(d)) return "";
  //   return d.toISOString().split("T")[0];
  // };

  const [formData, setFormData] = useState({
    topicId:"",
    topic: "",
    lecturerName: "",
    startDate: "",
    endDate: "",
    numberOfMeetings: "",
    equipment: {
      computers: false,
      microphone: false,
      projector: false,
    },
    status: "",
  });

  // const [lecturers, setLecturers] = useState([]); // מצב מקומי לרשימת המרצים המסוננת
  // const LECTURER_USER_TYPE_ID = 2; // *** שנה את זה ל-UserTypeId הנכון של מרצים במערכת שלך ***


  useEffect(() => {
    if (initialData) {

    
      setFormData({
        topicId: initialData?.topicId || "",
        topic: initialData?.name || "",
        lecturerName: initialData?.teacherName || '',
        startDate: initialData?.startDate,
        endDate: initialData?.endDate,
        numberOfMeetings: initialData?.numberOfMeetings || "",
        equipment: {
          computers: initialData?.computers || false,
          microphone: initialData?.microphone || false,
          projector: initialData?.projector || false,
        },
        status: initialData?.statusName || ""
      });
    } else {
      setFormData({
        topicId: "",
        topic: "",
        lecturerName: "",
        startDate: "",
        endDate: "",
        numberOfMeetings: "",
        equipment: {
          computers: false,
          microphone: false,
          projector: false,
        },
        status: "",
      });
    }

//     console.log("startDate in formData:", formData.startDate);
// console.log("endDate in formData:", formData.endDate);
  }, [initialData]);




  // useEffect(() => {
  //   if (initialData && initialData.courseDays) {
  //     setCourseDays(initialData.courseDays.map(day => ({ ...day, saved: true }))); // נניח שהימים מה-initialData שמורים
  //   } else {
  //     setCourseDays([{ day: "", startHour: "", endHour: "", saved: false }]);
  //   }
  // }, [initialData]);


  // אם משתנה כלשהו בטופס הראשי - מבטל את מצב השמירה (אפשר לערוך)
  useEffect(() => {
    if (mainSaved) {
      setMainSaved(false);
    }
  }, [formData]);

  useEffect(()=>{
    dispatch(fetchTeachers())
},[])


useEffect(() => {
  dispatch(fetchAllStatuses());
}, [dispatch]);

// useEffect(() => {
//   if (formData.status && !statuses.find(s => s.statusId === formData.status)) {
//     setFormData(prev => ({ ...prev, status: "" }));
//   }
// }, [statuses, formData.status]);
  // אם משתנה כלשהו באחד מהימים - מבטל את מצב השמירה של אותו יום
  // useEffect(() => {
  //   // רק נבדוק אם יש ימים שלא שמורים
  //   if (courseDays.some(day => day.saved)) {
  //     // אם יש לפחות אחד עם saved=true, נשאיר
  //     // אך אם השתנה משהו מחוץ לשמירה צריך להגדיר מה לעשות - כאן אנחנו לא עושים שינוי כי saved מתעדכן בלולאה למטה
  //   }
  // }, [courseDays]);

  const isLecturerValid = teachers.some(
    (teacher) => teacher.name === formData.lecturerName
  );

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
    const teacherId = teachers.find(teacher => teacher.name.includes(formData.lecturerName)).userId;
    console.log(teacherId)
    onSubmit({ ...formData,teacherId:teacherId });// צריך ליצור לימים פונקציה נפרדת
    setMainSaved(true);
  };

//   const handleSave = async () => {
//     console.log("handleSave start", formData);
//     const teacherId = teachers.find(teacher => teacher.name.includes(formData.lecturerName))?.userId;
  
//     if (!teacherId) {
//       console.error("Teacher not found!");
//       return;
//     }
  
//     // const updateData = {
//     //   ...formData,
//     //   teacherId: teacherId,
//     //   statusId: statuses.find(s => s.name === formData.status)?.statusCourseId,
//     //   ForceUpdate: false,

//     // };

//     const { lecturerName, status, equipment, ...rest } = formData;

// const updateData = {
//   ...rest,
//   teacherId,
//   statusId: statuses.find(s => s.name === status)?.statusCourseId,
//   computers: equipment.computers,
//   microphone: equipment.microphone,
//   projector: equipment.projector,
//   ForceUpdate: false,
// };

//     console.log("🟢 updateData:", updateData); // ← פה להדפיס

//     try {
//       const result = await updateTopic(updateData);
//       console.log("updateTopic result:", result);
  
//       if (typeof result === "string" && result.includes("מפגשים עתידיים")) {
//         setPendingUpdateData(updateData);
//         setShowConfirmDialog(true);
//         return;
//       }
  
//       setMainSaved(true);
//       if (onSubmit) onSubmit({ ...formData, teacherId: teacherId });
//     }  catch (error) {
//       console.error("❌ Error in handleSave:", error);
//       if (error.response) {
//         console.error("🔴 Server response:", error.response.data);
//       }
    
//     }
//   };
  
  
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
    {isEditingMain ? (
      <>
        <Button onClick={() => { setIsEditingMain(false); onClose(); }} variant="outlined" sx={cancelButtonStyle}>
          ביטול
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          sx={mainSaved ? disabledSaveButtonStyle : saveButtonStyle}
          disabled={mainSaved}
        >
          שמור
        </Button>
      </>
    ) : (
      isLecturerValid && (
        <IconButton
          onClick={() => setIsEditingMain(true)}
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
      )
    )}
  </Box>
</Box>


      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(3, max-content)",
          columnGap: "24px",
        }}
      >

  <TextField label="קוד קורס" name="topicId" value={formData.topicId} onChange={handleChange} variant="standard" sx={{ ...sharedStyles }} disabled={true} />

  <TextField label="נושא" name="topic" value={formData.topic} onChange={handleChange} variant="standard" sx={{ ...sharedStyles }} disabled={!isEditingMain} />
  <FormControl variant="standard" sx={{ ...sharedStyles, mr: -17, style: { textAlign: 'right', direction: 'rtl', style: { textAlign: 'right' } } }}>
    <InputLabel id="lecturer-label">שם מרצה</InputLabel>
    <Select
      labelId="lecturer-label"
      name="lecturerName"
      value={formData.lecturerName}
      onChange={handleChange}
      disabled={!isEditingMain} // הוסף disabled
    >
      {teachers?.map((teacher) => (
        <MenuItem key={teacher.Id} value={teacher.name}>
          {teacher.name}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
  <TextField  label="מספר מפגשים" name="numberOfMeetings"   type="number" value={formData.numberOfMeetings} onChange={handleChange} variant="standard" sx={{ ...sharedStyles }} disabled={!isEditingMain} />

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
    disabled={!isEditingMain} // הוסף disabled
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
    disabled={!isEditingMain} // הוסף disabled
  />

  <FormControl variant="standard" sx={{ ...sharedStyles }}>
    <InputLabel id="status-label">סטטוס</InputLabel>
    <Select
      labelId="status-label"
      name="status"
      value={formData.status}
      onChange={handleChange}
      disabled={!isEditingMain} // הוסף disabled
    >
      {statuses.map((status) => (
        <MenuItem key={status.statusCourseId} value={status.name}>
          {status.name}
        </MenuItem>
        
      ))}
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
        control={<Checkbox name="computers" checked={formData.equipment.computers} onChange={handleChange} disabled={!isEditingMain} />} // הוסף disabled
        label="מחשבים"
        sx={{ m: 0, mr: -1 }}
      />
      <FormControlLabel
        control={<Checkbox name="microphone" checked={formData.equipment.microphone} onChange={handleChange} disabled={!isEditingMain} />} // הוסף disabled
        label="מיקרופון"
        sx={{ m: 0 }}
      />
      <FormControlLabel
        control={<Checkbox name="projector" checked={formData.equipment.projector} onChange={handleChange} disabled={!isEditingMain} />} // הוסף disabled
        label="מקרן"
        sx={{ m: 0 }}
      />
    </Box>
  </Box>
</Box>
        </Box>

        {/* דיאלוג האישור למחיקת מפגשים עתידיים */}
{/* <Dialog
  open={showConfirmDialog}
  onClose={() => setShowConfirmDialog(false)}
  aria-labelledby="confirm-dialog-title"
  aria-describedby="confirm-dialog-description"
>
  <DialogContent>
    <Typography id="confirm-dialog-description" sx={{ mb: 2 }}>
      לנושא קיימים מפגשים עתידיים. במקרה של שינוי הסטטוס, מפגשים אלו ימחקו. האם להמשיך בשמירה?
    </Typography>
    <Box display="flex" justifyContent="flex-end" gap={1}>
      <Button
        variant="outlined"
        onClick={() => setShowConfirmDialog(false)}
      >
        ביטול
      </Button>
      <Button
        variant="contained"
        onClick={async () => {
          if (!pendingUpdateData) return;
          const updateWithForce = { ...pendingUpdateData, ForceUpdate: true };
          try {
            await updateTopic(updateWithForce);  // פה קוראים לפונקציית הקריאה ל-API
            setShowConfirmDialog(false);
            setMainSaved(true);
            onSubmit(updateWithForce);
          } catch (error) {
            console.error("שגיאה בשמירת עדכון עם ForceUpdate:", error);
          }
        }}
      >
        אישור
      </Button>
    </Box>
  </DialogContent>
</Dialog> */}


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
{/* 
      <AddDayErrorDialog
      open={isAddDayErrorOpen}
      onClose={() => setIsAddDayErrorOpen(false)}
    /> */}
    </Dialog>
  );
};

export default TopicDialog;
