import React from 'react';
import { Typography, Box } from '@mui/material';

const ProfileDisplay = ({ profile }) => (
  <Box className="card" sx={{ p: 4, mb: 4, width: '100%', maxWidth: '600px' }}>
    <Typography variant="h3" component="h2">{profile.name}</Typography>
    <Typography variant="h6"><strong>First Name:</strong> {profile.firstname}</Typography>
    <Typography variant="h6"><strong>Last Name:</strong> {profile.lastname}</Typography>
    <Typography variant="h6"><strong>Bio:</strong> {profile.bio}</Typography>
  </Box>
);

export default ProfileDisplay;