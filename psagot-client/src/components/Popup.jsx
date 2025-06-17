import React from "react";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from "@mui/material";

const Popup = ({ open, message, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>התראה</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" variant="contained">
          סגור
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Popup;
