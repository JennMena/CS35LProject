import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const ConfirmationDialog = ({ open, onClose, onConfirm }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirm Action</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Do you want to permanently delete this transaction or mark it as canceled?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onConfirm('delete')} color="primary">
          Delete
        </Button>
        <Button onClick={() => onConfirm('cancel')} color="primary">
          Cancel
        </Button>
        <Button onClick={onClose} color="primary" autoFocus>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
