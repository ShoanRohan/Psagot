import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
    fontWeight: 'bold',
    border: `1px solid ${theme.palette.divider}`, // הוספת גבול מסביב לכל תא בכותרת
    
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
    border: `1px solid ${theme.palette.divider}`, // הוספת גבול מסביב לכל תא בגוף
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  '& td, & th': {
    border: `1px solid rgba(224, 224, 224, 1)`, // גבול מסביב לכל תא
  },
}));

function createData(a, b, c, d, e, f, g, h, i, j, k, l, m) {
  return { a, b, c, d, e, f, g, h, i, j, k, l, m };
}

const rows = [
  createData('חדר-1', 'נושא 1 חשבות שכר', 'נושא 1 חשבות שכר', 'נושא 1 חשבות שכר'),
  createData('חדר-2', '', '', '', '', '', '', '', '', 'בדיקות תוכנה', 'בדיקות תוכנה', 'בדיקות תוכנה', 'בדיקות תוכנה'),
  createData('חדר-3', '', '', '', '', '', '', '', '', '', '', ''),
  createData('חדר-4', '', '', '', '', '', '', '', '', '', '', ''),
  createData('חדר-5', '', '', '', '', '', '', '', 'מטפלות עזרה ראשונה', 'מטפלות עזרה ראשונה', 'מטפלות', 'מטפלות'),
];

export default function CustomizedTables() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 1000 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>חדר</StyledTableCell>
            <StyledTableCell align="right">08:00-09:00</StyledTableCell>
            <StyledTableCell align="right">09:00-10:00</StyledTableCell>
            <StyledTableCell align="right">10:00-11:00</StyledTableCell>
            <StyledTableCell align="right">11:00-12:00</StyledTableCell>
            <StyledTableCell align="right">12:00-13:00</StyledTableCell>
            <StyledTableCell align="right">13:00-14:00</StyledTableCell>
            <StyledTableCell align="right">14:00-15:00</StyledTableCell>
            <StyledTableCell align="right">15:00-16:00</StyledTableCell>
            <StyledTableCell align="right">16:00-17:00</StyledTableCell>
            <StyledTableCell align="right">17:00-18:00</StyledTableCell>
            <StyledTableCell align="right">18:00-19:00</StyledTableCell>
            <StyledTableCell align="right">19:00-20:00</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell component="th" scope="row">
                {row.a}
              </StyledTableCell>
              <StyledTableCell align="right">{row.b}</StyledTableCell>
              <StyledTableCell align="right">{row.c}</StyledTableCell>
              <StyledTableCell align="right">{row.d}</StyledTableCell>
              <StyledTableCell align="right">{row.e}</StyledTableCell>
              <StyledTableCell align="right">{row.f}</StyledTableCell>
              <StyledTableCell align="right">{row.g}</StyledTableCell>
              <StyledTableCell align="right">{row.h}</StyledTableCell>
              <StyledTableCell align="right">{row.i}</StyledTableCell>
              <StyledTableCell align="right">{row.j}</StyledTableCell>
              <StyledTableCell align="right">{row.k}</StyledTableCell>
              <StyledTableCell align="right">{row.l}</StyledTableCell>
              <StyledTableCell align="right">{row.m}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
