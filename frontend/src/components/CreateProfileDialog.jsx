import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Box, TextField } from '@mui/material';

const CreateProfileDialog = ({ open, handleClose, formData, handleChange, handleCreateSubmit }) => (
  <Dialog open={open} onClose={handleClose}>
    <DialogTitle>Create Profile</DialogTitle>
    <DialogContent>
      <form onSubmit={handleCreateSubmit}>
        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="First Name"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            variant="outlined"
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="Last Name"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            variant="outlined"
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="Bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            variant="outlined"
            multiline
            rows={4}
          />
        </Box>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Create
          </Button>
        </DialogActions>
      </form>
    </DialogContent>
  </Dialog>
);

export default CreateProfileDialog;