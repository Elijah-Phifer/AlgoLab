import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './components/Home';
import ModulesList from './components/ModulesList';
import ModuleDetail from './components/ModuleDetail';
import Sandbox from './components/Sandbox';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/modules" element={<ModulesList />} />
          <Route path="/modules/:id" element={<ModuleDetail />} />
          <Route path="/sandbox" element={<Sandbox />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
