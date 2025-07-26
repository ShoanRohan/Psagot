import * as React from 'react';
import { styled } from '@mui/material/styles';
import {
  Box, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, IconButton, Select,
  MenuItem, Typography, Pagination
} from '@mui/material';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllRooms } from '../features/room/roomActions';
import { useEffect } from 'react';
import { tableCellClasses } from '@mui/material/TableCell';
import { setPageNumber, setPageSize } from '../features/room/roomSlice';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { deleteRoomAction } from '../features/room/roomActions';



export default function RoomsGrid() {
  const dispatch = useDispatch();
  const { status, roomsWithPagination, pageNumber, pageSize, totalCount } = useSelector((state) => state.room);
  const [snackbar, setSnackbar] = React.useState({//הוספה
  open: false,
  message: '',
  severity: 'success', // או 'error'//עד כאן
});

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchAllRooms());
    }
  }, [status, dispatch]);

  const handlePageSizeChange = (event) => {
    dispatch(setPageSize(event.target.value));
  };

  const handlePageNumberChange = (event, value) => {
    dispatch(setPageNumber(value));
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.white,
      color: theme.palette.common.black,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 16,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: '#FAFCFF',
      textAlign: 'center',
    },
    height: '79px',
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  // מחיקה
 
  const handleDeleteRoom = async (id) => {
    if (!id) return;

    try {
      const resultAction = await dispatch(deleteRoomAction(id));
        console.log("ID למחיקה:", id);

      if (deleteRoomAction.fulfilled.match(resultAction)) {
        setSnackbar({
          open: true,
          message: `חדר מספר ${resultAction.payload} נמחק בהצלחה`,
          severity: 'success',
        });
      }
      else {
        const errorMessage = resultAction.payload || 'שגיאה כללית במחיקה';
        throw errorMessage;
      }
    }
    catch (error) {
      setSnackbar({
        open: true,
        message: error,
        severity: 'error',
      });
    }
  };

  
  return (
    <>
    <Box
      dir="rtl"
      sx={{
        mt: 4,         // שוליים מלמעלה (32px)
        mx: 'auto',    // מרכז אופקית
        mb: 4,         // שוליים מלמטה
        maxWidth: 1200,// מגביל רוחב
        px: 3          // padding פנימי ימין ושמאל (24px)
      }}
    >
      <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
        <Table sx={{ minWidth: 1000 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">שם חדר</StyledTableCell>
              <StyledTableCell align="center">מספר חדר</StyledTableCell>
              <StyledTableCell align="center">מס' מקומות</StyledTableCell>
              <StyledTableCell align="center">ציוד</StyledTableCell>
              <StyledTableCell align="center"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {roomsWithPagination.map((row) => (
              <StyledTableRow key={row.roomId}>
                <StyledTableCell align="center">{row.name}</StyledTableCell>
                <StyledTableCell align="center">{row.roomId}</StyledTableCell>
                <StyledTableCell align="center">{row.capacity}</StyledTableCell>
                <StyledTableCell align="center">
                  {[
                    row.projector && "מקרן",
                    row.computers && "מחשב",
                    row.speakers && "רמקולים"
                  ].filter(Boolean).join(", ") || "אין ציוד"}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Box display="flex" gap={2} justifyContent="left">
                    <Paper sx={{ borderRadius: 3, padding: 1, backgroundColor: "#FAFAFA", boxShadow: "none" }}>
                      <IconButton sx={{ padding: 0 }} onClick={() => handleDeleteRoom(row.roomId)}>
                        <DeleteOutlinedIcon sx={{ fontSize: "20px" }} />
                      </IconButton>
                    </Paper>
                    <Paper sx={{ borderRadius: 3, padding: 1, backgroundColor: "#FAFAFA", boxShadow: "none" }}>
                      <IconButton sx={{ padding: 0 }}>
                        <EditIcon sx={{ fontSize: "20px" }} />
                      </IconButton>
                    </Paper>
                  </Box>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* פאגינציה ובורר שורות */}
      <Box mt={2} display="flex" justifyContent="space-between" alignItems="center" px={2}>
        {/* בורר שורות */}
        <Box display="flex" alignItems="center">
          <Typography variant="body2" sx={{ ml: 1 }}>מספר שורות:</Typography>
          <Select
            value={pageSize}
            onChange={handlePageSizeChange}
            size="small"
            sx={{ width: 80 }}
          >
            {[10, 20, 50].map((num) => (
              <MenuItem key={num} value={num}>{num}</MenuItem>
            ))}
          </Select>
        </Box>

        {/* פאגינציה */}
        <Pagination
          count={Math.ceil(totalCount / pageSize)}
          page={pageNumber}
          onChange={handlePageNumberChange}
          color="primary"
          variant="outlined"
          shape="rounded"
          siblingCount={1}
          boundaryCount={1}
        />
      </Box>
    </Box>
    {/* /////מחיקה של החדרים//// */}
    <Snackbar
      open={snackbar.open}
      autoHideDuration={3000}
      onClose={() => setSnackbar({ ...snackbar, open: false })}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <MuiAlert
        elevation={6}
        variant="filled"
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        severity={snackbar.severity}
        sx={{ width: '100%' }}
      >
        {snackbar.message}
      </MuiAlert>
    </Snackbar>

    </>
     
  );
}
