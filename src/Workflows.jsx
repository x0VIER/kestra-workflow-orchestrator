import React, { useEffect, useState } from 'react';
import { fetchWorkflows } from './lib/api';

const Workflows = () => {
  const [workflows, setWorkflows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getWorkflows = async () => {
      try {
        const data = await fetchWorkflows();
        setWorkflows(data);
      } catch (err) {
        setError('Failed to fetch workflows.');
      } finally {
        setLoading(false);
      }
    };
    getWorkflows();
  }, []);

  if (loading) {
    return <div className="flex-1 p-8 fade-in text-center text-gray-400">Loading workflows...</div>;
  }

  if (error) {
    return <div className="flex-1 p-8 fade-in text-center text-red-400">Error: {error}</div>;
  }

  return (
    <div className="flex-1 p-8 fade-in">
      <h2 className="text-4xl font-bold mb-6 text-white">Workflow List</h2>
      <p className="text-lg opacity-80 text-gray-300">Manage and view all your Kestra workflows here. You can start, stop, or monitor their execution.</p>
      <div className="mt-8 glass-effect p-6 rounded-lg shadow-lg border border-gray-700">
        {workflows.length > 0 ? (
          <ul className="space-y-4">
            {workflows.map((workflow) => (
              <li key={workflow.id} className="flex justify-between items-center p-3 rounded-md bg-gray-700 bg-opacity-30">
                <span className="text-white text-lg">{workflow.name}</span>
                <span className={`px-3 py-1 rounded-full text-sm ${workflow.status === 'Running' ? 'bg-blue-500' : workflow.status === 'Completed' ? 'bg-green-500' : 'bg-red-500'}`}>
                  {workflow.status}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400">No workflows found.</p>
        )}
      </div>
    </div>
  );
};

export default Workflows;

