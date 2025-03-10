import { borderRight, minHeight, minWidth, styled } from '@mui/system';

import { Box } from "@mui/material";
import "@fontsource/rubik";


const CalendarStyle = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "100%",
  maxWidth: "1480px",
  minHeight: "600px",
  borderRadius: "10px",
  fontFamily: "Rubik, sans-serif",
  backgroundColor: "blue",
  boxSizing: "border-box",


  "& .fc": {//מסגרת של כל הלוח כולל הימים- לבן עם צל כחול
    width: "100%",
    height: "100%",

    // width: "1480px",
    //   height: "868px",

    backgroundColor: "#FFFFFF",
    borderRadius: "10px",
    padding: "12px",
    boxShadow: "0px 0px 4px 0px #D7E6FC",
  },

  //טבלת התאריכים- ריבוע אחד גדול
  "& .fc-daygrid-body": {
    border: "none !important",
    // backgroundColor: "yellow",
    gridTemplateColumns: "repeat(7, 1fr)", // 7 עמודות - יום לכל תא
    gridAutoRows: "120px", // כל שורה תהיה בגובה אחיד
    width: "100%", // מבטיח שהתאים לא יתפרסו
    display: "flex",
  },
  "& table.fc-scrollgrid": {
    border: "none !important",
  },

  "& .fc-scrollgrid": {//, יש בצד שמאל איזה מקלון שלא הצלחי להעיף ריבוע כללי מסגרת של כל הלוח
    border: "none !important",
    outline: "none !important",
    margin: "0 !important",
    padding: "0 !important",
    borderCollapse: "collapse",
  },


  "& .fc-col-header": {//שורת כותרות הימים
    // backgroundColor: "purple",
    backgroundColor: "#F6F7F9",
  },

  "& .fc-timeGridDay-view .fc-col-header": {//להוריד את השורה "יום" בתצוגת שבוע ויום
    display: "none",
  },


  "& .fc-daygrid th  & .fc-col-header-cell": {//שורת הכותרות
    // backgroundColor: "#F6F7F9",
    textAlign: "center",
    fontWeight: "600",
    fontSize: "16px",
    color: "#333",
    borderBottom: "1px solid #C6C6C6 !important",
    borderLeft: "0.4px solid #C6C6C6 !important",
    // borderRight: "1px solid green !important",
    borderRight: "3px solid blue !important",
    borderTop: "none !important",
    width: "14.28%", // מחלק את הרוחב שווה בין 7 הימים
    boxSizing: "border-box",
  },
  "& .fc-daygrid th:first-of-type": {//כותרת שבת אין מתאר שמאלי
    borderRight: "1px solid white !important",
  },
  // "& .fc-daygrid th:first-child": {//כותרת שבת אין מתאר שמאלי
  //   borderRight: "1px solid white !important",
  // },

  "& .fc-daygrid th:last-child": {//כותרת שבת אין מתאר שמאלי
    borderLeft: "none !important",
    // borderRight: "3px solid blue !important",

  },


  "& .fc-timegrid .fc-col-header-cell": { // כותרות ימים בתצוגות שבוע/יום
    backgroundColor: "#F6F7F9 !important", // החלת צבע רקע גם בתצוגת שבוע
    borderBottom: "1px solid #C6C6C6 !important",
  },





  "& .fc-daygrid td": {//- במצב חחודש זה מה שהוריד את הגבול האפור מריבוע הימים
    border: "none !important",
  },


  "& .fc-daygrid": {
    border: "none !important",
  },

  "& .fc-daygrid-body tr td": {//שבוע- שורה
    paddingTop: "10px",
  },

  "& .fc-daygrid-day": {// יש רווח שמאלי לכל יום בשבוע
    border: "none",
    paddingLeft: "10px",
    overflow: "hidden",
  },
  "& .fc-daygrid-day:last-child": {//ליום האחרון בשבוע אין רווח שמאלי
    paddingLeft: "0 !important",
  },




  "& .fc-daygrid-day-frame": {//עיצוב תא

    // minWidth: "197.414px !important",
    minHeight: "142px !important",

    border: "0.5px solid #C6C6C6", // גבול על כל התא
    borderRadius: "10px",
    overflow: "hidden",
    height: "100%", // גובה אחיד
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    boxSizing: "border-box",
    padding: "4px",
  },






