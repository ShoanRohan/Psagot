
import * as React from "react";
import {
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltOffOutlinedIcon from "@mui/icons-material/FilterAltOffOutlined"; 
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";


import { fetchAllUserTypes } from "../features/userType/userTypeActions"; 

const sharedStyles = {
  width: "150px",
  height: "43px",
  textAlign: "right",
  direction: "rtl",
  "& .MuiInputLabel-root": {
    right: "0",
    transformOrigin: "top right",
  },
  "& .MuiSelect-icon": {
    right: "unset",
    left: "0px",
  },
};

const buttonStyles = {
  minWidth: "100px",
  height: "40px",
  borderRadius: "50px",
  boxShadow: "none",
  fontFamily: "Rubik",
  fontWeight: 400,
  fontSize: "16px",
  textTransform: "none",
};

const UsersSearch = ({ onFilterChange, onClearFilters }) => { 
  const dispatch = useDispatch();
  const { userTypes, status: userTypeStatus } = useSelector((state) => state.userType);
  
  const [usernames, setUsernames] = useState([]);
  const [phones, setPhones] = useState([]);
  const [roles, setRoles] = useState([]); 

  
  const initialState = {
    username: "",
    phone: "",
    role: "",
    isActive: true, 
  };

  const [filters, setFilters] = useState(initialState);
  const [activeButton, setActiveButton] = useState(true);

  
  useEffect(() => {
   
    if (userTypeStatus === "idle") { 
      dispatch(fetchAllUserTypes());
    }
  }, [userTypeStatus, dispatch]);

  
  useEffect(() => {
    if (userTypes && userTypes.length > 0) {
      setRoles(userTypes);
    }
  }, [userTypes]);


  // פונקציה לטיפול בסינון נתונים
  const handleFilterData = () => {
    if (onFilterChange) {
      onFilterChange(filters);
    }
    setActiveButton(true);
  };

 
  const handleClearFilters = () => {
    setFilters(initialState);
    if (onClearFilters) {
      onClearFilters(initialState);
    }
    setActiveButton(true);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 20px",
          backgroundColor: "white",
          fontFamily: "Rubik",
          direction: "rtl",
          borderRadius: "10px",
          background: "#FFF",
          padding: "30px 32px",
          boxShadow: "0px 0px 4px 0px rgba(220, 226, 236, 0.80)",
        }}
      >
        {/* שדות בחירה */}
        <Box sx={{ display: "flex", gap: "20px" }}>
          {/* שדה: שם משתמש */}
          <FormControl variant="standard" sx={sharedStyles}>
            <InputLabel>שם משתמש</InputLabel>
            <Select
              value={filters.username}
              onChange={(e) => {
                setFilters({ ...filters, username: e.target.value });
                setActiveButton(false);
              }}
              sx={sharedStyles}
            >
              {usernames?.map((user) => (
                <MenuItem key={user.id} value={user.name}>
                  {user.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* שדה: טלפון */}
          <FormControl variant="standard" sx={sharedStyles}>
            <InputLabel>טלפון</InputLabel>
            <Select
              value={filters.phone}
              onChange={(e) => {
                setFilters({ ...filters, phone: e.target.value });
                setActiveButton(false);
              }}
              sx={sharedStyles}
            >
              {phones?.map((p) => (
                <MenuItem key={p.id} value={p.number}>
                  {p.number}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* שדה: הרשאה */}
          <FormControl variant="standard" sx={sharedStyles}>
            <InputLabel>הרשאה</InputLabel>
            <Select
              value={filters.role}
              onChange={(e) => {
                setFilters({ ...filters, role: e.target.value });
                setActiveButton(false);
              }}
              sx={sharedStyles}
            >
              {/* כעת ה-roles מגיעים מ-userTypes שנטענו מ-Redux */}
              {roles?.map((r) => (
                <MenuItem key={r.id} value={r.name}>
                  {r.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* שדה: סטטוס פעיל */}
          <FormControl variant="standard" sx={{ minWidth: 120, mt: 2 }}>
            <label>
              <input
                type="checkbox"
                checked={filters.isActive}
                onChange={(e) => {
                  setFilters({ ...filters, isActive: e.target.checked });
                  setActiveButton(false);
                }}
                style={{ marginLeft: "8px" }}
              />
              פעיל
            </label>
          </FormControl>
        </Box>
        {/* כפתורים */}
        <Box sx={{ display: "flex", gap: "10px" }}>
          <Button
            variant="outlined"
            sx={buttonStyles}
            onClick={handleClearFilters} 
          >
            ניקוי
          </Button>

          <Button
            variant="contained"
            sx={{ ...buttonStyles, backgroundColor: "#1976d2", color: "white" }}
            startIcon={<SearchIcon sx={{ marginLeft: 1 }} />}
            disabled={activeButton}
            onClick={handleFilterData} 
          >
            חיפוש
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default UsersSearch;
