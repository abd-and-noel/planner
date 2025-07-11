import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sign from './pages/Sign';
import Home from './pages/Home';
import Log from './pages/log';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import UnauthenticatedRoute from './components/UnauthenticatedRoute/UnauthenticatedRoute';
import { isAuthenticatedAsync } from './utils/isAuthenticated';  // <-- use async version
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#9c27b0',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
});


function App() {
  useEffect(() => {
    const checkAuth = async () => {
      const authenticated = await isAuthenticatedAsync();
      if (!authenticated) {
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
      }
    };
    checkAuth();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/signup"
          element={
            <UnauthenticatedRoute>
              <Sign />
            </UnauthenticatedRoute>
          }
        />
        <Route
          path="/login"
          element={
            <UnauthenticatedRoute>
              <Log />
            </UnauthenticatedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
               <ThemeProvider theme={theme}>
      <CssBaseline />
      <Dashboard />
    </ThemeProvider>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
