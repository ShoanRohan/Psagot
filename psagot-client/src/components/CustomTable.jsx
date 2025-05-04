import React from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, IconButton, Chip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const CustomTable = ({ columns, data, onEdit, onDelete }) => {
  if (!columns || !Array.isArray(columns) || columns.length === 0) {
    console.error('Table component: columns prop must be a non-empty array');
    return <div>Error: Invalid columns configuration</div>;
  }

  if (!data || !Array.isArray(data)) {
    console.error('Table component: data prop must be an array');
    return <div>Error: Invalid data configuration</div>;
  }
  
  // הוספת לוגים לבדיקה
  console.log('CustomTable props - columns:', columns);
  console.log('CustomTable props - data:', data);
  
  // מציאת האינדקסים של העמודות הקבועות
  const deleteColumnIndex = columns.findIndex(col => col === 'מחיקה');
  const editColumnIndex = columns.findIndex(col => col === 'עריכה');
  const inSystemColumnIndex = columns.findIndex(col => col === 'חלק מהמערכת?');
  const validScheduleColumnIndex = columns.findIndex(col => col === 'האם השיבוץ תקין?');
  
  return (
    <Table stickyHeader sx={{ direction: 'rtl' }}>
      <TableHead>
        <TableRow>
          {columns.map((col, index) => (
            <TableCell key={index} align="center" sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>
              {col}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((row, i) => (
          <TableRow key={i}>
            {columns.map((col, colIndex) => {
              // עמודת מחיקה
              if (colIndex === deleteColumnIndex) {
                return (
                  <TableCell key={colIndex} align="center">
                    <IconButton color="error" onClick={() => onDelete ? onDelete(row) : console.log('Delete', row)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                );
              }
              
              // עמודת עריכה
              if (colIndex === editColumnIndex) {
                return (
                  <TableCell key={colIndex} align="center">
                    <IconButton color="primary" onClick={() => onEdit ? onEdit(row) : console.log('Edit', row)}>
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                );
              }
              
              // עמודת חלק מהמערכת
              if (colIndex === inSystemColumnIndex) {
                return (
                  <TableCell key={colIndex} align="center">
                    <Chip 
                      label={row.isPartOfSchedule ? 'כן' : 'לא'} 
                      color={row.isPartOfSchedule ? 'success' : 'default'} 
                      variant="outlined" 
                    />
                  </TableCell>
                );
              }
              
              // עמודת תקינות השיבוץ
              if (colIndex === validScheduleColumnIndex) {
                return (
                  <TableCell key={colIndex} align="center">
                    <Chip 
                      label={row.isValid ? 'תקין' : 'שגוי'} 
                      color={row.isValid ? 'success' : 'error'} 
                      variant="outlined" 
                    />
                  </TableCell>
                );
              }
              
              // עמודות ריקות עבור שדות שאין להם נתונים עדיין
              if (['שם קורס', 'נושא', 'שם מפגש', 'תיאור'].includes(col)) {
                return <TableCell key={colIndex} align="center">-</TableCell>;
              }
              
              // עמודות דינמיות לפי המידע שקיים
              const keyMap = {
                'מזהה מפגש': 'meetingId',
                'מזהה נושא': 'scheduleForTopicId',
                'מספר מפגש': 'meetingNumberForTopic',
                'חדר': 'roomId',  // מיפוי עמודת חדר ל-roomId
                'מזהה חדר': 'roomId',
                'יום': 'dayId',
                'שעת התחלה': 'startTime',
                'שעת סיום': 'endTime'
              };
              
              const dataKey = keyMap[col];
              if (dataKey && row[dataKey] !== undefined) {
                return <TableCell key={colIndex} align="center">{row[dataKey]}</TableCell>;
              }
              
              // אם אין התאמה, מציג תא ריק
              return <TableCell key={colIndex} align="center">-</TableCell>;
            })}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CustomTable;
