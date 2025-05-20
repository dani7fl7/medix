import React from 'react';
import { Box, Typography } from '@mui/material';

export default function AdminCard({ title, children }) {
  return (
    <Box
      maxWidth={500}
      mx="auto"
      mt={4}
      bgcolor="#fff"
      borderRadius={3}
      boxShadow={3}
      p={4}
    >
      {title && (
        <Typography
          variant="h6"
          fontWeight="bold"
          color="primary"
          gutterBottom
        >
          {title}
        </Typography>
      )}
      {children}
    </Box>
  );
}
