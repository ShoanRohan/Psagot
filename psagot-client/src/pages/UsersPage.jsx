import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import { Stack } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import excelIcon from "../assets/icons/excelIcon.svg";
import { useDispatch, useSelector } from "react-redux";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { fetchAllUsers } from "../features/user/userAction";

const buttonStyles = {
  height: "44px",
  padding: "0px 20px",
  gap: "8px",
  borderRadius: "50px",
  boxShadow: "none",
  fontFamily: "Rubik",
  fontWeight: 400,
  fontSize: "16px",
  lineHeight: "18.96px",
  backgroundColor: "#326DEF",
  color: "white",
  "&:hover": {
    backgroundColor: "#2857C4",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
  },
  "&:active": {
    backgroundColor: "#234E9D",
    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.3)",
  },
};

const UsersPage = () => {
    const{users}=useSelector(state=>state.user)
    const dispatch=useDispatch()
    useEffect(()=>{
        dispatch(fetchAllUsers())

    },[])

    //- הודה לקובץ אקסל את המשתמשים- פונ שמיצא לאקסל
    const exportAllUsersToExcel = () => {
        if (!users || users.length === 0) return;
    
        const worksheet = XLSX.utils.json_to_sheet(users);
    
      
        const workbook = XLSX.utils.book_new();
    
      
        XLSX.utils.book_append_sheet(workbook, worksheet);
        workbook.Workbook = {
          Views: [
            {
              RTL: true, 
            },
          ],
        };
    
        const excelBuffer = XLSX.write(workbook, {
          bookType: 'xlsx',
          type: 'array'
        });
    
        const blob = new Blob([excelBuffer], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
        });
    
        saveAs(blob, "users.xlsx");
      };
      //הקומפוננטה שמוצגת על המסך
  return (
    <Container maxWidth={false} sx={{ width: '80vw', mx: 'auto', px: 2, pt: 3, pb: 3, overflowY: 'unset' }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
          direction: "rtl",
        }}
      >
        <Typography
          variant="h1"
          align="right"
          sx={{
            fontFamily: "Rubik, sans-serif",
            fontWeight: 700,
            fontSize: "40px",
            color: "#0D1783",
          }}
        >
          משתמשים
        </Typography>

        <Stack direction="row" spacing={2} sx={{ direction: "ltr" }}>
          <Button
            variant="contained"
            sx={{ ...buttonStyles, backgroundColor: "#326DEF" }}

            startIcon={<AddCircleOutlineIcon />}
            // onClick={() => setOpenDialog(true)}
          >
            הוספת משתמש
          </Button>
          <IconButton
            onClick={exportAllUsersToExcel}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "44px",
              width: "44px",
              padding: 0,
            }}
          >
            <Box
              component="img"
              src={excelIcon}
              alt="ייצוא לאקסל"
              sx={{
                height: "24px",
                width: "24px",
                verticalAlign: "middle",
                mt: "-4px",
              }}
            />
          </IconButton>
        </Stack>
      </Box>

      {/* <CourseSearch
        filters={filters}
        setFilters={setFilters}
        onSearch={handleSearch}
        initialState={initialState}
      /> */}

      {/* <CourseGrid
        totalCount={totalCount}
        currentPage={currentPage}
        pageSize={pageSize}
        onPageChange={changePage}
        onPageSizeChange={handlePageSizeChange}
      /> */}

      {/* <TopicDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onSubmit={handleAddCourse}
      /> */}
    </Container>
  );
};



export default UsersPage;