// //מיקום התאריכים העברי והלועזי בתא
//   "& .fc-daygrid-day-number": { 
//   position: "absolute",
//   top: "5px",
//   left: "5px",
//   fontSize: "14px", 
//   fontWeight: "bold",
//   color: "#333",
// },

// "& .hebrew-letter": { 
//   position: "absolute",
//   top: "5px",
//   right: "5px",
//   fontSize: "14px",
//   fontWeight: "bold",
//   color: "#333",
// },





  "& .fc-day-today": {//ובתצוגה שבועית כותרת התאריך בתצוגה חודשית התאריך של היום
    backgroundColor: "white !important",
  },

//נסיון לעשות רקע כחול בהיר ליום הזה אבל זה לא משפיע
//   "& .fc-day-today .fc-daygrid-day-frame": {
//   backgroundColor: "green !important", 
//   border: "2px solid #326DEF !important",
//   borderRadius: "12px",
// },


  "& .fc-timegrid-col.fc-day-today": {//העמודה של היום
    backgroundColor: "white !important",
  },

  "& .fc-day-today .fc-daygrid-day-frame": {//מסגרת התאריך של היום
    border: "2px solid #326DEF !important", // מגדיר גבול כחול
    borderRadius: "12px", // פינות מעוגלות
  },



  // עיצוב לתצוגות שבוע ויום

  "& .fc th":{//שורת כותרות הימים
    borderRight:"none",
  },


  "& .fc-timegrid-axis": {//- הריבוע בין הכותרת העליונה לכותרת השעות כולל גם עמודת השעות
    // width: "120px !important", // רוחב קבוע לעמודת השעות
    // height: "40px !important",

    backgroundColor: "white",
    border: "1px solid white !important",
  },

  "& .fc-timegrid-slot": {//שורות הטבלה
    // backgroundColor: "green",
    borderColor: "#C6C6C6",
    height: "40px",
    width: "100% !important",

  },

  



  "& .fc-timegrid-slot-label": {//תוכן התאריכים
    width: "120px !important", // רוחב קבוע לעמודת השעות
    height: "40px !important",
    // boxSizing: "border-box",
    // width: "120px!important",
    // backgroundColor: "blue",

    borderBottom: "1px solid #C6C6C6 !important",
    borderLeft: "1px solid #ffffff !important",

    textAlign: "center !important", // יישור מרכזי של השעות
    fontFamily: "Rubik, sans-serif", // הפונט הנדרש
    fontWeight: "500 !important", // עובי פונט
    fontSize: "14px !important", // גודל הפונט
    lineHeight: "16.59px !important",
    color: "#393939 !important", // צבע טקסט
    paddingTop: "10px !important",
    paddingBottom: "10px !important",
    paddingLeft: "14px !important",
    paddingRight: "14px !important",

  },


  "& .fc-timegrid .fc-timegrid-body td": {
    border: "1px solid #F0F1F3",

  },

  "& .fc-theme-standard td": {
    border: "none ",
  },



  //אירוע
  "& .fc-v-event": {//להוריד את הרקע הכחול מאחורה
    minWidth: "71.25px",
    minHeight: "10.17px",
    backgroundColor: "transparent !important",
    border: "none !important",
  },



  




}));


  // עיצוב רספונסיביות לכפתורי תצוגה
const ButtonsContainer = styled(Box)({
  display: "flex",
  flexWrap: "nowrap",
  overflowX: "auto",
  maxWidth: "100%",
  justifyContent: "center",
  gap: "8px",
  padding: "10px",
});

const ButtonStyle = styled("button")({
  minWidth: "60px", // רוחב מינימלי קטן יותר
  flexShrink: 1, // מאפשר לכפתור להתכווץ
  whiteSpace: "nowrap",
  padding: "6px 12px", // padding קטן יותר במסכים קטנים
  backgroundColor: "#326DEF",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "14px", // גודל טקסט קטן יותר
  "@media (max-width: 600px)": {
    fontSize: "12px", // גודל טקסט קטן במסכים קטנים מאוד
    padding: "4px 8px", // padding קטן יותר במסכים קטנים
  },
});


export {CalendarStyle, ButtonsContainer, ButtonStyle} ;


