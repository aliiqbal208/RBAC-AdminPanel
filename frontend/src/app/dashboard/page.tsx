'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useEffect, useState } from 'react';
import api from '@/lib/api';

export default function DashboardPage() {
  const { user, isAdmin } = useAuth();
  const [stats, setStats] = useState({ totalUsers: 0, admins: 0, users: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get('/users');
        const allUsers = response.data.users;
        setStats({
          totalUsers: allUsers.length,
          admins: allUsers.filter((u: { roles: string[] }) => u.roles.includes('admin')).length,
          users: allUsers.filter((u: { roles: string[] }) => u.roles.includes('user')).length,
        });
      } catch {
        // Ignore stats errors
      }
    };
    fetchStats();
  }, []);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">
          Welcome back, <span className="font-medium text-gray-700">{user?.name}</span>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Users</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{stats.totalUsers}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">👥</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Admins</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{stats.admins}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">🛡️</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Regular Users</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{stats.users}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">👤</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Account Info</h2>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="text-gray-500 w-20">Name:</span>
            <span className="text-gray-900 font-medium">{user?.name}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-gray-500 w-20">Email:</span>
            <span className="text-gray-900 font-medium">{user?.email}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-gray-500 w-20">Role:</span>
            <span className="inline-block px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-800 font-medium">
              {isAdmin ? 'Admin' : 'User'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
