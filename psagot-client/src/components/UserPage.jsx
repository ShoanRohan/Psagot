import React from 'react'
    import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { useSelector } from 'react-redux';
import UserTable from './UserTabel';
import {Box, Button } from '@mui/material';
import { Image } from '@mui/icons-material';
import excel from '../assets/icons/excel.png';

function UserPage() {
 const { users } = useSelector(state => state.user);

const exportToExcel = (data, fileName = 'משתמשים.xlsx') => {
  // המרת נתוני המשתמשים ל־Sheet
  const worksheet = XLSX.utils.json_to_sheet(data);

  // יצירת קובץ Excel
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'משתמשים');

  // כתיבה לקובץ מסוג blob
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });

  // שמירה בדפדפן
  saveAs(blob, fileName);
};

  return (<> 
   <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%', mb: 2 }}>
  <Button onClick={() => exportToExcel(users)} sx={{ minWidth: 'unset', p: 0 }}>
    <img src={excel} alt="ייצוא לאקסל" style={{ height: '29px', width: '29px' }} />
  </Button>
</Box>


    <UserTable/> 
    </>
  )
}

export default UserPage