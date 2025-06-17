import React from 'react';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper
} from '@mui/material';

const CustomTable = ({ columns, data, keyMap, columnConfig }) => {
  return (
    <TableContainer
      component={Paper}
      sx={{
        boxShadow: 'none',
        width: '100%',
        minWidth: 1000, // כדי לפרוס יפה גם במסכים רחבים
        overflowX: 'auto',
        margin: '0 auto' // מרכז את הטבלה
      }}
    >
      <Table size="medium" aria-label="custom table">
        <TableHead>
          <TableRow>
            {columns.map((col) => (
              <TableCell
                key={col}
                align="center"
                sx={{
                  fontWeight: 'bold',
                  fontSize: '16px',
                  backgroundColor: '#f5f5f5',
                  borderBottom: '1px solid #ccc',
                  color: 'black',
                  padding: '12px 20px'
                }}
              >
                {col}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              {columns.map((col) => (
                <TableCell
                  key={col}
                  align="center"
                  sx={{
                    borderBottom: '1px solid #eee',
                    padding: '12px 20px',
                    fontSize: '15px',
                    color: '#333'
                  }}
                >
                  {columnConfig[col]?.render
                    ? columnConfig[col].render(row)
                    : row[keyMap[col]]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomTable;
