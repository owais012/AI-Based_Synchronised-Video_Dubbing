import React, { useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false); // Toggle between Sign-In and Sign-Up
  const [name, setName] = useState(''); // Initialize with an empty string

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSignUp) {
      // Sign-Up logic
      if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
      }

      const payload = {
        name,
        email,
        password,
      };

      try {
        const response = await fetch('http://localhost:5000/user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          const data = await response.json();
          alert('Account creation successful!');
          console.log('Sign-Up Response:', data);
          window.location.href = '/'; // Redirect to the home page
        } else {
          const errorData = await response.json();
          alert(`Sign-Up Failed: ${errorData.message || 'Unknown Error'}`);
        }
      } catch (error) {
        console.error('Error during sign-up:', error);
        alert('Sign-Up Failed: Network error');
      }

    } else {
      // For Sign-In logic
      const payload = {
        email,
        password,
      };

      try {
        const response = await fetch('http://localhost:5000/user/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          const data = await response.json();
          alert('Sign-In Successful');
          console.log('Login Response:', data);
          // Redirect to home page
          window.location.href = '/'; // Change this to your home page route
        } else {
          const errorData = await response.json();
          alert(`Sign-In Failed: ${errorData.message || 'Unknown Error'}`);
        }
      } catch (error) {
        console.error('Error during login:', error);
        alert('Sign-In Failed: Network error');
      }
    }
  };


  const handleGoogleSignIn = (credentialResponse) => {
    console.log('Google Sign-In Success:', credentialResponse);
    // You can send credentialResponse.credential to your backend for verification.
  };

  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="bg-[#1c1c1c] p-8 rounded-xl shadow-lg w-full max-w-md">
          <h1 className="text-3xl font-semibold text-gray-100 mb-6 text-center">
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </h1>

          <form onSubmit={handleSubmit}>
            {isSignUp && (
              <div className="mb-6">
                <label
                  htmlFor="name"
                  className="block text-gray-100 mb-2"
                >
                  Name
                </label>
                <input
                  type="name"
                  id="name"
                  className="w-full p-3 rounded-lg bg-gray-800 text-gray-100 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            )}
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-100 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="w-full p-3 rounded-lg bg-gray-800 text-gray-100 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-100 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full p-3 rounded-lg bg-gray-800 text-gray-100 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {isSignUp && (
              <div className="mb-6">
                <label
                  htmlFor="confirmPassword"
                  className="block text-gray-100 mb-2"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  className="w-full p-3 rounded-lg bg-gray-800 text-gray-100 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
            >
              {isSignUp ? 'Sign Up' : 'Sign In'}
            </button>

            <div className="flex justify-between items-center mt-4 text-gray-100">
              {isSignUp ? (
                <>
                  <span>Already have an account?</span>
                  <button
                    onClick={() => setIsSignUp(false)}
                    className="text-blue-500 hover:underline"
                  >
                    Sign In
                  </button>
                </>
              ) : (
                <>
                  <span>Don't have an account?</span>
                  <button
                    onClick={() => setIsSignUp(true)}
                    className="text-blue-500 hover:underline"
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>
          </form>

          {/* Google Sign-In Button */}
          <div className="flex justify-center items-center mt-4">
            <GoogleLogin
              onSuccess={handleGoogleSignIn}
              onError={() => {
                console.log('Login Failed');
              }}
              theme="filled_blue"
              size="large"
              text="continue_with"
              shape="pill"
            />
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}

export default Auth;
