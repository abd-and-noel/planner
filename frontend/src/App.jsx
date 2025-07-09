import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Sign from './pages/Sign';
import Home from './pages/Home';
import Log from './pages/log';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

function App() {
  return (
  <Router>
    <Routes>
      <Route path= "/" element={<Home />} />
      <Route path="/signup" element = {<Sign/>}/>
      <Route path="/login" element = {<Log/>}/>
      <Route path = "/Dashboard" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      }/>
    </Routes>
  </Router>
  );
}

export default App;
