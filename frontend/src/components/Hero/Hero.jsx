import React from 'react';
import {
    Box,
    Container,
    Stack,
    Typography
}
from '@mui/material';


const Hero = () => {
  return (
    <Box id = "hero" mt={5}>
        <Container sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',}}>
        <Stack>
            <Typography variant='h3'>
                Welcome to Calendra
            </Typography>
        </Stack>
        <Stack mt={2}>
            <Typography variant='body1' mt = {2}>
                A calendar app built for dalhousie Students, By dalhousie Students.
            </Typography>
        </Stack>
        </Container>
    </Box>
  );
}

export default Hero;