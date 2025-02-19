// import * as React from "react";
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";
// import Select from "@mui/material/Select";
// import TextField from "@mui/material/TextField";
// import { Box, Button } from "@mui/material";
// import SearchIcon from "@mui/icons-material/Search";
// import DeleteIcon from "@mui/icons-material/Delete";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore"; // חץ מותאם לצד שמאל
// import { useDispatch, useSelector } from "react-redux";
// import { useEffect } from "react";
// import { fetchAllTopics } from "../features/topic/topicActions";

// export default function SelectVariants() {
//   const dispatch = useDispatch();
//   const { topics, status, error } = useSelector((state) => state.topic);

//   useEffect(() => {
//     debugger;
//     if (status === "idle") {
//       dispatch(fetchAllTopics());
//     }
//   }, [status, dispatch]);
//   useEffect(() => {
//     console.log("Redux Topics Updated:", topics);
//   }, [topics]);
//   const [topic, setTopic] = React.useState("");
//   const [lecturer, setLecturer] = React.useState("");

//   const handleChange = (event) => {
//     setTopic(event.target.value);
//   };

//   return (
//     <div>
//       {console.log(topics)}
//       {error ? <h1>{error}</h1> : <></>}
//       <Box sx={{ width: "100%" }}>
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             marginTop: 2,
//             backgroundColor: "#F5F5F5",
//             padding: "10px",
//           }}
//         >
//           {/* רכיבים מצד ימין */}
//           <Box sx={{ display: "flex", gap: 2 }}>
//             {/* Select עם כיוון טקסט לימין וחץ בצד שמאל */}
//             <FormControl
//               variant="standard"
//               sx={{ minWidth: 120, textAlign: "right", direction: "rtl" }}
//             >
//               <InputLabel id="select-topic-label">נושא</InputLabel>
//               <Select
//                 labelId="select-topic-label"
//                 id="select-topic"
//                 value={topic}
//                 onChange={handleChange}
//                 IconComponent={(props) => (
//                   <ExpandMoreIcon {...props} sx={{ marginRight: "auto" }} />
//                 )} // חץ בצד שמאל
//                 sx={{
//                   textAlign: "right",
//                   direction: "rtl",
//                   "& .MuiSelect-select": { textAlign: "right" }, // יישור המלל לימין
//                 }}
//               >
//                 {topics.map((item) => (
//                   <MenuItem key={item.topicId} value={item.name}>
//                     {item.name}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>

//             {/* שדה טקסט רגיל במקום Select של שם מרצה */}
//             <TextField
//               variant="standard"
//               label="שם מרצה"
//               value={lecturer}
//               onChange={(e) => setLecturer(e.target.value)}
//               sx={{ textAlign: "right", direction: "rtl", minWidth: 120 }}
//             />
//           </Box>

//           {/* כפתורים בצד שמאל */}
//           <Box sx={{ display: "flex", gap: "20px" }}>
//             <Button
//               variant="contained"
//               startIcon={<DeleteIcon />}
//               sx={{
//                 backgroundColor: "blue",
//                 color: "white",
//                 borderRadius: "50px",
//                 padding: "12px 20px",
//                 minWidth: "150px",
//                 fontSize: "18px",
//                 display: "flex",
//                 justifyContent: "center",
//                 gap: "8px",
//                 textTransform: "none",
//                 direction: "rtl",
//                 "&:hover": {
//                   backgroundColor: "darkblue",
//                 },
//               }}
//             >
//               ניקוי חיפוש
//             </Button>

