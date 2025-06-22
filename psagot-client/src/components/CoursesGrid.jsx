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
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';

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
      renderHeader: () => (
        <Box
          component="span"
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '4px',
            fontWeight: 'bold',
            fontFamily: 'Rubik',
            fontSize: '0.7vw',
            color: '#2A2A2A',
          }}
        >
          סטטוס
          <UnfoldMoreIcon sx={{ fontSize: '16px', color: '#2A2A2A' }} />
        </Box>
      ),
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
          width: "96%",
        }}
      >

        <Stack
          direction="row"
          alignItems="center"
          sx={{
            minWidth: 'fit-content',
            flexWrap: 'nowrap',
          }}
        >
          <Box
            component="span"
            sx={{
              fontSize: "0.75vw",
              fontFamily: "Rubik",
              whiteSpace: 'nowrap',
              display: 'flex',
              alignItems: 'center',
              marginLeft: '16px',
            }}
          >
            מספר שורות :
          </Box>

          <Select
            size="small"
            dir="ltr"
            value={paginationModel.pageSize}
            onChange={(e) =>
              setPaginationModel({ page: 0, pageSize: e.target.value })
            }
            variant="standard"
            disableUnderline
            IconComponent={UnfoldMoreIcon}
            sx={{
              height: '28px',
              minWidth: '37%',
              borderRadius: '4px',
              border: '0.5px solid var(--Neutral-20, #F0F1F3)',
              fontSize: '0.7vw',
              fontFamily: 'Rubik',
              padding: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              '& .MuiSelect-select': {
                padding: '2px 8px 0 8px',
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'center',
              },
              '& .MuiSelect-icon': {
                top: '50%',
                transform: 'translateY(-50%)',
                right: '8px',
                width: '18px',
                height: '18px',
              },
            }}
          >
            {[10, 20, 50].map((size) => (
              <MenuItem
                key={size}
                value={size}
                sx={{
                  fontSize: '0.75vw',
                  paddingTop: '4px',
                }}
              >
                {size}
              </MenuItem>
            ))}
          </Select>
        </Stack>



        <Box sx={{ flexGrow: 1 }} />

        <Pagination
          dir="ltr"
          count={pageCount}
          page={paginationModel.page + 1}
          onChange={(e, value) =>
            setPaginationModel((prev) => ({ ...prev, page: value - 1 }))
          }
          shape="rounded"
          siblingCount={0}
          size="small"
          sx={{
            '& .MuiPaginationItem-root': {
              backgroundColor: 'transparent',
            },
            '& .Mui-selected': {
              backgroundColor: 'var(--Neutral-10, #F6F7F9) !important',
              border: '0.5px solid var(--Neutral-20, #F0F1F3)',
              borderRadius: '3px',
            },
            '& .MuiPaginationItem-previousNext': {
              border: '0.5px solid var(--Neutral-20, #F0F1F3)',
              borderRadius: '3px',
            },
          }}
        />
      </Box>
    );
  };



  return (
    <Box sx={{ width: '100%' }}>
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
          top: '29%',
          zIndex: 1,
          boxSizing: 'border-box',
          overflow: 'hidden',
          border: "none",
          "& .MuiDataGrid-root": {
            border: "none",
          },
        }}

      >
        <Box sx={{ flexGrow: 1, width: '100%', position: 'relative', height: '100%' }}>

          <Box sx={{
            position: 'absolute',
            right: 0,
            top: 0,
            bottom: 0,
            width: '0px',
            zIndex: 3
          }}>
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              width="2"
              height="100%"
              viewBox="0 0 2 100"
              preserveAspectRatio="none"
              fill="none"
              style={{ height: '12%' }}
            >
              <path d="M1 0L1 100" stroke="#326DEF" strokeWidth="2" strokeLinecap="round" />
            </svg> */}
          </Box>
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
                }
              }
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
