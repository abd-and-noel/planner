import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  CssBaseline,
  Divider,
  FormControl,
  FormLabel,
  Stack,
  TextField,
  Typography,
  Card as MuiCard,
  LinearProgress,
  Alert,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Google as GoogleIcon } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'; // Import Link from react-router-dom
import { isAuthenticatedAsync } from '../utils/isAuthenticated.jsx';

const address = process.env.REACT_APP_ADDRESS;

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

const LoginContainer = styled(Stack)(({ theme }) => ({
  minHeight: '100vh',
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme.spacing(2),
  backgroundColor: '#f9f9f9',
}));

export default function Login() {
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const validate = () => {
    const email = document.getElementById('email')?.value || '';
    const password = document.getElementById('password')?.value || '';
    const newErrors = { email: '', password: '' };
    let isValid = true;

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

  useEffect(() => {
    const checkAuth = async () => {
      if (isLoggedIn) {
        navigate('/dashboard'); // Changed from '/Dashboard' to '/dashboard' to match your route
        return;
      }
      const valid = await isAuthenticatedAsync();
      if (valid) {
        navigate('/dashboard'); // Changed from '/Dashboard' to '/dashboard' to match your route
      }
    };
    checkAuth();
  }, [isLoggedIn, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setServerError('');

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email');
    const password = formData.get('password');

    try {
      const response = await axios.post(`${address}/api/login/`, {
        email: email,
        password: password,
      });

      const access = response.data.access;
      const refresh = response.data.refresh;

      localStorage.setItem('access', access);
      localStorage.setItem('refresh', refresh);

      setIsLoggedIn(true);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setServerError('Invalid email or password. Please try again.');
      } else {
        setServerError('An error occurred while logging in. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <CssBaseline />
      <LoginContainer>
        <Box width="100%" maxWidth={{ xs: '100%', sm: 500 }}>
          <Card>
            {loading && <LinearProgress />}
            <Typography variant="h4" textAlign="center">
              Log in to Calendra
            </Typography>

            {serverError && <Alert severity="error">{serverError}</Alert>}

            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
            >
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
                Log in
              </Button>

              <Typography textAlign="center">
                Don't have an account?{' '}
                <Link to="/signup" style={{ color: '#1976d2', textDecoration: 'none' }}>
                  Sign up
                </Link>
              </Typography>
            </Box>

            <Divider sx={{ my: 2 }}>or</Divider>

            <Button fullWidth variant="outlined" startIcon={<GoogleIcon />}>
              Log in with Google
            </Button>
          </Card>
        </Box>
      </LoginContainer>
    </>
  );
}