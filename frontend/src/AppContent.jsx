import React, { useContext } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import UserProfile from './pages/UserProfile';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import AuthContext from './contexts/AuthContext.jsx';
import HomePage from './pages/HomePage.jsx';

const AppContent = () => {
  const { isAuthenticated, logout, username } = useContext(AuthContext);

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
          <Route path="/profile/:username" element={<UserProfile />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      </div>
    </div>
  );
};

export default AppContent;
