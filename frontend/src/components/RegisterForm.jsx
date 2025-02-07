import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";
import AuthContext from "../contexts/AuthContext.jsx";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Alert,
  LinearProgress,
} from "@mui/material";

// RegisterForm handles user registration and provides real‑time password strength feedback.
const RegisterForm = () => {
  // formData holds the user input for username, email, and password.
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState(""); // Registration status message.
  const [csrfToken, setCsrfToken] = useState(""); // CSRF token for secure requests.
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  // Calculate password strength (0–100) based on various criteria.
  const calculatePasswordStrength = (password) => {
    let score = 0;
    if (password.length > 0) score += 10; // Basic non-empty check.
    if (password.length >= 6) score += 20;
    if (password.length >= 8) score += 20;
    if (/[A-Z]/.test(password)) score += 20;
    if (/\d/.test(password)) score += 20;
    if (/[^A-Za-z0-9]/.test(password)) score += 20;
    return Math.min(score, 100);
  };

  // Provide a human-readable strength label based on the score.
  const getPasswordStrengthLabel = (score) => {
    if (score < 40) return "Weak";
    if (score < 70) return "Medium";
    return "Strong";
  };

  // On mount, fetch CSRF token and redirect if already authenticated.
  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const response = await fetch("/api/csrf-token");
        const data = await response.json();
        setCsrfToken(data.csrfToken);
      } catch (error) {
        console.error("Error fetching CSRF token:", error);
      }
    };
    fetchCsrfToken();

    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  // Update formData state when any input changes.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle registration: sanitize inputs, send data to the API, and update UI.
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Sanitize inputs to prevent injection attacks.
      const sanitizedData = {
        username: DOMPurify.sanitize(formData.username.trim()),
        email: DOMPurify.sanitize(formData.email.trim()),
        password: DOMPurify.sanitize(formData.password.trim()),
      };
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "CSRF-Token": csrfToken,
        },
        body: JSON.stringify(sanitizedData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message || "Registration successful!");
        // Clear the form after successful registration.
        setFormData({ username: "", email: "", password: "" });
        setTimeout(() => navigate("/login"), 2000);
      } else {
        // Display validation errors if available, otherwise a generic error message.
        if (data.errors && data.errors.length > 0) {
          const validationErrors = data.errors
            .map((error) => error.msg)
            .join(", ");
          setMessage(validationErrors);
        } else {
          setMessage(data.error || "Registration failed. Please try again.");
        }
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setMessage("An error occurred. Please try again.");
    }
  };

  // Compute the current password strength from formData.
  const passwordStrength = calculatePasswordStrength(formData.password);

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Register
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            id="username"
            name="username"
            label="Username"
            value={formData.username}
            onChange={handleChange}
            required
            inputProps={{
              pattern: "^[a-zA-Z0-9_]+$",
              title:
                "Username must contain only letters, numbers, and underscores.",
            }}
          />
          <TextField
            fullWidth
            margin="normal"
            id="email"
            name="email"
            label="Email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            id="password"
            name="password"
            label="Password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
            inputProps={{
              pattern: "^[a-zA-Z0-9!@#$%^&*()_+=-]+$",
              title:
                "Password must contain only letters, numbers, and special characters (!@#$%^&*()_+=-).",
            }}
          />
          {/* Render a password strength indicator when a password is entered */}
          {formData.password && (
            <Box sx={{ mt: 1 }}>
              <Typography variant="body2" sx={{ mb: 0.5 }}>
                Password Strength: {getPasswordStrengthLabel(passwordStrength)}
              </Typography>
              <LinearProgress variant="determinate" value={passwordStrength} />
            </Box>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Register
          </Button>
        </form>
        {/* Display any registration status or error messages */}
        {message && (
          <Alert severity="info" sx={{ mt: 2 }}>
            {message}
          </Alert>
        )}
      </Box>
    </Container>
  );
};

export default RegisterForm;
