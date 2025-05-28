import * as React from "react";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { DataGrid, GridRowModes, GridActionsCellItem } from "@mui/x-data-grid";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import editIcon from "../assets/icons/editIcon.png";
import trash from "../assets/icons/trash.png";
import { fetchAllCourses } from "../features/course/courseActions";
const CourseGrid = () => {
  const dispatch = useDispatch();
  const Courses = useSelector((state) => state.course.courses);
  const activeCourses = Courses?.filter(course => course.statusId === 1);
  

  const [rows, setRows] = useState([]);
  const [rowModesModel, setRowModesModel] = useState({});
  useEffect(() => {
    dispatch(fetchAllCourses());
  }, [dispatch]);
  useEffect(() => {
    if (Courses && Courses.length > 0) {
      const filtered = Courses
        .filter(course => course.statusId === 1)
        .map(course => ({
          ...course,
          isActive: true,
        }));
      setRows(filtered);
      console.log("Courses data", Courses);
      setRows(activeCourses);
    }
  }, [Courses]);



  const handleEditClick = (id) => () => {
  };
  const formatDayMonthFromParts = (params) => {
    console.log('params:', params);
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
    { field: 'startDate', headerName: 'תאריך התחלה', flex: 1, editable: true, headerAlign: 'center', align: 'center', valueFormatter: formatDayMonthFromParts, },
    { field: 'endDate', headerName: 'תאריך סיום', flex: 1, editable: true, headerAlign: 'center', align: 'center', valueFormatter: formatDayMonthFromParts, },
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
          width: '4.5rem',
          height: '1.2rem',
          padding: '0.50rem 1.28rem',
          borderRadius: '4.27rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: "0.75rem",
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
            icon={<img
              src={editIcon}
              alt='עריכה'
            />}
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
        height: '70%',
        width: '100%',
        display: 'flex',
        flexGrow: 1,
        position: 'absolute',
        top: '25%',
      }}
    >
      <DataGrid
        sx={{
          "& .MuiDataGrid-columnHeaders": {
            display: "grid",
            gridTemplateColumns: `repeat(${columns.length}, 1fr)`,
            backgroundColor: "#F0F0F0",
            fontWeight: "bold",
            borderBottom: "none",
            fontWeight: 700,
            fontSize: "0.86rem",
            height: "40px",
            marginBottom: "1.2%",
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
            padding: "10px 8px",
            fontSize: "0.75rem",
            fontFamily: "Rubik",
          },
          "& .MuiDataGrid-row": {
            width: '100%',
            height: '7%',
            justifyContent: 'space-between',
            borderBottom: "1px solid #D7E6FCCC",
            "&:nth-of-type(even)": { backgroundColor: "#FAFCFF" },
            "&:nth-of-type(odd)": { backgroundColor: "#FFFFFF" },
          },
          
        }}
        rows={Courses}
        columns={columns}
        getRowId={(row) => row.courseId}
        rowModesModel={rowModesModel}
        hideFooter={true}
      />
    </Box>
  );
};
export default CourseGrid;