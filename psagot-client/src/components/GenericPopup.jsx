import React from "react";
import PropTypes from "prop-types";
import CloseIcon from "@mui/icons-material/Close";
import { DialogContent } from "@mui/material";
import { Grid2 } from "@mui/material";
import {
  Button,
  DialogActions,
  DialogContent,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {
  DialogGeneric,
  TitleGeneric,
  XButton,
  CancelButton,
  SaveButton,
  ActionsContainer,
} from "../styles/GenericPopupStyle";

const GenericPopup = ({
  open,
  onClose,
  onSave,
  onCancel,
  title,
  children,
  showCancelButton = true,
  showSaveButton = true,
}) => {
  return (
    <DialogGeneric open={open} onClose={onClose}>
      <TitleGeneric>
        {title}
        <XButton onClick={onClose}>
          <CloseIcon />
        </XButton>
      </TitleGeneric>
      <DialogContent>
        <Grid2 container direction="column" alignItems="center" textAlign="center">
          {children}
        </Grid2>
      </DialogContent>
      <ActionsContainer>
        {showCancelButton && (
          <CancelButton variant="outlined" onClick={onCancel}>
            ביטול
          </CancelButton>
        )}
        {showSaveButton && (
          <SaveButton variant="contained" onClick={onSave}>
            שמור
          </SaveButton>
        )}
      </ActionsContainer>
    </DialogGeneric>
  );
};

GenericPopup.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func,
  onCancel: PropTypes.func,
  title: PropTypes.string,
  children: PropTypes.node,
  showCancelButton: PropTypes.bool,
  showSaveButton: PropTypes.bool,
};

export default GenericPopup;
