/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Button, TextField, Container, Typography, Grid, Box, CircularProgress } from '@mui/material';
import { login } from '../../../redux/reducers/authReducer'; 
import { loginUser } from '../../../api/auth'; 
import { useNavigate } from 'react-router-dom'; 

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('Loading state changed:', loading);
  }, [loading]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);  
    setError(null);    
    
    try {
      const response = await loginUser(formData);
      const { user, token } = response;
      dispatch(login({ user, token }));
      navigate('/tasks');
    } catch (error) {
      console.error('Login error:', error);
      setError('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
        }}
      >
        <Typography variant="h5" sx={{ mb: 2 }}>Sign In</Typography>
        {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}
        
        <form onSubmit={handleSubmit} noValidate sx={{ width: '100%' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="email"
                required
                fullWidth
                label="Email Address"
                value={formData.email}
                onChange={handleChange}
                type="email"
                disabled={loading}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="password"
                required
                fullWidth
                label="Password"
                value={formData.password}
                onChange={handleChange}
                type="password"
                disabled={loading}
              />
            </Grid>
          </Grid>
          
          <Box sx={{ position: 'relative', mt: 3 }}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={loading}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </Button>
            {loading && (
              <CircularProgress
                size={24}
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  marginTop: '-12px',
                  marginLeft: '-12px',
                }}
              />
            )}
          </Box>
          
          <Grid container justifyContent="flex-end" sx={{ mt: 2 }}>
            <Grid item>
              <Typography variant="body2">
                Don't have an account?{' '}
                <Button 
                  onClick={() => navigate('/register')} 
                  color="primary"
                  disabled={loading}
                >
                  Sign Up
                </Button>
              </Typography>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default Login;