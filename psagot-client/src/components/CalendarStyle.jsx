import { styled } from '@mui/material/styles';
import Box from "@mui/material/Box";
import "@fontsource/rubik";

const CalendarStyle = styled(Box)(({ theme }) => ({

  "*": {
    boxSizing: "border-box",
  },

  overflow: "hidden",
  height: "calc(100vh - 90px)",
  width: "100%",
  borderRadius: "10px",
  fontFamily: "Rubik, sans-serif",
  boxSizing: "border-box",
  padding: "10px 65px",


  //מסגרת של כל הלוח כולל הימים- לבן עם צל כחול
  "& .fc": {
    width: "100%",
    height: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: "10px",
    padding: "12px",
    // border:"0.1px solid rgba(211, 211, 251, 0.4)",
    position: "relative",
    zIndex: 1,
    flexShrink: "1",
    boxSizing: "border-box",
    overflow: "visible",
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
    // maxHeight: "20px !important",
  },

  //תא בטבלה תצוגה חודשית
  "& .fc-daygrid": {
    border: "none !important",
  },

  //שבוע- שורה
  "& .fc-daygrid-body tr td": {
    paddingTop: "5px",
  },

  // יש רווח שמאלי לכל יום בשבוע
  "& .fc-daygrid-day": {
    border: "none",
    paddingLeft: "5px",
    overflow: "hidden",
  },

  //ליום האחרון בשבוע אין רווח שמאלי
  "& .fc-daygrid-day:last-child": {
    paddingLeft: "0 !important",
  },

  //עיצוב תא
  "& .fc-daygrid-day-frame": {
    maxHeight: "45px !important",
    maxWidth: "150px !important",
    // minHeight: "30px !important",

    border: "0.5px solid #C6C6C6", // גבול על כל התא
    borderRadius: "10px",
    overflow: "hidden",
    height: "100%", // גובה אחיד
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    boxSizing: "border-box",
    // padding: "4px",
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

  "& .fc th": {//שורת כותרות הימים
    borderRight: "none",
  },


  "& .fc-timegrid-axis": {//- הריבוע בין הכותרת העליונה לכותרת השעות כולל גם עמודת השעות
    backgroundColor: "white",
    border: "1px solid white !important",
  },

  "& .fc-timegrid-slot": {//שורות הטבלה
    borderColor: "#C6C6C6",
    height: "15px",
    width: "100% !important",
  },

  //עמודת השעות
  "& .fc-timegrid-slot-label": {
    width: "120px !important",
    height: "15px !important",
    borderBottom: "1px solid #C6C6C6 !important",
    borderLeft: "1px solid #ffffff !important",
    textAlign: "center !important",
    fontFamily: "Rubik, sans-serif",
    fontWeight: "500 !important",
    fontSize: "10px !important",
    lineHeight: "5.2px !important",
    color: "#393939 !important",
    paddingTop: "10px !important",
    paddingBottom: "10px !important",
    paddingLeft: "14px !important",
    paddingRight: "14px !important",
  },

  //עמודת השעות בתצוגת יום
  "& .fc-timeGridDay-view .fc-timegrid-slot-label": {
    height: "10px !important",
    lineHeight: "7.5px !important",
  },


  //פסים לרוחב בתצוגות שבוע ויום
  "& .fc-timegrid .fc-timegrid-body td": {
    border: "1px solid #F0F1F3",
  },

  //אירוע בתצוגות שבוע וחודש
  "& .fc-v-event": {
    minWidth: "71.25px",
    minHeight: "10.17px",
    backgroundColor: "transparent !important", //למנוע רקע חיצוני לאירוע
    border: "transparent !important",////למנוע גבול חיצוני לאירוע

  },


  //מוריד גבול ללוח(לא כולל ימות השבוע) בתצוגות שבוע ויום
  "& .fc-theme-standard td": {
    border: "none ",
  },

}));




//קומפוננטת Calendar

const dayInWeekHeaderStyle = {
  textAlign: "center",
  fontSize: "16px",
  fontWeight: "600",
  padding: "6px",
  backgroundColor: "#F8F9FC",
  width: "65px", // רוחב קבוע לכל כותרת יום
};



const dayCellStyle = {//כל הקוביה שמכילה ריבוע תאריכים וריבוע מפגשים
  display: "flex !important",
  flexDirection: "row !important",
  justifyContent: "space-between !important",
  flexWrap: "nowrap !important",
  width: "100% !important",
  boxSizing: "border-box !important",
};

const hebrewDateStyle = {
  color: "#393939 !important",
  textAlign: "right !important",
  fontFamily: "Rubik !important",
  fontWeight: 300,
  fontWeight: "bold",
  fontSize: "10px !important",
  direction: "rtl !important",
  width: "auto !important",
};

const gregorianDateStyle = {
  color: "#393939 !important",
  textAlign: "left !important",
  fontFamily: "Rubik !important",
  fontWeight: 300,
  fontSize: "10px !important",
  direction: "ltr !important",
  width: "auto !important",
  marginRight: "80px",
};



function darkenColor(hexColor, percent) {
  if (!hexColor) return "#666"; // אפור כהה
  const num = parseInt(hexColor.replace("#", ""), 16);

  let r = (num >> 16) & 0xff;
  let g = (num >> 8) & 0xff;
  let b = num & 0xff;

  r = Math.max(0, Math.min(255, Math.floor(r * (1 - percent))));
  g = Math.max(0, Math.min(255, Math.floor(g * (1 - percent))));
  b = Math.max(0, Math.min(255, Math.floor(b * (1 - percent))));

  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function lightenColor(hexColor, percent) {
  if (!hexColor) return "#bbb"; // אפור בהיר

  const num = parseInt(hexColor.replace("#", ""), 16);

  let r = (num >> 16) & 0xff;
  let g = (num >> 8) & 0xff;
  let b = num & 0xff;

  r = Math.min(255, Math.floor(r + (255 - r) * percent));
  g = Math.min(255, Math.floor(g + (255 - g) * percent));
  b = Math.min(255, Math.floor(b + (255 - b) * percent));

  return (
    "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
  );
}


// עיצוב הרכיב
const StyledEventBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isMonthView" && prop !== "color",
})(({ color = "#808080", isMonthView, isPast = false }) => {
  const borderColor = isPast ? lightenColor(color, 0.7) : darkenColor(color, 0.1);
  const backgroundColor = isPast ? lightenColor(color, 0.9) : lightenColor(color, 0.65);
  return {
    backgroundColor: backgroundColor,
    fontFamily: "Rubik",
    color: "black",
    padding: "3px",
    borderRadius: "5px",
    borderRight: `3px solid ${borderColor}`,
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
  };
});


export { CalendarStyle, dayInWeekHeaderStyle, dayCellStyle, hebrewDateStyle, gregorianDateStyle, StyledEventBox };


