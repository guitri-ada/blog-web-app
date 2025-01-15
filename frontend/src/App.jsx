import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import UserProfile from './pages/UserProfile';
import BlogPosts from './pages/BlogPosts';
import BlogPostForm from './pages/BlogPostForm';

function App() {
  return (
    <Router>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          minHeight: '100vh',
          width: '100vw',
          textAlign: 'center',
        }}
      >
        <Link to="/" style={{ textDecoration: 'none', color: 'black', fontSize: '44px', fontStyle:'h4', marginBottom: '30px', marginTop: '30px' }}>
        BLOG WEB APP
        </Link>

        {/* Main Navigation */}
        <nav style={{ marginBottom: '20px' }}>
          <Link to="/blogposts" style={{ textDecoration: 'none', color: 'blue', fontSize: '18px', marginRight: '20px' }}>
            Blog Posts
          </Link>
          <Link to="/profile/someusername" style={{ textDecoration: 'none', color: 'blue', fontSize: '18px' }}>
            User Profiles
          </Link>
        </nav>

        <Routes>
          {/* Blog-related Routes */}
          <Route path="/blogposts" element={<BlogPosts />} />
          <Route path="/newblogpost" element={<BlogPostForm />} />

          {/* User Profile Route */}
          <Route path="/profile/:username" element={<UserProfile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
