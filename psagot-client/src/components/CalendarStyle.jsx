import { styled } from '@mui/system';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

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

  //מסגרת של כל הלוח כולל הימים- לבן עם צל כחול
  "& .fc": {
    width: "100%",
    height: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: "10px",
    padding: "12px",
    boxShadow: "0px 0px 4px 0px #D7E6FC",
  },

  //טבלת התאריכים- ריבוע אחד גדול
  "& .fc-daygrid-body": {
    border: "none !important",
    gridTemplateColumns: "repeat(7, 1fr)", // 7 עמודות - יום לכל תא
    gridAutoRows: "120px", // כל שורה תהיה בגובה אחיד
    width: "100%", // מבטיח שהתאים לא יתפרסו
    display: "flex",
  },

  //, יש בצד שמאל איזה מקלון שלא הצלחי להעיף ריבוע כללי מסגרת של כל הלוח
  "& .fc-scrollgrid": {
    border: "none !important",
    outline: "none !important",
    margin: "0 !important",
    padding: "0 !important",
    borderCollapse: "collapse",
  },

  //שורת כותרות הימים
  "& .fc-col-header": {
    backgroundColor: "#F6F7F9",
  },

  //להוריד את השורה "יום" בתצוגת שבוע ויום
  "& .fc-timeGridDay-view .fc-col-header": {
    display: "none",
  },

  //שורת הכותרות
  "& .fc-daygrid th  & .fc-col-header-cell": {
    textAlign: "center",
    fontWeight: "600",
    fontSize: "16px",
    color: "#333",
    borderBottom: "1px solid #C6C6C6 !important",
    borderLeft: "0.4px solid #C6C6C6 !important",
    borderRight: "3px solid blue !important",
    borderTop: "none !important",
    width: "14.28%", // מחלק את הרוחב שווה בין 7 הימים
    boxSizing: "border-box",
  },

  //כותרת שבת אין מתאר שמאלי
  "& .fc-daygrid th:first-of-type": {
    borderRight: "1px solid white !important",
  },

  //כותרת שבת אין מתאר שמאלי
  "& .fc-daygrid th:last-child": {
    borderLeft: "none !important",
  },

  // כותרות ימים בתצוגות שבוע/יום
  "& .fc-timegrid .fc-col-header-cell": { 
    backgroundColor: "#F6F7F9 !important",
    borderBottom: "1px solid #C6C6C6 !important",
  },

  //ריבוע שעוטף את כל טבלת הימים , לא כולל ימות השבוע
  "& .fc-daygrid td": {
    border: "none !important",
  },

  //תא בטבלה תצוגה חודשית
  "& .fc-daygrid": {
    border: "none !important",
  },

  //שבוע- שורה
  "& .fc-daygrid-body tr td": {
    paddingTop: "10px",
  },

  // יש רווח שמאלי לכל יום בשבוע
  "& .fc-daygrid-day": {
    border: "none",
    paddingLeft: "10px",
    overflow: "hidden",
  },

  //ליום האחרון בשבוע אין רווח שמאלי
  "& .fc-daygrid-day:last-child": {
    paddingLeft: "0 !important",
  },

  //עיצוב תא
  "& .fc-daygrid-day-frame": {
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

  "& .fc-day-today": {//ובתצוגה שבועית כותרת התאריך בתצוגה חודשית התאריך של היום
    backgroundColor: "white !important",
  },

  //העמודה של היום
  "& .fc-timegrid-col.fc-day-today": {
    backgroundColor: "white !important",
  },

  //מסגרת התאריך של היום
  "& .fc-day-today .fc-daygrid-day-frame": {
    border: "2px solid #326DEF !important", // מגדיר גבול כחול
    borderRadius: "12px", // פינות מעוגלות
  },

  // עיצוב לתצוגות שבוע ויום

  "& .fc th":{//שורת כותרות הימים
    borderRight:"none",
  },


  "& .fc-timegrid-axis": {//- הריבוע בין הכותרת העליונה לכותרת השעות כולל גם עמודת השעות
    backgroundColor: "white",
    border: "1px solid white !important",
  },

  "& .fc-timegrid-slot": {//שורות הטבלה
    borderColor: "#C6C6C6",
    height: "40px",
    width: "100% !important",
  },

  //עמודת השעות
  "& .fc-timegrid-slot-label": {
    width: "120px !important",
    height: "40px !important",
    borderBottom: "1px solid #C6C6C6 !important",
    borderLeft: "1px solid #ffffff !important",
    textAlign: "center !important", 
    fontFamily: "Rubik, sans-serif",
    fontWeight: "500 !important",
    fontSize: "14px !important",
    lineHeight: "16.59px !important",
    color: "#393939 !important", 
    paddingTop: "10px !important",
    paddingBottom: "10px !important",
    paddingLeft: "14px !important",
    paddingRight: "14px !important",
  },

  //פסים לרוחב בתצוגות שבוע ויום
  "& .fc-timegrid .fc-timegrid-body td": {
    border: "1px solid #F0F1F3",

  },

  //אירוע
  "& .fc-v-event": {
    minWidth: "71.25px",
    minHeight: "10.17px",
    backgroundColor: "transparent !important",
    border: "none !important",
  },

  //מוריד גבול ימני בתצוגות שבוע ויום
  "& .fc-theme-standard td": {
    border: "none ",
  },

}));


  //  קומפוננטת CalendarHeader
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
  minWidth: "60px",
  flexShrink: 1, // מאפשר לכפתור להתכווץ
  whiteSpace: "nowrap",
  padding: "6px 12px", // padding קטן יותר במסכים קטנים
  backgroundColor: "#326DEF",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "14px",
  "@media (max-width: 600px)": {
    fontSize: "12px", // גודל טקסט קטן במסכים קטנים מאוד
    padding: "4px 8px", // padding קטן יותר במסכים קטנים
  },
});




