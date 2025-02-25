import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const Header = () => {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          My App Psagot
        </Typography>
        <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

import argparse

# יצירת אובייקט parser
parser = argparse.ArgumentParser()

# הוספת פרמטר לשם קובץ
parser.add_argument('filename', help='שם הקובץ לעיבוד')

# קריאת הפרמטרים
args = parser.parse_args()

# הדפסת הודעה עם שם הקובץ
print(f"מעבד את הקובץ: {args.filename}")


