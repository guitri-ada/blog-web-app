import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import ConfirmDeleteDialog from './ConfirmDeleteDialog';

describe('ConfirmDeleteDialog', () => {
  const handleClose = jest.fn();
  const handleDelete = jest.fn();

  beforeEach(() => {
    handleClose.mockClear();
    handleDelete.mockClear();
  });

  test('renders dialog with correct text', () => {
    render(<ConfirmDeleteDialog open={true} handleClose={handleClose} handleDelete={handleDelete} />);
    expect(screen.getByText('Confirm Delete')).toBeInTheDocument();
    expect(screen.getByText('Are you sure you want to delete this profile? This action cannot be undone.')).toBeInTheDocument();
  });

  test('calls handleClose when Cancel button is clicked', () => {
    render(<ConfirmDeleteDialog open={true} handleClose={handleClose} handleDelete={handleDelete} />);
    fireEvent.click(screen.getByText('Cancel'));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  test('calls handleDelete when Delete button is clicked', () => {
    render(<ConfirmDeleteDialog open={true} handleClose={handleClose} handleDelete={handleDelete} />);
    fireEvent.click(screen.getByText('Delete'));
    expect(handleDelete).toHaveBeenCalledTimes(1);
  });

  test('does not render dialog when open is false', () => {
    render(<ConfirmDeleteDialog open={false} handleClose={handleClose} handleDelete={handleDelete} />);
    expect(screen.queryByText('Confirm Delete')).not.toBeInTheDocument();
  });
});