import React from 'react';
import { Popover } from '@mui/material';
import ProfileForm from './ProfileForm';
import ConfirmDeleteDialog from './ConfirmDeleteDialog';

const ProfileDialogs = ({
  id, open, anchorEl, handleClose, openDialog, setOpenDialog, handleDelete, formData, handleChange, handleSubmit
}) => (
  <>
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
    >
      <ProfileForm formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} />
    </Popover>
    <ConfirmDeleteDialog open={openDialog} handleClose={() => setOpenDialog(false)} handleDelete={handleDelete} />
  </>
);

export default ProfileDialogs;