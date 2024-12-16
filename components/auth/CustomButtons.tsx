// src/components/CustomButtons.tsx
import React from 'react';
import { Button } from '@mui/material';
import { GoogleIcon, AppleIcon } from './CustomIcons'; // Assuming you have these icon components
import { handleSignInWithApple, useGoogleAuthHandler } from '@/lib/utils';

interface SubmitButtonProps {
  onClick: () => void;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({ onClick }) => (
  <Button
    type="button"
    variant="contained"
    onClick={onClick}
    sx={{
      width: '60%',
      margin: '0 auto',
      backgroundColor: '#7065f0',
      height: '42px'
    }}
  >
    Sign up
  </Button>
);

export const GoogleSignUpButton: React.FC = () => {
  const googleLogin = useGoogleAuthHandler(); // Call the utility function to get the login handler

  return (
    <Button
      variant="outlined"
      onClick={() => googleLogin()} // Trigger the Google login flow
      startIcon={<GoogleIcon />}
      sx={{
        width: '60%',
        margin: '0 auto',
        height: '42px'
      }}
    >
      Sign up with Google
    </Button>
  );
};

export const AppleSignUpButton: React.FC = () => {
  return (
    <Button
      type="button"
      variant="outlined"
      onClick={handleSignInWithApple}
      startIcon={<AppleIcon />}
      sx={{
        width: '60%',
        margin: '0 auto',
        height: '42px'
      }}
    >
      Sign up with Apple
    </Button>
  );
};
