import React from 'react';
import { Popover } from '@mui/material';
import ProfileForm from './ProfileForm';
import ConfirmDeleteDialog from './ConfirmDeleteDialog';
import CreateProfileDialog from './CreateProfileDialog';

const ProfileDialogs = ({
  id, open, anchorEl, handleClose, openDialog, setOpenDialog, handleDelete, openCreateDialog, setOpenCreateDialog, formData, handleChange, handleSubmit, handleCreateSubmit
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
    <CreateProfileDialog
      open={openCreateDialog}
      handleClose={() => setOpenCreateDialog(false)}
      formData={formData}
      handleChange={handleChange}
      handleCreateSubmit={handleCreateSubmit}
    />
  </>
);

export default ProfileDialogs;