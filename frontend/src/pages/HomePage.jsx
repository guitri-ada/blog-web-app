import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";

const HomePage = () => {
  const { isAuthenticated, username } = useContext(AuthContext);

  return (
    <div>
      <h1>Home Page</h1>
      {isAuthenticated ? (
        <>
          <p>Welcome, {username}!</p>
        </>
      ) : (
        <p>Please log in or register to view blog posts.</p>
      )}
    </div>
  );
};

export default HomePage;
