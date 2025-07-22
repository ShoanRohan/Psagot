import React from "react";
import PropTypes from "prop-types";
import Grid2 from "@mui/material/Grid2";
import DialogContent from "@mui/material/DialogContent";
import CloseIcon from "@mui/icons-material/Close";
import {
  DialogGeneric,
  TitleGeneric,
  XButton,
  CancelButton,
  SaveButton,
  ActionsContainer,
  ContentTextBold,
  ContentTextRegular
} from "../styles/GenericPopupStyle";

const GenericPopup = ({
  open,
  onClose,
  onSave,
  onCancel,
  title,
  subTitle,
  content,
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
          <ContentTextBold>
            {subTitle}
          </ContentTextBold>
          <ContentTextRegular>
            {content}
          </ContentTextRegular>
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
  subTitle: PropTypes.string,
  content: PropTypes.string,
  showCancelButton: PropTypes.bool,
  showSaveButton: PropTypes.bool,
};

export default GenericPopup;
