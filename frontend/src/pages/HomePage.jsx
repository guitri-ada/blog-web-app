import React, { useContext } from 'react';
import AuthContext from '../contexts/AuthContext';

const HomePage = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      {isAuthenticated ? (
        <>
          <p>You are logged in!</p>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <p>Please log in to access more features.</p>
      )}
    </div>
  );
};

export default HomePage;
