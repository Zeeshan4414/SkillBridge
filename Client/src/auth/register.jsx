import React, { useState } from 'react';
import { UserIcon, EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';
import instance from '../api/axios';



const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await instance.post('/auth/register', form);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-lg p-8 w-full max-w-md animate-fade-in"
      >
        <h2 className="text-xl font-bold text-center mb-6 text-purple-700">Create Account</h2>
        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <div className="relative mb-4">
          <UserIcon className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />
        </div>

        <div className="relative mb-4">
          <EnvelopeIcon className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />
        </div>

        <div className="relative mb-6">
          <LockClosedIcon className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded transition duration-300"
        >
          Register
        </button>

        <p className="mt-4 text-sm text-center text-gray-500">
          Already have an account?{' '}
          <span
            className="text-purple-600 hover:underline cursor-pointer"
            onClick={() => navigate('/login')}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default Register;
