import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Stack,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

const initialState = {
  username: "",
  phone: "",
  permission: "",
  status: false,
};

const initialErrors = {
  username: "",
  phone: "",
  permission: "",
};

export default function UserSearch({ onSearch }) {
  const [fields, setFields] = useState(initialState);
  const [errors, setErrors] = useState(initialErrors);
  const [dirty, setDirty] = useState(false);

  const validate = () => {
    const newErrors = { ...initialErrors };
    let valid = true;

    if (fields.username && fields.username.length < 3) {
      newErrors.username = "יש להזין שם משתמש עם לפחות 3 תווים";
      valid = false;
    }

    if (fields.phone && !/^\d{9,10}$/.test(fields.phone)) {
      newErrors.phone = "מספר טלפון לא תקין";
      valid = false;
    }

    if (fields.permission && fields.permission.length < 2) {
      newErrors.permission = "יש להזין הרשאה תקינה";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  useEffect(() => {
    validate();
  }, [fields]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFields({
      ...fields,
      [name]: type === "checkbox" ? checked : value,
    });
    setDirty(true);
  };

  const handleClear = () => {
    setFields(initialState);
    setErrors(initialErrors);
    setDirty(false);
    onSearch(initialState); // Get all rooms
  };

  const handleSearch = () => {
    if (validate()) {
      onSearch(fields);
    }
  };

  const isValid = validate();

  return (
    <Box
      sx={{
        bgcolor: "white",
        borderRadius: 2,
        p: 2,
        boxShadow: 1,
        direction: "rtl",
        maxWidth: 700,
        mx: "auto",
      }}
    >
      <Stack direction="row" spacing={2} mb={2}>
        <TextField
          label="שם משתמש"
          name="username"
          variant="outlined"
          value={fields.username}
          onChange={handleChange}
          error={!!errors.username}
          helperText={errors.username}
          fullWidth
          inputProps={{ style: { textAlign: "right" } }}
        />
        <TextField
          label="טלפון"
          name="phone"
          variant="outlined"
          value={fields.phone}
          onChange={handleChange}
          error={!!errors.phone}
          helperText={errors.phone}
          fullWidth
          inputProps={{ style: { textAlign: "right" } }}
        />
      </Stack>
      <Stack direction="row" spacing={2} mb={2}>
        <TextField
          label="הרשאה"
          name="permission"
          variant="outlined"
          value={fields.permission}
          onChange={handleChange}
          error={!!errors.permission}
          helperText={errors.permission}
          fullWidth
          inputProps={{ style: { textAlign: "right" } }}
        />
        <FormControlLabel
          control={
            <Checkbox
              name="status"
              checked={fields.status}
              onChange={handleChange}
            />
          }
          label="פעיל"
        />
      </Stack>
      <Stack direction="row" spacing={2}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<SearchIcon />}
          onClick={handleSearch}
          disabled={!dirty || !isValid}
        >
          חיפוש
        </Button>
        <Button
          variant="outlined"
          color="primary"
          startIcon={<ClearIcon />}
          onClick={handleClear}
        >
          ניקוי
        </Button>
      </Stack>
    </Box>
  );
}
