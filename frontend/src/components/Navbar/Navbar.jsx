import React, { useState } from 'react';
import {Link} from 'react-router-dom';
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
  useMediaQuery
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  return (
    <>
      <AppBar
        position="sticky"
        elevation={4}
        sx={{
          backgroundColor: '#fff',
          color: '#333',
          borderBottom: '1px solid #e0e0e0',
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
              <Button component = {Link} to = '/login' variant="text" sx={{ color: '#1976d2' }}>
                Log In
              </Button>
              <Button component = {Link} to = "/signup" variant="contained" sx={{ bgcolor: '#1976d2' }}>
                Sign Up
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
          <ListItem disablePadding>
            <ListItemButton component={Link}
        to="/login"
        sx={{ textDecoration: 'none', color: 'inherit', transition: 'transform 0.1s ease-in-out, background-color 0.2s ease-in-out',
    '&:active': {
      backgroundColor: '#e0e0e0',
      transform: 'scale(0.98)',
    },}}>
              <ListItemText primary="Log in" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link}
        to="/login"
        sx={{ textDecoration: 'none', color: 'inherit', transition: 'transform 0.1s ease-in-out, background-color 0.2s ease-in-out',
    '&:active': {
      backgroundColor: '#e0e0e0',
      transform: 'scale(0.98)',
    },}}>
              <ListItemText primary="Sign up" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default Navbar;
