// src/utils/googleAuth.ts
import { TokenResponse, useGoogleLogin } from '@react-oauth/google';

export const useGoogleAuthHandler = () => {
  const googleLogin = useGoogleLogin({
    onSuccess: (tokenResponse: TokenResponse) => {
      // console.log('Google Sign-Up successful:', tokenResponse);
      alert(`${tokenResponse}Google Sign-Up successful! Token received.`);
      // Add your success handling logic here (e.g., API call, token storage)
    },
    onError: () => {
      // console.error('Google Sign-Up failed');
      alert('Google Sign-Up failed. Please try again.');
      // Add your error handling logic here
    }
  });

  return googleLogin;
};
