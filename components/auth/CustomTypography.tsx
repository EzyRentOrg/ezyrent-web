// src/components/CustomTypography.tsx
import React from 'react';
import { Link, Typography } from '@mui/material';

export const AgreementText: React.FC = () => (
  <Typography
    sx={{
      textAlign: 'center',
      color: '#11111399'
    }}
  >
    By proceeding, you agree to{' '}
    <span style={{ color: 'black' }}>
      <Link href="/sign-in" variant="body2" sx={{ alignSelf: 'center' }}>
        Terms of Use
      </Link>
    </span>{' '}
    &{' '}
    <span style={{ color: 'black' }}>
      <Link href="/sign-in" variant="body2" sx={{ alignSelf: 'center' }}>
        Privacy Policy
      </Link>
    </span>
  </Typography>
);

export const SignInLink: React.FC = () => (
  <Typography
    sx={{
      textAlign: 'center',
      color: '#11111399'
    }}
  >
    Already have an account?{' '}
    <span style={{ color: 'black' }}>
      <Link href="/login" variant="body2" sx={{ alignSelf: 'center' }}>
        Sign in
      </Link>
    </span>
  </Typography>
);

export const SignUpLink: React.FC = () => (
  <Typography
    sx={{
      textAlign: 'center',
      color: '#11111399'
    }}
  >
    Don&apos;t have an account?{' '}
    <span style={{ color: 'black' }}>
      <Link href="/register" variant="body2" sx={{ alignSelf: 'center' }}>
        Sign up
      </Link>
    </span>
  </Typography>
);
