import React from 'react';
import {
    Box,
    Container,
    Typography,
    Grid,
    Button,
    useTheme,
    useMediaQuery
} from '@mui/material';
import calendarImage from '../../assets/images/calendarImage.jpeg';

const Hero = () => {
    const theme = useTheme();
    const isMobileOrTablet = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Box
            sx={{
                backgroundColor: '#f9f9f9',
                height: { xs: 'calc(100vh - 56px)', sm: 'calc(100vh - 64px)' },
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Container maxWidth="lg">
                <Grid
                    container
                    spacing={4}
                    alignItems="center"
                    wrap="nowrap"
                    direction={isMobileOrTablet ? 'column' : 'row'}
                >
                    {/* Text Column */}
                    <Grid
                        item
                        xs={12}
                        md={6}
                        sx={{
                            flexShrink: 1,
                            flexGrow: 1,
                            minWidth: 0,
                        }}
                    >
                        <Box
                            sx={{
                                width: '100%',
                                textAlign: isMobileOrTablet ? 'center' : 'left',
                            }}
                        >
                            <Typography
                                variant="h3"
                                fontWeight={700}
                                mb={2}
                                sx={{
                                    fontSize: {
                                        xs: '2rem',
                                        sm: '2.5rem',
                                        md: '2.8rem',
                                        lg: '3rem',
                                    },
                                }}
                            >
                                Plan Smarter with Calendra
                            </Typography>

                            <Typography
                                variant="body1"
                                mb={4}
                                sx={{
                                    fontSize: {
                                        xs: '1rem',
                                        sm: '1.05rem',
                                        md: '1.1rem',
                                    },
                                    wordBreak: 'break-word',
                                }}
                            >
                                Organize your schedule, track events, and stay in control. All in one clean, intuitive calendar app.
                            </Typography>

                            <Box
                                sx={{
                                    display: 'flex',
                                    gap: 2,
                                    justifyContent: isMobileOrTablet ? 'center' : 'flex-start',
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

                    {/* Image Column */}
                    <Grid
                        item
                        xs={12}
                        md={6}
                        sx={{
                            display: 'flex',
                            justifyContent: isMobileOrTablet ? 'center' : 'flex-end',
                            flexShrink: 0,
                        }}
                    >
                        <Box
                            component="img"
                            src={calendarImage}
                            alt="Calendar preview"
                            sx={{
                                width: '100%',
                                maxWidth: 400,
                                height: 'auto',
                                borderRadius: 2,
                                boxShadow: 3,
                            }}
                        />
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default Hero;
