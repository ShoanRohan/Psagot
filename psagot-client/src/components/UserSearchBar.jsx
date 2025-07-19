import { useEffect, useState } from "react";
import { TextField,Button,Checkbox,FormControlLabel,Box,Grid} from "@mui/material";
import { Search } from "@mui/icons-material";
import { fetchFilteredUseres } from "../features/user/userAction";
import { useDispatch, useSelector } from "react-redux";
import { BoxSearchBar } from "../styles/UserSearchBar";
import "../styles/RoomsSearchBar.css";
import { resetFilter } from "../features/user/userSlice";

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
  const userSearchEmpty = {
    username: "",
    phone: "",
    role: "",
    isActive: true,
  };
  const [phoneError, setPhoneError] = useState("");

  const validateForm = () => {
    if (searchFields.phone.trim() && !/^\d+$/.test(searchFields.phone)) {
      //setPhoneError("מספר טלפון חייב להכיל ספרות בלבד");
      //return false;
    }
    setPhoneError("");
    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;    
    const trimmedValue = value.trim();  
    console.log(value+"&"+ trimmedValue)
    setSearchFields({ ...searchFields, [name]: trimmedValue });
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
  const clean = () => {
      setSearchFields(userSearchEmpty); // תאפס את השדות בטופס
    //  dispatch(fetchFilteredUseres(earchFields));
     // setCapacityError(""); // תאפס שגיאות
      dispatch(resetFilter());
    };

  const buttonStyles = {
  height: "44px",
  padding: "0px 20px",
  gap: "8px",
  borderRadius: "50px",
  boxShadow: "none",
  fontFamily: "Rubik",
  fontWeight: 400,
  fontSize: "16px",
  lineHeight: "18.96px",
};

  return (
    <Box className="rooms-search-bar">
       <Grid className="search-fields">
      
        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            label="שם משתמש"
            name="username"
            variant="standard"
            className="textField"
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
            className="textField"
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
            className="textField"
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
      <div className="search-buttons">
              <Button
                variant="outlined"
                //sx={buttonStyles}
                className="clear-button"
                onClick={clean}
              >
                ניקוי
              </Button>

      <Button
        variant="contained"
        color="primary"
        startIcon={<Search style={{ padding: "5px" }} />}
       // sx={{ borderRadius: "20px", minWidth: "120px", marginRight: 2 }}
        className="search-button"
        onClick={handleSearch}
      >
        <span className="search-button-text">חיפוש</span>
      </Button>
      </div>
    </Box>
  );
};

export default UserSearchBar;
