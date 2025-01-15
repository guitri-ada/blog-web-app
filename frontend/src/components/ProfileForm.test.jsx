import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProfileForm from './ProfileForm';

describe('ProfileForm', () => {
    const formData = {
        firstname: 'Asa',
        lastname: 'Maccrimmon',
        email: 'asa.mac@example.com',
        bio: 'Apprentice Software Developer'
    };

    const handleChange = jest.fn();
    const handleSubmit = jest.fn((e) => e.preventDefault());

    beforeEach(() => {
        render(
            <ProfileForm
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
            />
        );
    });

    test('renders form fields with correct values', () => {
        expect(screen.getByLabelText(/First Name/i)).toHaveValue(formData.firstname);
        expect(screen.getByLabelText(/Last Name/i)).toHaveValue(formData.lastname);
        expect(screen.getByLabelText(/Email/i)).toHaveValue(formData.email);
        expect(screen.getByLabelText(/Bio/i)).toHaveValue(formData.bio);
    });

    test('calls handleChange on input change', () => {
        fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: 'Ross' } });
        expect(handleChange).toHaveBeenCalled();
    });

    test('calls handleSubmit on form submit', () => {
        fireEvent.submit(screen.getByRole('button', { name: /Save Changes/i }));
        expect(handleSubmit).toHaveBeenCalled();
    });
});