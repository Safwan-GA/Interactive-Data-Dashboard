// components/SignUp.tsx

import React, { useState } from 'react';
import { Button, TextField, Typography, Container, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const SignUp: React.FC = () => {
  const [emailOrUsername, setEmailOrUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const handleSignUp = () => {
    if (!emailOrUsername || !password) {
      setError('Please fill all fields');
      return;
    }

    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const isEmailTaken = storedUsers.some(
      (user: { emailOrUsername: string }) => user.emailOrUsername === emailOrUsername
    );

    if (isEmailTaken) {
      setError('Email already taken. Please use a different one.');
      return;
    }

    const newUser = { emailOrUsername, password };
    storedUsers.push(newUser);
    localStorage.setItem('users', JSON.stringify(storedUsers));

    setError('');
    alert('Sign-up successful! Redirecting to Sign In...');
    navigate('/'); // Navigate to the Sign In page after successful sign-up
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h5">Sign Up</Typography>
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
        <Button variant="contained" onClick={handleSignUp}>
          Sign Up
        </Button>
      </Box>
    </Container>
  );
};

export default SignUp;
