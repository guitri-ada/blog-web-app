import React, { useContext, useEffect } from 'react';
import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import UserProfile from './pages/UserProfile';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import CreateProfile from './pages/CreateProfile';
import AuthContext from './contexts/AuthContext.jsx';
import HomePage from './pages/HomePage.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

const AppContent = () => {
  const { isAuthenticated, logout, username, hasProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && !hasProfile) {
      navigate('/create-profile');
    }
  }, [isAuthenticated, hasProfile, navigate]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', width: '100vw', textAlign: 'center' }}>
      <div>
        <h1>Blog Web App!</h1>
        <nav style={{ marginBottom: '20px' }}>
          {isAuthenticated ? (
            <>
              <Link to={`/profile/${username}`} style={{ marginRight: '10px' }}>Profile</Link>
              <button onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/register" style={{ marginRight: '10px' }}>Register</Link>
              <Link to="/login">Login</Link>
            </>
          )}
        </nav>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile/:userId" element={<ProtectedRoute requireProfile={true}><UserProfile /></ProtectedRoute>} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/create-profile" element={<ProtectedRoute requireProfile={false}><CreateProfile /></ProtectedRoute>} />
        </Routes>
      </div>
    </div>
  );
};

export default AppContent;