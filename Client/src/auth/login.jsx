import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import { EnvelopeIcon, EyeIcon, EyeSlashIcon, LockClosedIcon } from '@heroicons/react/24/solid';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false); // 👁️ toggle
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('/auth/login', form);
      localStorage.setItem('token', res.data.accessToken);
      localStorage.setItem('role', res.data.user.role);
      localStorage.setItem('name', res.data.user.name);
      
      console.log(res.data.user.role, res.data.accessToken, res.data.user.name);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-blue-200 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-lg p-8 w-full max-w-md animate-fade-in"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-700">Welcome Back</h2>
        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <div className="relative mb-4">
          <EnvelopeIcon className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div className="relative mb-6">
          <LockClosedIcon className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <span
            className="absolute right-3 top-3 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeSlashIcon className="h-5 w-5 text-gray-400" />
            ) : (
              <EyeIcon className="h-5 w-5 text-gray-400" />
            )}
          </span>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition duration-300"
        >
          Login
        </button>

        <p className="mt-4 text-sm text-center text-gray-500">
          Don't have an account?{' '}
          <span
            className="text-blue-600 hover:underline cursor-pointer"
            onClick={() => navigate('/register')}
          >
            Register
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
