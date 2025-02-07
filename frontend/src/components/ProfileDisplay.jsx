// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Typography, Box } from "@mui/material";
import PropTypes from 'prop-types';

const ProfileDisplay = ({ profile }) => (
  <Box className="card" sx={{ p: 4, mb: 4, width: "100%", maxWidth: "600px" }}>
    <Typography variant="h3" component="h2">
      {profile.name}
    </Typography>
    <Typography variant="h6">
      <strong>First Name:</strong> {profile.firstname}
    </Typography>
    <Typography variant="h6">
      <strong>Last Name:</strong> {profile.lastname}
    </Typography>
    <Typography variant="h6">
      <strong>Bio:</strong> {profile.bio}
    </Typography>
  </Box>
);
ProfileDisplay.propTypes = {
  profile: PropTypes.shape({
    name: PropTypes.string.isRequired,
    firstname: PropTypes.string.isRequired,
    lastname: PropTypes.string.isRequired,
    bio: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProfileDisplay;
