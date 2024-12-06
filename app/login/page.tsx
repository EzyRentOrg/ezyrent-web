'use client';
import React from 'react';
import { Stack, Divider, Typography } from '@mui/material';
import { MainContainer, FlexDiv } from '@/components/auth/styledComponents';
import LoginFrom from '@/components/auth/LoginForm';
import {
  GoogleSignUpButton,
  AppleSignUpButton
} from '@/components/auth/CustomButtons';
import RegisterImages from '@/components/auth/RegisterImages';
import { SignUpLink } from '@/components/auth/CustomTypography';

const Register: React.FC = () => {
  return (
    <MainContainer>
      <FlexDiv>
        <Stack sx={{ display: { xs: 'none', md: 'block' } }}>
          <RegisterImages />
        </Stack>
        <Stack
          sx={{
            width: { xs: '90vw', md: '33.33vw' },
            margin: '0 auto',
            gap: '16px'
          }}
        >
          <Typography
            component="h1"
            variant="h3"
            sx={{
              width: 'fit-content',
              color: '#7065F0',
              textAlign: 'center',
              margin: '0 auto'
            }}
          >
            Sign In
          </Typography>
          <LoginFrom />
          {/* <SubmitButton /> */}
          <Divider>
            <Typography sx={{ color: 'text.secondary', marginY: '20px' }}>
              or
            </Typography>
          </Divider>
          <GoogleSignUpButton />
          <AppleSignUpButton />
          <SignUpLink />
        </Stack>
      </FlexDiv>
    </MainContainer>
  );
};

export default Register;
