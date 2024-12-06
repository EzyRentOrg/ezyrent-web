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
