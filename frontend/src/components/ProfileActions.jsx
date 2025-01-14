import React from 'react';
import { Box, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

const ProfileActions = ({ handleClick, setOpenDialog, setOpenCreateDialog, handleImageUpload }) => (
  <Box sx={{ width: '100%', maxWidth: '600px', display: 'flex', justifyContent: 'space-between', mb: 4, gap: 2, p: 2 }}>
    <Button variant="contained" color="success" onClick={() => setOpenCreateDialog(true)} startIcon={<AddIcon />} fullWidth>
      Create Profile
    </Button>
    <Button variant="contained" color="primary" onClick={handleClick} startIcon={<EditIcon />} fullWidth>
      Update Profile
    </Button>
    <Button
      variant="contained"
      sx={{ backgroundColor: '#8B0000' }}
      onClick={() => setOpenDialog(true)}
      startIcon={<DeleteIcon />}
      fullWidth
    >
      Delete Profile
    </Button>
    <Button
      variant="contained"
      color="secondary"
      component="label"
      startIcon={<CameraAltIcon />}
      fullWidth
    >
      Upload Profile Picture
      <input type="file" hidden onChange={handleImageUpload} />
    </Button>
  </Box>
);

export default ProfileActions;