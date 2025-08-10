import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";
import Dashboard from "./Dashboard";
import Logs from "./Logs";
import Analytics from "./Analytics";
import Recommendations from './RecommendationsPage';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Default route - redirect to login */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          
          {/* Login page */}
          <Route path="/login" element={<LoginPage />} />
          
          {/* Signup page */}
          <Route path="/signup" element={<SignupPage />} />
          
          {/* Dashboard page */}
          <Route path="/dashboard" element={<Dashboard />} />
          
          {/* Logs page */}
          <Route path="/logs" element={<Logs />} />
          
          {/* Analytics page */}
          <Route path="/analytics" element={<Analytics />} />

          {/* Recommendations page */}
          <Route path="/recommendations" element={<Recommendations />} />

          {/* Catch all - redirect to login */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;