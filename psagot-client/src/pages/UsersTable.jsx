import { tableUsers } from "../utils/userUtil";
import {
  Box, Button, Typography, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, IconButton,
  MenuItem, FormControl, Select, FormHelperText, Pagination
} from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { DeleteOutline } from "@mui/icons-material";
import { useEffect, useState } from "react";
import '../styles/usersTable.css';

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalUsers, setTotalUsers] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    // קריאה לנתונים ממקור נתונים
    const allUsers = tableUsers(); // פונקציה שמחזירה את רשימת המשתמשים
    setTotalUsers(allUsers.length);
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    setUsers(allUsers.slice(start, end));
  }, [page, pageSize]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handlePageSizeChange = (event) => {
    setPageSize(Number(event.target.value));
    setPage(1); // לאתחל עמוד כשמשנים גודל עמוד
  };

  return (
    <div className="users-table-container">
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6">רשימת משתמשים</Typography>
        <FormControl size="small">
          <Select value={pageSize} onChange={handlePageSizeChange}>
            {[5, 10, 20, 50].map((size) => (
              <MenuItem key={size} value={size}>{size} לשורה</MenuItem>
            ))}
          </Select>
          <FormHelperText>מספר שורות לעמוד</FormHelperText>
        </FormControl>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>שם</TableCell>
              <TableCell>אימייל</TableCell>
              <TableCell>סטטוס</TableCell>
              <TableCell>פעולות</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, index) => (
              <TableRow key={index}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.active ? 'פעיל' : 'לא פעיל'}</TableCell>
                <TableCell>
                  <IconButton><EditOutlinedIcon /></IconButton>
                  <IconButton><DeleteOutline /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box display="flex" justifyContent="center" mt={2}>
        <Pagination
          count={Math.ceil(totalUsers / pageSize)}
          page={page}
          onChange={handlePageChange}
        />
      </Box>
    </div>
  );
};

export default UsersTable;
