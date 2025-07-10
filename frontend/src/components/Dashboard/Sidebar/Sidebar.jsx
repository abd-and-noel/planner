import React from 'react';
import { Box, Button, Typography, useMediaQuery, useTheme } from '@mui/material';

const Sidebar = ({ onAddCourse }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        width: isMobile ? '100%' : '20%',
        height: 'calc(100vh - 64px)', // subtracting navbar height
        backgroundColor: '#fff',
        padding: 2,
        boxSizing: 'border-box',
      }}
    >
      <Button
        variant="contained"
        fullWidth
        onClick={onAddCourse}
        sx={{ mb: 2 }}
      >
        + Add Course
      </Button>

      <Typography variant="h6" gutterBottom sx={{textAlign: 'center'}}>
        Courses
      </Typography>

      <Typography variant="body2" color="text.secondary">
        Not available for now.
      </Typography>
    </Box>
  );
};

export default Sidebar;
