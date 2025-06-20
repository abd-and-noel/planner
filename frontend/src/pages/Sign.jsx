import React, { useState } from 'react';
import {
  Box,
  Button,
  CssBaseline,
  Divider,
  FormControl,
  FormLabel,
  Link,
  Stack,
  TextField,
  Typography,
  Card as MuiCard,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Google as GoogleIcon, Facebook as FacebookIcon } from '@mui/icons-material';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  padding: theme.spacing(3),
  gap: theme.spacing(2),
  boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
    borderRadius: theme.spacing(1),
  },
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
  minHeight: '100vh',
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme.spacing(2),
  backgroundColor: '#f9f9f9',
}));

export default function SignUp() {
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
  });

  const validate = () => {
    const name = document.getElementById('name')?.value || '';
    const email = document.getElementById('email')?.value || '';
    const password = document.getElementById('password')?.value || '';
    const newErrors = { name: '', email: '', password: '' };
    let isValid = true;

    if (!name.trim()) {
      newErrors.name = 'Name is required.';
      isValid = false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email.';
      isValid = false;
    }
    if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const formData = new FormData(e.currentTarget);
    console.log({
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
    });

    // TODO: Send data to backend
  };

  return (
    <>
      <CssBaseline />
      <SignUpContainer>
        <Box width="100%" maxWidth={{ xs: '100%', sm: 500 }}>
          <Card>
            <Typography variant="h4" textAlign="center">
              Create an Account
            </Typography>

            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
            >
              <FormControl fullWidth>
                <FormLabel htmlFor="name">Name</FormLabel>
                <TextField
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  error={!!errors.name}
                  helperText={errors.name}
                  required
                  fullWidth
                />
              </FormControl>

              <FormControl fullWidth>
                <FormLabel htmlFor="email">Email</FormLabel>
                <TextField
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  error={!!errors.email}
                  helperText={errors.email}
                  required
                  fullWidth
                />
              </FormControl>

              <FormControl fullWidth>
                <FormLabel htmlFor="password">Password</FormLabel>
                <TextField
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  error={!!errors.password}
                  helperText={errors.password}
                  required
                  fullWidth
                />
              </FormControl>

              <Button type="submit" variant="contained" fullWidth>
                Sign up
              </Button>

              <Typography textAlign="center">
                Already have an account?{' '}
                <Link href="/login" variant="body2">
                  Log in
                </Link>
              </Typography>
            </Box>

            <Divider sx={{ my: 2 }}>or</Divider>

            <Button fullWidth variant="outlined" startIcon={<GoogleIcon />}>
              Sign up with Google
            </Button>
            <Button fullWidth variant="outlined" startIcon={<FacebookIcon />}>
              Sign up with Facebook
            </Button>
          </Card>
        </Box>
      </SignUpContainer>
    </>
  );
}
