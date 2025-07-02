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

const TopicsGrid = ({ topics, canEdit, onDeleteTopic, onEditTopic }) => {
  const dispatch = useDispatch();
  const [rows, setRows] = useState([]);
  const [rowModesModel, setRowModesModel] = useState({});
  const [paginationModel, setPaginationModel] = useState({ pageSize: 10, page: 0 });

  useEffect(() => {
  if (topics && topics.length > 0) {
    setRows(topics);
  } else {
    setRows([]);
  }
}, [topics]);

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
    { field: 'name', headerName: ' שם', flex: 1, headerAlign: 'center', align: 'center' },
    { field: 'teacherName', headerName: 'שם המרצה', flex: 1, headerAlign: 'center', align: 'center' },
    { field: 'startDate', headerName: 'תאריך התחלה', flex: 1, headerAlign: 'center', align: 'center', valueFormatter: formatDate },
    { field: 'endDate', headerName: 'תאריך סיום', flex: 1, headerAlign: 'center', align: 'center', valueFormatter: formatDate },
    { field: 'meetingsCount', headerName: 'מס מפגשים', flex: 1, headerAlign: 'center', align: 'center' },
    {
  field: 'equipment',
  headerName: 'ציוד',
  flex: 1,
  align: 'center',
  headerAlign: 'center',
  renderCell: (params) => {
    const row = params.row;
    const items = [];
    if (row.computers) items.push("מחשבים");
    if (row.projector) items.push("מקרן");
    if (row.microphone) items.push("מיקרופון");

    return (
      <Box
        sx={{
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          maxWidth: '100%',
          textAlign: 'center',
        }}
      >
        {items.join(", ")}
      </Box>
    );
  }
},
    {field: 'hasSchedule',headerName: 'שיבוץ',flex: 1,headerAlign: 'center',align: 'center',
    renderCell: (params) => (
    <Box sx={{ fontSize: '1.2vw', fontFamily: 'Rubik' }}>
      {params.value ? '✔' : '✖'}
    </Box>
  )
},
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
                   fontSize: '0.75vw',
                },
                '& .Mui-selected': {
                  backgroundColor: 'var(--Neutral-10, #F6F7F9) !important',
                  border: '0.5px solid var(--Neutral-20, #F0F1F3)',
                  borderRadius: '3px',
                   fontSize: '0.75vw',
                },
                '& .MuiPaginationItem-previousNext': {
                  border: '0.5px solid var(--Neutral-20, #F0F1F3)',
                  borderRadius: '3px',
                   fontSize: '0.75vw',
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
          height: "57%",
          width: 'calc(100% - 300px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          alignSelf: 'stretch',
          padding: "0.1% 1% 1% 2%",
          borderRadius: '10px',
          backgroundColor: "#FFF",
          boxShadow: '0px 0px 4px rgba(220, 226, 236, 0.8)',
          position: 'absolute',
          top: '32%',
          zIndex: 1,
          boxSizing: 'border-box',
          overflow: 'hidden',
          border: "none",

          "& .MuiDataGrid-root": {
            border: "none",
          },
        }}

      >
        <Box sx={{
          flexGrow: 1,
          width: '100%',
          position: 'relative',
          height: '100%',
          overflow: 'auto',
          
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-thumb': {
            Color: 'var(--Brand-60, #326DEF)',
            borderRadius: '8px',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: '#f0f0f0',
          },
        }}>

          <Box sx={{
            position: 'absolute',
            right: 0,
            top: 0,
            bottom: 0,
            width: '0px',
            zIndex: 3
          }}>

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
            getRowId={(row) => row.topicId}
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
        bottom: "1.5%",
        width: "85.5%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        left: "0.5%"

      }}>
        <CustomPagination />
      </Box>

    </Box>
  );
};

export default TopicsGrid;
