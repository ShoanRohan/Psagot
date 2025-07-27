// UsersPage.jsx
import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import { useDispatch, useSelector } from "react-redux";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import excelIcon from "../assets/icons/excelIcon.svg";
import { fetchAllUsers, fetchFilteredUseres } from "../features/user/userAction";
import { fetchAllUserTypes } from "../features/userType/userTypeActions";
import UsersSearch from '../components/UsersSearch';
import UsersTable from "../components/UsersTable";
import AddUser from "../components/AddUser";

const UsersPage = () => {
   const dispatch = useDispatch();
   const { users } = useSelector((state) => state.user);
   const { status: userTypeStatus } = useSelector((state) => state.userType);

   const [currentFilters, setCurrentFilters] = useState({
     name: "",
     phone: "",
     userTypeName: "",
     isActive: true,
     });

     useEffect(() => {
     dispatch(fetchAllUsers(currentFilters));
    }, [dispatch, currentFilters]);

   useEffect(() => {
     if (userTypeStatus === "idle") {
       dispatch(fetchAllUserTypes());
     }
   }, [userTypeStatus, dispatch]);

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
              {/* שינוי כאן: גודל גופן והזחה שמאלה כמו בצילום מסך */}
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
              <UsersTable />
              {/* <AddUser/> */}
        </Container>
    );
};

export default UsersPage;