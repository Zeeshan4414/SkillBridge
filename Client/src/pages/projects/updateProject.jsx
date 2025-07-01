import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import instance from '../../api/axios';
import { useAuth } from '../../context/authContext';

const EditProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();
  const [form, setForm] = useState({ title: '', description: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await instance.get(`/projects/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setForm({
          title: res.data.title,
          description: res.data.description || '',
        });
      } catch (err) {
        setError('Unable to fetch project. ' + err?.response?.data?.message);
      }
    };

    fetchProject();
  }, [id, token]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await instance.patch(`/projects/${id}`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate('/projects');
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to update');
    }
  };

  

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 shadow rounded">
      <h2 className="text-xl font-bold mb-4 text-blue-700">Edit Project</h2>
      {error && <p className="text-red-600 mb-2">{error}</p>}
      <form onSubmit={handleUpdate}>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          className="w-full border p-2 mb-4 rounded"
          placeholder="Project Title"
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows="4"
          className="w-full border p-2 mb-4 rounded"
          placeholder="Project Description"
        />
        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Update
          </button>
         
        </div>
      </form>
    </div>
  );
};

export default EditProject;
