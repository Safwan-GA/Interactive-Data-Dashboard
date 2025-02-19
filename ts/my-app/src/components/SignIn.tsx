// components/SignIn.tsx

import React, { useState } from 'react';
import { Button, TextField, Typography, Container, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const SignIn: React.FC = () => {
  const [emailOrUsername, setEmailOrUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const handleSignIn = () => {
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const user = storedUsers.find(
      (user: { emailOrUsername: string; password: string }) =>
        user.emailOrUsername === emailOrUsername && user.password === password
    );

    if (!user) {
      setError('Invalid credentials or user not found. Please sign up first.');
      return;
    }

    setError(''); // Clear error message if login is successful
    alert('Sign-in successful!');
    navigate('/home'); // Redirect to home page after successful sign-in
  };

  const handleSignUpNavigation = () => {
    navigate('/signup'); // Navigate to SignUp page
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h5">Sign In</Typography>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Email or Username"
          value={emailOrUsername}
          onChange={(e) => setEmailOrUsername(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <Typography color="error">{error}</Typography>}
        <Button variant="contained" onClick={handleSignIn}>
          Sign In
        </Button>
        <Button variant="outlined" onClick={handleSignUpNavigation}>
          Don't have an account? Sign Up
        </Button>
      </Box>
    </Container>
  );
};

export default SignIn;
