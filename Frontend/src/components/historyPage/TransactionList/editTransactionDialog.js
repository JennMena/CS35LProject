import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

const EditTransactionDialog = ({ open, onClose, categories, formData, onChange, onSave }) => {
  
  console.log('EditTransactionDialog formData:', formData);

  // Ensure date is formatted as YYYY-MM-DD for the date input
  const formattedDate = formData.transactionDate ? new Date(formData.transactionDate).toISOString().split('T')[0] : '';

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Edit Transaction</DialogTitle>
      <DialogContent>
        <TextField
          select
          margin="dense"
          name="categoryId"
          label="Category"
          fullWidth
          value={formData.categoryId}
          onChange={onChange}
        >
          {categories.map((category) => (
            <MenuItem key={category.id} value={category.id}>
              {(category.type === "I") ? "Income" : "Expense"} - {category.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          margin="dense"
          name="amount"
          label="Amount"
          type="number"
          fullWidth
          value={formData.amount}
          onChange={onChange}
        />
        <TextField
          margin="dense"
          name="transactionDate"
          label="Transaction Date"
          type="date"
          fullWidth
          InputLabelProps={{ shrink: true }}
          value={formattedDate}
          onChange={onChange}
        />
        <TextField
          margin="dense"
          name="description"
          label="Description"
          type="text"
          fullWidth
          value={formData.description}
          onChange={onChange}
        />
        <TextField
          select
          margin="dense"
          name="canceled"
          label="Canceled"
          fullWidth
          value={formData.canceled}
          onChange={onChange}
        >
          <MenuItem value={true}>Yes</MenuItem>
          <MenuItem value={false}>No</MenuItem>
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={() => onSave(formData)} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditTransactionDialog;
