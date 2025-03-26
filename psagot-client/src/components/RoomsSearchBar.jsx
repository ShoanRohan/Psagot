import React from "react";
import { Box, TextField, Button, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

export default function SearchBar() {
  return (
    <Box className="box">

      {/* שדה חיפוש */}
      <TextField
        placeholder="שם חדר"
        variant="outlined"
        size="small"
        className="textField"
      />

      <TextField
        placeholder="ציוד"
        variant="outlined"
        size="small"
        className="textField"
      />

      <TextField
        placeholder="מספר מקומות"
        variant="outlined"
        size="small"
        type="number"
        className="textField"
      />

       {/* כפתור חיפוש */}
       <Button variant="contained" color="primary" startIcon={<SearchIcon />}>
        חיפוש
      </Button>

      {/* כפתור איפוס */}
      <Button variant="outlined" color="primary" startIcon={<RestartAltIcon />}>
        ניקוי
      </Button>
    </Box>
  );
}
