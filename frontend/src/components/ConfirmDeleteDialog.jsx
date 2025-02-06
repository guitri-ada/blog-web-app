import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import PropTypes from 'prop-types';
// eslint-disable-next-line no-unused-vars
import React from 'react';

const ConfirmDeleteDialog = ({ open, handleClose, handleDelete }) => (
  <Dialog open={open} onClose={handleClose}>
    <DialogTitle>Confirm Delete</DialogTitle>
    <DialogContent>
      <DialogContentText>
        Are you sure you want to delete this profile? This action cannot be
        undone.
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose} color="primary">
        Cancel
      </Button>
      <Button onClick={handleDelete} color="secondary">
        Delete
      </Button>
    </DialogActions>
  </Dialog>
);
ConfirmDeleteDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default ConfirmDeleteDialog;
