// eslint-disable-next-line no-unused-vars
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CreateProfileDialog from './CreateProfileDialog';
import { describe, it, expect, jest } from '@jest/globals';

describe('CreateProfileDialog', () => {
    const mockHandleClose = jest.fn();
    const mockHandleChange = jest.fn();
    const mockHandleCreateSubmit = jest.fn();
    const formData = {
        firstname: 'John',
        lastname: 'Doe',
        bio: 'Software Developer',
    };

    it('calls handleClose when Cancel button is clicked', () => {
        render(
            <CreateProfileDialog
                open={true}
                handleClose={mockHandleClose}
                formData={formData}
                handleChange={mockHandleChange}
                handleCreateSubmit={mockHandleCreateSubmit}
            />
        );

        fireEvent.click(screen.getByText('Cancel'));
        expect(mockHandleClose).toHaveBeenCalledTimes(1);
    });

    it('calls handleCreateSubmit when form is submitted', () => {
        render(
            <CreateProfileDialog
                open={true}
                handleClose={mockHandleClose}
                formData={formData}
                handleChange={mockHandleChange}
                handleCreateSubmit={mockHandleCreateSubmit}
            />
        );

        fireEvent.submit(screen.getByRole('button', { name: /create/i }));
        expect(mockHandleCreateSubmit).toHaveBeenCalledTimes(1);
    });

    it('calls handleChange when input values are changed', () => {
        render(
            <CreateProfileDialog
                open={true}
                handleClose={mockHandleClose}
                formData={formData}
                handleChange={mockHandleChange}
                handleCreateSubmit={mockHandleCreateSubmit}
            />
        );

        fireEvent.change(screen.getByLabelText('First Name'), { target: { value: 'Jane' } });
        expect(mockHandleChange).toHaveBeenCalledTimes(1);

        fireEvent.change(screen.getByLabelText('Last Name'), { target: { value: 'Smith' } });
        expect(mockHandleChange).toHaveBeenCalledTimes(2);

        fireEvent.change(screen.getByLabelText('Bio'), { target: { value: 'Web Developer' } });
        expect(mockHandleChange).toHaveBeenCalledTimes(3);
    });
});