import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Box, Avatar } from '@mui/material';
import axios from 'axios';
import useUserProfile from '../hooks/useUserProfile';
import ProfileDisplay from '../components/ProfileDisplay';
import ProfileActions from '../components/ProfileActions';
import ProfileDialogs from '../components/ProfileDialogs';
import '../styles/UserProfile.css';

const UserProfile = () => {
  const { username } = useParams();
  const { profile, loading, error, formData, handleChange, setProfile, setFormData, setLoading, setError } = useUserProfile(username);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [tempImage, setTempImage] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/api/userProfiles/${username}`, formData);
      alert('Profile updated successfully');
      handleClose();
      window.location.reload();
    } catch (err) {
      setError('Failed to update profile');
      console.log(err);
    }
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/api/userProfiles`, formData);
      if (response.status === 201) {
        console.log('Profile created and verified successfully:', response.data);
        handleClose();
        alert('Profile successfully created');
        window.location.reload();
      } else {
        console.error('Profile creation or verification failed:', response.data);
        setError('Failed to create profile');
      }
    } catch (err) {
      console.error('Error creating or verifying profile:', err);
      setError('Failed to create profile');
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/userProfiles/${username}`);
      alert('Profile deleted successfully');
      setOpenDialog(false);
      window.location.href = '/';
    } catch (err) {
      setError('Failed to delete profile');
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Container>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', minHeight: '100vh', width: '75vh', border: '1px solid black' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Profile Page
        </Typography>
        <Avatar alt="Profile Picture" src={tempImage || profile.pictureUrl} sx={{ width: 400, height: 400, marginBottom: 2 }} />
        <ProfileDisplay profile={profile} />
        <ProfileActions handleClick={handleClick} setOpenDialog={setOpenDialog} setOpenCreateDialog={setOpenCreateDialog} handleImageUpload={handleImageUpload} />
        <ProfileDialogs
          id={id}
          open={open}
          anchorEl={anchorEl}
          handleClose={handleClose}
          openDialog={openDialog}
          setOpenDialog={setOpenDialog}
          handleDelete={handleDelete}
          openCreateDialog={openCreateDialog}
          setOpenCreateDialog={setOpenCreateDialog}
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          handleCreateSubmit={handleCreateSubmit}
        />
      </Box>
    </Container>
  );
};

export default UserProfile;