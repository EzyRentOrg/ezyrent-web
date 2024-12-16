import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { TokenResponse, useGoogleLogin } from '@react-oauth/google';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


// apple
export const handleSignInWithApple = () => {
  const clientId = 'YOUR_CLIENT_ID'; // Replace with your actual client ID (Service ID)
  const redirectURI = encodeURIComponent(
    'https://your-redirect-uri.com/callback'
  ); // Your registered redirect URI
  const state = 'state123'; // Optional state parameter
  const scope = encodeURIComponent('name email'); // Requested scopes

  const appleAuthURL = `https://appleid.apple.com/auth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectURI}&scope=${scope}&state=${state}`;

  window.location.href = appleAuthURL; // Redirects the user to the Apple authentication page
};


// google


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
