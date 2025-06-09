import React from "react";
import PropTypes from "prop-types";
import CloseIcon from "@mui/icons-material/Close";
import { DialogContent } from "@mui/material";
import { Grid2 } from '@mui/material';
import {
  DialogGeneric,
  TitleGeneric,
  XButton,
  ContentTextBold,
  ContentTextRegular,
  CancelButton,
  SaveButton,
  ActionsContainer
} from "../styles/GenericPopupStyle";

const GenericPopup = ({ open, onClose, onSave, onCancel }) => {
  return (
    <DialogGeneric open={open} onClose={onClose}>
      <TitleGeneric>
        שמירת מפגש
        <XButton onClick={onClose}>
          <CloseIcon />
        </XButton>
      </TitleGeneric>
      <DialogContent>
        <Grid2 container justifyContent="center" textAlign="center">
          <ContentTextBold>
            האם לשמור את המפגש למרות שלא נמצא חדר מתאים?
          </ContentTextBold>
          <ContentTextRegular>
            תקבל על כך התראה בכניסה למערכת
          </ContentTextRegular>
        </Grid2>
      </DialogContent>
      <ActionsContainer>
        {onCancel && (
          <CancelButton variant="outlined" onClick={onCancel}>
            ביטול
          </CancelButton>
        )}
        {onSave && (
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
};

export default GenericPopup;
