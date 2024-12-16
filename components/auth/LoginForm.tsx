// src/components/RegisterForm.tsx
import React, { useState } from 'react';
import { Box, FormControl, TextField, Typography, Link } from '@mui/material';

// import { validateForm } from '@/lib/utils/formValidation'; // Import the validation function

const LoginFrom: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  // State for error messages
  const [errors] = useState<{ [key: string]: string }>({});

  // Handle form submission

  return (
    <Box
      component="form"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 4
      }}
    >
      <FormControl sx={{ height: '68px' }}>
        <TextField
          required
          fullWidth
          id="email"
          placeholder="Email Address"
          name="email"
          autoComplete="email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!errors.email}
          helperText={errors.email}
          sx={{ height: '100%' }}
        />
      </FormControl>
      <FormControl sx={{ height: '68px' }}>
        <TextField
          required
          fullWidth
          name="password"
          placeholder="Password"
          type="password"
          id="password"
          autoComplete="new-password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={!!errors.password}
          helperText={errors.password}
          sx={{ height: '100%' }}
        />
      </FormControl>
      <Typography>
        <Link href="/#" variant="body2" sx={{ alignSelf: 'center' }}>
          Forgot Password?
        </Link>
      </Typography>
    </Box>
  );
};

export default LoginFrom;
