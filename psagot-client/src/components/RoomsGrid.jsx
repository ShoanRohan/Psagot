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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    width: '1402px',
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

function createData(
  roomsNane,
  roomsNumber,
  pepoleCount,
  equipment,
) {
  return { roomsNane, roomsNumber, pepoleCount, equipment };
}

const rows = [
  createData('אולם', 4, 32, 'מקרן, הגברה'),
  createData('חדר סימולציות',5,16,'מקרן'),
  createData('חדר חדשנות',3,40,'מערכת סטריאו'),
  createData('מרכז פדגוגי',2,20,'מחשב נייד'),
  createData('משרד',4,30,'טלפון חכם'),
];

export default function RoomsGrid() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
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
          {rows.map((row) => (
            <StyledTableRow key={row.roomsNane}>
              <StyledTableCell component="th" scope="row" align="center">
                {row.roomsNane}
              </StyledTableCell>
              <StyledTableCell align="center">{row.roomsNumber}</StyledTableCell>
              <StyledTableCell align="center">{row.pepoleCount}</StyledTableCell>
              <StyledTableCell align="center">{row.equipment}</StyledTableCell>
              <StyledTableCell align="center"><button><DeleteOutlinedIcon /></button><button><EditIcon/></button></StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
