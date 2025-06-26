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
    <Paper sx={{ direction: 'rtl', overflow: 'auto', borderRadius: 3 }}>
      <Table stickyHeader sx={{ minWidth: 1000 }}>
        <TableHead>
          <TableRow sx={{ backgroundColor: '#f9fafb' }}>
            {columns.map((col, index) => (
              <TableCell
                key={index}
                align="center"
                sx={{
                  fontWeight: 'bold',
                  backgroundColor: '#f5f5f5',
                  color: '#333',
                  borderBottom: '1px solid #e0e0e0',
                  fontSize: 15,
                }}
              >
                {col==='עריכה'||col==='מחיקה' ?"" : col}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {paginatedData.map((row, i) => (
            <TableRow
              key={i}
              hover
              sx={{
                '&:nth-of-type(odd)': {
                  backgroundColor: '#fafafa',
                },
              }}
            >
              {columns.map((col, colIndex) => {
                const cellKey = `${i}-${colIndex}`;

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
    </Paper>
  );
};

export default CustomTable;
