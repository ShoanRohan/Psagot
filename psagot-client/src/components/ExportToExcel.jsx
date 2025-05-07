import React from 'react';
import * as XLSX from 'xlsx';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import { saveAs } from 'file-saver'; // תיקון שגיאת כתיב מ־file-server ל־file-saver
import '../styles/ExportToExcel.css';
import xlsIcon from '../assets/icons/xls-icon.png'

const ExportToExcel = ({ data, fileName = "data.xlsx", sheetName = "Sheet1" }) => {
  const handleExport = () => {
    if (!data || data.length === 0) {
      alert("אין נתונים לייצוא");
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });

    const blob = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
    });

    saveAs(blob, fileName);
  };

  return (
    <IconButton disableRipple
          onClick={handleExport}
          className='xlsxButton' 
    >
          <img src={xlsIcon} alt="Excel Icon"    />
          {/* width={44} height={44} */}
    </IconButton>

  )
};

export default ExportToExcel;