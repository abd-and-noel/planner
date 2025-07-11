import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
  Drawer,
  Toolbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  Grid
} from '@mui/material';
import { Logout as LogoutIcon } from '@mui/icons-material';

import Navbar from '../components/Dashboard/Navbar';
import Sidebar from '../components/Dashboard/Sidebar';
import Courses from '../components/Dashboard/Courses';
import Assignments from '../components/Dashboard/Assignments';
import Stats from '../components/Dashboard/Stats';

const Dashboard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [courses, setCourses] = useState([
    { id: 1, name: 'Introduction to Computer Science', code: 'CS101', color: '#1976d2' },
    { id: 2, name: 'Advanced Mathematics', code: 'MATH201', color: '#388e3c' }
  ]);
  
  const [assignments, setAssignments] = useState([
    {
      id: 1,
      title: 'Programming Assignment 1',
      courseId: 1,
      dueDate: '2023-12-15',
      type: 'Assignment',
      description: 'Implement basic algorithms in Python',
      completed: false
    },
    {
      id: 2,
      title: 'Linear Algebra Homework',
      courseId: 2,
      dueDate: '2023-12-10',
      type: 'Homework',
      description: 'Solve matrix problems',
      completed: true
    }
  ]);
  
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [activeTab, setActiveTab] = useState('dashboard');

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleLogoutClick = () => {
    setOpenLogoutDialog(true);
  };

  const handleConfirmLogout = () => {
    setOpenLogoutDialog(false);
    showSnackbar('Logged out successfully!', 'info');
  };

  const handleCancelLogout = () => {
    setOpenLogoutDialog(false);
  };

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const getStats = () => {
    const totalCourses = courses.length;
    const totalAssignments = assignments.length;
    const completedAssignments = assignments.filter(a => a.completed).length;
    const overdueAssignments = assignments.filter(a => !a.completed && new Date(a.dueDate) < new Date()).length;
    const upcomingAssignments = assignments.filter(a => {
      if (a.completed) return false;
      const dueDate = new Date(a.dueDate);
      const today = new Date();
      const diffTime = dueDate - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays <= 3 && diffDays >= 0;
    }).length;
    const pendingAssignments = totalAssignments - completedAssignments;

    return {
      totalCourses,
      totalAssignments,
      completedAssignments,
      overdueAssignments,
      upcomingAssignments,
      pendingAssignments
    };
  };

  const stats = getStats();

  const renderDashboardContent = () => (
  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, mt: 4 }}>
    <Stats stats={stats} />
    <Courses 
      courses={courses} 
      setCourses={setCourses} 
      showSnackbar={showSnackbar} 
    />
    <Assignments 
      assignments={assignments} 
      setAssignments={setAssignments} 
      courses={courses} 
      showSnackbar={showSnackbar} 
    />
  </Box>
);


  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return renderDashboardContent();
      case 'courses':
        return (
          <Box sx={{ p: 3, mt: 4 }}>
            <Typography variant="h4" sx={{ mb: 3 }}>Course Management</Typography>
            <Courses 
              courses={courses} 
              setCourses={setCourses} 
              showSnackbar={showSnackbar} 
            />
          </Box>
        );
      case 'assignments':
        return (
          <Box sx={{ p: 3 , mt: 4 }}>
            <Typography variant="h4" sx={{ mb: 3 }}>Task Management</Typography>
            <Assignments 
              assignments={assignments} 
              setAssignments={setAssignments} 
              courses={courses} 
              showSnackbar={showSnackbar} 
            />
          </Box>
        );
      case 'calendar':
        return (
          <Box sx={{ p: 3 , mt: 4 }}>
            <Typography variant="h4" sx={{ mb: 3 }}>Calendar View</Typography>
            <Typography>Calendar features will be added here</Typography>
          </Box>
        );
      default:
        return renderDashboardContent();
    }
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <Navbar 
        toggleDrawer={toggleDrawer(true)} 
        handleLogoutClick={handleLogoutClick} 
      />
      
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        sx={{
          width: isMobile ? '100%' : 280,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { 
            width: 280, 
            boxSizing: 'border-box',
            borderRight: 'none'
          },
        }}
      >
        <Toolbar />
        <Sidebar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          isMobile={isMobile} 
          setDrawerOpen={setDrawerOpen} 
        />
      </Drawer>

      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          p: { xs: 1, md: 3 },
          pt: { xs: '80px', sm: '88px' },
          width: { sm: `calc(100% - 280px)` }
        }}
      >
        {renderContent()}
      </Box>

      <Dialog open={openLogoutDialog} onClose={handleCancelLogout}>
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to log out?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelLogout} color="primary">
            Cancel
          </Button>
          <Button 
            onClick={handleConfirmLogout} 
            color="error"
            variant="contained"
            startIcon={<LogoutIcon />}
          >
            Log out
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({...snackbar, open: false})}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setSnackbar({...snackbar, open: false})}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Dashboard;