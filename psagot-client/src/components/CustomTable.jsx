import React, { useState } from 'react';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  Paper,
  Box,
  Typography,
  Alert,
} from '@mui/material';
import selector from '../assets/icons/selector.png';

const CustomTable = ({
  columns,
  data,
  columnConfig = {},
  keyMap = {},
  rowsPerPageOptions = [10, 25, 50],
  defaultRowsPerPage = 50,
  title,
  headerActions,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);

  // Validation
  if (!Array.isArray(columns) || columns.length === 0) {
    console.error('columns prop must be a non-empty array');
    return (
      <Alert severity="error" sx={{ m: 2 }}>
        שגיאה: עמודות אינן תקינות
      </Alert>
    );
  }

  if (!Array.isArray(data)) {
    console.error('data prop must be an array');
    return (
      <Alert severity="error" sx={{ m: 2 }}>
        שגיאה: נתונים אינם תקינים
      </Alert>
    );
  }

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedData = data.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  // סגנון כותרות העמודות
  const headerTextStyle = {
    fontFamily: '"Rubik", sans-serif',
    fontWeight: 500,
    fontSize: 16,
    lineHeight: 1,
    letterSpacing: 0,
    textAlign: 'center',
    textTransform: 'capitalize',
    color: '#393939',
  };

  const renderHeaderCell = (col) => {
    if (col === 'סטטוס') {
      return (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1,
          }}
        >
          <Typography component="span" sx={headerTextStyle}>
            {col}
          </Typography>
          <Box
            component="img"
            src={selector}
            alt="selector"
            sx={{
              width: 20,
              height: 20,
            }}
          />
        </Box>
      );
    }

    if (col === 'עריכה' || col === 'מחיקה') {
      return '';
    }

    return (
      <Typography sx={headerTextStyle}>
        {col}
      </Typography>
    );
  };

  const renderCell = (row, col, index, colIndex) => {
    const cellKey = `${index}-${colIndex}`;

    if (columnConfig[col] && typeof columnConfig[col].render === 'function') {
      return (
        <TableCell
          key={cellKey}
          align="center"
          sx={{
            fontSize: { xs: 12, sm: 13, md: 14 },
            padding: { xs: '8px 4px', sm: '8px 16px' },
            fontFamily: '"Rubik", sans-serif',
          }}
        >
          {columnConfig[col].render(row)}
        </TableCell>
      );
    }

    const dataKey = keyMap[col] || col.toLowerCase().replace(/\s+/g, '');

    return (
      <TableCell
        key={cellKey}
        align="center"
        sx={{
          fontSize: { xs: 12, sm: 13, md: 14 },
          padding: { xs: '8px 4px', sm: '8px 16px' },
          fontFamily: '"Rubik", sans-serif',
        }}
      >
        {row[dataKey] !== undefined ? row[dataKey] : '-'}
      </TableCell>
    );
  };

  return (
    <Box
      sx={{
        width: '90%',
        maxWidth: 1496,
        minWidth: 800,
        minHeight: 776,
        mx: 'auto',
        mt: 2.5,
        p: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        fontFamily: '"Rubik", sans-serif',
      }}
    >
      {/* Header Section */}
      {(title || headerActions) && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: 44,
            mb: 2,
            direction: 'rtl',
          }}
        >
          {title && (
            <Typography
              variant="h4"
              sx={{
                fontSize: { xs: 24, sm: 28, md: 32 },
                fontWeight: 700,
                lineHeight: '44px',
                color: 'text.primary',
                textAlign: 'right',
                fontFamily: '"Rubik", sans-serif',
              }}
            >
              {title}
            </Typography>
          )}

          {headerActions && (
            <Box
              sx={{
                display: 'flex',
                gap: 2,
                alignItems: 'center',
              }}
            >
              {headerActions}
            </Box>
          )}
        </Box>
      )}

      {/* Table Section */}
      <Paper
        sx={{
          direction: 'rtl',
          overflow: 'auto',
          minHeight: 660,
          p: { xs: '20px 10px', sm: '35px 20px' },
          borderRadius: 2.5,
          boxShadow: '0px 0px 4px 0px rgba(220, 226, 236, 0.8)',
          fontFamily: '"Rubik", sans-serif',
        }}
      >
        <Table
          stickyHeader
          sx={{
            minWidth: { xs: 600, sm: 800, md: 1000 },
            fontFamily: '"Rubik", sans-serif',
          }}
        >
          <TableHead>
            <TableRow>
              {columns.map((col, index) => (
                <TableCell
                  key={index}
                  align="center"
                  sx={{
                    backgroundColor: 'background.paper',
                    borderBottom: '1px solid #C6C6C6',
                    height: 42,
                    padding: { xs: '8px 4px', sm: '8px 16px' },
                    minWidth: col === 'עריכה' || col === 'מחיקה' ? 60 : 'auto',
                    verticalAlign: 'middle',
                  }}
                >
                  {renderHeaderCell(col)}
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
                  backgroundColor: index % 2 === 0 ? '#FAFCFF' : 'background.paper',
                }}
              >
                {columns.map((col, colIndex) =>
                  renderCell(row, col, index, colIndex)
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      {/* Pagination Section */}
      <Box sx={{ px: { xs: 1, sm: 2 } }}>
        <TablePagination
          component="div"
          rowsPerPageOptions={rowsPerPageOptions}
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="שורות לעמוד:"
          labelDisplayedRows={({ from, to, count }) =>
            `${from}-${to} מתוך ${count}`
          }
          sx={{
            direction: 'rtl',
            fontSize: { xs: 12, sm: 13, md: 14 },
            fontFamily: '"Rubik", sans-serif',
            '& .MuiTablePagination-toolbar': {
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 1,
            },
            '& .MuiSelect-select': {
              pr: 2,
              pl: 2,
              fontFamily: '"Rubik", sans-serif',
            },
            '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
              fontSize: { xs: 12, sm: 13, md: 14 },
              fontFamily: '"Rubik", sans-serif',
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default CustomTable;
