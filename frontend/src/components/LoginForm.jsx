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
} from "@mui/material";

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [csrfToken, setCsrfToken] = useState("");
  const { isAuthenticated, login } = useContext(AuthContext);
  const navigate = useNavigate();

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
      navigate("/blogposts");
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const sanitizedData = {
        email: DOMPurify.sanitize(formData.email.trim()),
        password: DOMPurify.sanitize(formData.password.trim()),
      };
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "CSRF-Token": csrfToken,
        },
        credentials: "include",
        body: JSON.stringify(sanitizedData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message || "Login successful!");
        login(data.username, data.hasProfile);
        setTimeout(() => navigate("/blogposts"), 2000);
      } else {
        if (data.errors && data.errors.length > 0) {
          const validationErrors = data.errors
            .map((error) => error.msg)
            .join(", ");
          setMessage(validationErrors);
        } else {
          setMessage(data.error || "Login failed. Please try again.");
        }
      }
    } catch (error) {
      console.error("Error during login:", error);
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Log in
        </Typography>
        <form onSubmit={handleSubmit}>
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
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Log in
          </Button>
        </form>
        {message && (
          <Alert severity="info" sx={{ mt: 2 }}>
            {message}
          </Alert>
        )}
      </Box>
    </Container>
  );
};

export default LoginForm;
