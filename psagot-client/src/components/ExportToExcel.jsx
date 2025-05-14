import React from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import IconButton from '@mui/material/IconButton';
import '../styles/ExportToExcel.css';
import xlsIcon from '../assets/icons/xls-icon.png';

const ExportToExcel = ({ data, fileName = "document.xlsx", sheetName = "Sheet1" }) => {
  const handleExport = () => {
    if (!data || data.length === 0) return;

    const worksheet = XLSX.utils.json_to_sheet(data);

  
    const workbook = XLSX.utils.book_new();

  
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
    workbook.Workbook = {
      Views: [
        {
          RTL: true, 
        },
      ],
    };

    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array'
    });

    const blob = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
    });

    saveAs(blob, fileName);
  };

  return (
    <IconButton disableRipple onClick={handleExport} className='xlsxButton'>
      <img src={xlsIcon} alt="Excel Icon" />
    </IconButton>
  );
};

export default ExportToExcel;
