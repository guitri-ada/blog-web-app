import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext.jsx";
import { TextField, Button, Container, Typography, Box, Alert } from '@mui/material';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [csrfToken, setCsrfToken] = useState("");
  const { isAuthenticated } = useContext(AuthContext);
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
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'CSRF-Token': csrfToken
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message || 'Registration successful!');
        setFormData({ username: '', email: '', password: '' });
        setTimeout(() => navigate('/login'), 2000);
      } else {
        if (data.errors && data.errors.length > 0) {
          const validationErrors = data.errors.map(error => error.msg).join(', ');
          setMessage(validationErrors);
        } else {
          setMessage(data.error || 'Registration failed. Please try again.');
        }
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setMessage('An error occurred. Please try again.');
    }
  };

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
          />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Register
          </Button>
        </form>
        {message && <Alert severity="info" sx={{ mt: 2 }}>{message}</Alert>}
      </Box>
    </Container>
  );
};

export default RegisterForm;