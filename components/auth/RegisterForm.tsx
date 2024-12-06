// src/components/RegisterForm.tsx
import React, { useState } from 'react';
import { Box, FormControl, TextField } from '@mui/material';
import { SubmitButton } from './CustomButtons';
import { validateForm } from '@/lib/utils/formValidation'; // Import the validation function

const RegisterForm: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  // State for error messages
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Handle form submission
  const handleSubmit = () => {
    const formValues = { name, email, password, confirmPassword };
    const validationErrors = validateForm(formValues); // Use the imported function
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      // If no errors, perform the form submission logic
      // console.log('Form Submitted', { name, email, password });
    }
  };

  return (
    <Box
      component="form"
      sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
    >
      <FormControl sx={{ height: '68px' }}>
        <TextField
          autoComplete="name"
          name="name"
          required
          fullWidth
          id="name"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={!!errors.name}
          helperText={errors.name}
          sx={{ height: '100%' }}
        />
      </FormControl>
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
      <FormControl sx={{ height: '68px' }}>
        <TextField
          required
          fullWidth
          name="confirmPassword"
          placeholder="Confirm Password"
          type="password"
          id="password2"
          autoComplete="new-password"
          variant="outlined"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword}
          sx={{ height: '100%' }}
        />
      </FormControl>
      <SubmitButton onClick={handleSubmit} />
    </Box>
  );
};

export default RegisterForm;
