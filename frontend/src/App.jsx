import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import UserProfile from './pages/UserProfile';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';

function App() {
  return (
    <Router>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', width: '100vw', textAlign: 'center' }}>
        <div>
          <h1>Blog Web App!</h1>
          <nav style={{ marginBottom: '20px' }}>
            <Link to="/register" style={{ marginRight: '10px' }}>Register</Link>
            <Link to="/login">Login</Link>
          </nav>
          <Routes>
            <Route path="/profile/:username" element={<UserProfile />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/login" element={<LoginForm />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
