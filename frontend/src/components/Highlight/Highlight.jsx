import * as React from 'react';
import {
  Box,
  Card,
  Container,
  Typography,
} from '@mui/material';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import NotificationsActiveRoundedIcon from '@mui/icons-material/NotificationsActiveRounded';
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import QueryStatsRoundedIcon from '@mui/icons-material/QueryStatsRounded';

const items = [
  {
    icon: <CalendarMonthRoundedIcon fontSize="large" />,
    title: 'Smart Scheduling',
    description: 'Easily manage and organize events with an intuitive calendar interface.',
  },
  {
    icon: <NotificationsActiveRoundedIcon fontSize="large" />,
    title: 'Real-time Reminders',
    description: 'Never miss an appointment with timely notifications and alerts.',
  },
  {
    icon: <GroupRoundedIcon fontSize="large" />,
    title: 'Collaborative Planning',
    description: 'Share schedules and plan with friends, family, or coworkers easily.',
  },
  {
    icon: <QueryStatsRoundedIcon fontSize="large" />,
    title: 'Insights & Analytics',
    description: 'Track your productivity with visual insights and calendar statistics.',
  },
];

export default function Highlights() {
  return (
    <Box
      id="highlights"
      sx={{
        pt: { xs: 6, sm: 10 },
        pb: { xs: 8, sm: 14 },
        bgcolor: '#fff',
        color: 'black',
      }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
        {/* Heading */}
        <Box textAlign="center" mb={6}>
          <Typography variant="h4" component="h2" gutterBottom fontWeight={700}>
            Why Choose Calendra?
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Discover how Calendra helps you stay organized, connected, and on top of your schedule.
          </Typography>
        </Box>

        {/* Grid container with consistent gap */}
        <Box
          sx={{
            display: 'grid',
            gap: 4, // equal gap for rows and columns
            gridTemplateColumns: {
              xs: '1fr',       // stacked on mobiles/tablets
              md: 'repeat(2, 1fr)', // 2 columns on desktop
            },
          }}
        >
          {items.map((item, index) => (
            <Card
              key={index}
              elevation={3}
              sx={{
                bgcolor: '#eeeeee',
                p: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                borderRadius: 2,
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                width: '100%', // fill the grid cell fully
                height: '100%',
                boxSizing: 'border-box',
              }}
            >
              <Box sx={{ color: '#1976d2', mb: 2 }}>{item.icon}</Box>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                {item.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {item.description}
              </Typography>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
