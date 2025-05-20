import React from 'react';
import { Box, Container } from '@mui/material';
import logo from '../assets/logo-medix.png';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: '#2e7be8',
        py: 2,
        textAlign: 'center',
        borderTop: '1px solid #ddd',
      }}
    >
      <Container maxWidth="sm">
        <img src={logo} alt="Logo Medix" style={{ height: 60 }} />
      </Container>
    </Box>
  );
}
