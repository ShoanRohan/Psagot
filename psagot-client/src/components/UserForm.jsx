import React, { useState, useEffect, useCallback } from "react";
import "../styles/UserForm.css"; // ייבוא קובץ ה-CSS
import { TextField, Button, MenuItem, FormControlLabel, Checkbox } from "@mui/material";

const UserForm = ({ user, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    userTypeId: "",
    isActive: false,
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        userTypeId: user.userTypeId || "",
        isActive: user.isActive || false,
      });
    }
  }, [user]);

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className="user-form" onSubmit={handleSubmit}>
      <h2>{user ? "עריכת משתמש" : "הוספת משתמש"}</h2>
      <TextField label="שם משתמש" name="name" fullWidth value={formData.name} onChange={handleChange} />
      <TextField label="אימייל" name="email" type="email" fullWidth value={formData.email} onChange={handleChange} />
      <TextField label="טלפון" name="phone" type="tel" fullWidth value={formData.phone} onChange={handleChange} />
      <TextField select label="הרשאה" name="userTypeId" fullWidth value={formData.userTypeId} onChange={handleChange}>
        <MenuItem value="">בחר סוג</MenuItem>
        <MenuItem value="admin">מנהל</MenuItem>
        <MenuItem value="user">משתמש רגיל</MenuItem>
        <MenuItem value="guest">אורח</MenuItem>
      </TextField>
      <FormControlLabel
        control={<Checkbox name="isActive" checked={formData.isActive} onChange={handleChange} />}
        label={formData.isActive ? "פעיל" : "לא פעיל"}
      />
      <div className="form-actions">
        <Button type="submit" variant="contained" color="primary">
          {user ? "עדכן משתמש" : "הוסף משתמש"}
        </Button>
      </div>
    </form>
  );
};

export default UserForm;
