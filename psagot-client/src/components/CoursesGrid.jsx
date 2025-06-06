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
          display: "flex",
          width: "100%",
          padding: "1% 2%",
          alignItems: "center",
          justifyContent: "space-between",
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
    <Box
      sx={{
        direction: 'rtl',
        height: "65%",
        width: 'calc(100% - 48px)',
        display: 'flex',
        flexGrow: 1,
        position: 'absolute',
        top: '29.72%',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1,
        boxSizing: 'border-box',
        boxShadow: '0px 0px 4px rgba(220, 226, 236, 0.8)',
        backgroundColor: "#FFFFFF",
        borderRadius: '10px',
        border: '1px solid #E5E7EB',
        flexDirection: 'column',
      }}
    >
      <DataGrid
        sx={{
          "& .MuiDataGrid-columnHeaders": {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "1% 2%",
            height: "6%",
            borderBottom: "2px solid var(--Neutral-20, #F0F1F3)",
            backgroundColor: "#FFFFFF",
          },
          "& .MuiDataGrid-columnHeader": {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            fontFamily: "Rubik",
            fontSize: "0.8vw",
            fontWeight: 500,
            color: "#2A2A2A",
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
            padding: "1.5% 1%",
            fontSize: "0.8vw",
            fontFamily: "Rubik",
          },
          "& .MuiDataGrid-row": {
            display: "flex",
            width: "100%",
            height: "7%",
            padding: "0.2% 0 0.2% 0.2%",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "0.1% solid #F0F1F3",
            background: "#FFFFFF",
            "&:nth-of-type(even)": {
              backgroundColor: "#FAFCFF",
            },
            "&:nth-of-type(odd)": {
              backgroundColor: "#FFFFFF",
            },
          }
        }}
        rows={rows}
        columns={columns}
        getRowId={(row) => row.courseId}
        rowModesModel={rowModesModel}
        pagination
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        pageSizeOptions={[10, 20, 50]}
        slots={{ pagination: CustomPagination }}
      />
    </Box>
  );
};

export default CourseGrid;
