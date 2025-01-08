import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CreateProfileDialog from './CreateProfileDialog';

const mockHandleClose = jest.fn();
const mockHandleChange = jest.fn();
const mockHandleCreateSubmit = jest.fn();

const formData = {
    username: '',
    firstname: '',
    lastname: '',
    email: '',
    bio: ''
};

describe('CreateProfileDialog', () => {
    test('renders CreateProfileDialog component', () => {
        render(
            <CreateProfileDialog
                open={true}
                handleClose={mockHandleClose}
                formData={formData}
                handleChange={mockHandleChange}
                handleCreateSubmit={mockHandleCreateSubmit}
            />
        );

        expect(screen.getByText('Create Profile')).toBeInTheDocument();
        expect(screen.getByLabelText('Username')).toBeInTheDocument();
        expect(screen.getByLabelText('First Name')).toBeInTheDocument();
        expect(screen.getByLabelText('Last Name')).toBeInTheDocument();
        expect(screen.getByLabelText('Email')).toBeInTheDocument();
        expect(screen.getByLabelText('Bio')).toBeInTheDocument();
        expect(screen.getByText('Cancel')).toBeInTheDocument();
        expect(screen.getByText('Create')).toBeInTheDocument();
    });

    test('calls handleClose when Cancel button is clicked', () => {
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
        expect(mockHandleClose).toHaveBeenCalled();
    });

    test('calls handleCreateSubmit when form is submitted', () => {
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
        expect(mockHandleCreateSubmit).toHaveBeenCalled();
    });

    test('calls handleChange when input fields are changed', () => {
        render(
            <CreateProfileDialog
                open={true}
                handleClose={mockHandleClose}
                formData={formData}
                handleChange={mockHandleChange}
                handleCreateSubmit={mockHandleCreateSubmit}
            />
        );

        fireEvent.change(screen.getByLabelText('Username'), { target: { value: 'testuser' } });
        expect(mockHandleChange).toHaveBeenCalled();
    });
});