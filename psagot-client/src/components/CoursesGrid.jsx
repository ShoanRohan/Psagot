import * as React from "react";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { DataGrid, GridRowModes, GridActionsCellItem } from "@mui/x-data-grid";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import editIcon from "../assets/icons/editIcon.png";

const CourseGrid = ({ courses }) => {
  const dispatch = useDispatch();
  const [rows, setRows] = useState([]);
  const [rowModesModel, setRowModesModel] = useState({});

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
    // Implement edit logic if needed
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
        const cellStyle = {
          width: '72px',
          height: '24px',
          padding: '4px 16px',
          borderRadius: '50px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: "12px",
          fontFamily: 'Rubik',
          fontWeight: 400,
          lineHeight: '100%',
          letterSpacing: '0%',
          textTransform: 'capitalize',
          cursor: 'default',
        };

        const statusMap = {
          1: {
            text: "פעיל",
            style: {
              background: '#DAF8E6',
              color: '#1A8245',
            }
          },
          2: {
            text: "ממתין",
            style: {
              background: '#FEEBEB',
              color: '#B00020',
            }
          },
          3: {
            text: "הסתיים",
            style: {
              background: '#E5E7EB80',
              color: '#374151',
            }
          }
        };

        const currentStatus = statusMap[status] || {
          text: "לא ידוע",
          style: {
            background: '#E5E7EB80',
            color: '#374151',
          }
        };

        return (
          <div style={{ ...cellStyle, ...currentStatus.style }}>
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
            icon={<img src={editIcon} alt='עריכה' />}
            label="Edit"
            onClick={handleEditClick(id)}
          />
        ];
      },
    },
  ];

  return (
    <Box
      sx={{
        direction: 'rtl',
        height: 'calc(100vh - 240px)', // Adjusted for larger gap
        width: 'calc(100% - 48px)', // Match CourseSearch width
        display: 'flex',
        flexGrow: 1,
        position: 'absolute',
        top: '216px', // Increased gap: 120px (top of CourseSearch) + 72px (height of CourseSearch) + 24px (larger gap)
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1,
        boxSizing: 'border-box', // Ensure width calculation is consistent
      }}
    >
      <DataGrid
        sx={{
          width: '100%',
          height: '100%',
          background: "#FFFFFF",
          boxShadow: "0px 0px 4px 0px #D7E6FCCC",
          borderRadius: "10px",
          boxSizing: 'border-box', // Ensure padding is included in width
          "& .MuiDataGrid-virtualScroller": {
            width: '100%',
            height: 'calc(100% - 48px)', // Adjust for header height
            paddingTop: "16px",
            paddingRight: "16px",
            paddingBottom: "16px",
            paddingLeft: "16px",
            borderRadius: "10px",
            background: "#FFFFFF",
            boxShadow: "0px 0px 4px 0px #D7E6FCCC",
            boxSizing: 'border-box',
          },
          "& .MuiDataGrid-columnHeaders": {
            display: "grid",
            gridTemplateColumns: `repeat(${columns.length}, 1fr)`,
            backgroundColor: "#F0F0F0",
            fontWeight: "bold",
            height: "48px",
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
            fontSize: '14px',
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
            border: "none",
            whiteSpace: "normal",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            padding: "8px",
            fontSize: "14px",
          },
          "& .MuiDataGrid-cellContent": {
            justifyContent: 'right'
          },
          "& .MuiDataGrid-row": {
            width: '100%',
            height: '48px', // Fixed row height based on Figma
            justifyContent: 'space-between',
            borderBottom: "1px solid #D7E6FCCC",
            "&:nth-of-type(even)": { backgroundColor: "#FAFCFF" },
            "&:nth-of-type(odd)": { backgroundColor: "#FFFFFF" },
          },
          "& .MuiDataGrid-footerContainer": {
            background: "#FFFFFF",
            boxShadow: "0px 0px 4px 0px #D7E6FCCC",
            borderRadius: "8px",
          }
        }}
        rows={courses}
        columns={columns}
        getRowId={(row) => row.courseId}
        rowModesModel={rowModesModel}
        hideFooter={true}
      />
    </Box>
  );
};

export default CourseGrid;