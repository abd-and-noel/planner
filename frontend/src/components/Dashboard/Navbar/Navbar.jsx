import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Drawer,
  useTheme,
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

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
        position="sticky"
        elevation={0}
        sx={{ backgroundColor: '#fff', color: '#333', height: { xs: 56, sm: 64 } }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" sx={{ fontWeight: 600, color: '#1976d2' }}>
            Calendra
          </Typography>

          {isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {/* Logout button first */}
              <Button
                onClick={handleLogoutClick}
                variant="contained"
                sx={{ bgcolor: '#1976d2', color: '#fff', textTransform: 'none' }}
              >
                Log out
              </Button>

              {/* Drawer toggle button */}
              <IconButton onClick={toggleDrawer(true)} edge="end">
                <MenuIcon />
              </IconButton>
            </Box>
          )}

          {!isMobile && (
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button onClick={handleLogoutClick} variant="contained" sx={{ bgcolor: '#1976d2' }}>
                Log out
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* Drawer for sidebar content only */}
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{
            width: 240,
            height: '100vh',
            p: 2,
            boxSizing: 'border-box',
          }}
        >
          {/* Sidebar content */}
          <Typography variant="h6" gutterBottom>
            Add Course
          </Typography>
          <Button fullWidth variant="outlined" sx={{ mb: 2 }}>
            + Add Course
          </Button>
          <Typography variant="subtitle1" gutterBottom>
            Courses
          </Typography>
          <Typography variant="body2" color="text.secondary">
            No courses available.
          </Typography>
        </Box>
      </Drawer>

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
          <Button onClick={handleConfirmLogout} color="secondary">
            Log out
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Navbar;
