// eslint-disable-next-line no-unused-vars
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProfileDialogs from './ProfileDialogs';
import { describe, it, expect, jest } from '@jest/globals';

describe('ProfileDialogs', () => {
    const mockHandleClose = jest.fn();
    const mockSetOpenDialog = jest.fn();
    const mockHandleDelete = jest.fn();
    const mockSetOpenCreateDialog = jest.fn();
    const mockHandleChange = jest.fn();
    const mockHandleSubmit = jest.fn();
    const mockHandleCreateSubmit = jest.fn();

    const defaultProps = {
        id: 'test-popover',
        open: true,
        anchorEl: null,
        handleClose: mockHandleClose,
        openDialog: true,
        setOpenDialog: mockSetOpenDialog,
        handleDelete: mockHandleDelete,
        openCreateDialog: true,
        setOpenCreateDialog: mockSetOpenCreateDialog,
        formData: { name: 'Test' },
        handleChange: mockHandleChange,
        handleSubmit: mockHandleSubmit,
        handleCreateSubmit: mockHandleCreateSubmit,
    };

    it('renders ConfirmDeleteDialog when openDialog is true', () => {
        render(<ProfileDialogs {...defaultProps} />);
        expect(screen.getByText('Confirm Delete')).toBeInTheDocument();
    });
});