import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/authContext';
import axios from '../api/axios';
import { ChartBarSquareIcon, CheckCircleIcon, ClipboardDocumentListIcon, PencilSquareIcon, UsersIcon } from '@heroicons/react/24/solid';
import instance from '../api/axios';

const Dashboard = () => {
  const { token, role, name } = useAuth();
  const [stats, setStats] = useState({
    projects: 0,
    goals: 0,
    users: 0,
  });

  const fetchStats = async () => {
    try {
      const res = await instance.get('/dashboard', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setStats(res.data);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error.message);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-100 py-10 px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-blue-800 animate-fade-in">
          👋 Welcome Back, <span className="capitalize">{name}</span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card
            title="Total Projects"
            count={stats.totalProjects}
            icon={<ClipboardDocumentListIcon className="h-10 w-10 text-blue-600" />}
            color="bg-blue-100"
          />
          <Card
            title="Total Goals"
            count={stats.totalGoals}
            icon={<ChartBarSquareIcon className="h-10 w-10 text-purple-600" />}
            color="bg-purple-100"
          />
          <Card
            title="Completed Goals"
            count={stats.completedGoals}
            icon={<CheckCircleIcon className="h-10 w-10 text-purple-600" />}
            color="bg-purple-100"
          />
          <Card
            title="Pending Goals"
            count={stats.pendingGoals}
            icon={<PencilSquareIcon className="h-10 w-10 text-purple-600" />}
            color="bg-purple-100"
          />
          {role === 'admin' && (
            <Card
              title="Total Users"
              count={stats.users}
              icon={<UsersIcon className="h-10 w-10 text-green-600" />}
              color="bg-green-100"
            />
          )}
        </div>
      </div>
    </div>
  );
};

const Card = ({ title, count, icon, color }) => {
  return (
    <div
      className={`rounded-lg shadow-md p-6 flex items-center gap-4 transform transition-transform hover:scale-105 duration-300 ${color} animate-fade-in`}
    >
      {icon}
      <div>
        <h2 className="text-xl font-semibold text-gray-700">{title}</h2>
        <p className="text-2xl font-bold text-gray-900">{count}</p>
      </div>
    </div>
  );
};

export default Dashboard;
