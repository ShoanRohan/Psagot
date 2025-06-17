import React from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const CustomTable = ({ 
  columns, 
  data, 
  onEdit, 
  onDelete, 
  columnConfig = {}, 
  keyMap = {} 
}) => {
  if (!columns || !Array.isArray(columns) || columns.length === 0) {
    console.error('Table component: columns prop must be a non-empty array');
    return <div>Error: Invalid columns configuration</div>;
  }

  if (!data || !Array.isArray(data)) {
    console.error('Table component: data prop must be an array');
    return <div>Error: Invalid data configuration</div>;
  }

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
              const cellKey = `${i}-${colIndex}`;

              // Custom rendering if applicable
              if (columnConfig[col] && typeof columnConfig[col].render === 'function') {
                return (
                  <TableCell key={cellKey} align="center">
                    {columnConfig[col].render(row)}
                  </TableCell>
                );
              }

              // Edit column
              if (col === 'עריכה') {
                return (
                  <TableCell key={cellKey} align="center">
                    <IconButton color="primary" onClick={() => onEdit?.(row)}>
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                );
              }

              // Delete column
              if (col === 'מחיקה') {
                return (
                  <TableCell key={cellKey} align="center">
                    <IconButton color="error" onClick={() => onDelete?.(row)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                );
              }

              // Default dynamic content
              const dataKey = keyMap[col] || col.toLowerCase().replace(/\s+/g, '');
              return (
                <TableCell key={cellKey} align="center">
                  {row[dataKey] !== undefined ? row[dataKey] : '-'}
                </TableCell>
              );
            })}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CustomTable;