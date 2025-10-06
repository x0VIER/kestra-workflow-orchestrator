import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './Home';
import Workflows from './Workflows';
import VisualEditor from './VisualEditor';
import PluginManagement from './PluginManagement';
import './App.css';

function App() {
  return (
    <Router>
      <div className="flex min-h-screen bg-gray-900 text-white">
        <Navbar />
        <div className="flex-1 flex flex-col">
          <header className="p-8 text-center">
            <h1 className="text-5xl font-bold mb-4">Kestra Workflow Orchestrator</h1>
            <p className="text-xl opacity-75">A modern, futuristic interface for your workflows.</p>
          </header>
          <main className="flex-1 flex">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/workflows" element={<Workflows />} />
              <Route path="/editor" element={<VisualEditor />} />
              <Route path="/plugins" element={<PluginManagement />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;

