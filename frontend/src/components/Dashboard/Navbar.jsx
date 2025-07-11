import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  School as SchoolIcon,
  Menu as MenuIcon,
  Logout as LogoutIcon
} from '@mui/icons-material';

const Navbar = ({ toggleDrawer }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);

  const handleLogoutClick = () => {
    setOpenLogoutDialog(true);
  };

  const handleConfirmLogout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    setOpenLogoutDialog(false);
    navigate('/login');
  };

  const handleCancelLogout = () => {
    setOpenLogoutDialog(false);
  };

  return (
    <>
      <AppBar
        position="fixed"
        elevation={1}
        sx={{ 
          backgroundColor: '#fff', 
          color: '#333',
          borderBottom: '1px solid #e0e0e0',
          zIndex: theme.zIndex.drawer + 1
        }}
      >
        <Toolbar sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          minHeight: { xs: 56, sm: 64 },
          px: { xs: 2, sm: 3 }
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              edge="start"
              onClick={toggleDrawer}
              sx={{ 
                mr: 2, 
                color: '#1976d2',
                display: { sm: 'none' }
              }}
            >
              <MenuIcon />
            </IconButton>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <SchoolIcon sx={{ mr: 1, color: '#1976d2' }} />
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#1976d2' }}>
                StudyTracker
              </Typography>
            </Box>
          </Box>

          <Button
            onClick={handleLogoutClick}
            variant="contained"
            startIcon={<LogoutIcon sx={{ display: { xs: 'none', sm: 'flex' } }} />}
            sx={{ 
              bgcolor: '#1976d2',
              textTransform: 'none',
              borderRadius: 2,
              px: { xs: 2, sm: 3 },
              fontSize: { xs: '0.875rem', sm: '0.9rem' }
            }}
          >
            {isMobile ? 'Logout' : 'Log out'}
          </Button>
        </Toolbar>
      </AppBar>

      {/* Logout confirmation dialog */}
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
    </>
  );
};

export default Navbar;