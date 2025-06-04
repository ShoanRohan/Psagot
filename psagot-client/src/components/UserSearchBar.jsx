import { useEffect, useState } from "react";
import { TextField } from "@mui/material/TextField";
import { Button} from "@mui/material/Button";
import { Checkbox } from "@mui/material/Checkbox";
import { FormControlLabel } from "@mui/material/FormControlLabel";
import { FormControlLabel, Box } from "@mui/material/Box";
import { Grid } from "@mui/material/Grid";
import { Search } from "@mui/icons-material";
import { fetchFilteredUseres } from "../features/user/userAction";
import { useDispatch, useSelector } from "react-redux";

const UserSearchBar = () => {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.user);
  const users = useSelector((state) => state.user.user);
  const [searchFields, setSearchFields] = useState({
    username: "",
    phone: "",
    role: "",
    isActive: true,
  });
  const [phoneError, setPhoneError] = useState("");

  const validateForm = () => {
    if (searchFields.phone.trim() && !/^\d+$/.test(searchFields.phone)) {
      setPhoneError("מספר טלפון חייב להכיל ספרות בלבד");
      return false;
    }
    setPhoneError("");
    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchFields({ ...searchFields, [name]: value });
  };

  const handleSearch = () => {
    if (validateForm()) {
      // יצירת אובייקט דינמי עם הפרמטרים
      const filteredUsersParamaters = {
        ...searchFields,
        pageNumber: 1,   // אמור לבוא מהטופס
        pageSize: 3,     // אמור להיות בסטייט גלובלי
      };

      // שליחה לפונקציה ב-Redux
      dispatch(fetchFilteredUseres(filteredUsersParamaters));
      console.log("users: ",users)
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "#F9FAFC",
        padding: 2,
        borderRadius: 2,
        display: "flex",
        alignItems: "center",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            label="שם משתמש"
            name="username"
            variant="standard"
            value={searchFields.username}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            label="טלפון"
            name="phone"
            variant="standard"
            value={searchFields.phone}
            onChange={handleChange}
            error={!!phoneError}
            helperText={phoneError}
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            label="הרשאה"
            name="role"
            variant="standard"
            value={searchFields.role}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <FormControlLabel
            control={
              <Checkbox
                checked={searchFields.isActive}
                onChange={() => setSearchFields({ ...searchFields, isActive: !searchFields.isActive })}
              />
            }
            label="פעיל"
          />
        </Grid>
      </Grid>

      <Button
        variant="contained"
        color="primary"
        startIcon={<Search style={{ padding: "5px" }} />}
        sx={{ borderRadius: "20px", minWidth: "120px", marginRight: 2 }}
        onClick={handleSearch}
      >
        חיפוש
      </Button>
    </Box>
  );
};

export default UserSearchBar;
