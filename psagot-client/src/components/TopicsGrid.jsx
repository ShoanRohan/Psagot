import * as React from "react";
import Box from "@mui/material/Box";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {
  DataGrid,
  GridRowModes,
  GridActionsCellItem,
} from "@mui/x-data-grid";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import editIcon from "../assets/icons/editIcon.png";
import Pagination from "@mui/material/Pagination";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";

const TopicsGrid = ({ Topics, canEdit, onDeleteTopic, onEditTopic }) => {
  const dispatch = useDispatch();
  const [rows, setRows] = useState([]);
  const [rowModesModel, setRowModesModel] = useState({});
  const [paginationModel, setPaginationModel] = useState({ pageSize: 10, page: 0 });

  useEffect(() => {
    if (Topics && Topics.length > 0) {
      setRows(Topics);
    } else {
      setRows([]);
    }
  }, [Topics]);

  const formatDate = (params) => {
    const dateStr = typeof params === 'string' ? params : params?.value;
    if (!dateStr || typeof dateStr !== 'string') return '';
    const [year, month, day] = dateStr.split('-');
    return `${day}/${month}`;
  };

  const handleDelete = (id) => async () => {
    const confirmed = window.confirm("לנושא זה משובצים מפגשים, במחיקת הנושא המפגשים ימחקו גם. האם להמשיך?");
    if (!confirmed) return;
    try {
      await onDeleteTopic(id);
      alert("נושא נמחק בהצלחה");
    } catch (error) {
      alert("מחיקת נושא נכשלה: " + error.message);
    }
  };

  const columns = [
    { field: 'topicId', headerName: 'קוד נושא', flex: 1, headerAlign: 'center', align: 'center' },
    { field: 'name', headerName: 'שם', flex: 1, headerAlign: 'center', align: 'center' },
    { field: 'teacherName', headerName: 'שם מורה', flex: 1, headerAlign: 'center', align: 'center' },
    { field: 'startDate', headerName: 'תאריך התחלה', flex: 1, headerAlign: 'center', align: 'center', valueFormatter: formatDate },
    { field: 'endDate', headerName: 'תאריך סיום', flex: 1, headerAlign: 'center', align: 'center', valueFormatter: formatDate },
    { field: 'meetingsCount', headerName: 'מס מפגשים', flex: 1, headerAlign: 'center', align: 'center' },
    { field: 'equipment', headerName: 'ציוד', flex: 1, headerAlign: 'center', align: 'center' },
    {
      field: 'statusId',
      headerName: 'סטטוס',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => {
        const statusMap = {
          1: { text: "פעיל", style: { background: '#DAF8E6', color: '#1A8245' } },
          2: { text: "ממתין", style: { background: '#FEEBEB', color: '#B00020' } },
          3: { text: "הסתיים", style: { background: '#E5E7EB80', color: '#374151' } },
        };
        const currentStatus = statusMap[params.value] || { text: "לא ידוע", style: {} };
        return (
          <Box sx={{ ...currentStatus.style, padding: '4px 16px', borderRadius: '50px', fontSize: '0.65vw' }}>
            {currentStatus.text}
          </Box>
        );
      }
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: '',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      getActions: ({ id }) => {
        const actions = [
          <GridActionsCellItem icon={<img src={editIcon} alt='עריכה' />} label="Edit" onClick={() => onEditTopic(id)} />
        ];
        if (canEdit) {
          actions.push(<GridActionsCellItem icon={<DeleteIcon />} label="Delete" onClick={handleDelete(id)} />);
        }
        return actions;
      }
    }
  ];

  const CustomPagination = () => {
    const pageCount = Math.ceil(rows.length / paginationModel.pageSize);
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <Pagination
          count={pageCount}
          page={paginationModel.page + 1}
          onChange={(e, val) => setPaginationModel(prev => ({ ...prev, page: val - 1 }))}
        />
        <Select
          value={paginationModel.pageSize}
          onChange={(e) => setPaginationModel({ page: 0, pageSize: e.target.value })}
          variant="standard"
          disableUnderline
          sx={{ ml: 2 }}
        >
          {[10, 20, 50].map((size) => (
            <MenuItem key={size} value={size}>{size}</MenuItem>
          ))}
        </Select>
      </Box>
    );
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box
        sx={{
          direction: 'rtl',
          p: 2,
          borderRadius: '10px',
          backgroundColor: '#FFF',
          boxShadow: '0px 0px 4px rgba(220, 226, 236, 0.8)',
          position: 'relative',
        }}>
        <DataGrid
          rows={rows}
          columns={columns}
          getRowId={(row) => row.topicId}
          pagination
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          pageSizeOptions={[10, 20, 50]}
          hideFooter
          sx={{
            '& .MuiDataGrid-columnHeaderTitle': { fontWeight: 'bold', fontFamily: 'Rubik', fontSize: '0.7vw' },
            '& .MuiDataGrid-cell': { fontFamily: 'Rubik', fontSize: '0.7vw', textAlign: 'center' },
          }}
        />
      </Box>
      <CustomPagination />
    </Box>
  );
};

export default TopicsGrid;