//קומפוננטת Calendar

const dayInWeekHeaderStyle = {
  textAlign: "center",
  fontSize: "16px",
  fontWeight: "600",
  padding: "8px",
  backgroundColor: "#F8F9FC",
  width: "65px", // רוחב קבוע לכל כותרת יום
};

const dayCellStyle = {
  display: "flex !important",
  flexDirection: "row !important",
  justifyContent: "space-between !important",
  alignItems: "center !important",
  flexWrap: "nowrap !important",
  width: "100% !important",
  padding: "6px !important",
  boxSizing: "border-box !important",
};

const hebrewDateStyle = {
  color: "#333 !important",
  textAlign: "right !important",
  fontFamily: "Rubik !important",
  fontWeight: "500 !important",
  fontSize: "16px !important",
  direction: "rtl !important",
  width: "auto !important",
  marginLeft: "60px",
};

const gregorianDateStyle = {
  color: "#555 !important",
  textAlign: "left !important",
  fontFamily: "Rubik !important",
  fontWeight: "500 !important",
  fontSize: "16px !important",
  direction: "ltr !important",
  width: "auto !important",
  marginRight: "60px",
};




//עיצוב האירוע
const StyledEventBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isMonthView",
})(({ color, borderColor, isMonthView }) => ({
  backgroundColor: color || "#ffccf3",
  fontFamily: "Rubik",
  color: "black",
  padding: "6px",
  borderRadius: "5px",
  borderRight: `3px solid ${borderColor || "#ff00b4"}`,
  textAlign: "center",
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
  whiteSpace: "normal",
  wordBreak: "keep-all",
  textOverflow: "ellipsis",
  fontSize: isMonthView ? "6px" : "inherit",
  ...(isMonthView && {
    maxHeight: "19.17px",
    minHeight: "19.17px",
    lineHeight: "19.17px",
    whiteSpace: "nowrap",
  }),
}));


export {CalendarStyle, ButtonsContainer, ButtonStyle , dayInWeekHeaderStyle , dayCellStyle , hebrewDateStyle , gregorianDateStyle , StyledEventBox} ;


