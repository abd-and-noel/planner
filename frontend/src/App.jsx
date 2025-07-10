import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sign from './pages/Sign';
import Home from './pages/Home';
import Log from './pages/log';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import UnauthenticatedRoute from './components/UnauthenticatedRoute/UnauthenticatedRoute';
import { isAuthenticatedAsync } from './utils/isAuthenticated';  // <-- use async version

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
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
