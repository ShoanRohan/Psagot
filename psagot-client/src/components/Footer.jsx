import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box component="footer" sx={{ py: 2, bgcolor: 'primary.main', color: 'white' }}>
      <Typography variant="body2" align="center">
        © 2025 My App. All Rights Reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
