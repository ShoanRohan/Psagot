import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import CircularProgress from "@mui/material/CircularProgress";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { styled } from "@mui/material/styles";
import { fetchAllRooms } from "../features/room/roomActions";
import {
  changePageIndex,
  changePageSize,
  updateFilteredRooms,
} from "../features/room/roomSlice";
import TablePaginationActions from "./TablePaginationActions"

const StyledTableCell = styled(TableCell)(() => ({
  fontSize: "14px",
  textAlign: "right",
  whiteSpace: "nowrap",
  borderBottom: "none",
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#f9f9f9",
  },
  "&:hover": {
    backgroundColor: "#f1f1f1",
  },
}));

const RoomsGrid = () => {
  const {
    filteredRooms: rooms,
    status: roomStatus,
    error: roomError,
    pageSize,
    pageIndex,
    totalFilteredCount
  } = useSelector((state) => state.room);
  const dispatch = useDispatch();
  const isLoading = roomStatus === "Loading";

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchAllRooms());
      } catch (error) {
        console.log("Error occurred while fetching the rooms:", error);
      }
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    dispatch(updateFilteredRooms());
  }, [dispatch, pageIndex, pageSize]);

  const handleChangePage = (event, newPage) => {
    dispatch(changePageIndex(newPage));
  };

  const handleChangeRowsPerPage = (event) => {
    dispatch(changePageSize(Number(event.target.value)));
  };

  const renderEquipment = (room) => {
    const items = [];
    if (room.computers) items.push("מחשבים");
    if (room.speakers) items.push("רמקולים");
    if (room.projector) items.push("מקרן");
    return items.join(", ");
  };

  if (isLoading) {
    return (
      <Box
        display="Flex"
        justifyContent="center"
        alignment="center"
        height="60vh"
      >
        <CircularProgress></CircularProgress>
      </Box>
    );
  }
  if (roomStatus === "failed")
    return <Box> שגיאה בטעינת חדרים :{roomError}</Box>;

  return (
    <TableContainer
      component={Paper}
      sx={{ borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}
    >
      <Table sx={{ borderCollapse: "separate", borderSpacing: 0 }}>
        <TableHead>
          <TableRow>
            <StyledTableCell>
              <b>שם חדר</b>             
              </StyledTableCell>
            <StyledTableCell>
              <b>מספר חדר</b>       
              </StyledTableCell>
            <StyledTableCell>
               <b>מס' מקומות</b>   
            </StyledTableCell>
            <StyledTableCell>
              <b>ציוד </b>               
            </StyledTableCell>
            <StyledTableCell
              align="center"
              sx={{ width: "70px" }}
            ></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rooms.map((room) => (
            <StyledTableRow key={room?.roomId}>
              <StyledTableCell>{room?.name}</StyledTableCell>
              <StyledTableCell>{room?.roomId}</StyledTableCell>
              <StyledTableCell>{room?.capacity}</StyledTableCell>
              <StyledTableCell>{renderEquipment(room)}</StyledTableCell>
              <StyledTableCell align="center" sx={{ width: "70px" }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 0.5,
                  }}
                >
                  <IconButton color="primary" sx={{ p: 0.5 }}>
                    <EditOutlinedIcon fontSize="small" />
                  </IconButton>
                  <IconButton sx={{ color: "#1976d2", p: 0.5 }}>
                    <DeleteOutlineIcon fontSize="small" />
                  </IconButton>
                </Box>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={totalFilteredCount}
        page={pageIndex}
        onPageChange={handleChangePage}
        rowsPerPage={pageSize}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25, 50]}
        labelRowsPerPage="מספר שורות:"
        labelDisplayedRows={() => `עמוד ${pageIndex + 1}`}
        ActionsComponent={TablePaginationActions}
        sx={{
          borderTop: "1px solid #e0e0e0",
          direction: "ltr",
          "& .MuiTablePagination-toolbar": {
            justifyContent: "flex-end",
            paddingRight: "16px",
            paddingLeft: "16px",
            minHeight: "48px",
          },
          "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows":
            {
              fontSize: "13px",
              color: "#6b6b6b",
            },
          "& .MuiTablePagination-actions button": {
            borderRadius: "4px",
            minWidth: "32px",
            height: "32px",
            margin: "0 2px",
            color: "#1976d2",
          },
        }}
      />
    </TableContainer>
  );
};

export default RoomsGrid;
