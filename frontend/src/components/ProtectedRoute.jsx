import { useContext } from "react";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext.jsx";

// Redirects based on authentication and profile status.
const ProtectedRoute = ({ children, requireProfile }) => {
  const { isAuthenticated, hasProfile } = useContext(AuthContext);

  if (!isAuthenticated) return <Navigate to="/login" />;
  if (requireProfile && !hasProfile) return <Navigate to="/create-profile" />;
  if (!requireProfile && hasProfile) return <Navigate to="/" />;

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  requireProfile: PropTypes.bool.isRequired,
};

export default ProtectedRoute;
