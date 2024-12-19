import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserProfile from './pages/UserProfile';

function App() {
  return (
    <Router>
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h1>Blog Web App!</h1>
        <Routes>
          <Route path="/profile/:username" element={<UserProfile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;