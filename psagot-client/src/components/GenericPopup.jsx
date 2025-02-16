import React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const GenericPopup = ({ open, onClose, title, children, onConfirm, onCancel, showConfirmCancelButtons = true }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="dialog-title">
      <DialogTitle id="dialog-title">
        {title}
        <IconButton
          aria-label="close"
          onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>{children}</DialogContentText>
      </DialogContent>
      {showConfirmCancelButtons && (
        <DialogActions>
          {onCancel && (
            <Button onClick={onCancel}>
              ביטול
            </Button>
          )}
          {onConfirm && (
            <Button onClick={onConfirm} autoFocus>
              אישור
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
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
  showConfirmCancelButtons: PropTypes.bool,
};

export default GenericPopup;
