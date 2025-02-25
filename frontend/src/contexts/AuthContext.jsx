import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

// Create AuthContext to share auth state across the app
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [csrfToken, setCsrfToken] = useState("");
  const [username, setUsername] = useState("");
  const [hasProfile, setHasProfile] = useState(false);

  useEffect(() => {
    // Check authentication status
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/check-auth", {
          method: "GET",
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          setIsAuthenticated(true);
          setUsername(data.username);
          setHasProfile(data.hasProfile);
        } else {
          setIsAuthenticated(false);
          setUsername("");
          setHasProfile(false);
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        setIsAuthenticated(false);
        setUsername("");
        setHasProfile(false);
      }
    };

    // Fetch CSRF token
    const fetchCsrfToken = async () => {
      try {
        const response = await fetch("/api/csrf-token", {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();
        setCsrfToken(data.csrfToken);
      } catch (error) {
        console.error("Error fetching CSRF token:", error);
      }
    };

    checkAuth();
    fetchCsrfToken();
  }, []);

  // Update auth state on successful login
  const login = (username, hasProfile) => {
    setIsAuthenticated(true);
    setUsername(username);
    setHasProfile(hasProfile);
  };

  // Logout by calling the API and resetting auth state
  const logout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        headers: { "CSRF-Token": csrfToken },
        credentials: "include",
      });

      if (response.ok) {
        setIsAuthenticated(false);
        setUsername("");
        setHasProfile(false);
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        username,
        hasProfile,
        csrfToken,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContext;
