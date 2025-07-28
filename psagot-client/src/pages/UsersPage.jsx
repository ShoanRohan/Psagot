
import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import { useDispatch, useSelector } from "react-redux";
import *as XLSX from "xlsx";
import { saveAs } from "file-saver";
import {  fetchAllUsers, fetchFilteredUseres, fetchUsersByPage, updateUserAction } from "../features/user/userAction";
import UsersSearch from '../components/UsersSearch';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { fetchAllUserTypes } from "../features/userType/userTypeActions";
import UsersTable from "../components/UsersTable";
import UpdateUser from '../components/UpdateUser';
import AddUser from "../components/AddUser";
import excelIcon from "../assets/icons/excelIcon.svg"

const UsersPage = () => {
  const [open, setOpen] = useState(false);  //האם דיאלוג העריכה פתוח
  const { users, status, error, pageNumber, pageSize, totalUsers } = useSelector((state) => state.user);//קריאה מה־Redux לנתוני המשתמשים הנוכחיים.
  const loggedInUser = useSelector((state) => state.auth?.loggedInUser || {}); //המשתמש המחובר כרגע
  const dispatch = useDispatch(); // יוזם שליחת פעולות ל־Redux

  const [currentFilters, setCurrentFilters] = useState({ //הפילטרים המשמשים לסינון רשימת המשתמשים
    name: "",
    phone: "",
    userTypeName: "",
    isActive: true
  });
  const { userTypes, status: userTypeStatus } = useSelector((state) => state.userType);//הרשאות / תפקידי משתמש, כולל סטטוס שליפה

  useEffect(() => {
    if (userTypeStatus === "idle") {
      dispatch(fetchAllUserTypes());
    }
  }, [userTypeStatus, dispatch]);

  useEffect(() => {
    dispatch(fetchUsersByPage({ pageNumber, pageSize }));
  }, [pageNumber, pageSize, dispatch]);

    const handleFilterChange = (filters) => {
        setCurrentFilters(filters);
        dispatch(fetchFilteredUseres(filters));
        console.log("Filters applied in UsersPage:", filters);
    };

    const handleClearFilters = (initialStateFromSearch) => {
        setCurrentFilters(initialStateFromSearch);
      console.log("Filters cleared in UsersPage.");
    };

    const exportAllUsersToExcel = () => {
    if (!users || users.length === 0) return;
    const worksheet = XLSX.utils.json_to_sheet(users);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet);
             workbook.Workbook = {
               Views: [{ RTL: true }],
    };
        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
        const blob = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8" });
        saveAs(blob, "users.xlsx");
    };

  

    return (
        <Container maxWidth={false} sx={{ width: "80vw", mx: "auto", px: 2, pt: 3, pb: 3, overflowY: "unset" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3, direction: "rtl" }}>
              <Typography variant="h4" sx={{ fontFamily: "Rubik, sans-serif", fontWeight: 700, fontSize: "30px", color: "#0D1783" }}>
                  משתמשים
              </Typography>
                <Stack direction="row" spacing={2} sx={{ direction: "ltr" }}>
                    <AddUser />
                    <IconButton onClick={exportAllUsersToExcel} sx={{ height: "44px", width: "44px" }}>
                      <Box component="img" src={excelIcon} alt="ייצוא לאקסל" sx={{ height: "24px", width: "24px", mt: "-4px" }} />
                    </IconButton>
                  </Stack>
            </Box>
              <UsersSearch onFilterChange={handleFilterChange} onClearFilters={handleClearFilters} />

              {/*ייבוא טבלת משתמשים*/}
               <Container>
          <UsersTable  
             setOpen={setOpen}
                  />
            </Container>
               {/* ייבוא קומפוננטת  עריכת משתמש */}
            <UpdateUser
             open={open}
             setOpen={setOpen}
            />
        </Container>
    );
};


export default UsersPage;