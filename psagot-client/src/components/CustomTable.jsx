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
  IconButton,
  Select,
  MenuItem,
  FormControl,
} from '@mui/material';
import {
  KeyboardArrowLeft,
  KeyboardArrowRight,
  FirstPage,
  LastPage,
} from '@mui/icons-material';
import selector from '../assets/icons/selector.png';

const CustomTable = ({
  columns,
  data,
  columnConfig = {},
  keyMap = {},
  rowsPerPageOptions = [10, 25, 50],
  defaultRowsPerPage = 50,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);

  // Validation
  if (!Array.isArray(columns) || columns.length === 0) {
    return (
      <Alert severity="error" sx={{ m: 2 }}>
        שגיאה: עמודות אינן תקינות
      </Alert>
    );
  }

  if (!Array.isArray(data)) {
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
          <Typography 
            component="span" 
            sx={{
              fontFamily: '"Rubik", sans-serif',
              fontWeight: 500,
              fontSize: 16,
              color: '#393939',
            }}
          >
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
      <Typography 
        sx={{
          fontFamily: '"Rubik", sans-serif',
          fontWeight: 500,
          fontSize: 16,
          color: '#393939',
        }}
      >
        {col}
      </Typography>
    );
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2);
    return `${year}\\${month}\\${day}`;
  };

  const formatTime = (timeString) => {
    if (!timeString) return '-';
    return timeString.substring(0, 5);
  };

  const renderCell = (row, col, index, colIndex) => {
    if (columnConfig[col] && typeof columnConfig[col].render === 'function') {
      return (
        <TableCell
          key={`${index}-${colIndex}`}
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
    let cellValue = row[dataKey] !== undefined ? row[dataKey] : '-';

    // Format date columns
    if (col === 'תאריך') {
      cellValue = formatDate(cellValue);
    }
    // Format time columns
    else if (col === 'שעת התחלה' || col === 'שעת סיום') {
      cellValue = formatTime(cellValue);
    }

    return (
      <TableCell
        key={`${index}-${colIndex}`}
        align="center"
        sx={{
          fontSize: { xs: 12, sm: 13, md: 14 },
          padding: { xs: '8px 4px', sm: '8px 16px' },
          fontFamily: '"Rubik", sans-serif',
        }}
      >
        {cellValue}
      </TableCell>
    );
  };

  // Custom Pagination Component
  const CustomPaginationActions = () => {
    const totalPages = Math.ceil(data.length / rowsPerPage);
    
    const handleFirstPageButtonClick = () => {
      setPage(0);
    };

    const handleBackButtonClick = () => {
      setPage(page - 1);
    };

    const handleNextButtonClick = () => {
      setPage(page + 1);
    };

    const handleLastPageButtonClick = () => {
      setPage(Math.max(0, totalPages - 1));
    };

    const handlePageClick = (pageNumber) => {
      setPage(pageNumber);
    };

    // Generate page numbers to display
    const getPageNumbers = () => {
      const pages = [];
      const maxVisiblePages = 5;
      
      if (totalPages <= maxVisiblePages) {
        for (let i = 0; i < totalPages; i++) {
          pages.push(i);
        }
      } else {
        const startPage = Math.max(0, page - 2);
        const endPage = Math.min(totalPages - 1, startPage + maxVisiblePages - 1);
        
        for (let i = startPage; i <= endPage; i++) {
          pages.push(i);
        }
      }
      
      return pages;
    };

    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          sx={{ 
            color: '#393939',
            '&:disabled': { color: '#ccc' }
          }}
        >
          <LastPage />
        </IconButton>
        
        <IconButton
          onClick={handleBackButtonClick}
          disabled={page === 0}
          sx={{ 
            color: '#393939',
            '&:disabled': { color: '#ccc' }
          }}
        >
          <KeyboardArrowRight />
        </IconButton>

        {getPageNumbers().map((pageNumber) => (
          <IconButton
            key={pageNumber}
            onClick={() => handlePageClick(pageNumber)}
            sx={{
              minWidth: 32,
              height: 32,
              backgroundColor: page === pageNumber ? '#1976d2' : 'transparent',
              color: page === pageNumber ? 'white' : '#393939',
              fontFamily: '"Rubik", sans-serif',
              fontSize: 14,
              '&:hover': {
                backgroundColor: page === pageNumber ? '#1565c0' : '#f5f5f5',
              },
            }}
          >
            {pageNumber + 1}
          </IconButton>
        ))}

        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(data.length / rowsPerPage) - 1}
          sx={{ 
            color: '#393939',
            '&:disabled': { color: '#ccc' }
          }}
        >
          <KeyboardArrowLeft />
        </IconButton>
        
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(data.length / rowsPerPage) - 1}
          sx={{ 
            color: '#393939',
            '&:disabled': { color: '#ccc' }
          }}
        >
          <FirstPage />
        </IconButton>
      </Box>
    );
  };

  return (
     <Box>
      <Paper
        sx={{
          direction: 'rtl',
          overflow: 'visible',
          p: { xs: '20px 10px', sm: '35px 20px' },
          borderRadius: 2.5,
          boxShadow: '0px 0px 4px 0px rgba(220, 226, 236, 0.8)',
          fontFamily: '"Rubik", sans-serif',
        }}
      >
        <Table stickyHeader>
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
                    minWidth: 'auto',
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

      {/* Custom Pagination */}
      <Box 
        sx={{ 
          px: { xs: 1, sm: 2 },
          py: 2,
          backgroundColor: 'white',
          borderRadius: 1,
          mt: 1,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            direction: 'rtl',
            flexWrap: 'wrap',
            gap: 2,
          }}
        >
          {/* Right side - Rows per page */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography
              sx={{
                fontSize: { xs: 12, sm: 13, md: 14 },
                fontFamily: '"Rubik", sans-serif',
                color: '#393939',
              }}
            >
              מספר השורות:
            </Typography>
            <FormControl size="small">
              <Select
                value={rowsPerPage}
                onChange={handleChangeRowsPerPage}
                sx={{
                  minWidth: 60,
                  height: 32,
                  fontFamily: '"Rubik", sans-serif',
                  fontSize: { xs: 12, sm: 13, md: 14 },
                  '& .MuiSelect-select': {
                    pr: 2,
                    pl: 2,
                  },
                }}
              >
                {rowsPerPageOptions.map((option) => (
                  <MenuItem 
                    key={option} 
                    value={option}
                    sx={{ 
                      fontFamily: '"Rubik", sans-serif',
                      fontSize: { xs: 12, sm: 13, md: 14 },
                    }}
                  >
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {/* Left side - Page navigation */}
          <CustomPaginationActions />
        </Box>

        {/* Display current page info */}
        
      </Box>
    </Box>
  );
};

export default CustomTable;
