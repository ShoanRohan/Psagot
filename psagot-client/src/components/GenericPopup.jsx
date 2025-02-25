import React from "react";
import PropTypes from "prop-types";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const GenericPopup = ({ open, onClose, title, children, onSave, onCancel, showCancelButton = true, showSaveButton = true }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="dialog-title"
      sx={{
        "& .MuiDialog-paper": { padding: 2, borderRadius: 2, boxShadow: 5, width: "300px", textAlign: "center" },
      }}
    >
      <DialogTitle
        id="dialog-title"
        sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "1rem" }}
      >
        <Typography variant="h6" sx={{ fontSize: "0.9rem" }}>
          {title}
        </Typography>
        <IconButton onClick={onClose} sx={{ fontSize: "small", padding: "5px" }}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <DialogContentText>{children}</DialogContentText>
      </DialogContent>

      {showCancelButton &&(
        <DialogActions sx={{ justifyContent: "center", gap: 2, marginBottom: 1 }}>
          {onCancel && (
            <Button
              variant="outlined"
              onClick={onCancel}
              sx={{ borderRadius: "20px", borderColor: "#2196F3", color: "#2196F3" }}
            >
              ביטול
            </Button>
          )}
          {onSave && (
            <Button
              variant="contained"
              onClick={onSave}
              autoFocus
              sx={{ borderRadius: "20px", backgroundColor: "#2196F3", color: "white" }}
            >
              שמור
            </Button>
          )}
        </DialogActions>
      )}
    </Dialog>
  );
};

GenericPopup.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  children: PropTypes.node,
  onSave: PropTypes.func,
  onCancel: PropTypes.func,
  showCancelButton: PropTypes.bool,
  showSaveButton: PropTypes.bool,

};

export default GenericPopup;
