import * as React from "react";
import Box from "@mui/material/Box";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {
  DataGrid,
  GridRowModes,
  GridActionsCellItem
} from "@mui/x-data-grid";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import editIcon from "../assets/icons/editIcon.png";
import Scrolling from "../assets/icons/Scrolling.png";
import Pagination from '@mui/material/Pagination';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';

const CourseGrid = ({ courses }) => {
  const dispatch = useDispatch();
  const [rows, setRows] = useState([]);
  const [rowModesModel, setRowModesModel] = useState({});
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  });

  useEffect(() => {
    if (courses && courses.length > 0) {
      const filtered = courses.map(course => ({
        ...course,
        isActive: course.statusId === 1,
      }));
      setRows(filtered);
    } else {
      setRows([]);
    }
  }, [courses]);

  const handleEditClick = (id) => () => {

  };

  const formatDayMonthFromParts = (params) => {
    const dateStr = typeof params === 'string' ? params : params?.value;
    if (!dateStr || typeof dateStr !== 'string') return '';
    const [year, month, day] = dateStr.split('-');
    if (!day || !month) return '';
    return `${day}/${month}`;
  };

  const columns = [
    { field: 'courseId', headerName: 'קוד קורס', flex: 1, editable: true, headerAlign: 'center', align: 'center' },
    { field: 'name', headerName: 'שם קורס', flex: 1, editable: true, headerAlign: 'center', align: 'center' },
    { field: 'coordinator', headerName: 'שם רכזת', flex: 1, editable: true, headerAlign: 'center', align: 'center' },
    { field: 'year', headerName: 'שנה', flex: 1, editable: true, headerAlign: 'center', align: 'center' },
    { field: 'startDate', headerName: 'תאריך התחלה', flex: 1, editable: true, headerAlign: 'center', align: 'center', valueFormatter: formatDayMonthFromParts },
    { field: 'endDate', headerName: 'תאריך סיום', flex: 1, editable: true, headerAlign: 'center', align: 'center', valueFormatter: formatDayMonthFromParts },
    { field: 'numberOfMeetings', headerName: 'מס מפגשים', flex: 1, editable: true, headerAlign: 'center', align: 'center' },
    { field: 'numberOfStudents', headerName: 'מס תלמידים', flex: 1, editable: true, headerAlign: 'center', align: 'center' },
    {
      field: "statusId",
      headerName: "סטטוס",
      flex: 1,
      headerAlign: "center",
      sortable: false,
      align: "center",
      renderCell: (params) => {
        const status = Number(params.value);
        const statusMap = {
          1: { text: "פעיל", style: { background: '#DAF8E6', color: '#1A8245' } },
          2: { text: "ממתין", style: { background: '#FEEBEB', color: '#B00020' } },
          3: { text: "הסתיים", style: { background: '#E5E7EB80', color: '#374151' } },
        };
        const currentStatus = statusMap[status] || {
          text: "לא ידוע", style: { background: '#E5E7EB80', color: '#374151' }
        };
        return (
          <div style={{
            width: '72px',
            height: '24px',
            padding: '4px 16px',
            borderRadius: '50px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: "0.65vw",
            fontFamily: 'Rubik',
            fontWeight: 400,
            cursor: 'default',
            ...currentStatus.style
          }}>
            {currentStatus.text}
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
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
        return isInEditMode ? [
          <GridActionsCellItem icon={<SaveIcon />} label="Save" />,
          <GridActionsCellItem icon={<CancelIcon />} label="Cancel" />,
        ] : [
          <GridActionsCellItem icon={<img src={editIcon} alt='עריכה' />} label="Edit" onClick={handleEditClick(id)} />,
        ];
      },
    },
  ];

  const CustomPagination = () => {
    const pageCount = Math.ceil(rows.length / paginationModel.pageSize);

    return (
      <Box
        sx={{
    borderRadius: "8px",
    background: "#FFF",
    boxShadow: "0px 0px 4px 0px rgba(220, 226, 236, 0.80)",
    display: "flex",
    padding: "1% 0.5%",
    alignItems: "center",
    alignSelf: "stretch",
    marginTop: "1%", 
    width: "95%",
        }}
      >

        <Stack direction="row" alignItems="center" spacing={1}>
          <span style={{ fontSize: "0.75vw", fontFamily: "Rubik" }}>
            מספר שורות :
          </span>
          <Select
            size="small"
            value={paginationModel.pageSize}
            onChange={(e) =>
              setPaginationModel({ page: 0, pageSize: e.target.value })
            }
            variant="standard"
            disableUnderline
            sx={{ fontSize: "0.75vw", height: "30px", border: "none" }}
          >
            {[10, 20, 50].map((size) => (
              <MenuItem key={size} value={size}>
                {size}
              </MenuItem>
            ))}
          </Select>
        </Stack>

        <Box sx={{ flexGrow: 1 }} />

        <Pagination
        dir="rtl" 
          count={pageCount}
          page={paginationModel.page + 1}
          onChange={(e, value) =>
            setPaginationModel((prev) => ({ ...prev, page: value - 1 }))
          }
          shape="rounded"
          siblingCount={0}
          size="small"
          
        />
      </Box>
  );
};


  return (
    <Box sx={{ width: '100%', direction: 'rtl' }}>
    <Box
      sx={{
      direction: 'rtl',
      height: "60%",
      width: 'calc(100% - 48px)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      alignSelf: 'stretch',
      padding: "1.2% 1% 2% 2%",
      borderRadius: '10px',
      backgroundColor: "#FFF",
      boxShadow: '0px 0px 4px rgba(220, 226, 236, 0.8)',
      position: 'absolute',
      top: '30%',
      zIndex: 1,
      boxSizing: 'border-box',
      overflow: 'hidden',
      border: "none",
      "& .MuiDataGrid-root": {
    border: "none",
  },
      }}
      
    >
      <Box sx={{ flexGrow: 1, width: '100%' ,position: 'relative',}}>
       
  <Box sx={{
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: '2px',
    zIndex: 3
  }}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="2"ש
      height="100%"
      viewBox="0 0 2 100"
      preserveAspectRatio="none"
      fill="none"
      style={{ height: '100%' }}
    >
      <path d="M1 0L1 100" stroke="#326DEF" strokeWidth="2" strokeLinecap="round" />
    </svg>
  </Box>
  <Box
    sx={{
      width: '100%',
      maxHeight: '20%',
      overflowY: 'auto',
    }}
  ></Box>
      <DataGrid
  sx={{
    
"& .MuiDataGrid-columnHeader": {
  display: "grid",
  placeItems: "center",
  textAlign: "center",
},

 "& .MuiDataGrid-footerContainer": {
      borderTop: "none",
    },

    "& .MuiDataGrid-columnHeaderTitle": {
  fontWeight: "bold",
  textAlign: "center",
  justifyContent: "center",
  display: "flex",
  fontFamily: "Rubik",
  fontSize: "0.7vw",
  color: "#2A2A2A",
},

    "& .MuiDataGrid-columnSeparator": {
      display: "none",
    },
    "& .MuiDataGrid-cell": {
      whiteSpace: "normal",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      padding: "1.5% 1%",
      fontSize: "0.7vw",
      fontFamily: "Rubik",
      border: "none",
      outline: "none",
    },
    "& .MuiDataGrid-row": {
      display: "flex",
      width: "100%",
      height: "auto", 
      padding: "0.3% 0 0.3% 0.3%",
      justifyContent: "space-between",
      alignItems: "center",

    
      background: "#FFFFFF",
      "&:nth-of-type(even)": {
        backgroundColor: "#FAFCFF",
      },
      "&:nth-of-type(odd)": {
        backgroundColor: "#FFFFFF",
      },
      
    },
  }}

       rows={rows}
        columns={columns}
        getRowId={(row) => row.courseId}
        pagination
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        pageSizeOptions={[10, 20, 50]}
        hideFooter 
      />
    </Box>
  </Box>

   <Box sx={{ 
    position: "absolute",
    bottom: "2.5%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    left: "0.02%"
    
     }}>
    <CustomPagination />
  </Box>

  </Box>
  );
};

export default CourseGrid;
