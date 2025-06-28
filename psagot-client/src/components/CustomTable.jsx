import React, { useState } from 'react';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  TablePagination,
  Paper,
  Box,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const CustomTable = ({
  columns,
  data,
  onEdit,
  onDelete,
  columnConfig = {},
  keyMap = {},
  rowsPerPageOptions = [10, 25, 50],
  defaultRowsPerPage = 50,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);

  if (!Array.isArray(columns) || columns.length === 0) {
    console.error('columns prop must be a non-empty array');
    return <div>שגיאה: עמודות אינן תקינות</div>;
  }

  if (!Array.isArray(data)) {
    console.error('data prop must be an array');
    return <div>שגיאה: נתונים אינם תקינים</div>;
  }

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedData = data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Box
      sx={{
        width: '1496px',
        height: '776px',
        position: 'absolute',
        top: '305px',
        left: '73px',
        paddingTop: '8px',
        paddingRight: '8px',
        paddingLeft: '8px',
        gap: '24px',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Paper 
        sx={{ 
          direction: 'rtl', 
          overflow: 'auto', 
          width: '1481px',
          height: '660px',
          paddingTop: '35px',
          paddingRight: '20px',
          paddingBottom: '10px',
          paddingLeft: '20px',
          borderRadius: '10px',
          background: '#FFFFFF',
          boxShadow: '0px 0px 4px 0px #DCE2ECCC'
        }}
      >
        <Table stickyHeader sx={{ minWidth: 1000 }}>
          <TableHead>
            <TableRow 
              sx={{ 
                backgroundColor: '#FFFFFF',
                width: '1430px',
                height: '42px'
              }}
            >
              {columns.map((col, index) => (
                <TableCell
                  key={index}
                  align="center"
                  sx={{
                    fontWeight: 'bold',
                    backgroundColor: '#FFFFFF',
                    color: '#333',
                    borderBottom: '1px solid #C6C6C6',
                    fontSize: 15,
                    height: '42px'
                  }}
                >
                  {col==='עריכה'||col==='מחיקה' ?"" : col}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((row, index) => (
              <TableRow
                key={row.id || index}
                hover
                sx={{
                  backgroundColor: index % 2 === 0 ? '#FAFCFF' : '#FFFFFF'
                }}
              >
                {columns.map((col, colIndex) => {
                  const cellKey = `${index}-${colIndex}`;
                  if (columnConfig[col] && typeof columnConfig[col].render === 'function') {
                    return (
                      <TableCell key={cellKey} align="center" sx={{ fontSize: 14 }}>
                        {columnConfig[col].render(row)}
                      </TableCell>
                    );
                  }
                  const dataKey = keyMap[col] || col.toLowerCase().replace(/\s+/g, '');
                                                       
                  return (
                    <TableCell key={cellKey} align="center" sx={{ fontSize: 14 }}>
                      {row[dataKey] !== undefined ? row[dataKey] : '-'}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
      
      <Box sx={{ px: 2 }}>
        <TablePagination
          component="div"
          rowsPerPageOptions={rowsPerPageOptions}
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="שורות לעמוד:"
          labelDisplayedRows={({ from, to, count }) => `${from}-${to} מתוך ${count}`}
          sx={{
            direction: 'rtl',
            fontSize: 14,
            '.MuiTablePagination-toolbar': {
              justifyContent: 'space-between',
            },
            '.MuiSelect-select': {
              paddingRight: 2,
              paddingLeft: 2,
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default CustomTable;
