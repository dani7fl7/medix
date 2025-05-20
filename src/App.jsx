import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  Box,
  CssBaseline,
  Container,
} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

import Home from './pages/Home';
import Admin from './pages/Admin';
import Footer from './components/Footer';
import Header from './components/Header';
import theme from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box display="flex" flexDirection="column" minHeight="100vh">
          <Header />

          <Box flex={1} p={2}>
            <Container maxWidth="md">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/admin" element={<Admin />} />
              </Routes>
            </Container>
          </Box>

          <Footer />
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
