import React, { useContext, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import UserProfile from './pages/UserProfile';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import CreateProfile from './pages/CreateProfile';
import AuthContext from './contexts/AuthContext.jsx';
import HomePage from './pages/HomePage.jsx';
import BlogPosts from './pages/BlogPosts'; 
import ProtectedRoute from './components/ProtectedRoute.jsx';
import adaImage from './images/ada.jpg';

const AppContent = () => {
  const { isAuthenticated, logout, username, hasProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && !hasProfile) {
      navigate('/create-profile');
    } else if (isAuthenticated && hasProfile) {
      navigate('/blogposts');
    }
  }, [isAuthenticated, hasProfile, navigate]);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', width: '100vw' }}>
      <div style={{ flex: '1', backgroundImage: `url(${adaImage})`, backgroundSize: '100%', backgroundPosition: 'center' }}></div>
      <div style={{ flex: '2', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', textAlign: 'center' }}>
        <div>
          <h1>Ada Blog Web App!</h1>
          <nav style={{ marginBottom: '20px' }}>
            {isAuthenticated ? (
              <>
                <button onClick={() => navigate(`/profile/${username}`)} style={{ marginRight: '10px' }}>Profile</button>
                <button onClick={() => navigate(`/blogposts/`)} style={{ marginRight: '10px' }}>Blog Posts</button>
                <button onClick={logout}>Logout</button>
              </>
            ) : (
              <>
                <button onClick={() => navigate('/register')} style={{ marginRight: '10px' }}>Register</button>
                <button onClick={() => navigate('/login')}>Login</button>
              </>
            )}
          </nav>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/profile/:username" element={<ProtectedRoute requireProfile={true}><UserProfile /></ProtectedRoute>} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/create-profile" element={<ProtectedRoute requireProfile={false}><CreateProfile /></ProtectedRoute>} />
            {isAuthenticated && <Route path="/blogposts" element={<BlogPosts />} />}
          </Routes>
        </div>
      </div>
      <div style={{ flex: '1', backgroundImage: `url(${adaImage})`, backgroundSize: '100%', backgroundPosition: 'center' }}></div>
    </div>
  );
};

export default AppContent;