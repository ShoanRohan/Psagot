import * as React from 'react';
import Box from '@mui/material/Box';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllUsers, addUserAction, updateUserAction, deleteUserAction } from '../features/user/userAction';
import { useEffect } from 'react';
import { DataGrid, GridRowModes, GridActionsCellItem } from '@mui/x-data-grid'; 
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';

const UserTable = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);

  const [rows, setRows] = React.useState([]);
  const [rowModesModel, setRowModesModel] = React.useState({});
  const [newUser, setNewUser] = React.useState({ name: '', age: '', role: '', email: '', phone: '' });

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  useEffect(() => {
    if (users && users.length > 0) {
      setRows(users);
    }
  }, [users]);

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id, updatedRow) => () => {
    dispatch(updateUserAction(updatedRow)); // שולחים את עדכון המשתמש
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    dispatch(deleteUserAction(id)); // שולחים את בקשת המחיקה
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });
  };

  const handleAddClick = () => {
    const newId = Date.now(); // משתמש ב-ID ייחודי
    const newRow = { ...newUser, id: newId, isNew: true };

    setRows([...rows, newRow]);
    setRowModesModel({ ...rowModesModel, [newId]: { mode: GridRowModes.Edit } });
    setNewUser({ name: '', age: '', role: '', email: '', phone: '' }); // מנקה את השדות אחרי הוספה
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const handleUserInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevState) => ({ ...prevState, [name]: value }));
  };

  const columns = [
    { field: 'name', headerName: 'Name', width: 180, editable: true },
    { field: 'age', headerName: 'Age', width: 80, editable: true },
    { field: 'role', headerName: 'Role', width: 220, editable: true },
    { field: 'email', headerName: 'Email', width: 250, editable: true }, // Email
    { field: 'phone', headerName: 'Phone', width: 150, editable: true }, // Phone
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
        if (isInEditMode) {
          return [
            <GridActionsCellItem icon={<SaveIcon />} label="Save" onClick={() => handleSaveClick(id, rows.find(row => row.id === id))} />,
            <GridActionsCellItem icon={<CancelIcon />} label="Cancel" onClick={handleCancelClick(id)} />,
          ];
        }
        return [
          <GridActionsCellItem icon={<EditIcon />} label="Edit" onClick={handleEditClick(id)} />,
          <GridActionsCellItem icon={<DeleteIcon />} label="Delete" onClick={handleDeleteClick(id)} />,
        ];
      },
    },
  ];

  return (
    <Box sx={{ height: 500, width: '100%' }}>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={handleAddClick}
        sx={{ marginBottom: 2 }}
      >
        Add User
      </Button>

      {/* שדות להוספת משתמש חדש */}
      <Box sx={{ marginBottom: 2 }}>
        <input
          type="text"
          name="name"
          value={newUser.name}
          onChange={handleUserInputChange}
          placeholder="Name"
        />
        <input
          type="number"
          name="age"
          value={newUser.age}
          onChange={handleUserInputChange}
          placeholder="Age"
        />
        <input
          type="text"
          name="role"
          value={newUser.role}
          onChange={handleUserInputChange}
          placeholder="Role"
        />
        <input
          type="email"
          name="email"
          value={newUser.email}
          onChange={handleUserInputChange}
          placeholder="Email"
        />
        <input
          type="text"
          name="phone"
          value={newUser.phone}
          onChange={handleUserInputChange}
          placeholder="Phone"
        />
      </Box>

      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
      />
    </Box>
  );
};

export default UserTable;
