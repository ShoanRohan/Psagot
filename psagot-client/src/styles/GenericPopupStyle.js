// RoomFormStyles.js

export const dialogPaperSx = {
  width: 504,
  height: 339,
  maxWidth: 'none',
  p: 3,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  boxSizing: 'border-box',
  position: 'relative',
};

export const closeButtonSx = {
  position: 'absolute',
  left: 8,
  top: 8,
  color: 'grey.500',
};

export const dialogTitleSx = {
  textAlign: 'right', // יישור לימין
  fontWeight: 'bold',
  pr: 0,
};

export const dialogContentSx = {
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: 3,
};

export const rowBoxSx = {
  display: 'flex',
  gap: 2,
  alignItems: 'center',
};

export const secondRowBoxSx = {
  display: 'flex',
  gap: 2,
  justifyContent: 'space-between',
};

export const textFieldSx = {
  width: 200,
  height: 45,
};

export const textFieldInputProps = {
  style: { textAlign: 'right' },
};

export const textFieldLabelProps = {
  sx: { right: 0, left: 'unset' },
};

export const formControlSx = {
  direction: 'rtl',
};

export const selectSx = {
  textAlign: 'right',
  background: 'none',
  '& .MuiSelect-icon': {
    left: 8,
    right: 'unset',
  },
};

export const dialogActionsSx = {
  justifyContent: 'center',
  gap: 2,
};

export const buttonSx = {
  minWidth: 100,
  borderRadius: '24px',
};

export const submitButtonSx = {
  minWidth: 100,
  borderRadius: '24px',
  background: 'linear-gradient(90deg, #3B82F6, #6366F1)',
  '&:disabled': {
    background: '#a0a0a0',
  },
};
