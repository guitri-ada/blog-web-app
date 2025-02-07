// eslint-disable-next-line no-unused-vars
import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProfileDisplay from './ProfileDisplay';
import { describe, it, expect } from '@jest/globals';

describe('ProfileDisplay', () => {
    const profile = {
        firstname: 'Asa',
        lastname: 'Maccrimmon',
        bio: 'Apprentice Software Developer'
    };

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

    it('renders profile bio', () => {
        const { getByText } = render(<ProfileDisplay profile={profile} />);
        expect(getByText(/Bio:/)).toBeInTheDocument();
        expect(getByText('Apprentice Software Developer')).toBeInTheDocument();
    });
});