import { useEffect } from "react";
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
import UnfoldMoreOutlinedIcon from '@mui/icons-material/UnfoldMoreOutlined';
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
import { Select, Typography, MenuItem , Pagination} from "@mui/material";
import { Grid } from "@mui/system";

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
    <>
        <Box
      sx={{
        margin: "auto",
        borderRadius: "10px",
        backgroundColor: "white",
        direction: "ltr",
        boxShadow: "0px 4px 12px rgba(220, 226, 236, 0.8)",
      }}
    >
<TableContainer
  sx={{
    maxHeight: 500,
    overflowY: 'auto',
direction:'ltr',
    '&::-webkit-scrollbar': {
      width: '1px',
    },
'& table':{
  direction:'rtl'
},
    '&::-webkit-scrollbar-track': {
      backgroundColor: '#f0f0f0',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#1976d2', // כחול של MUI
      borderRadius: '1px',
    },
    '&::-webkit-scrollbar-thumb:hover': {
      backgroundColor: '#1565c0', // כחול כהה יותר בהובר
    },
    scrollbarWidth: 'thin', // Firefox
    scrollbarColor: '#1976d2 #f0f0f0',
  }}
>
      <Table stickyHeader sx={{ borderCollapse: "separate", borderSpacing: 0 , padding:"15px"}}>
        <TableHead sx={{fontWeight: "bold"}}>
          <TableRow>
            <StyledTableCell>
              שם חדר          
              </StyledTableCell>
            <StyledTableCell>
              מספר חדר    
              </StyledTableCell>
            <StyledTableCell>
               מס' מקומות
            </StyledTableCell>
            <StyledTableCell>
              ציוד             
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
                  <IconButton sx={{ color: "#1976d2", p: 0.5 }}>
                    <DeleteOutlineIcon fontSize="small" />
                  </IconButton>
                  <IconButton color="primary" sx={{ p: 0.5 }}>
                    <EditOutlinedIcon fontSize="small" />
                  </IconButton>
                </Box>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      </TableContainer></Box>
<Box
  sx={{
   // margin:"auto",
    px: 2,
    //py: 2,
    //width: '100%',
//height:'40px',
    bgcolor: 'white',
    direction: 'rtl',
    borderRadius: "10px",
    boxShadow: "0px 4px 12px rgba(220, 226, 236, 0.8)",
    mt: 2
  }}
>
  <Grid container alignItems="self-end" justifyContent="space-between">
    <Grid item  display="inline-flex" justifyContent="start" alignItems="center">
      <Typography
textAlign="right"
        display="inline"
        fontFamily="Rubik"
        fontSize="14px"
//        sx={{ ml: 1 }}
      >
מספר שורות:
      </Typography>
      <Select
        IconComponent={(props) => <UnfoldMoreOutlinedIcon {...props} sx={{ fontSize: 'small' }} />}
        displayEmpty
        onChange={(e) => dispatch(changePageSize(Number(e.target.value)))}
        value={pageSize}
        sx={{
          height: '26px',
          width: '49px',
          borderRadius: '10px',
          borderWidth: '0.5px',
          borderColor: '#F0F1F3',
          pl: 0,
          pr: 0,
          fontSize: '12px',
//          ml: '8px',
          textAlign: 'center',
          '& .MuiSelect-select': {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
width:'49px'
          },
        }}
      >
        {[10, 25, 50].map((size) => (
          <MenuItem key={size} value={size} sx={{ justifyContent: 'center' }}>
            {size}
          </MenuItem>
        ))}
      </Select>
    </Grid>

    <Grid item xs={6} display="inline-flex" justifyContent="end">
      <Pagination
        onChange={(event, value) => dispatch(changePageIndex(value - 1))}
        count={Math.ceil(totalFilteredCount / pageSize)}
        page={pageIndex + 1}
        sx={{
          direction: 'ltr',
ml:0,
          '& .MuiPaginationItem-root': { fontSize: 12 },
        }}
      />
    </Grid>
  </Grid>
</Box>
    </>
  );
};

export default RoomsGrid;
