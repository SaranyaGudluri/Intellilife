// App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './app/page';
import ResultPage from './app/dashboard/assess/result';
import Dashboard from './app/dashboard/page';
const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/assess/result" element={<ResultPage />} />
      </Routes>
    </Router>
  );
};

export default App;
