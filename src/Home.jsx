import React, { useEffect, useState } from 'react';
import { fetchDashboardStats } from './lib/api';

const Home = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getStats = async () => {
      try {
        const data = await fetchDashboardStats();
        setStats(data);
      } catch (err) {
        setError('Failed to fetch dashboard statistics.');
      } finally {
        setLoading(false);
      }
    };
    getStats();
  }, []);

  if (loading) {
    return <div className="flex-1 p-8 fade-in text-center text-gray-400">Loading dashboard...</div>;
  }

  if (error) {
    return <div className="flex-1 p-8 fade-in text-center text-red-400">Error: {error}</div>;
  }

  return (
    <div className="flex-1 p-8 fade-in">
      <h2 className="text-4xl font-bold mb-6 text-white">Dashboard Overview</h2>
      <p className="text-lg opacity-80 text-gray-300">Welcome to your Kestra Workflow Orchestrator. Get a quick glance at your active workflows, recent activities, and system health.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        <div className="glass-effect p-6 rounded-lg shadow-lg border border-gray-700">
          <h3 className="text-xl font-semibold mb-2 text-white">Active Workflows</h3>
          <p className="text-3xl font-bold text-blue-400">{stats.activeWorkflows}</p>
        </div>
        <div className="glass-effect p-6 rounded-lg shadow-lg border border-gray-700">
          <h3 className="text-xl font-semibold mb-2 text-white">Successful Runs (24h)</h3>
          <p className="text-3xl font-bold text-green-400">{stats.successfulRuns}</p>
        </div>
        <div className="glass-effect p-6 rounded-lg shadow-lg border border-gray-700">
          <h3 className="text-xl font-semibold mb-2 text-white">Failed Runs (24h)</h3>
          <p className="text-3xl font-bold text-red-400">{stats.failedRuns}</p>
        </div>
      </div>
    </div>
  );
};

export default Home;

