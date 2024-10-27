import React, { useState } from 'react';

function SignIn() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
    } else {
      // Handle successful sign-in
      console.log('Sign in successful');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="bg-[#1c1c1c] p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-semibold text-gray-100 mb-6">Sign In</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-100 mb-2">Email Address</label>
            <input 
              type="email" 
              id="email" 
              className="w-full p-3 rounded-lg bg-gray-800 text-gray-100 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" 
              placeholder="Enter your email" 
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
          <button 
            type="submit" 
            className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
