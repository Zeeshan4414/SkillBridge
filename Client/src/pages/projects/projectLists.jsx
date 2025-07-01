import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/authContext';

import { useNavigate, useParams } from 'react-router-dom';
import instance from '../../api/axios';

const ProjectsList = () => {
    const { id } = useParams();
  const { token } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchProjects = async () => {
    try {
      const res = await instance.get('/projects/my-projects?page=1&limit=10', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProjects(res.data.projects);
      console.log(res.data)
    } catch (err) {
      console.error('Error fetching projects', err);
    } finally {
      setLoading(false);
    }
  };
  const handleDelete = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this project?');
    if (!confirmed) return;

    try {
      await instance.delete(`/projects/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchProjects();
    } catch (err) {
      console.error('Delete error:', err);
      setError(err?.response?.data?.message || 'Delete failed.');
    }
  };
  useEffect(() => {
    fetchProjects();
  }, []);

  
  return (
    <div className="max-w-4xl mx-auto mt-10 p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-blue-700">Your Projects</h2>
        <button
          onClick={() => navigate('/projects/create')}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-900 transition cursor-pointer"
        >
          + New Project
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : projects.length === 0 ? (
        <p className="text-gray-600">You have no projects yet.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {projects.map((project) => (
            <div key={project._id} className="bg-white p-4 shadow rounded hover:shadow-lg transition">
              <h3 className="text-lg font-bold">{project.title}</h3>
              <p className="text-gray-600">{project.description || 'No description'}</p>
              <div className="mt-2 flex justify-end gap-10">
                <button
                  onClick={() => navigate(`/projects/edit/${project._id}`)}
                  className="text-sm text-blue-600 hover:underline  cursor-pointer"
                >
                  Edit
                </button>
                <button
                  onClick={ () => handleDelete(project._id)}
                  className="text-sm text-red-600 hover:underline  cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectsList;
