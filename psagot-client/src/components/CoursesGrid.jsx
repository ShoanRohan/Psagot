import * as React from "react";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { DataGrid, GridRowModes,  GridActionsCellItem} from "@mui/x-data-grid";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import editIcon from "../assets/icons/editIcon.png";
import { fetchAllCourses } from "../features/course/courseActions";


const CourseGrid = () => {
  const dispatch = useDispatch();
  const Courses = useSelector((state) => state.course.course);
  

  const [rows, setRows] = useState([]);
  const [rowModesModel, setRowModesModel] = useState({});

  useEffect(() => {
    dispatch(fetchAllCourses());
  }, [dispatch]);

  useEffect(() => {
    console.log("Courses in Component:", Courses);
    if (Courses && Courses.length > 0) {
      console.log("Courses data", Courses);
      setRows(Courses);
    }
  }, [Courses]);

  const handleEditClick = (id) => () => {

  };


    const columns = [
      { field: 'courseCode', headerName: 'קוד קורס', flex: 1, editable: true, headerAlign: 'center', align: 'center' },
      { field: 'courseName', headerName: 'שם קורס', flex: 1, editable: true, headerAlign: 'center', align: 'center' },
      { field: 'coordinator', headerName: 'שם רכזת', flex: 1, editable: true, headerAlign: 'center', align: 'center' },
      { field: 'lecturer', headerName: 'שם מרצה', flex: 1, editable: true, headerAlign: 'center', align: 'center' },
      { field: 'year', headerName: 'שנה', flex: 1, editable: true, headerAlign: 'center', align: 'center' },
      { field: 'startDate', headerName: 'תאריך התחלה', flex: 1, editable: true, headerAlign: 'center', align: 'center' },
      { field: 'endDate', headerName: 'תאריך סיום', flex: 1, editable: true, headerAlign: 'center', align: 'center' },
      { field: 'meetings', headerName: 'מס מפגשים', flex: 1, editable: true, headerAlign: 'center', align: 'center' },
      { field: 'students', headerName: 'מס ,תלמידים', flex: 1, editable: true, headerAlign: 'center', align: 'center' },  
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
         height: '70%',
         width: '100%',
         display:'flex',
         flexGrow: 1,
         position: 'absolute',
         top: '25%',
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
              fontSize: "0.1rem",
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
              fontSize: '0.86rem',
          
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
          rows={Courses}
          columns={columns}
          getRowId={(row) => row.CourseId}
          rowModesModel={rowModesModel}
          hideFooter={true}

        />
    </Box>
    
  );
};

export default CourseGrid;