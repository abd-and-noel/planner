import React from 'react';
import {
    Box,
    Container,
    Stack,
    Typography,
    Grid,
    useMediaQuery,
    useTheme,
    Button
} from '@mui/material';
import calendarImage from '../../assets/images/calendarImage.jpeg';

const Hero = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    return (

        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                px: 4,
                backgroundColor: '#f9f9f9',
                minHeight: 'calc(100vh - 65px)',
            }}
        >
            <Grid
                container
                spacing={4}
                alignItems="center"
                justifyContent="center"
                direction={isMobile ? 'column-reverse' : 'row-reverse'}
                maxWidth="lg"
            >
                {/* Left: Image */}
                <Grid item xs={12} md={6}>
                    <Box
                        component="img"
                        src={calendarImage}
                        alt="Calendar preview"
                        sx={{
                            width: '100%',
                            maxWidth: '500px',
                            borderRadius: 2,
                            boxShadow: 3,
                            mx: 'auto',
                            display: 'block',
                        }}
                    />
                </Grid>

                {/* Right: Text and Buttons */}
                <Grid item xs={12} md={6}>
                    <Box sx={{ textAlign: isMobile ? 'center' : 'left' }}>
                        <Typography variant="h3" fontWeight={700} mb={2}>
                            Plan Smarter with Calendra
                        </Typography>
                        <Typography variant="body1" mb={4}>
                            Organize your schedule, track events, and stay in control. All in one clean, intuitive calendar app.
                        </Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                gap: 2,
                                justifyContent: isMobile ? 'center' : 'flex-start',
                                flexWrap: 'wrap',
                            }}
                        >
                            <Button variant="contained" size="large">
                                Log In
                            </Button>
                            <Button variant="outlined" size="large">
                                Sign Up
                            </Button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}

export default Hero;