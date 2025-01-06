"use strict";
exports.__esModule = true;
exports.useGoogleAuthHandler = exports.handleSignInWithApple = exports.cn = void 0;
var clsx_1 = require("clsx");
var tailwind_merge_1 = require("tailwind-merge");
var google_1 = require("@react-oauth/google");
function cn() {
    var inputs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        inputs[_i] = arguments[_i];
    }
    return tailwind_merge_1.twMerge(clsx_1.clsx(inputs));
}
exports.cn = cn;
// apple
exports.handleSignInWithApple = function () {
    var clientId = 'YOUR_CLIENT_ID'; // Replace with your actual client ID (Service ID)
    var redirectURI = encodeURIComponent('https://your-redirect-uri.com/callback'); // Your registered redirect URI
    var state = 'state123'; // Optional state parameter
    var scope = encodeURIComponent('name email'); // Requested scopes
    var appleAuthURL = "https://appleid.apple.com/auth/authorize?response_type=code&client_id=" + clientId + "&redirect_uri=" + redirectURI + "&scope=" + scope + "&state=" + state;
    window.location.href = appleAuthURL; // Redirects the user to the Apple authentication page
};
// google
exports.useGoogleAuthHandler = function () {
    var googleLogin = google_1.useGoogleLogin({
        onSuccess: function (tokenResponse) {
            // console.log('Google Sign-Up successful:', tokenResponse);
            alert(tokenResponse + "Google Sign-Up successful! Token received.");
            // Add your success handling logic here (e.g., API call, token storage)
        },
        onError: function () {
            // console.error('Google Sign-Up failed');
            alert('Google Sign-Up failed. Please try again.');
            // Add your error handling logic here
        }
    });
    return googleLogin;
};
