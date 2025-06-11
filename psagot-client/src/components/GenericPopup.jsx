import React from "react";
import PropTypes from "prop-types";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  Grid,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {
  DialogGeneric,
  TitleGeneric,
  XButton,
} from "../styles/GenericPopupStyle";

const GenericPopup = ({ open, onClose, onSave, onCancel }) => {
  return (
    <DialogGeneric open={open} onClose={onClose}>
      {/* כותרת הדיאלוג */}
      <TitleGeneric>
        שמירת מפגש
        <XButton onClick={onClose}>
          <CloseIcon />
        </XButton>
      </TitleGeneric>

      {/* תוכן הפופאפ */}
      <DialogContent>
        <Grid container justifyContent="center" textAlign="center">
          <DialogContentText sx={{ fontSize: "18px", fontWeight: "500" }}>
            האם לשמור את המפגש למרות שלא נמצא חדר מתאים?
            <br />
            תקבל על כך התראה בכניסה למערכת.
          </DialogContentText>
        </Grid>
      </DialogContent>

      {/* כפתורים */}
      <DialogActions sx={{ justifyContent: "center", gap: 2, pb: 2 }}>
        {onCancel && (
          <Button
            variant="outlined"
            onClick={onCancel}
            sx={{ borderRadius: "20px" }}
          >
            ביטול
          </Button>
        )}
        {onSave && (
          <Button
            variant="contained"
            onClick={onSave}
            sx={{ borderRadius: "20px" }}
          >
            שמור
          </Button>
        )}
      </DialogActions>
    </DialogGeneric>
  );
};

GenericPopup.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func,
  onCancel: PropTypes.func,
};

export default GenericPopup;
