import React from 'react';
import {
  Box,
  Container,
  Typography,
  Link,
  Grid,
  IconButton,
} from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#f5f5f5',
        color: '#333',
        py: 4,
        mt: 'auto',
        borderTop: '1px solid #ddd',
      }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={4}
          justifyContent="space-between"
          alignItems="center"
          direction={{ xs: 'column', md: 'row' }}
          textAlign={{ xs: 'center', md: 'initial' }}
        >
          {/* Left side: Brand and Copyright */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" fontWeight={600}>
              Calendra
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              © {new Date().getFullYear()} Calendra. All rights reserved.
            </Typography>
          </Grid>

          {/* Middle: Navigation Links */}
          <Grid
            item
            xs={12}
            md={4}
            sx={{
              display: 'flex',
              justifyContent: { xs: 'center', md: 'center' },
              gap: 3,
              mt: { xs: 2, md: 0 },
            }}
          >
            <Link href="#about" underline="hover" color="inherit" sx={{ fontWeight: 500 }}>
              About
            </Link>
            <Link href="#features" underline="hover" color="inherit" sx={{ fontWeight: 500 }}>
              Features
            </Link>
            <Link href="#contact" underline="hover" color="inherit" sx={{ fontWeight: 500 }}>
              Contact
            </Link>
          </Grid>

          {/* Right side: Social Icons */}
          <Grid
            item
            xs={12}
            md={4}
            sx={{
              mt: { xs: 2, md: 0 },
              display: 'flex',
              justifyContent: { xs: 'center', md: 'flex-end' },
            }}
          >
            <IconButton color="inherit" aria-label="Instagram" href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <InstagramIcon />
            </IconButton>
            <IconButton color="inherit" aria-label="Twitter" href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <TwitterIcon />
            </IconButton>
            <IconButton color="inherit" aria-label="Facebook" href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FacebookIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
