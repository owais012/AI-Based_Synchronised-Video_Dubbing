import React, { useState } from 'react';
import { GoogleLogin } from 'react-google-login';

function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false); // Toggle between Sign-In and Sign-Up

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp && password !== confirmPassword) {
      alert('Passwords do not match!');
    } else {
      // Handle Sign-In or Sign-Up logic here
      alert(isSignUp ? 'Sign-Up Successful' : 'Sign-In Successful');
    }
  };

  const handleGoogleSignIn = (response) => {
    console.log('Google login response:', response);
    // Handle Google Sign-In
    // You can send the response.tokenId to the backend to authenticate the user
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="bg-[#1c1c1c] p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-semibold text-gray-100 mb-6 text-center">{isSignUp ? 'Sign Up' : 'Sign In'}</h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-100 mb-2">Email Address</label>
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
            <label htmlFor="password" className="block text-gray-100 mb-2">Password</label>
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
              <label htmlFor="confirmPassword" className="block text-gray-100 mb-2">Confirm Password</label>
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
                <button onClick={() => setIsSignUp(false)} className="text-blue-500 hover:underline">Sign In</button>
              </>
            ) : (
              <>
                <span>Don't have an account?</span>
                <button onClick={() => setIsSignUp(true)} className="text-blue-500 hover:underline">Sign Up</button>
              </>
            )}
          </div>
        </form>

        {/* Google Sign-In Button */}
        <div className="flex justify-center items-center mt-4">
          <GoogleLogin
            clientId="YOUR_GOOGLE_CLIENT_ID" // Replace with your Google Client ID
            buttonText="Sign in with Google"
            onSuccess={handleGoogleSignIn}
            onFailure={handleGoogleSignIn}
            cookiePolicy={'single_host_origin'}
            className="w-full p-3 flex items-center justify-center gap-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
          />
        </div>
      </div>
    </div>
  );
}

export default Auth;