//             <Button
//               variant="contained"
//               startIcon={<SearchIcon />}
//               sx={{
//                 backgroundColor: "blue",
//                 color: "white",
//                 borderRadius: "50px",
//                 padding: "12px 20px",
//                 minWidth: "150px",
//                 fontSize: "18px",
//                 display: "flex",
//                 justifyContent: "center",
//                 gap: "8px",
//                 textTransform: "none",
//                 direction: "rtl",
//                 "&:hover": {
//                   backgroundColor: "darkblue",
//                 },
//               }}
//             >
//               חיפוש
//             </Button>
//           </Box>
//         </Box>
//       </Box>
//     </div>
//   );
// }
import * as React from "react";
import {
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltOffOutlinedIcon from "@mui/icons-material/FilterAltOffOutlined";
import { useDispatch, useSelector } from "react-redux";
import { fetchCoordinators } from "../features/user/userAction";
import { useState } from "react";
import { fetchAllTopics } from "../features/topic/topicActions";
import { useEffect } from "react";

// סטייל לשדות בחירה
const sharedStyles = {
  width: "150px",
  height: "43px",
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

// סטייל לכפתורים
const buttonStyles = {
  width: "109px",
  height: "44px",
  gap: "8px",
  borderRadius: "50px",
  boxShadow: "none",
  fontFamily: "Rubik",
  fontWeight: 400,
  fontSize: "16px",
  lineHeight: "18.96px",
};

const TopicsSearch = () => {
  const dispatch = useDispatch();
    const { topics, status, error } = useSelector((state) => state.topic);
    const initialState = {
      topicName: "",
      lecturerName: ""
    };
  
    const [filters, setFilters] = useState(initialState);

    useEffect(() => {
      debugger;
      if (status === "idle") {
        dispatch(fetchAllTopics());
      }
    }, [status, dispatch]);
 



  // פונקציה לטיפול במיקוד בשדה השנה
  const handleYearFocus = () => {
    if (!filters.year) {
    }
  };

  // פונקציה לטיפול בשינוי ערך בשדה השנה
  const handleYearChange = (e) => {
    const value = e.target.value;
    if (
      value === "" ||
      (/^\d+$/.test(value) && value >= 2016 && value <= 2050)
    ) {
      setFilters((prevFilters) => ({ ...prevFilters, year: value }));
    }
  };

  // פונקציה לטיפול בשינוי ערך בשדה קוד הקורס
  const handleCourseCodeChange = (e) => {
    const value = e.target.value;
    if (value === "" || (/^\d+$/.test(value) && value > 0)) {
      setFilters((prevFilters) => ({ ...prevFilters, courseCode: value }));
    }
  };

  return (
    <Box
      sx={{
        width: "90%",
        margin: "auto",
        position: "relative",
        top: "100px",
        borderRadius: "10px",
        padding: "25px 24px",
        backgroundColor: "white",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        fontFamily: "Rubik",
        fontWeight: 400,
        fontSize: "16px",
        lineHeight: "18.96px",
        textAlign: "right",
        direction: "rtl",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          gap: "30px",
          flexWrap: "wrap",
          flex: 1,
          marginRight: "auto",
        }}
      >
        {/* נושא - מתוך רשימה */}
        <FormControl variant="standard" sx={sharedStyles}>
          <InputLabel>נושא</InputLabel>
          <Select
            value={filters.topics}
            onChange={(e) =>
              setFilters({ ...filters, topic: e.target.value })
            }
            sx={sharedStyles}
          >
            {topics?.map((topic) => (
              <MenuItem key={topic.topicId} value={topic.name}>
                {topic.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* שם מרצה  - טקסט */}
        <TextField
          label="שם מרצה"
          variant="standard"
          sx={sharedStyles}
          value={filters.courseName}
          onChange={(e) => setFilters({ ...filters, courseName: e.target.value })}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: "15px",
          marginLeft: "auto",
        }}
      >
        {/* ניקוי כל השדות לברירת המחדל */}
        <Button
          variant="contained"
          sx={buttonStyles}
          startIcon={<FilterAltOffOutlinedIcon />}
          onClick={() => setFilters(initialState)}
        >
          ניקוי
        </Button>

        {/* חיפוש */}
        <Button
          variant="contained"
          sx={buttonStyles}
          startIcon={<SearchIcon />}
        >
          חיפוש
        </Button>
      </Box>
    </Box>
  );
};

export default TopicsSearch;
