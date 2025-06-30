/*
//import { fetchAllUsers } from '../features/user/userAction';
//import { fetchAllCourses } from '../features/course/courseActions';
//import { fetchAllTopic } from '../features/topic/topicActions';
import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Box, Typography, Grid, FormControl, InputLabel, MenuItem, Select, FormHelperText} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
//import { fetchAllUsers } from '../features/user/userAction';
//import { fetchAllCourses } from '../features/course/courseActions';
//import { fetchAllTopic } from '../features/topic/topicActions';
import {addMeetingAction} from '../features/meeting/meetingActions';
import {useNavigate} from 'react-router-dom';


const AddMeeting = ({ existingMeeting, onClose }) => {

    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.user.currentUser || []);
    const canEdit = [1,2,3,4].includes(currentUser?.userTypeId);

    const [isEditMode, setIsEditMode] = useState(false);
    const [isSystemPart, setIsSystemPart] = useState(false);  // ברירת מחדל


    useEffect(() => {
      if (existingMeeting) {
        setMeeting(existingMeeting);
        setIsSystemPart(existingMeeting.isSystemPart);  // עדכון state אחרי שה-meeting מתעדכן
        setIsEditMode(true);
      }
    }, [existingMeeting]);
    //const courses = useSelector(state => state.course.courses || []);
    //const topics = useSelector(state => state.topic.topics || []);

    const [meeting, setMeeting] = useState({
        meetingId: '',
        topicId: '',
        topicName: '',  
        courseId: '',
        courseName: '',
        lecturerId: '', 
        lecturerName: '',
        startTime: '',
        endTime: '',
        roomId: '',
        year: '',
        date: '',
        isSystemPart: false,
        reason: '',
        status: '',
    });

    /*
   useEffect(() => {
           dispatch(fetchAllUsers());
           dispatch(fetchAllCourses());
       }, [dispatch]);

               <Grid item>
  <FormControl sx={{ ...textFieldStyle }} error={!!validationErrors.lecturerId}>
    <InputLabel>שם מרצה</InputLabel>
    <Select
      name="lecturerName"
      value={meeting.lecturerName || ''}
      onChange={handleChange}
      required
    >
      <MenuItem value="">בחר מרצה</MenuItem>
      {users?.filter(user => user.userTypeId === 4).map(lecturer => (
        <MenuItem key={lecturer-${lecturer.id}} value={lecturer.id}>
          {lecturer.name}
        </MenuItem>
      ))}
    </Select>
    {validationErrors.lecturerName && (
      <FormHelperText>{validationErrors.lecturerName}</FormHelperText>
    )}
  </FormControl>
</Grid>
       
    <Grid item>
    <TextField
        label="מספר מפגש"
        name="meetingId"
        value={meeting.meetingId}
        onChange={handleChange}
        error={!!validationErrors.meetingId}
        helperText={validationErrors.meetingId}
        margin="normal"
        required
        variant="outlined"
        sx={textFieldStyle}
    />
</Grid>

        

    //כפתור ביטול
    const showCancelButton = true;

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMeeting(prev => ({
            ...prev,
            [name]: value || ''
        }));
    };
=======
// import React, { useEffect, useState } from 'react';
// import {
//   TextField,
//   Button,
//   Container,
//   Box,
//   Typography,
//   Grid,
//   Autocomplete
// } from '@mui/material';
// import { useDispatch, useSelector } from 'react-redux';
// import { addMeetingAction } from '../features/meeting/meetingActions';
// import { useNavigate } from 'react-router-dom';
// import { fetchAllCourses } from '../features/course/courseActions';
// import { fetchAllUsers } from '../features/user/userAction';
// import { fetchAllRooms } from '../features/room/roomActions';
// import { fetchAllTopic } from '../features/topic/topicActions';
// import dayjs from 'dayjs';
// import { Snackbar, Alert } from '@mui/material';


>>>>>>> 4dccfdd3d396db4d02df10d49b9aff1fefe91910


// const AddMeeting = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const rooms = useSelector(state => state.room.rooms || []);
//   const meetings = useSelector(state => state.meeting.meetings || []);
//   const courses = useSelector(state => state.course.courses || []);
//   const topics = useSelector(state => state.topic.topics || []);
//   const users = useSelector(state => state.user.user || []);

//   useEffect(() => {
//     dispatch(fetchAllRooms());
//     dispatch(fetchAllCourses());
//     dispatch(fetchAllTopic());
//     dispatch(fetchAllUsers());
//   }, [dispatch]);

<<<<<<< HEAD
    const [validationErrors, setValidationErrors] = useState({});

   

    
    const handleSaveMeeting = () => {
    const requiredFields = {
        meetingId: 'מספר מפגש',
        topicName: 'שם נושא',
        courseName: 'שם קורס',
        lecturerName: 'שם מרצה',
        roomId: 'מספר חדר',
        date: 'תאריך',
        year: 'שנה',
        startTime: 'שעת התחלה',
        endTime: 'שעת סיום'
    };

    const errors = {};
    Object.keys(requiredFields).forEach(field => {
        if (!meeting[field]) {
            errors[field] = `${requiredFields[field]} - שדה חובה`;
        }
    });
    

    setValidationErrors(errors);

    if (Object.keys(errors).length === 0) {
        dispatch(addMeetingAction(meeting))
            .then((response) => {
                console.log('המפגש נשמר בהצלחה במסד הנתונים:', response);
                
                // Clear form
                setMeeting({
                    meetingId: '',
                    topicId: '',
                    topicName: '',
                    courseId: '',
                    courseName: '',
                    lecturerId: '',
                    lecturerName: '',
                    startTime: '',
                    endTime: '',
                    roomId: '',
                    year: '',
                    date: '',
                    isSystemPart: false, 
                    reason: '',
                    status: '', 
                });
                
                // Show success message
                alert('המפגש נוסף בהצלחה למערכת!');
            })
            .catch((error) => {
                alert('שגיאה בשמירת המפגש במערכת');
            });
    }
};


  // סגנון משותף לכל שדות הטקסט
  const textFieldStyle = {
    width: 200,
    height: 45,
    '& .MuiInputBase-root': {
      height: 45,
    },
    '& .MuiOutlinedInput-root': {
      height: 45,
      '& fieldset': {
        borderBottom: '1px solid #C6C6C6',
        borderTop: 'none',
        borderLeft: 'none',
        borderRight: 'none',
        borderRadius: 0,
      },
      '&:hover fieldset': {
        borderBottom: '1px solid #C6C6C6',
      },
      '&.Mui-focused fieldset': {
        borderBottom: '1px solid #C6C6C6',
      },
    },
    '& .MuiInput-underline:before': {
        borderBottom: '1px solid #C6C6C6',
      },
      '& .MuiInput-underline:after': {
        borderBottom: '1px solid #C6C6C6',
      },
    };
=======
>>>>>>> 4dccfdd3d396db4d02df10d49b9aff1fefe91910
  
//   const [meeting, setMeeting] = useState({
//     topicId: '',
//     topicName: '',
//     courseId: '',
//     courseName: '',
//     lecturerId: '',
//     lecturerName: '',
//     startTime: '',
//     endTime: '',
//     roomId: '',
//     year: '',
//     date: ''
//   });

//   const [validationErrors, setValidationErrors] = useState({});


//    const [snackbar, setSnackbar] = useState({
//     open: false,
//     message: '',
//     severity: 'success'
//   });

<<<<<<< HEAD
        <>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: '0px', mb: 2 }}>
        <Button
                variant="outlined"
                onClick={handleCancel}
                sx={cancelButtonStyle}
            >
                ביטול
            </Button>
            <Button
                variant="contained"
                onClick={handleSaveMeeting}
                sx={saveButtonStyle}
            >
                שמור
            </Button>
        </Box>

       
      <br/> <br/> <br/> <br/> 
        <Container
      maxWidth="lg"
      sx={{
        width: '100%',
        maxWidth: '1476px',
        height: 'auto',
        backgroundColor: '#FFFFFF',
        borderRadius: '10px',
        padding: '30px',
        boxShadow: '0px 0px 4px 0px #DCE2ECCC',
        marginTop: '20px',
        boxSizing: 'border-box',
      }}
=======
>>>>>>> 4dccfdd3d396db4d02df10d49b9aff1fefe91910

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setMeeting((prev) => ({
//       ...prev,
//       [name]: value || ''
//     }));
//   };

//   const handleCancel = () => {
//     navigate(-1);
//   };

//   const handleSaveMeeting = () => {
//     const requiredFields = {
//       topicName: 'שם נושא',
//       courseName: 'שם קורס',
//       lecturerName: 'שם מרצה',
//       roomId: 'מספר חדר',
//       date: 'תאריך',
//       year: 'שנה',
//       startTime: 'שעת התחלה',
//       endTime: 'שעת סיום'
//     };

//     const errors = {};
//     Object.keys(requiredFields).forEach((field) => {
//       if (!meeting[field]) {
//         errors[field] = `${requiredFields[field]} - שדה חובה`;
//       }
//     });

//     setValidationErrors(errors);

//     if (Object.keys(errors).length === 0) {
//       const formattedMeeting = {
//         topicId: Number(meeting.topicId),
//         courseId: Number(meeting.courseId),
//         lecturerId: Number(meeting.lecturerId),
//         roomId: Number(meeting.roomId),

//         startTime: meeting.startTime+ ":00",
//         endTime: meeting.endTime+ ":00",
//         meetingDate: dayjs(meeting.date).format("YYYY-MM-DD"),
//         meetingNumberForTopic: Number(meeting.meetingNumberForTopic),
//         isValid: true,
//         isPartOfSchedule: false,
//       };


//      dispatch(addMeetingAction(formattedMeeting))
//         .then(() => {
//           setSnackbar({
//             open: true,
//             message: 'המפגש נוסף בהצלחה למערכת!',
//             severity: 'success'
//           });
//           setMeeting({
//             meetingId: '',
//             topicId: '',
//             topicName: '',
//             courseId: '',
//             courseName: '',
//             lecturerId: '',
//             lecturerName: '',
//             startTime: '',
//             endTime: '',
//             roomId: '',
//             year: '',
//             date: ''
//           });
//         })
//         .catch(() => {
//           setSnackbar({
//             open: true,
//             message: 'שגיאה בשמירת המפגש במערכת',
//             severity: 'error'
//           });
//         });
//     }
//   };

  

//   const textFieldStyle = {
//     width: 200,
//     height: 45,
//     '& .MuiInputBase-root': {
//       height: 45
//     },
//     '& .MuiOutlinedInput-root': {
//       height: 45,
//       '& fieldset': {
//         borderBottom: '1px solid #C6C6C6',
//         borderTop: 'none',
//         borderLeft: 'none',
//         borderRight: 'none',
//         borderRadius: 0
//       },
//       '&:hover fieldset': {
//         borderBottom: '1px solid #C6C6C6'
//       },
//       '&.Mui-focused fieldset': {
//         borderBottom: '1px solid #C6C6C6'
//       }
//     }
//   };

//   const cancelButtonStyle = {
//     width: '83px',
//     height: '44px',
//     position: 'relative',
//     top: '84px',
//     left: '130px',
//     borderRadius: '50px',
//     border: '1px solid #326DEF',
//     paddingRight: '24px',
//     paddingLeft: '24px',
//     color: '#326DEF',
//     backgroundColor: 'transparent',
//     textTransform: 'none',
//     fontWeight: 'normal'
//   };

//   const saveButtonStyle = {
//     width: '82px',
//     height: '44px',
//     position: 'relative',
//     top: '84px',
//     left: '80px',
//     borderRadius: '50px',
//     paddingRight: '24px',
//     paddingLeft: '24px',
//     backgroundColor: '#326DEF',
//     textTransform: 'none',
//     '&:hover': {
//       backgroundColor: '#326DEF'
//     }
//   };

//   return (
//     <>
//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={3000}
//         onClose={() => setSnackbar({ ...snackbar, open: false })}
//         anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
//       >
//         <Alert
//           onClose={() => setSnackbar({ ...snackbar, open: false })}
//           severity={snackbar.severity}
//           sx={{ width: '100%' }}
//         >
//           {snackbar.message}
//         </Alert>
//       </Snackbar>

//       <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: '0px', mb: 2 }}>
//         <Button variant="outlined" onClick={handleCancel} sx={cancelButtonStyle}>
//           ביטול
//         </Button>
//         <Button variant="contained" onClick={handleSaveMeeting} sx={saveButtonStyle}>
//           שמור
//         </Button>
//       </Box>

//       <Container
//         maxWidth="lg"
//         sx={{
//           maxWidth: '1476px',
//           backgroundColor: '#FFFFFF',
//           borderRadius: '10px',
//           padding: '30px',
//           boxShadow: '0px 0px 4px 0px #DCE2ECCC',
//           marginTop: '20px'
//         }}
//       >
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
//           <Typography variant="h6" component="h2">
//             פרטים טכניים
//           </Typography>
//         </Box>

//         <form>
//           <Grid container spacing={4} sx={{ flexWrap: 'wrap' }}>
//             <Grid item>
//               <Autocomplete
//                 options={topics}
//                 getOptionLabel={(option) => option.name}
//                 value= {topics.find(t => t.topicId === meeting.topicId) || null}
//                 onChange={(e, newValue) => {
//                   setMeeting((prev) => ({
//                     ...prev,
//                     topicName: newValue?.name || '',
//                     topicId: newValue?.topicId || '',
//                     meetingNumberForTopic:  newValue?.numberOfMeetings || '',
//                   }));
//                 }}
//                 renderInput={(params) => (
//                   <TextField
//                     {...params}
//                     label="שם נושא"
//                     error={!!validationErrors.topicName}
//                     helperText={validationErrors.topicName}
//                     sx={textFieldStyle}
//                     required
//                   />
//                 )}
//               />
//             </Grid>

//             <Grid item>
//               <Autocomplete
//                 options={courses}
//                 getOptionLabel={(option) => option.name}
//                 value={courses.find(c => c.courseId === meeting.courseId) || null}
//                 onChange={(e, newValue) => {
//                   setMeeting((prev) => ({
//                     ...prev,
//                     courseName: newValue?.name || '',
//                     courseId: newValue?.courseId || ''
//                   }));
//                 }}
//                 renderInput={(params) => (
//                   <TextField
//                     {...params}
//                     label="שם קורס"
//                     error={!!validationErrors.courseName}
//                     helperText={validationErrors.courseName}
//                     sx={textFieldStyle}
//                     required
//                   />
//                 )}
//               />
//             </Grid>

//             <Grid item>
//               <Autocomplete
//           options={users.filter(user => user.userType?.userTypeId === 4)}
//           getOptionLabel={(option) => option.name}
//           value={users.find(u => u.userId === meeting.lecturerId) || null}
//           onChange={(e, newValue) => {
//             setMeeting((prev) => ({
//               ...prev,
//               lecturerName: newValue?.name || '',
//               lecturerId: newValue?.userId || ''
//             }));
//           }}
//           renderInput={(params) => (
//     <TextField
//       {...params}
//       label="שם מרצה"
//       error={!!validationErrors.lecturerName}
//       helperText={validationErrors.lecturerName}
//       sx={textFieldStyle}
//       required
//     />
//   )}
// />

//             </Grid>

//             <Grid item>
//              <Autocomplete
//   options={rooms}
//   getOptionLabel={(option) => option.name}
//   value={rooms.find(r => r.roomId === meeting.roomId) || null}
//   onChange={(e, newValue) => {
//     setMeeting((prev) => ({
//       ...prev,
//       roomId: newValue?.roomId || ''
//     }));
//   }}
//   renderInput={(params) => (
//     <TextField
//       {...params}
//       label="מספר חדר"
//       error={!!validationErrors.roomId}
//       helperText={validationErrors.roomId}
//       sx={textFieldStyle}
//       required
//     />
//   )}
// />

//             </Grid>

//             <Grid item>
//               <TextField
//                 label="תאריך"
//                 name="date"
//                 type="date"
//                 value={meeting.date}
//                 onChange={handleChange}
//                 error={!!validationErrors.date}
//                 helperText={validationErrors.date}
//                 InputLabelProps={{ shrink: true }}
//                 variant="outlined"
//                 sx={textFieldStyle}
//                 required
//               />
//             </Grid>

//             <Grid item>
//               <TextField
//                 label="שנה"
//                 name="year"
//                 value={meeting.year}
//                 onChange={handleChange}
//                 error={!!validationErrors.year}
//                 helperText={validationErrors.year}
//                 variant="outlined"
//                 sx={textFieldStyle}
//                 required
//               />
//             </Grid>

//             <Grid item>
//               <TextField
//                 label="שעת התחלה"
//                 name="startTime"
//                 type="time"
//                 value={meeting.startTime}
//                 onChange={handleChange}
//                 error={!!validationErrors.startTime}
//                 helperText={validationErrors.startTime}
//                 InputLabelProps={{ shrink: true }}
//                 variant="outlined"
//                 sx={textFieldStyle}
//                 required
//               />
//             </Grid>

//             <Grid item>
//               <TextField
//                 label="שעת סיום"
//                 name="endTime"
//                 type="time"
//                 value={meeting.endTime}
//                 onChange={handleChange}
//                 error={!!validationErrors.endTime}
//                 helperText={validationErrors.endTime}
//                 InputLabelProps={{ shrink: true }}
//                 variant="outlined"
//                 sx={textFieldStyle}
//                 required
//               />
//             </Grid>
//           </Grid>
//         </form>
//       </Container>
//     </>
//   );
// };

<<<<<<< HEAD

    //const users = useSelector(state => state.user.user || []);
    //const courses = useSelector(state => state.course.courses || []);
    //const topics = useSelector(state => state.topic.topics || []);

    

    /*
   useEffect(() => {
           dispatch(fetchAllUsers());
           dispatch(fetchAllCourses());
       }, [dispatch]);

               <Grid item>
  <FormControl sx={{ ...textFieldStyle }} error={!!validationErrors.lecturerId}>
    <InputLabel>שם מרצה</InputLabel>
    <Select
      name="lecturerName"
      value={meeting.lecturerName || ''}
      onChange={handleChange}
      required
    >
      <MenuItem value="">בחר מרצה</MenuItem>
      {users?.filter(user => user.userTypeId === 4).map(lecturer => (
        <MenuItem key={`lecturer-${lecturer.id}`} value={lecturer.id}>
          {lecturer.name}
        </MenuItem>
      ))}
    </Select>
    {validationErrors.lecturerName && (
      <FormHelperText>{validationErrors.lecturerName}</FormHelperText>
    )}
  </FormControl>
</Grid>
       
    <Grid item>
    <TextField
        label="מספר מפגש"
        name="meetingId"
        value={meeting.meetingId}
        onChange={handleChange}
        error={!!validationErrors.meetingId}
        helperText={validationErrors.meetingId}
        margin="normal"
        required
        variant="outlined"
        sx={textFieldStyle}
    />
</Grid>
*/
        

    
// export default AddMeeting;
