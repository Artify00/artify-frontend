import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
export const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // Mock credentials for demonstration
  const validCredentials = {
    email: 'demo@artify.com',
    password: 'password123'
  };
  // Admin credentials
  const adminCredentials = {
    email: 'admin@artifynow.net',
    password: 'admin123'
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    // Simulate network request
    setTimeout(() => {
      // Check if admin credentials
      if (email === adminCredentials.email && password === adminCredentials.password) {
        // Successful admin login
        console.log('Admin login successful');
        // Store admin info in localStorage
        localStorage.setItem('user', JSON.stringify({
          name: 'Admin User',
          email: adminCredentials.email,
          isLoggedIn: true,
          isAdmin: true
        }));
        // Redirect to admin dashboard
        navigate('/admin');
      }
      // Check if regular user credentials match our mock data
      else if (email === validCredentials.email && password === validCredentials.password) {
        // Successful login
        console.log('Login successful');
        // Store user info in localStorage to persist the session
        localStorage.setItem('user', JSON.stringify({
          name: 'Sarah Chen',
          email: validCredentials.email,
          isLoggedIn: true
        }));
        // Redirect to dashboard
        navigate('/dashboard');
      } else {
        // Failed login
        setError('Invalid email or password');
        setLoading(false);
      }
    }, 1000); // Simulate 1 second delay for API call
  };
  return <div className="w-full min-h-screen bg-purple-50 py-16 px-4">
      <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-md">
        <div className="text-center mb-8">
          <Link to="/">
            <img src="/Artify_Logo_purple_clear.png" alt="Artify" className="h-12 mx-auto mb-6" />
          </Link>
          <h1 className="text-2xl font-bold font-sans">Welcome back</h1>
          <p className="text-gray-600">Sign in to your Artify account</p>
        </div>
        {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
            {error}
          </div>}
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 text-blue-700 rounded-md text-sm">
          <strong>Demo credentials:</strong>
          <br />
          Email: demo@artify.com
          <br />
          Password: password123
          <br />
          <br />
          <strong>Admin credentials:</strong>
          <br />
          Email: admin@artifynow.net
          <br />
          Password: admin123
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input type="email" id="email" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input type="password" id="password" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required />
            <div className="mt-1 text-right">
              <a href="#" className="text-sm text-purple-600 hover:underline">
                Forgot password?
              </a>
            </div>
          </div>
          <button type="submit" className={`w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition duration-200 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`} disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="text-purple-600 hover:underline">
              Create account
            </Link>
          </p>
        </div>
      </div>
    </div>;
};