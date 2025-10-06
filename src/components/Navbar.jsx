import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="w-64 glass-effect p-6 flex flex-col shadow-lg border-r border-gray-700">
      <div className="text-2xl font-bold text-white mb-8">Kestra</div>
      <ul className="space-y-4">
        <li>
          <Link to="/" className="flex items-center text-gray-300 hover:text-white hover:bg-gray-700 hover:bg-opacity-30 rounded-md p-2 transition-all duration-200">
            <span className="mr-3">📊</span> Dashboard
          </Link>
        </li>
        <li>
          <Link to="/workflows" className="flex items-center text-gray-300 hover:text-white hover:bg-gray-700 hover:bg-opacity-30 rounded-md p-2 transition-all duration-200">
            <span className="mr-3">⚙️</span> Workflows
          </Link>
        </li>
        <li>
          <Link to="/editor" className="flex items-center text-gray-300 hover:text-white hover:bg-gray-700 hover:bg-opacity-30 rounded-md p-2 transition-all duration-200">
            <span className="mr-3">📝</span> Visual Editor
          </Link>
        </li>
        <li>
          <Link to="/plugins" className="flex items-center text-gray-300 hover:text-white hover:bg-gray-700 hover:bg-opacity-30 rounded-md p-2 transition-all duration-200">
            <span className="mr-3">🔌</span> Plugin Management
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

