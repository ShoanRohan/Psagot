import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/Edit';
import { Box, IconButton } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllRooms } from '../features/room/roomActions';
import { useEffect } from 'react';

export default function RoomsGrid() {
  const dispatch = useDispatch();
  const { status, selectedRoom, rooms, error } = useSelector((state) => state.room);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchAllRooms());
    }
  }, [status, dispatch]);



  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.white,
      color: theme.palette.common.black,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 16,
      width: '2000px',/////כאן
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: '#FAFCFF',
      textAlign: 'center',
    },
    height: '79px',
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  function createData(roomsNane, roomsNumber, pepoleCount, equipment) {
    return { roomsNane, roomsNumber, pepoleCount, equipment };
  }

    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 1000 }} aria-label="customized table"> {/*כאן*/}
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
            {rooms.map((row) => (
              <StyledTableRow key={row.roomsNane}>
                <StyledTableCell component="th" scope="row" align="center">
                  {row.name}
                </StyledTableCell>
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
                  <Paper sx={{ borderRadius: 3, padding: 1, backgroundColor: "#FAFAFA", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "none" }}>
                      <IconButton sx={{ padding: 0 }}>
                        <DeleteOutlinedIcon sx={{ fontSize: "20px" }} />
                      </IconButton>
                    </Paper>
                    <Paper sx={{ borderRadius: 3, padding: 1, backgroundColor: "#FAFAFA", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "none" }}>
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
    );
  

}
