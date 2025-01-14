import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProfileDisplay from './ProfileDisplay';

describe('ProfileDisplay', () => {
    const profile = {
        name: 'Asa Maccrimmon',
        username: 'asamac',
        firstname: 'Asa',
        lastname: 'Maccrimmon',
        email: 'asamac@example.com',
        bio: 'Apprentice Software Developer'
    };

    it('renders profile name', () => {
        const { getByText } = render(<ProfileDisplay profile={profile} />);
        expect(getByText('Asa Maccrimmon')).toBeInTheDocument();
    });

    it('renders profile username', () => {
        const { getByText } = render(<ProfileDisplay profile={profile} />);
        expect(getByText(/Username:/)).toBeInTheDocument();
        expect(getByText('asamac')).toBeInTheDocument();
    });

    it('renders profile first name', () => {
        const { getByText } = render(<ProfileDisplay profile={profile} />);
        expect(getByText(/First Name:/)).toBeInTheDocument();
        expect(getByText('Asa')).toBeInTheDocument();
    });

    it('renders profile last name', () => {
        const { getByText } = render(<ProfileDisplay profile={profile} />);
        expect(getByText(/Last Name:/)).toBeInTheDocument();
        expect(getByText('Maccrimmon')).toBeInTheDocument();
    });

    it('renders profile email', () => {
        const { getByText } = render(<ProfileDisplay profile={profile} />);
        expect(getByText(/Email:/)).toBeInTheDocument();
        expect(getByText('asamac@example.com')).toBeInTheDocument();
    });

    it('renders profile bio', () => {
        const { getByText } = render(<ProfileDisplay profile={profile} />);
        expect(getByText(/Bio:/)).toBeInTheDocument();
        expect(getByText('Apprentice Software Developer')).toBeInTheDocument();
    });
});