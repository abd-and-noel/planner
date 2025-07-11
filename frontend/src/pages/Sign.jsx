import React, { useState, useEffect } from 'react';
import API from '../utils/axios';
import {
  Box,
  Button,
  CssBaseline,
  Divider,
  FormControl,
  FormLabel,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  TextField,
  Typography,
  Card as MuiCard,
  LinearProgress,
  Alert,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  Visibility,
  VisibilityOff,
  CheckCircle,
  Cancel,
  Google as GoogleIcon,
} from '@mui/icons-material';
import { isAuthenticatedAsync } from '../utils/isAuthenticated.jsx';
import { useNavigate } from 'react-router-dom';

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
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const passwordChecks = {
    length: formData.password.length >= 8,
    lowercase: /[a-z]/.test(formData.password),
    uppercase: /[A-Z]/.test(formData.password),
    number: /\d/.test(formData.password),
    special: /[!@#$%^&*]/.test(formData.password),
  };

  const allPasswordValid = Object.values(passwordChecks).every(Boolean);
  const passwordsMatch = formData.password === formData.confirmPassword;

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required.';
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Enter a valid email.';
    if (!allPasswordValid) newErrors.password = 'Password does not meet criteria.';
    if (!passwordsMatch) newErrors.confirmPassword = 'Passwords do not match.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    const checkAuth = async () => {
      if (isLoggedIn) {
        navigate('/dashboard');
        return;
      }
      const valid = await isAuthenticatedAsync();
      if (valid) navigate('/dashboard');
    };
    checkAuth();
  }, [isLoggedIn, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setServerError('');

    try {
      const response = await API.post(`/api/signup/`, {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      localStorage.setItem('access', response.data.access);
      localStorage.setItem('refresh', response.data.refresh);
      setIsLoggedIn(true);
    } catch (error) {
      if (
        error.response &&
        error.response.data?.error?.includes('already exists')
      ) {
        setServerError('An account with this email already exists.');
      } else {
        setServerError('Signup failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const renderCheck = (condition) =>
    condition ? (
      <CheckCircle color="success" fontSize="small" />
    ) : (
      <Cancel color="disabled" fontSize="small" />
    );

  return (
    <>
      <CssBaseline />
      <SignUpContainer>
        <Box width="100%" maxWidth={{ xs: '100%', sm: 500 }}>
          <Card>
            {loading && <LinearProgress />}

            <Typography variant="h4" textAlign="center">
              Create an Account
            </Typography>

            {serverError && <Alert severity="error">{serverError}</Alert>}

            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <FormControl fullWidth>
                <FormLabel>Name</FormLabel>
                <TextField
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  error={!!errors.name}
                  helperText={errors.name}
                  required
                />
              </FormControl>

              <FormControl fullWidth>
                <FormLabel>Email</FormLabel>
                <TextField
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  error={!!errors.email}
                  helperText={errors.email}
                  required
                />
              </FormControl>

              <FormControl fullWidth>
                <FormLabel>Password</FormLabel>
                <TextField
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  error={!!errors.password}
                  helperText={errors.password}
                  required
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </FormControl>

              <Box sx={{ pl: 1 }}>
                <Typography variant="caption" color="text.secondary">
                  {renderCheck(passwordChecks.length)} At least 8 characters
                </Typography><br />
                <Typography variant="caption" color="text.secondary">
                  {renderCheck(passwordChecks.uppercase)} One uppercase letter
                </Typography><br />
                <Typography variant="caption" color="text.secondary">
                  {renderCheck(passwordChecks.lowercase)} One lowercase letter
                </Typography><br />
                <Typography variant="caption" color="text.secondary">
                  {renderCheck(passwordChecks.number)} One number
                </Typography><br />
                <Typography variant="caption" color="text.secondary">
                  {renderCheck(passwordChecks.special)} One special character (!@#$%^&*)
                </Typography>
              </Box>

              <FormControl fullWidth>
                <FormLabel>Confirm Password</FormLabel>
                <TextField
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword}
                  required
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          edge="end"
                        >
                          {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </FormControl>

              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={loading || !allPasswordValid || !passwordsMatch}
              >
                {loading ? 'Signing up...' : 'Sign up'}
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
              Sign up with Google (Coming Soon)
            </Button>
          </Card>
        </Box>
      </SignUpContainer>
    </>
  );
}
