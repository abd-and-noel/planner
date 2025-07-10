import React, { useState } from 'react';
import {useNavigate, Link} from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);

  const handleLogoutClick = () => {
    setOpenLogoutDialog(true);
    }

    const handleConfirmLogout = () => {
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        setOpenLogoutDialog(false);
        navigate('/login');
    }

    const handleCancelLogout = () => {
        setOpenLogoutDialog(false);
    }


  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          backgroundColor: '#fff',
          color: '#333',
          height: { xs: 56, sm: 64 },
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          {/* Logo / Title */}
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: '#1976d2', // Google Calendar blue
            }}
          >
            Calendra
          </Typography>

          {/* Desktop Menu */}
          {!isMobile && (
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button onClick={handleLogoutClick} variant="contained" sx={{ bgcolor: '#1976d2' }}>
                Log out
              </Button>
            </Box>
          )}

          {/* Mobile Menu Icon */}
          {isMobile && (
            <IconButton onClick={toggleDrawer(true)} edge="end">
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
<Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
  <List sx={{ width: 200 }}>

    {/* ✅ Add This for Logout */}
    <ListItem disablePadding>
      <ListItemButton
        onClick={() => {
          setDrawerOpen(false); // Close drawer first
          handleLogoutClick();  // Then open logout dialog
        }}
        sx={{
          textDecoration: 'none',
          color: 'inherit',
          transition: 'transform 0.1s ease-in-out, background-color 0.2s ease-in-out',
          '&:active': {
            backgroundColor: '#e0e0e0',
            transform: 'scale(0.98)',
          },
        }}
      >
        <ListItemText primary="Log out" />
      </ListItemButton>
    </ListItem>
  </List>
</Drawer>


      <Dialog open = {openLogoutDialog} onClose = {handleCancelLogout}>
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
