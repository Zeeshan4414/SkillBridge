import React, { useState } from 'react';
import { useAuth } from '../../context/authContext';
import axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import instance from '../../api/axios';

const CreateProject = () => {
  const { token } = useAuth();
  const [form, setForm] = useState({ title: '', description: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await instance.post('/projects/create', form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate('/projects');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 shadow rounded">
      <h2 className="text-xl font-bold mb-4 text-blue-700">Create New Project</h2>
      {error && <p className="text-red-600 mb-2">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Project Title"
          value={form.title}
          onChange={handleChange}
          className="w-full border p-2 mb-4 rounded"
          required
        />
        <textarea
          name="description"
          placeholder="Description (optional)"
          value={form.description}
          onChange={handleChange}
          className="w-full border p-2 mb-4 rounded"
          rows="4"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateProject;
