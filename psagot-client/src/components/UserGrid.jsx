import * as React from "react";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers, updateUserAction } from "../features/user/userAction";
import { useEffect, useState } from "react";
import { DataGrid, GridRowModes,  GridActionsCellItem} from "@mui/x-data-grid";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import editIcon from "../assets/icons/edit.png";


const UserGrid = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.user);
  

  const [rows, setRows] = useState([]);
  const [rowModesModel, setRowModesModel] = useState({});

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  useEffect(() => {
    console.log("Users in Component:", users);
    if (users && users.length > 0) {
      console.log("Users data", users);
      setRows(users);
    }
  }, [users]);

  const handleEditClick = (id) => () => {

  };

  const columns = [
    { field: "name", headerName: "שם", flex: 1, headerAlign: "center", align: "center", sortable: false},
    { field: "email", headerName: "מייל", flex: 1, headerAlign: "center", align: "center", sortable: false},
    { field: "phone", headerName: "טלפון", flex: 1, headerAlign: "center", align: "center", sortable: false},
    { field: "password", headerName: "סיסמא", flex: 1, headerAlign: "center", align: "center", sortable: false},
    { field: "userTypeName", headerName: "הרשאה", flex: 1, headerAlign: "center", align: "center", sortable: false},
    {
      field: "isActive",
      headerName: "סטטוס",
      flex: 1,
      headerAlign: "center",
      sortable: false,
      align: "center",
      renderCell: (params) => {
        const isActive = params.value;
        const cellStyle = {
          width: '2.7rem', 
          height: '1.2rem', 
          padding: '0.50rem 1.28rem', 
          borderRadius: '4.27rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '0.875rem',
          fontFamily: 'Rubik',
          fontWeight: 400,
          lineHeight: '100%',
          letterSpacing: '0%',
          textTransform: 'capitalize'
        };
    
        const activeStyle = {
          background: '#DAF8E6',
          color: '#1A8245',
        };
    
        const inactiveStyle = {
          background: '#E5E7EB80',
          color: '#374151',
        };
    
        return (
          <div style={{ ...cellStyle, ...(isActive ? activeStyle : inactiveStyle) }}>
            {isActive ? "פעיל" : "לא פעיל"}
          </div>
        );
      },
    },
    {
      field: "actions",
      type: "actions",
      flex: 1,
      headerAlign: "center",
      sortable: false,
      align: "center",
      width: '5.2%',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              />,

            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
            />,
          ];
        }
        return [
          <GridActionsCellItem
            icon={<img
              src={editIcon}
              alt= 'עריכה'
              />}
            label="Edit"
            onClick={handleEditClick(id)}
          />,
        ];
      },
    },
  ];

  return (
    <Box
      sx={{
        direction:'rtl',
         height: '72%',
         width: '88%',
         display:'flex',
         flexGrow: 1,
         position: 'absolute',
         top: '28%',
         left: '4%', 
      }}
    >
        <DataGrid
          sx={{
             width: '100%',
             height:'100%',
             background: "#FFFFFF",
             boxShadow: "0px 0px 4px 0px #D7E6FCCC",
             borderRadius: "10px",

            
             "& .MuiDataGrid-virtualScroller": {   
              width: '100%',
              height: '89%',      
               paddingTop: "2.8%",
               paddingRight: "1%",
               paddingBottom: "1%",
               paddingLeft: "1%",
               borderRadius: "10px",
               background: "#FFFFFF",
               boxShadow: "0px 0px 4px 0px #D7E6FCCC",
             },
             "& .MuiDataGrid-columnHeaders": {
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              height: "5%",
              borderBottom: "1px solid #C6C6C6",
              backgroundColor: "#f0f0f0",
              fontWeight: "bold",
              fontSize: "1.1rem",
            },
            "& .MuiDataGrid-columnHeadersInner": {
              display: "flex",
              alignItems: "center",
              justifyContent: 'center',
              width: "100%",
            },
            "& .MuiDataGrid-columnHeader": {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              flex: 1,
              fontWeight: 'bold',
              fontSize: '1rem',
              
            },
            
            "& .MuiDataGrid-columnHeaderTitle": {
              overflow: "visible",
              whiteSpace: "normal",
              textOverflow: "clip",
            },

            "& .MuiDataGrid-columnSeparator": {
              display: "none",
            },

            "& .MuiDataGrid-cell": {
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              padding: "10px",
             },

            "& .MuiDataGrid-cellContent": {
              justifyContent: 'right'
            },

            "& .MuiDataGrid-row": {
              width: '100%',
              height: '7%',
              justifyContent: 'space-between',
              borderBottom: "1px solid #D7E6FCCC",
              "&:nth-of-type(even)": { backgroundColor: "#FAFCFF" },
              "&:nth-of-type(odd)": { backgroundColor: "#FFFFFF" },
            },

            "& .MuiDataGrid-footerContainer": {
              background: "#FFFFFF",
              boxShadow: "0px 0px 4px 0px #D7E6FCCC",
              borderRadius: "8px",
            },
          }}
          rows={users}
          columns={columns}
          getRowId={(row) => row.userId}
          pageSize={5}
          rowModesModel={rowModesModel}
        />
    </Box>
  );
};

export default UserGrid;
