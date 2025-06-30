import React, { useState } from 'react';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
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

  // פונקציה לעיבוד תאריך
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    try {
      // המרה של תאריך מהבקנד לפורמט הרצוי
      const date = new Date(dateString);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = String(date.getFullYear()).slice(-2); // לוקח רק 2 ספרות אחרונות
      return `${day}/${month}/${year}`;
    } catch {
      return dateString;
    }
  };

  // פונקציה לעיבוד שעה
  const formatTime = (timeString) => {
    if (!timeString) return '-';
    try {
      // אם השעה מגיעה בפורמט HH:MM:SS, נקצר את השניות
      if (timeString.includes(':')) {
        const timeParts = timeString.split(':');
        if (timeParts.length >= 2) {
          return `${timeParts[0]}:${timeParts[1]}`;
        }
      }
      return timeString;
    } catch {
      return timeString;
    }
  };

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
            // הוספת word-break לטקסט ארוך
            wordBreak: 'break-word',
            whiteSpace: 'normal',
            maxWidth: '200px',
          }}
        >
          {columnConfig[col].render(row)}
        </TableCell>
      );
    }
    
    const dataKey = keyMap[col] || col.toLowerCase().replace(/\s+/g, '');
    let cellValue = row[dataKey] !== undefined ? row[dataKey] : '-';
    
    // עיבוד מיוחד לפי סוג העמודה
    if (col === 'תאריך') {
      cellValue = formatDate(cellValue);
    } else if (col === 'שעת התחלה' || col === 'שעת סיום') {
      cellValue = formatTime(cellValue);
    }
    
    return (
      <TableCell
        key={cellKey}
        align="center"
        sx={{
          fontSize: { xs: 12, sm: 13, md: 14 },
          padding: { xs: '8px 4px', sm: '8px 16px' },
          fontFamily: '"Rubik", sans-serif',
          // הוספת word-break לטקסט ארוך
          wordBreak: 'break-word',
          whiteSpace: 'normal',
          maxWidth: '200px',
          // עיצוב מיוחד לעמודות טקסט ארוכות
          ...(col === 'שם קורס' || col === 'נושא' || col === 'שם מרצה' ? {
            maxWidth: '150px',
            minWidth: '120px',
          } : {}),
        }}
      >
        {cellValue}
      </TableCell>
    );
  };

  return (
    <Box
      sx={{
        width: '95%',
        maxWidth: 1600,
        minWidth: 900,
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

      {/* Table Section - ללא Paper */}
      <Box
        sx={{
          direction: 'rtl',
          overflow: 'auto',
          minHeight: 660,
          p: { xs: '20px 10px', sm: '35px 20px' },
          fontFamily: '"Rubik", sans-serif',
        }}
      >
        <Table
          stickyHeader
          sx={{
            minWidth: { xs: 700, sm: 900, md: 1100 },
            fontFamily: '"Rubik", sans-serif',
            tableLayout: 'auto',
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
                    minWidth: col === 'עריכה' || col === 'מחיקה' ? 80 : 'auto',
                    verticalAlign: 'middle',
                    // רוחב מיוחד לעמודות טקסט ארוכות
                    ...(col === 'שם קורס' || col === 'נושא' || col === 'שם מרצה' ? {
                      minWidth: '120px',
                      maxWidth: '150px',
                    } : {}),
                    // רוחב מיוחד לעמודות תאריך ושעות
                    ...(col === 'תאריך' || col === 'שעת התחלה' || col === 'שעת סיום' ? {
                      minWidth: '100px',
                    } : {}),
                    // קירוב אייקוני העריכה והמחיקה
                    ...(col === 'עריכה' || col === 'מחיקה' ? {
                      padding: { xs: '8px 6px', sm: '8px 8px' },
                      minWidth: '80px',
                      maxWidth: '80px',
                    } : {}),
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
      </Box>

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