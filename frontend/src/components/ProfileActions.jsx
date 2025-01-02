import React from 'react';
import { Box, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const ProfileActions = ({ handleClick, setOpenDialog, setOpenCreateDialog }) => (
  <Box sx={{ width: '100%', maxWidth: '600px', display: 'flex', justifyContent: 'space-between', mb: 4 }}>
    <Button variant="contained" color="success" onClick={() => setOpenCreateDialog(true)} startIcon={<AddIcon />}>
      Create Profile
    </Button>
    <Button variant="contained" color="primary" onClick={handleClick} startIcon={<EditIcon />}>
      Update Profile
    </Button>
    <Button
      variant="contained"
      sx={{  backgroundColor: '#8B0000'  }}
      onClick={() => setOpenDialog(true)}
      startIcon={<DeleteIcon />}
    >
      Delete Profile
    </Button>
  </Box>
);

export default ProfileActions;