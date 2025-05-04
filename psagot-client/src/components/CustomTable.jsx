import React from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, IconButton, Chip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const CustomTable = ({ columns, data }) => {
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
            <TableCell align="center">
              <IconButton color="error" onClick={() => console.log('Delete', row)}>
                <DeleteIcon />
              </IconButton>
            </TableCell>
            <TableCell align="center">
              <IconButton color="primary" onClick={() => console.log('Edit', row)}>
                <EditIcon />
              </IconButton>
            </TableCell>
            <TableCell align="center">
              <Chip label={row.in_system ? 'כן' : 'לא'} color={row.in_system ? 'success' : 'default'} variant="outlined" />
            </TableCell>
            <TableCell align="center">
              <Chip label={row.valid_schedule ? 'תקין' : 'שגוי'} color={row.valid_schedule ? 'success' : 'error'} variant="outlined" />
            </TableCell>
            {columns.slice(4).map((col, colIndex) => (
              <TableCell key={colIndex} align="center">
                {row[col.toLowerCase().replace(/\s+/g, '_')] || ''}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CustomTable;