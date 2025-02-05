import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DOMPurify from 'dompurify';
import AuthContext from '../contexts/AuthContext.jsx';
import { TextField, Button, Container, Typography, Box, Alert } from '@mui/material';

const CreateProfile = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    bio: '',
  });
  const [message, setMessage] = useState('');
  const [csrfToken, setCsrfToken] = useState('');
  const navigate = useNavigate();
  const { username, login } = useContext(AuthContext);

  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const response = await axios.get('/api/csrf-token');
        setCsrfToken(response.data.csrfToken);
      } catch (error) {
        console.error('Error fetching CSRF token:', error);
      }
    };
    fetchCsrfToken();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const sanitizedData = {
        firstname: DOMPurify.sanitize(formData.firstname.trim()),
        lastname: DOMPurify.sanitize(formData.lastname.trim()),
        bio: DOMPurify.sanitize(formData.bio.trim())
      };
      const response = await axios.put(`/api/userProfiles/${username}`, sanitizedData, {
        headers: {
          'CSRF-Token': csrfToken,
        },
      });
      if (response.status === 200) {
        setMessage('Profile updated successfully!');
        login(username, true);
        setTimeout(() => navigate('/'), 2000);
      } else {
        setMessage('Failed to update profile. Please try again.');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Create Profile
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            id="firstname"
            name="firstname"
            label="First Name"
            value={formData.firstname}
            onChange={handleChange}
            required
            inputProps={{ pattern: "^[a-zA-Z]+$", title: "First name must contain only letters." }}
          />
          <TextField
            fullWidth
            margin="normal"
            id="lastname"
            name="lastname"
            label="Last Name"
            value={formData.lastname}
            onChange={handleChange}
            required
            inputProps={{ pattern: "^[a-zA-Z]+$", title: "Last name must contain only letters." }}
          />
          <TextField
            fullWidth
            margin="normal"
            id="bio"
            name="bio"
            label="Bio"
            multiline
            rows={4}
            value={formData.bio}
            onChange={handleChange}
            required
          />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Create Profile
          </Button>
        </form>
        {message && <Alert severity="info" sx={{ mt: 2 }}>{message}</Alert>}
      </Box>
    </Container>
  );
};

export default CreateProfile;