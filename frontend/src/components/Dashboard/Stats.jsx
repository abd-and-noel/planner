import React from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Divider
} from '@mui/material';
import {
  Book as BookIcon,
  AccessTime as AccessTimeIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  CalendarToday as CalendarIcon,
  Assignment as AssignmentIcon
} from '@mui/icons-material';

const StatsCard = ({ icon, title, value, color }) => (
  <Card sx={{ 
    borderRadius: 3, 
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)', 
    height: '100%',
    backgroundColor: 'background.paper'
  }}>
    <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center' }}>
        <Box
          sx={{
            p: 1.5,
            borderRadius: 2,
            backgroundColor: `${color}20`,
            mr: { xs: 0, sm: 2 },
            mb: { xs: 1, sm: 0 }
          }}
        >
          {React.cloneElement(icon, { sx: { fontSize: { xs: 20, sm: 24 }, color } })}
        </Box>
        <Box sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
          <Typography variant="body2" color="text.secondary">
            {title}
          </Typography>
          <Typography variant="h5" fontWeight="bold">
            {value}
          </Typography>
        </Box>
      </Box>
    </CardContent>
  </Card>
);

const Stats = ({ stats }) => {
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom sx={{ mb: 2, fontWeight: 600 }}>
        Summary Statistics
      </Typography>
      <Grid container spacing={1}>
        <Grid item xs={6} sm={4} md={2}>
          <StatsCard 
            icon={<BookIcon />} 
            title="Courses" 
            value={stats.totalCourses} 
            color="#1976d2" 
          />
        </Grid>
        <Grid item xs={6} sm={4} md={2}>
          <StatsCard 
            icon={<AccessTimeIcon />} 
            title="Pending" 
            value={stats.pendingAssignments} 
            color="#f57c00" 
          />
        </Grid>
        <Grid item xs={6} sm={4} md={2}>
          <StatsCard 
            icon={<WarningIcon />} 
            title="Overdue" 
            value={stats.overdueAssignments} 
            color="#d32f2f" 
          />
        </Grid>
        <Grid item xs={6} sm={4} md={2}>
          <StatsCard 
            icon={<CheckCircleIcon />} 
            title="Completed" 
            value={stats.completedAssignments} 
            color="#2e7d32" 
          />
        </Grid>
        <Grid item xs={6} sm={4} md={2}>
          <StatsCard 
            icon={<CalendarIcon />} 
            title="Due Soon" 
            value={stats.upcomingAssignments} 
            color="#7b1fa2" 
          />
        </Grid>
        <Grid item xs={6} sm={4} md={2}>
          <StatsCard 
            icon={<AssignmentIcon />} 
            title="Total Tasks" 
            value={stats.totalAssignments} 
            color="#0288d1" 
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Stats;