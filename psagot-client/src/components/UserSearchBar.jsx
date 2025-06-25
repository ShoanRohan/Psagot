import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import SearchIcon from "@mui/icons-material/Search";
import { fetchFilteredUseres } from "../features/user/userAction";
import { useDispatch, useSelector } from "react-redux";
import { BoxSearchBar } from "../styles/UserSearchBar";

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
        pageNumber: 1, // אמור לבוא מהטופס
        pageSize: 3, // אמור להיות בסטייט גלובלי
      };

      // שליחה לפונקציה ב-Redux
      dispatch(fetchFilteredUseres(filteredUsersParamaters));
      console.log("users: ", users);
    }
  };

  return (
    <BoxSearchBar>
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
                onChange={() =>
                  setSearchFields({
                    ...searchFields,
                    isActive: !searchFields.isActive,
                  })
                }
              />
            }
            label="פעיל"
          />
        </Grid>
      </Grid>

      <Button
        variant="contained"
        color="primary"
        startIcon={<SearchIcon style={{ padding: "5px" }} />}
        sx={{ borderRadius: "20px", minWidth: "120px", marginRight: 2 }}
        onClick={handleSearch}
      >
        חיפוש
      </Button>
    </BoxSearchBar>
  );
};

export default UserSearchBar;
