import * as React from "react";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers, updateUserAction } from "../features/user/userAction";
import { useEffect } from "react";
import { DataGrid, GridRowModes,  GridActionsCellItem} from "@mui/x-data-grid";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import editIcon from "../assets/icons/edit.png";


const UserGrid = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.user);
  console.log("Users in Component:", users);

  const [rows, setRows] = React.useState([]);
  const [rowModesModel, setRowModesModel] = React.useState({});

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  useEffect(() => {
    if (users && users.length > 0) {
      console.log("Users data", users);
      const usersWithIds = users.map((user) => ({
        ...user,
        id: user.userId,  // ודאי שהתכונה `userId` קיימת
        name: user.name,
        email: user.email,
        phone: user.phone,
        password: user.password,
        userTypeName: user.userTypeName,
       isActive: user.IsActive
  
      }));
      setRows(usersWithIds);
    }
  }, [users]);

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id, updatedRow) => () => {
    dispatch(updateUserAction(updatedRow));
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = [
    { field: "name", headerName: "שם"},
    { field: "email", headerName: "מייל"},
    { field: "phone", headerName: "טלפון"},
    { field: "password", headerName: "סיסמא"},
    { field: "userTypeName", headerName: "הרשאה"},
    {
      field: "isActive",
      headerName: "סטטוס",
      renderCell: (params) => (params.value ? "פעיל" : "לא פעיל"),
  },
    {
      field: "actions",
      type: "actions",
      width: '5.2%',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              onClick={() =>
                handleSaveClick(id, rows.find((row) => row.id === id))
              }
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              onClick={handleCancelClick(id)}
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
         width: '78%',
         display:'flex',
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

            // עיצוב גוף הטבלה בלבד
             "& .MuiDataGrid-virtualScroller": {   
              width: '100%',
              height: '89%',      
               paddingTop: "10px",
               paddingRight: "20px",
               paddingBottom: "10px",
               paddingLeft: "20px",
               borderRadius: "10px",
               background: "#FFFFFF",
               boxShadow: "0px 0px 4px 0px #D7E6FCCC",
             },

            //  "& .MuiDataGrid-columnHeaders": {
            //   width: '100%',
            //   height: '4.7%',
            //   borderBottom: '0.15% solid #C6C6C6',
            // },
            // עיצוב הכותרות
            "& .MuiDataGrid-columnHeaders": {
              width: '100%',
              height: '5%', // המרה של 32px מתוך 610px גובה הטבלה
              borderBottom: '0.15% solid #C6C6C6', // המרה של 1px מתוך 610px
              borderRadius: '0.65%',
            },
            "& .MuiDataGrid-columnSeparator": {
              display: "none",
            },
            "& .MuiDataGrid-columnHeaderTitle": {
              fontWeight: "bold",
           
            },

            // // עיצוב שורות וגבולות פנימיים
            "& .MuiDataGrid-cell": {
              justifyContent: 'space-between',
              padding: '0.3% 2%',
              borderTop: "none",
              textAlign: 'right',
             },
            "& .MuiDataGrid-cellContent": {
              justifyContent: 'right'
            },

            "& .MuiDataGrid-row": {
              width: '100%',
              height: '13%',
              justifyContent: 'space-between',
              borderBottom: "1px solid #D7E6FCCC",
              "&:nth-of-type(even)": { backgroundColor: "#FAFCFF" },
              "&:nth-of-type(odd)": { backgroundColor: "#FFFFFF" },
            },

           // השארת הפוטר ללא שינוי
            "& .MuiDataGrid-footerContainer": {
              // width: '77.1%',
              // height:'5.4%',
              // padding:'1.5%',
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
          onRowModesModelChange={handleRowModesModelChange}
        />
    </Box>
  );
};

export default UserGrid;
