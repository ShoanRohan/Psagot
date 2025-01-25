import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from '@mui/x-data-grid';
import {
  randomCreatedDate,
  randomTraderName,
  randomId,
  randomArrayItem,
} from '@mui/x-data-grid-generator';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllUsers, updateUserAction, deleteUserAction, addUserAction } from '../features/user/userAction';
import { useEffect, useState } from 'react';

const roles = ['Market', 'Finance', 'Development'];
const randomRole = () => {
  return randomArrayItem(roles);
};

const initialRows = [ ];

function EditToolbar(props) {
  
  const dispatch = useDispatch();

  const handleClick = () => {
    const newUser = { name: '', Permissiongroup: '', NameUsed: ''};
    dispatch(addUserAction(newUser)).then(() => {
      dispatch(fetchAllUsers()); // רענון הנתונים לאחר ההוספה
    });
  };
  
  

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
    </GridToolbarContainer>
  );
}
//FullFeaturedCrudGrid
export default function UserTable() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);
  const [rows, setRows] = React.useState(initialRows);
  const [rowModesModel, setRowModesModel] = React.useState({});

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  useEffect(() => {
    if (users && users.length > 0) {
      setRows(users); // עדכון ה-rows עם הנתונים שהתקבלו מ-Redux
      console.log(users); // הדפסה לקונסול
    }
  }, [users]);

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
  dispatch(deleteUserAction(id)).then(() => {
    dispatch(fetchAllUsers()); // רענון הנתונים לאחר מחיקה
  });
};


  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    return dispatch(updateUserAction(newRow))
      .unwrap()
      .then(() => {
        dispatch(fetchAllUsers()); // רענון הנתונים לאחר עדכון
      })
      .catch((error) => {
        console.error(error);
        return { ...newRow, isError: true }; // סימון שגיאה בשורה
      });
  };
  

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = [
    { field: 'name', headerName: 'שם', width: 180, editable: true },
    {
      field: 'Permissiongroup',
      headerName: 'קבוצת הרשאה',
      width: 180,
      editable: true,
    },
    {
      field: 'NameUsed',
      headerName: 'שם משתמש',
      width: 180,
      editable: true,
    },
  ];

  return (
    <Box
      sx={{
        height: 500,
        width: '100%',
        '& .actions': {
          color: 'text.secondary',
        },
        '& .textPrimary': {
          color: 'text.primary',
        },
      }}
    >
      <DataGrid
        rows={users}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{ toolbar: EditToolbar }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
      />
      console.log(users);
    </Box>
  );
}
