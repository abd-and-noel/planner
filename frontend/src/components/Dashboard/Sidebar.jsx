import React from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Divider,
  useMediaQuery
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  School as SchoolIcon,
  Assignment as AssignmentIcon,
  Event as EventIcon
} from '@mui/icons-material';

const navigationItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, tab: 'dashboard' },
  { text: 'Course Management', icon: <SchoolIcon />, tab: 'courses' },
  { text: 'Task Management', icon: <AssignmentIcon />, tab: 'assignments' },
  { text: 'Calendar', icon: <EventIcon />, tab: 'calendar' },
];

const Sidebar = ({ activeTab, setActiveTab, isMobile, setDrawerOpen }) => {
  const handleItemClick = (tab) => {
    setActiveTab(tab);
    if (isMobile) setDrawerOpen(false);
  };

  return (
    <Box sx={{ 
      overflow: 'auto',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#f8f9fa',
    }}>
      <Box sx={{ p: 3, borderBottom: '1px solid #e0e0e0', textAlign: 'center' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
          <Avatar sx={{ 
            width: 48, 
            height: 48, 
            bgcolor: '#1976d2',
            mb: 2
          }}>
            U
          </Avatar>
          <Box>
            <Typography variant="subtitle1" fontWeight="600">User Name</Typography>
            <Typography variant="body2" color="text.secondary">student@university.edu</Typography>
          </Box>
        </Box>
      </Box>
      
      <List sx={{ 
        pt: 2, 
        flex: 1,
        width: '100%',  // Ensure full width
        pr: 3,  // Add right padding for scrollbar
      }}>
        {navigationItems.map((item) => (
          <ListItem
            key={item.text}
            button
            onClick={() => handleItemClick(item.tab)}
            sx={{
              justifyContent: 'center',  // Center items horizontally
              mx: 2,
              mb: 1,
              borderRadius: 2,
              backgroundColor: activeTab === item.tab ? '#1976d2' : 'transparent',
              color: activeTab === item.tab ? '#fff' : '#666',
              '&:hover': {
                backgroundColor: activeTab === item.tab ? '#1565c0' : '#e3f2fd'
              }
            }}
          >
            <ListItemIcon sx={{ 
              color: activeTab === item.tab ? '#fff' : '#666',
              minWidth: 'auto',  // Remove minimum width constraint
              mr: 2  // Add right margin to separate icon from text
            }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText 
              primary={item.text}
              primaryTypographyProps={{
                fontSize: '0.95rem',
                fontWeight: activeTab === item.tab ? 600 : 400
              }}
            />
          </ListItem>
        ))}
      </List>
      
      <Box sx={{ 
        p: 3, 
        borderTop: '1px solid #e0e0e0',
        textAlign: 'center'  // Center footer text
      }}>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          StudyTracker v1.0.0
        </Typography>
        <Typography variant="body2" color="text.secondary">
          © 2023 All rights reserved
        </Typography>
      </Box>
    </Box>
  );
};

export default Sidebar;