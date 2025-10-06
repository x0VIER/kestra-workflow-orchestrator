import React, { useEffect, useState } from 'react';
import { fetchPlugins } from './lib/api';

const PluginManagement = () => {
  const [plugins, setPlugins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getPlugins = async () => {
      try {
        const data = await fetchPlugins();
        setPlugins(data);
      } catch (err) {
        setError('Failed to fetch plugins.');
      } finally {
        setLoading(false);
      }
    };
    getPlugins();
  }, []);

  if (loading) {
    return <div className="flex-1 p-8 fade-in text-center text-gray-400">Loading plugins...</div>;
  }

  if (error) {
    return <div className="flex-1 p-8 fade-in text-center text-red-400">Error: {error}</div>;
  }

  return (
    <div className="flex-1 p-8 fade-in">
      <h2 className="text-4xl font-bold mb-6 text-white">Plugin Management</h2>
      <p className="text-lg opacity-80 text-gray-300">Discover, install, and manage plugins to extend Kestra's functionality.</p>
      <div className="mt-8 glass-effect p-6 rounded-lg shadow-lg border border-gray-700">
        {plugins.length > 0 ? (
          <ul className="space-y-4">
            {plugins.map((plugin) => (
              <li key={plugin.id} className="flex justify-between items-center p-3 rounded-md bg-gray-700 bg-opacity-30">
                <div>
                  <span className="text-white text-lg">{plugin.name}</span>
                  <span className="text-gray-400 text-sm ml-2">v{plugin.version}</span>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${plugin.status === 'Active' ? 'bg-green-500' : 'bg-red-500'}`}>
                  {plugin.status}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400">No plugins found.</p>
        )}
      </div>
    </div>
  );
};

export default PluginManagement;

