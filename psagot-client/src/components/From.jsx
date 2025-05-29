import React, { useState } from "react";
import Popup from "./Popup";
import { TextField, Button, Box, Typography, Paper } from "@mui/material";

const Form = () => {
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) {
      setShowPopup(true);
    } else {
      alert("הטופס נשלח בהצלחה!");
      setFormData({ name: "", email: "" });
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" p={4}>
      <Paper elevation={3} sx={{ p: 4, width: "320px", textAlign: "center" }}>
        <Typography variant="h5" gutterBottom>
          טופס הרשמה
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="שם"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="אימייל"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <Button type="submit" variant="contained" color="success" fullWidth sx={{ mt: 2 }}>
            שלח
          </Button>
        </form>
      </Paper>

      {/* פופ-אפ MUI */}
      <Popup open={showPopup} message="האם לשמור את המפגש למרות שלא נמצא חדר מתאים" onClose={() => setShowPopup(false)} />
    </Box>
  );
};

export default Form;
