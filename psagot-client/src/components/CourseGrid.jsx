import React, { useState } from 'react';
import { Box, Button, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { DataGrid, GridRowModes, GridActionsCellItem } from '@mui/x-data-grid';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import pen from "../assets/icons/pen.png";
import trash from "../assets/icons/trash.png";
const statusOptions = ['פעיל', 'ממתין', 'הסתיים'];

const CoursesGrid = () => {
  const [rows, setRows] = useState([
    {
      id: 1,
      courseCode: 'MATH101',
      courseName: 'מתמטיקה 101',
      coordinator: 'רונית כהן',
      lecturer: 'דוד לוי',
      year: 2023,
      startDate: '2023-01-01',
      endDate: '2023-06-01',
      meetings: 20,
      students: 100,
      status: 'פעיל',
    },
    {
      id: 2,
      courseCode: 'SCI101',
      courseName: 'מדעים 101',
      coordinator: 'יוסי לוי',
      lecturer: 'שרה כהן',
      year: 2023,
      startDate: '2023-02-01',
      endDate: '2023-06-01',
      meetings: 25,
      students: 120,
      status: 'ממתין',
    },
    {
      id: 3,
      courseCode: 'PHYS101',
      courseName: 'פיזיקה 101',
      coordinator: 'מאיר כהן',
      lecturer: 'רחל לב',
      year: 2023,
      startDate: '2023-03-01',
      endDate: '2023-06-01',
      meetings: 30,
      students: 150,
      status: 'הסתיים',
    },
    {
      id: 4,
      courseCode: 'BIO101',
      courseName: 'ביולוגיה 101',
      coordinator: 'מיכל הרטמן',
      lecturer: 'שמואל כהן',
      year: 2023,
      startDate: '2023-04-01',
      endDate: '2023-07-01',
      meetings: 15,
      students: 80,
      status: 'פעיל',
    },
    {
      id: 5,
      courseCode: 'CHEM101',
      courseName: 'כימיה 101',
      coordinator: 'ליאור ברק',
      lecturer: 'אסף דוד',
      year: 2023,
      startDate: '2023-05-01',
      endDate: '2023-08-01',
      meetings: 18,
      students: 95,
      status: 'ממתין',
    },
  ]);

  const [rowModesModel, setRowModesModel] = useState({});

  const columns = [
    { field: 'courseCode', headerName: 'קוד קורס', flex: 1, editable: true, headerAlign: 'center', align: 'center' },
    { field: 'courseName', headerName: 'שם קורס', flex: 1, editable: true, headerAlign: 'center', align: 'center' },
    { field: 'coordinator', headerName: 'שם רכזת', flex: 1, editable: true, headerAlign: 'center', align: 'center' },
    { field: 'lecturer', headerName: 'שם מרצה', flex: 1, editable: true, headerAlign: 'center', align: 'center' },
    { field: 'year', headerName: 'שנה', flex: 1, editable: true, headerAlign: 'center', align: 'center' },
    { field: 'startDate', headerName: 'תאריך התחלה', flex: 1, editable: true, headerAlign: 'center', align: 'center' },
    { field: 'endDate', headerName: 'תאריך סיום', flex: 1, editable: true, headerAlign: 'center', align: 'center' },
    { field: 'meetings', headerName: 'מפגשים', flex: 1, editable: true, headerAlign: 'center', align: 'center' },
    { field: 'students', headerName: 'תלמידים', flex: 1, editable: true, headerAlign: 'center', align: 'center' },
    {
      field: 'status',
      headerName: 'סטטוס',
      flex: 1,
      editable: true,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => {
        const { value, id } = params;
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
      
        return (
          <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '75%',
            height: '100%',
            backgroundColor:
              value === 'פעיל' ? '#DAF8E6' :
              value === 'ממתין' ? '#FEEBEB' : '#E5E7EB',
            padding: '2% 8px',  
            borderRadius: '25%',
            textAlign: 'center',
          }}>
            {isInEditMode ? (
              <FormControl fullWidth>
                <InputLabel>סטטוס</InputLabel>
                <Select
                  value={value}
                  onChange={(e) => {
                    setRows(rows.map(row =>
                      row.id === id ? { ...row, status: e.target.value } : row
                    ));
                  }}
                  label="סטטוס"
                >
                  {statusOptions.map((status) => (
                    <MenuItem key={status} value={status}>{status}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            ) : (
              value
            )}
          </Box>
        );
      }      
    },    
    {
      field: "actions",
      type: "actions",
      flex: 1,
      getActions: ({ id }) => [
        <GridActionsCellItem
          icon={<img src={trash} alt="Delete" style={{ width: 20, height: 20, cursor: "pointer" }} />}
          label="Delete"
          onClick={() => {}} 
        />,
        <GridActionsCellItem
          icon={<img src={pen} alt="Edit" style={{ width: 20, height: 20, cursor: "pointer" }} />}
          label="Edit"
          onClick={() => {}} 
        />,
        
      ],
    }
  ];
  
  return (
    <Box sx={{
      height: '100vh',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      fontFamily: 'Rubik, sans-serif'
    }}>
      <Box sx={{
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '1% 1%',
        display: 'flex',
        flexDirection: 'column',
        fontSize: '16px',
        lineHeight: '19px',
      }}>
       <DataGrid
  rows={rows}
  columns={columns}
  pageSize={5}
  rowModesModel={rowModesModel}
  onRowModesModelChange={(newModel) => setRowModesModel(newModel)}
  sx={{
    '& .MuiDataGrid-columnSeparator': {
  display: 'none',
  },
    '& .MuiDataGrid-columnHeaders': {
      backgroundColor: '#f1f1f1',
      fontFamily: 'Rubik',
      fontWeight: '500',
      fontSize: '16px',
      textAlign: 'center',
    },
    '& .MuiDataGrid-cell': {
      textAlign: 'center',
      paddingTop: '0px',
      paddingBottom: '0px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center', 
    },
    '& .MuiDataGrid-footerContainer': {
      backgroundColor: '#f1f1f1',
    },
    '& .MuiDataGrid-root': {
      marginTop: '35px',
    },
    '& .MuiDataGrid-row:nth-of-type(odd)': {
      backgroundColor: '#FAFCFF',
    },
    '& .MuiDataGrid-row:nth-of-type(even)': {
      backgroundColor: 'white',
    },
  }}
/>
      </Box>
    </Box>
  );
};

export default CoursesGrid;
