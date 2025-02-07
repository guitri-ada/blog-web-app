// eslint-disable-next-line no-unused-vars
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ConfirmDeleteDialog from './ConfirmDeleteDialog';
import { describe, test, expect, jest, beforeEach } from '@jest/globals';

describe('ConfirmDeleteDialog', () => {
    const handleClose = jest.fn();
    const handleDelete = jest.fn();

    beforeEach(() => {
        render(
            <ConfirmDeleteDialog
                open={true}
                handleClose={handleClose}
                handleDelete={handleDelete}
            />
        );
    });

    test('calls handleClose when Cancel button is clicked', () => {
        fireEvent.click(screen.getByText('Cancel'));
        expect(handleClose).toHaveBeenCalledTimes(1);
    });

    test('calls handleDelete when Delete button is clicked', () => {
        fireEvent.click(screen.getByText('Delete'));
        expect(handleDelete).toHaveBeenCalledTimes(1);
    });
});